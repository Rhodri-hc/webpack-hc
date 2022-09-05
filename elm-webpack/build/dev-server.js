var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware

var server = express()
var compiler = webpack(webpackConfig)

// 核心用途
// 1、修改webpack 的 fs 为MemoryFileSystem，并将构建结果全部存储到内存中
// 2、实现请求中间件，用于处理所有资源请求，并到内存中查询相应文件返回
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// 核心功能：实现HMR (HotModuleReplacement)机制
// 复杂点：
// 1、需要客户端和服务端同时配合实现（HotModuleReplacementPlugin 和 webpack-hot-middleware 联动使用）
// 2、客户端和服务端双向通信机制复杂
var hotMiddleware = require('webpack-hot-middleware')(compiler)
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

var context = config.dev.context

switch(process.env.NODE_ENV){
    case 'local': var proxypath = 'http://localhost:8001'; break;
    case 'online': var proxypath = 'https://elm.cangdu.org'; break;
    default:  var proxypath = config.dev.proxypath;
}
var options = {
    target: proxypath,
    changeOrigin: true,
}
if (context.length) {
    // 注册代理
    server.use(proxyMiddleware(context, options))
}

// handle fallback for HTML5 history API
// 解决 history 模式下 404 问题
server.use(require('connect-history-api-fallback')())

// serve webpack bundle output
server.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware)

// serve pure static assets
// 静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})

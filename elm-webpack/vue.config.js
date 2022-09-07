const path = require('path');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src')
}

const smp = new SpeedMeasureWebpackPlugin({
  disable: !(process.env.MEASURE === 'true'),
  outputFormat: "humanVerbose"
})

// console.log("require('os').cpus()", require('os').cpus());

const dllReference = (config) => {
  config.plugin('vendorDll')
    .use(webpack.DllReferencePlugin, [{
      context: __dirname,
      manifest: require('./dll/vue-manifest.json')
    }]);
  // 这里是把相关文件引用入到html模板中
  config.plugin('addAssetHtml')
    .use(AddAssetHtmlWebpackPlugin, [
      [
        {
          filepath: require.resolve(path.resolve(__dirname, './dll/vue.dll.js')),
        }
      ]
    ])
    .after('html')
};

module.exports = {
  publicPath: "./",
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: true,
  configureWebpack: smp.wrap({
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, './node_modules/.temp_cache'),
    },
    module: {
      rules:[
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use:[
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components')
        }
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.js$/,
    //       // include: path.resolve('src'),
    //       exclude: /node_modules/,
    //       use: [{
    //         loader: "thread-loader",
    //         // 耗时的 loader （例如 babel-loader）
    //         options:{
    //           worker: 2
    //         }
    //       }],
    //     },
    //   ],
    // },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.MEASURE === 'true' ? "server" : "disabled",
        // analyzerHost:""
        // analyzerPort
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
      }),
      // new webpack.DllReferencePlugin({
      //   context: path.join(__dirname),
      //   manifest: path.resolve(__dirname, './dll/vue-manifest.json')
      // }),
      // // new CopyWebpackPlugin({
      // //   patterns:[
      // //     { from: path.resolve(__dirname, "./dll/vue.dll.js"),
      // //       to: path.resolve(__dirname, "./dist/js/vue.dll.js")
      // //     }
      // //   ]
      // // }),
      // // new HtmlWebpackTagsPlugin({
      // //   scripts: "/js/vue.dll.js",
      // //   append: true
      // // })
      // new AddAssetHtmlWebpackPlugin({
      //   filepath: path.resolve(__dirname, './dll/vue.dll.js'),
      //   publicPath: './dll',
      //   outputPath: './dist',
      // })
    ]
  }),
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      dllReference(config)
    }
  }

}

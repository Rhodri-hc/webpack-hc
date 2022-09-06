const path = require('path');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const smp = new SpeedMeasureWebpackPlugin({
  disable: !(process.env.MEASURE === 'true'),
  outputFormat: "humanVerbose"
})

// console.log("require('os').cpus()", require('os').cpus());

module.exports = {
  // publicPath: "./",
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: true,
  configureWebpack: smp.wrap({
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
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: path.resolve(__dirname, './dll/vue-manifest.json')
      }),
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, './dll/vue.dll.js'),
        publicPath: './',
        outputPath: path.resolve(__dirname, './dist'),
        // attributes: {
        //   nomodule: false
        // },
      })
    ]
  })
}

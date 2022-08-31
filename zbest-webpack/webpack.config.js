const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/**
 *  treeshaking 触发条件：
 * 1、通过解构的方式获取方法，可以触发 treeshaking
 * 2、调用的npm 包必须使用ESM
 * 3、同一文件的treeshaking 有触发条件，条件就是 mode=production
 * 4、一定要注意使用解构来加载模块
 */

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        login: "./src/login.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                      maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'images/[name].[hash:6][ext]',
                  },
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            sourceMap: true
          }),
          new CssMinimizerPlugin()
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            chunks: ["login"]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CopyPlugin({
            patterns: [{ 
                from: path.resolve(__dirname, './src/img'),
                to: path.resolve(__dirname, './dist/img') 
            }]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        })
    ]
}
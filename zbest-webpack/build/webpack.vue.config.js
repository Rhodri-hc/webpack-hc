const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader")


module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "../src/main.js")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
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
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader",
                options: {
                    esModule: false
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin(),
          new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024,
            name: 'common',
            cacheGroups: {
              jquery: {
                test: /jquery/,
                name: 'jquery',
                chunks: 'all'
              },
              'lodash-es': {
                test: /lodash-es/,
                name: 'lodash-es',
                chunks: 'all'
              },
            },
        },
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../public/index.html"),
            chunks: ["index"]
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CopyPlugin({
            patterns: [{ 
                from: path.resolve(__dirname, '../src/img'),
                to: path.resolve(__dirname, '../dist/img') 
            }]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}
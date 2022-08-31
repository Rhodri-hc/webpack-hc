const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")

module.exports = {
    mode: "development",
    entry: {
        bundle: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"]
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
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
}
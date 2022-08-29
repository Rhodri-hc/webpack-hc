const path = require("path");
const webpack = require("webpack");
const FooterPlugin = require("./plugins/FooterPlugin")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader" , "css-loader"]
            },
            {
                test: /\.rhodri$/,
                use: [path.resolve(__dirname, './loader/rhodri-loader.js')]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "学习webpack"
        }),
        new FooterPlugin({
            banner: "自定义注脚"
        })
    ]
}
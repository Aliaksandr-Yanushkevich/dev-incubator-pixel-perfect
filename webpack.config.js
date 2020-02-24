const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        publicPath: "dist/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            //     options: {
            //         fix: true
            //     }
            // },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: "url-loader",
                options: {
                    name: "./fonts/[name].[ext]",
                    publicPath: "../"
                }
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            filename: "[name].[ext]",
                            publicPath: "../"
                          }
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        ...glob.sync("./*.html").map(htmlFile => {
            return new HtmlWebpackPlugin({
              filename: path.basename(htmlFile),
              template: htmlFile
            });
          }),
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }
    return config;
};
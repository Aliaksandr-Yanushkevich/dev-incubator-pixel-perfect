const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        publicPath: "./"
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],

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
                test: /\.(png|jpe?g|gif|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    esModule: false,
                }
            }
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
        new CopyWebpackPlugin([
            { from: './src/img', to: './src/img' }
        ])
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }
    return config;
};
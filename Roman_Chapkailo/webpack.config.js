const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './build/app.js'
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            verbose: true,
            watch: false
        }),
       
        new CopyWebpackPlugin([{ from: './src/index.html', to: './build/index.html' }]),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),
        new ExtractTextPlugin({
            filename: './build/style.css'
        }),
        new StyleLintPlugin(null),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: /node_modules/,
                options: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'double']
                        }
                    },
                    configFile: false,
                    emitErrors: false,
                    failOnHint: true,
                    typeCheck: false,
                    fix: false,
                    tsConfigFile: 'tsconfig.json',
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }

        ]

    }
}
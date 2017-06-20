var Webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var isPro = process.env.NODE_ENV === 'production'

/*
    default config
*/
module.exports = {
    entry: {
        index: ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        filename: 'static/js/[name].[hash:6].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json'],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }

        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|ico)$/i,
            use: {
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:6].[ext]',
                    publicPath: '../../',
                }
            }
        }, {
            test: /\.(svg|woff|woff2|ttf|eot)$/i,
            use: {
                loader: "file-loader",
                options: {
                    name: 'static/fonts/[name].[hash:6].[ext]',
                    publicPath: '../../',
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            // chunks: [name, 'vendors'],
            // chunksSortMode: 'none' | 'auto' | 'dependency'
        }),
        new Webpack.NoEmitOnErrorsPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: ({
                resource
            }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            ),
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[hash:6].css',
            allChunks: true,
            disable: isPro ? false : true
        }),
        // new BundleAnalyzerPlugin(),
        // new Webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    },
}
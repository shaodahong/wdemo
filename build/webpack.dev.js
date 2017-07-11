var express = require('express');
var path = require('path');
var opn = require('opn');
var Webpack = require('webpack');
var merge = require('webpack-merge')
var history = require('connect-history-api-fallback');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var baseConfig = require('./webpack.base');

baseConfig = merge(baseConfig, {
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
        // new Webpack.NamedModulesPlugin()
    ],
    devServer: {
        historyApiFallback: {
            disableDotRule: true
        }
    }
})

var port = 8080;

var app = express();

var compiler = Webpack(baseConfig);
var middleware = webpackMiddleware(compiler, {
    publicPath: baseConfig.output.publicPath,
    // contentBase: path.join(__dirname + '../dist/'),
    hot: true,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false 
    }
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
    heartbeat: 2000
}));
app.use(express.static(path.join(__dirname, '../src/')));
app.use(history());

app.listen(port, function onStart(err) {
    var uri = 'http://localhost:' + port;
    if (err) {
        console.log(err);
    }else {
        console.log(uri);
    }
    opn(uri);
})
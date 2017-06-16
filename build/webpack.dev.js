require('shelljs/global');

var webpack = require('webpack');
var baseConfig = require('./webpack.base');

rm('-rf', 'dist/');

webpack(baseConfig, function (err, status) {
    console.log('01')
})


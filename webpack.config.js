'use strict'

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './rodan/app/main.js',
        core: [
        ]
    },
    output: {
        path: 'build/js',
        publicPath: '/js/',
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'rodan/app',
            '.tmp/app'
        ],
        alias: {
            underscore: 'lodash',
            handlebars: 'handlebars/handlebars'
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel-loader' }
        ]
    },
    plugins: [
    ]
};
'use strict'

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './rodan/app/main.js',
        core: [
            'jquery',
            'lodash',
            'backbone',
            'backbone.marionette'
        ]
    },
    output: {
        path: 'build/js',
        publicPath: '/js/',
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    //externals: {
    //    'jquery': 'jQuery'
    //},
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            'rodan/app',
            'node_modules'
        ],
        alias: {
            underscore: 'lodash'
            //handlebars: 'handlebars/handlebars'
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
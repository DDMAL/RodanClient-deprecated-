/* jshint node:true */
'use strict'

var gulp = require('gulp');
var webpack = require('webpack');
var $ = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var webpackConfig = require('./webpack.config');


gulp.task('develop:templates', shell.task([
    'python support/build-template.py -b rodan/templates/index.html -t rodan/templates/views rodan'
]));

gulp.task('develop:styles', shell.task([
    'sassc -m rodan/styles/rodan.scss rodan/styles/rodan.css'
]));

gulp.task('develop:jshint', function (callback)
{
    return gulp.src(['rodan/app/**/*.js'])
        .pipe($.jshint({lookup: true, devel: true}))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('develop:server', function()
{
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({port:35729}))
        .use(serveStatic('rodan'))
        .use(serveIndex('rodan'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function()
        {
            console.log('Started a web server on http://localhost:9000');
        });
});

gulp.task('develop', ['develop:server'], function() {
    $.livereload.listen();

    gulp.watch([
        'rodan/app/**/*.js',
        'rodan/index.html',
        'rodan/styles/rodan.css'
    ]).on('change', $.livereload.changed);

    gulp.watch('rodan/templates/**/*.html', ['develop:templates']);
    gulp.watch('rodan/app/**/*.js', ['develop:jshint']);
    gulp.watch('rodan/styles/rodan.scss', ['develop:styles']);
});

/*
* Production tasks.
*/
gulp.task('production:templates', shell.task([
    'python support/build-template.py -b rodan/templates/index.html -t rodan/templates/views rodan'
]));

gulp.task('production:jshint', function (callback)
{
    return gulp.src(['rodan/app/**/*.js'])
        .pipe($.jshint({lookup: true}))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});


gulp.task('default', function()
{
    gulp.start('develop:build');
});
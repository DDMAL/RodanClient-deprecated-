/* jshint node:true */
'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var shell = require('gulp-shell');
var karma = require('karma').server;
//var webpack = require('webpack');
//var webpackConfig = require('./webpack.config');


//var RodanDevCompiler = (function()
//{
//    var rodanCompiler;
//
//    function createCompiler()
//    {
//        var conf = Object.create(webpackConfig);
//        conf.devtool = 'source-map';
//        conf.debug = true;
//        conf.watch = true;
//        conf.output.path = 'build/scripts';
//        return webpack(conf);
//    }
//
//    return {
//        getWebpack: function()
//        {
//            if (!rodanCompiler) {
//                rodanCompiler = createCompiler();
//            }
//            return rodanCompiler;
//        }
//    }
//})();

//gulp.task('develop:compile', function(callback)
//{
//    RodanDevCompiler.getWebpack().run(function(err, stats)
//    {
//        if (err)
//            throw new $.util.PluginError("webpack", err);
//
//        $.util.log("[webpack]", stats.toString({colors: true}))
//        callback();
//    });
//});

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
        .listen(9001)
        .on('listening', function()
        {
            console.log('Started a web server on http://localhost:9001');
        });
});

gulp.task('develop:clean', function(callback)
{
    var del = require('del');
    del(['rodan/styles/rodan.css',
        'rodan/styles/rodan.css.map',
        'rodan/index.html'], function () {
    });
});

gulp.task('develop:test', function(callback)
{
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, callback);
});

gulp.task('develop', ['develop:server'], function() {
    gulp.start('develop:templates');
    gulp.start('develop:styles');
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
    gulp.start('develop');
});
"use strict";

//Gulp in-built packages 
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha'),
    jslint = require('gulp-jslint'),
    jscs = require('gulp-jscs'),
    guppy = require('git-guppy')(gulp);

gulp.task('style', function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jscs())
        .pipe(jscs({configPath: "./.jscsrc"}))
        .pipe(jscs.reporter());
});

gulp.task('pre-commit', function () {
  return gulp.src(guppy.src('pre-commit'))
    .pipe(gulpFilter(['*.js']))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint', function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jslint({
            node:  true,
            nomen:  true
        }))
        .pipe(jslint.reporter('stylish',  true));
});

gulp.task('test', function () {
    gulp.src('./test/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('start', function () {
    nodemon({
        script: 'app.js'
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});


gulp.task("default", []);
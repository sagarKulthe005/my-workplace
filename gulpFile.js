"use strict";

//Gulp in-built packages 
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jslint = require('gulp-jslint');
var jscs = require('gulp-jscs');
var guppy = require('git-guppy')(gulp);
var jsdoc = require('gulp-jsdoc3');

gulp.task('doc', function (cb) {
    gulp.src(['./api/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('style', ['lint'], function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jscs({fix: true}))
        .pipe(jscs({configPath: "./.jscsrc"}))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

gulp.task('pre-commit', ['lint', 'style', 'test']);

gulp.task('lint', function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jslint({
            node:  true,
            nomen:  true
        }))
        .pipe(jslint.reporter('stylish',  true));
});

gulp.task('test', ['style'], function () {
    gulp.src('./test/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
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
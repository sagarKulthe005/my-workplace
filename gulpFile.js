"use strict";

//Gulp in-built packages 
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jslint = require('gulp-jslint');
var jscs = require('gulp-jscs');
var guppy = require('git-guppy')(gulp);
var jsdoc = require('gulp-jsdoc3');

//Task for document creation
gulp.task('doc', function (cb) {
    gulp.src(['./api/**/*.js'], {read: false})
         .pipe(jsdoc(cb));
});

//Task for code style check
gulp.task('style', function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jscs({fix: true}))
        .pipe(jscs({configPath: "./.jscsrc"}))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

//Task for pre-commit check
gulp.task('pre-commit', ['lint', 'style', 'test']);

//Task for code linting
gulp.task('lint', function () {
    return gulp.src(['gulpFile.js', 'app.js', './api/**/*.js'])
        .pipe(jslint({
            node:  true,
            nomen:  true
        }))
        .pipe(jslint.reporter('stylish', true));
});

//Task for unit test cases
gulp.task('test', function () {
    gulp.src('./test/*.js')
        .pipe(mocha({reporter: 'spec'}));
});

//Task to start app
gulp.task('start-app', function () {
    nodemon({
        script: 'app.js'
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});


gulp.task("default", []);
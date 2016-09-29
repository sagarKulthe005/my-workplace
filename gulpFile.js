"use strict";
/**version: 0.0.2 */
//Gulp in-built packages 
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var jslint = require('gulp-jslint');
var jscs = require('gulp-jscs');
var guppy = require('git-guppy')(gulp);
var jsdoc = require('gulp-jsdoc3');
var bump = require('gulp-bump');
var git  = require('gulp-git');
var push = require('gulp-git-push');

gulp.task('bump', function() {
  return gulp.src(['./gulpFile.js'])
        // bump package.json version 
        .pipe(bump({type: 'patch'}))
        // save bumped file into filesystem 
        .pipe(gulp.dest('./'))
        // commit changes 
        .pipe(git.commit('bump version'))
        // push local changes to repository 
        .pipe(push({                      
            repository: 'origin',
            refspec: 'HEAD:development'
        }));
});

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
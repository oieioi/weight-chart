var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var server = require('gulp-express');
var webpackConfig = require('./webpack.config.js');
var eslint = require('gulp-eslint');

gulp.task('clean', function(cb){
  var rimraf = require('rimraf');
  rimraf('./build/', cb);
});

gulp.task('copyIndex', ['clean'], function(){
  return gulp.src('./src/index.html')
  .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['copyIndex'], function(){
  return gulp.src('')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task('watch', function(){
  return gulp.watch('./src/**/*', ['lint', 'build']);
});

gulp.task('server', function(){
  gulp.watch('./server/**/*.js', function(){
    server.run(['./server/app.js']);
  });
  return server.run(['./server/app.js']);
});

gulp.task('lint', function(){
  return gulp.src(['./src/**/*.jsx'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});


gulp.task('default', ['build', 'server', 'watch']);

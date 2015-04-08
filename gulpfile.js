var gulp = require('gulp');
var webpack = require('gulp-webpack');
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
  .pipe(gulp.dest('./build/'));
});

gulp.task('lint', function(cb){
  gulp.src('./src/**/*.jsx')
  .pipe(eslint());
  cb();
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.jsx', {debounceDelay: 2000}, ['lint', 'build']);
});

gulp.task('server', function(){
  gulp.watch('./server/**/*.js', function(){
    server.run(['./server/app.js']);
  });
  return server.run(['./server/app.js']);
});

gulp.task('default', ['build', 'server', 'watch']);

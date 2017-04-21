const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');

gulp.task('build', ['jsx', 'css', 'html']);

gulp.task('jsx', () => {
  return gulp.src('client/src/index.jsx')
    .pipe(webpack(webpackConfig))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('client/public/'));
});

gulp.task('css', () => {
  return gulp.src('client/public/style/style.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('client/public/style/'));
});

gulp.task('html', () => {
  return gulp.src('client/public/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('client/public/'));
});

gulp.watch('client/public/style/style.css', ['css']);
gulp.watch('client/public/index.html', ['html']);
gulp.watch('client/src/**/*.js', ['jsx']);
gulp.watch('client/src/**/*.jsx', ['jsx']);

gulp.task('default', ['build']);

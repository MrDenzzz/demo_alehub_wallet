// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var compass = require('compass-importer');

// gulp.task('styles', function() {
//     gulp.src('sass/**/*.scss')
//         .pipe(sass({ importer: compass }).on('error', sass.logError))
//         .pipe(gulp.dest('./css/'))
// });

// //Watch task
// gulp.task('default',function() {
//     gulp.watch('sass/**/*.scss',['styles']);
// });

var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

gulp.task('style', function () {
    return gulp.src('./stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./css/'));
});

gulp.task('default', ['style']);

//Watch task
gulp.task('default', function () {
    gulp.watch('stylus/*.styl', ['style']);
});
var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('compass-importer');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass({ importer: compass }).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
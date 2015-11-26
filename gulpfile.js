
var gulp = require('gulp');

var argv      = require('yargs').argv,
    callback  = require('gulp-callback'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    less      = require('gulp-less'),
    minifycss = require('gulp-minify-css');

gulp.task('build-css', function() {
    return gulp.src([
        'src/static/styles/app.less'
    ])
    .pipe(less())
    .pipe(argv.development ? callback(function() {}) : minifycss())
    .pipe(gulp.dest('src/static/styles'));
});

gulp.task('build-js', function(cb) {
    return gulp.src([
        'src/static/js/root.js',
        'src/static/js/polyfill/**/*.js',
        'src/static/js/vender/**/*.js',
        'src/static/js/core/**/*.js',
        'src/static/js/modules/**/*.js',
        'src/static/js/views/**/*.js',
        '!src/static/js/**/*.min.js'
    ])
    .pipe(argv.development ? callback(function() {}) : uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('src/static/js'))
});

gulp.task('default', ['build-css', 'build-js']);

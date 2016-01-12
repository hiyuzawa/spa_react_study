var gulp = require('gulp');
var browserify = require('browserify')
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    browserify('./js/app.js', {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
    gulp.watch('./js/*.js', ['browserify'])
});

gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
                host: '127.0.0.1',
                livereload: true
        }));
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
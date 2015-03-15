var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('index', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./index.html','./src/**/*'], ['index']);
});

gulp.task('default', ['connect', 'watch']);

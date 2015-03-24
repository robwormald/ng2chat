var gulp = require('gulp');
var connect = require('gulp-connect');
var Builder = require('systemjs-builder');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('index', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('build',function(){
	var builder = new Builder();
	return builder.loadConfig('./config.js')
	.then(function(){
		builder.config({
			annotations: true,
			types: true,
			memberVariables: true
		})
		return builder.build('app/main','dist/bundle.js');
	})
})

gulp.task('watch', function () {
  gulp.watch(['./index.html','./src/**/*'], ['index']);
});

gulp.task('default', ['connect', 'watch']);

var gulp = require('gulp');
var connect = require('gulp-connect');
var Builder = require('systemjs-builder');
var concat = require('gulp-concat');

var files = [
	'jspm_packages/traceur-runtime.js',
	'jspm_packages/system.js',
	'jspm_packages/github/angular/zone.js@0.4.2/zone.js',
	'dist/build.js'
]


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
		return builder.build('app/main','dist/build.js');
	})
});

gulp.task('ngBuild',function(){
	var builder = new Builder();
	return builder.loadConfig('./config.js')
	.then(function(){
		builder.config({
			annotations: true,
			types: true,
			memberVariables: true
		})
		return builder.build('angular2/angular2','dist/angular2.js');
	})
});

gulp.task('bundle', ['build'], function(){})

gulp.task('watch', function () {
  gulp.watch(['./index.html','./src/**/*'], ['index']);
});

gulp.task('default', ['connect', 'watch']);

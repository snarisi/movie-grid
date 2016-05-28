const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const ngAnnotate = require('gulp-ng-annotate');
const runSequence = require('run-sequence');

gulp.task('buildJS', () => {
	return gulp.src(['./client/app.js', './client/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public'));
});

gulp.task('default', function () {
	gulp.start('buildJS');
	gulp.watch('client/**', function () {
		runSequence('buildJS');
	});
});

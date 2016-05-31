const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const ngAnnotate = require('gulp-ng-annotate');
const runSequence = require('run-sequence');

gulp.task('buildJS', () => {
	return gulp.src(['./client/app/main.js', './client/app/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public'));
});

gulp.task('buildCSS', function () {

  var sassCompilation = sass();
  sassCompilation.on('error', console.error.bind(console));

  return gulp.src('./client/assets/stylesheets/main.scss')
	  .pipe(plumber({
	      errorHandler: notify.onError('SASS processing failed! Check your gulp process.')
	  }))
	  .pipe(sourcemaps.init())
	  .pipe(sassCompilation)
	  .pipe(sourcemaps.write())
	  .pipe(rename('style.css'))
	  .pipe(gulp.dest('./public'));
});

gulp.task('build', ['buildJS', 'buildCSS']);

gulp.task('default', function () {
	gulp.start('build');
	gulp.watch('client/app/**', ['buildJS']);
	gulp.watch('client/assets/stylesheets/**', ['buildCSS']);
});

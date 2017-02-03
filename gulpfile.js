var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps');


gulp.task('css', function () {
	return gulp.src('./assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 4 version'))
		.pipe(gulp.dest('./'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		server: {
			baseDir: "./"
		}
	});
});
gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['css', 'browser-sync'], function () {
	gulp.watch("./assets/scss/**/*.scss", ['css']);
	gulp.watch("./*.html", ['bs-reload']);
	gulp.watch("./assets/js/*.js", ['bs-reload']);
});

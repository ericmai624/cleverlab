const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
  return gulp.src('./sass/*.sass')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['node_modules/normalize.css', 'node_modules/nprogress']
    }))
    .pipe(base64({
      baseDir: '.',
      maxImageSize: 20 * 1024 * 1024,
      debug: true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', () => {
  return gulp.watch('./sass/*.sass', ['sass']);
});

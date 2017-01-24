'use strict';

/* eslint-env node */

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const jshint = require('gulp-jshint');

const lintable = [
  '**/*.js',
  '!node_modules/**',
  '!test/**'
];

gulp.task('default', ['lint']);
gulp.task('lint', ['eslint', 'jshint', 'watch']);

gulp.task('eslint', () =>
  gulp
  .src(lintable)
  .pipe(eslint())
  .pipe(eslint.format())
  .on('error', (error) => {
    console.error(error.toString()); // eslint-disable-line no-console
    this.emit('end');
  })
);

gulp.task('jshint', () => gulp
  .src(lintable)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('watch', () => {
  gulp.watch(lintable, ['jshint', 'eslint']);
});

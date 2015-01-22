var gulp = require('gulp'),
  //watch = require('gulp-watch'),
  
  del = require('del'), 

  // synchronously run tasks
  //runSequence = require('run-sequence'),

  jasmine = require('gulp-jasmine'),
  sourcemaps = require('gulp-sourcemaps'),
  traceur = require('gulp-traceur'),
  shell = require('gulp-shell');
  

var es6Sources = 'es6/*/*.js';
//var es5Code = 'es5/test/**/*.js';

gulp.task('traceur-from-shell', function () {
  return gulp.src(es6Sources)
    .pipe(shell(['traceur --source-maps --experimental --out dist.js es6/*/*.js']))
});

/*

gulp.task('traceur', function() {
  return gulp.src(es6Sources)
    .pipe(sourcemaps.init())
    .pipe(traceur({
      blockBinding: true,
      experimental: true,
      arrayComprehension: true,
      types: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('es5'));
});

gulp.task('6to5', function () {
  return gulp.src(es6Sources)
    .pipe(sourcemaps.init())
    .pipe(to5({
      experimental: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('es5'));
});

gulp.task('jasmine', function() {
  return gulp.src(es5Code)
    .pipe(jasmine());
});

gulp.task('clean', function(cb) {
  return del(['es5'], cb);
});

gulp.task('run', function () {
  // need runSequence plugin in order to synchronously run tasks
  runSequence('clean', 'traceur', 'jasmine');
});
*/
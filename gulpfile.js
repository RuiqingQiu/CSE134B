// grab our gulp packages
var gulp  = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  minifyHtml = require('gulp-minify-html'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),

  input = {
    'javascript': 'public/src/js/*.js',
    'css': 'public/src/css/*.css',
    'html': 'public/src/html/*.html',
    'vendorJavascript': 'public/lib/*.js'
  },

  output = {
    'javascript': 'public/build/js',
    'css': 'public/build/css',
    'html': 'public/build/html'
  };

// create a default task and just log a message
gulp.task('default', ['build', 'watch']);

// minify Javascript
gulp.task('js', function() {
  return gulp.src(input.javascript)
    .pipe(uglify())
    .pipe(gulp.dest(output.javascript));
});

gulp.task('lib-js', function() {
  return gulp.src(input.vendorJavascript)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.javascript));
});

// minify CSS
gulp.task('css', function() {
  return gulp.src(input.css)
    .pipe(minifyCss())
    .pipe(gulp.dest(output.css));
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare: true
  }
  return gulp.src(input.html)
    .pipe(minifyHtml())
    .pipe(gulp.dest(output.html));
});

gulp.task('build', ['js', 'lib-js', 'css', 'html']);

gulp.task('watch', function() {
  gulp.watch(input.javascript, ['js']);
  gulp.watch(input.vendorJavascript, ['lib-js']);
  gulp.watch(input.css, ['css']);
  gulp.watch(input.html, ['html']);
});

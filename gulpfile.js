const gulp        = require('gulp');
const mocha       = require('gulp-mocha');
const browserSync = require('browser-sync');
const nodemon     = require('gulp-nodemon');

gulp.task('test', () => gulp.src('./test/*.js', { read: false })
                            .pipe(mocha()));

gulp.task('browser-sync', ['nodemon'], () => browserSync.init(null, {
  proxy: 'http://localhost:4000',
  files: ['lib/**/*.*', 'lib/routes/**/*.*', 'public/**/*.*', 'views/**/*.*'],
  port:  7000,
}));

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'index.js',
    watch:  ['lib/*.js'],
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', () =>
        setTimeout(() => browserSync.reload({ stream: false }), 500));
});

gulp.task('default', ['browser-sync']);

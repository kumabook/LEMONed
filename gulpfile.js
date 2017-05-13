const gulp        = require('gulp');
const mocha       = require('gulp-mocha');
const browserSync = require('browser-sync');
const nodemon     = require('gulp-nodemon');
const tsb         = require('gulp-tsb');

gulp.task('test', ['tsc:test'],
          () => gulp.src('./test_dist/test*.js', { read: false })
                    .pipe(mocha()));

gulp.task('browser-sync', ['nodemon', 'watch'], () => browserSync.init(null, {
  proxy: 'http://localhost:4000',
  files: ['lib/**/*.*', 'lib/routes/**/*.*', 'public/**/*.*', 'views/**/*.*'],
  port:  7000,
}));

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'lib/server.js',
    watch:  ['lib/*.js'],
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', () =>
        setTimeout(() => browserSync.reload({ stream: false }), 500));
});

const tsbSrc = tsb.create('src/tsconfig.json');
gulp.task('build', () => gulp.src('./src/**/*.ts')
                             .pipe(tsbSrc())
                             .pipe(gulp.dest('./dist')));

const tsbTest = tsb.create('test/tsconfig.json');
gulp.task('tsc:test', () => gulp.src('./test/**/*.ts')
                                .pipe(tsbTest())
                                .pipe(gulp.dest('./test_dist')));


gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('default', ['browser-sync']);

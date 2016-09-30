const gulp = require('gulp');
const pug = require('gulp-pug');

const connect = require('gulp-connect');

gulp.task('devserver', () =>
  connect.server({
    fallback: 'dist/index.html',
    livereload: true,
    root: 'dist'
  })
);

gulp.task('pug', () =>
  gulp.src('./src/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
);

const uglify = require('gulp-uglify');

gulp.task('js', () =>
  gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload())
);

const imagemin = require('gulp-imagemin');

gulp.task('img', () =>
  gulp.src('./src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
);

gulp.task('default', ['pug', 'js', 'img', 'devserver'], () => {
  // watch for HTML changes
  gulp.watch('./src/**/*.pug', () => gulp.run('pug') )

  // watch for JS changes
  gulp.watch('./src/js/**/*.js', () => gulp.run('js') )

  // Watch for image changes
  gulp.watch('./src/img/**/*.*', () => gulp.run('img') )
});

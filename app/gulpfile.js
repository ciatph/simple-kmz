const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const root = './public'
const PORT = process.env.PORT || 3000

// browsersync local static server
const server = function () {
  browserSync.init({
    server: root,
    port: PORT
  })
}

// Files to watch for changes then reload browser
const watch = function () {
  gulp.watch(`${root}/*.html`).on('change', browserSync.reload)
  gulp.watch(`${root}/*.css`).on('change', browserSync.reload)
  gulp.watch(`${root}/*.js`).on('change', browserSync.reload)
}

// Gulp tasks
gulp.task('browserSync', server)
gulp.task('watch', watch)
gulp.task('dev', gulp.series(gulp.parallel('browserSync', 'watch')))

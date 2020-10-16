const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const fontSpider = require('gulp-font-spider')

gulp.task('sass', async() => {
  const array = [
    './src/scss/style.scss'
  ]
  await gulp.src(array)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/static/css/'))
})

gulp.task('fontSpider', function () {
  return gulp.src('fonts.html')
    .pipe(fontSpider())
})

gulp.task('watch', () => {
  gulp.watch('./src/scss/*/*.*', gulp.series('sass'))
})

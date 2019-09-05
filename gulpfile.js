var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');


gulp.task('default', function () {
    gulp.watch('./FED/sass/**/*.scss', gulp.series('sass'));
    //gulp.watch('./FED/ts/**/*.ts', gulp.series('ts'));
});

gulp.task('ts', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./statics/js'));
});

gulp.task('sass', function () {
    return gulp.src('./FED/sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./statics/css'));
  });
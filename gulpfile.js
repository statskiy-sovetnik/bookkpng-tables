const gulp = require('gulp');
const gulp_sass = require('gulp-sass');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');

gulp.task('bundle-js', () => {
    return browserify({entries: "src/index.js", extensions: ['.js'], debug: true})
        .transform('babelify', {
            presets: ['@babel/preset-env', '@babel/preset-react']
        })
        .bundle()
        .pipe(source("index.js"))
        .pipe(rename('index.bundle.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task('build', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('bundle-js', 'build'));
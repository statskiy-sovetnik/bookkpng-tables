const gulp = require('gulp');
const sass = require('gulp-sass');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');

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

gulp.task('gulp-sass', () => {
    return gulp.src('src/index.sass')
        .pipe(sass())
        .pipe(prefix())
        .pipe(rename({
            suffix: '.bundle'
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('build', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task("watch", () => {
    gulp.watch(["src/pages/**/*", "src/index.js", 'src/index.html'], gulp.series('build', "gulp-sass", "bundle-js"));
});

gulp.task('default', gulp.series('bundle-js', 'gulp-sass', 'build', 'watch'));
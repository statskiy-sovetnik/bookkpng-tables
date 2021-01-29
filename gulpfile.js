const gulp = require('gulp');
const sass = require('gulp-sass');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const cssMin = require('gulp-cssnano');
const uglifyJs = require('gulp-uglify');
const terserJs = require('gulp-terser');

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
    return gulp.src(['src/index.sass', 'src/libs.sass'])
        .pipe(sass())
        .pipe(prefix())
        .pipe(rename({
            suffix: '.bundle'
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('build', () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('./'));
});

gulp.task("watch", () => {
    gulp.watch([
        "src/pages/**/*.js",
        'src/blocks/**/*.js',
        'src/store/**/*.js',
        "src/*.js",
    ],
    gulp.series('build', "bundle-js"));

    gulp.watch([
        "src/pages/**/*.sass",
        'src/blocks/**/*.sass',
        'src/store/**/*.sass',
        "src/*.sass",
    ],
        gulp.series('build', 'gulp-sass'))
});

gulp.task('min-js-bundles', () => {
    return gulp.src('dist/*.js')
        .pipe(terserJs())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('prod-build', gulp.series('bundle-js', 'gulp-sass', 'build', 'min-js-bundles'));

gulp.task('default', gulp.series('bundle-js', 'gulp-sass', 'build', 'watch'));
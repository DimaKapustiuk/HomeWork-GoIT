const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps')
const watch = require('gulp-watch');
const sequence = require('run-sequence');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');

const path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/main.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: "build"
    },
    notify:false,
    tunnel: true,
    host: 'localhost',
    port: 3000,
};


gulp.task('html', () =>
  gulp
    .src(path.src.html)
    .pipe(rigger())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream()) 
);

gulp.task('styles', () =>
  gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(path.build.css))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream())
);

gulp.task('scripts', () => 
	    gulp.src(path.src.js)
         .pipe(plumber())
         .pipe(babel())
         .pipe(concat('scripts.min.js'))
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(path.build.js))
         .pipe(browserSync.stream())   
);

gulp.task('watch', function(){
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.style, ['styles']);
    gulp.watch(path.watch.js, ['scripts']);
});


gulp.task('webServer', function() {
    browserSync.init(config);
});


gulp.task('build', callback => 
    sequence(
        'html',
        'styles',
        'scripts',

        callback,
    ),)

gulp.task('default', ['build', 'webServer', 'watch']);
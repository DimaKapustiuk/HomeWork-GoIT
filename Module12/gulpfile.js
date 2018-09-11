const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const prefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const watch = require('gulp-watch');
const sequence = require('run-sequence');

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
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
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
    .pipe(gulp.dest(path.build.html)),
);

gulp.task('scripts', () => 
	    gulp.src(path.src.js)
         .pipe(plumber())
         .pipe(rigger())
         .pipe(gulp.dest(path.build.js)) 
         .pipe(babel())
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(rename('scripts.min.js'))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(path.build.js))
         .pipe(browserSync.stream())   
);

gulp.task('watch', function(){
    gulp.watch(path.watch.js, ['scripts']);
    gulp.watch(path.watch.html, ['html']).on('change', browserSync.reload)
});


gulp.task('webServer', function() {
    browserSync.init(config);
});


gulp.task('build', callback => 
    sequence(
        'html',
        'scripts',
        callback,
    ),)

gulp.task('default', ['build', 'webServer', 'watch']);
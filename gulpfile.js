var gulp 				 = require('gulp'),
    sass 				 = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat 			 = require('gulp-concat'),
    uglify			 = require('gulp-uglifyjs'),
    cssnano			 = require('gulp-cssnano'),
    rename 			 = require('gulp-rename'),
    del					 = require('del'),
    imagemin		 = require('gulp-imagemin'),
    pngquant		 = require('imagemin-pngquant'),
    cache 			 = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng 		 = require('gulp-tinypng'),
    notify       = require("gulp-notify");

gulp.task('scss', function(){
	return gulp.src('src/sass/**/*.scss')
	.pipe(sass().on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 version', '>1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}))
})

gulp.task('scripts', function() {
return gulp.src([])
.pipe(concat('libs.min.js'))
.pipe(uglify())
.pipe(gulp.dest('src/js'))
});

gulp.task('css-libs',['scss'], function(){
 return gulp.src('src/css/libs.css')
 .pipe(cssnano())
 .pipe(rename({suffix: '.min'}))
 .pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync', function(){
browserSync({
	server: {
		baseDir: 'src'
	},
	notify: false
})
});

gulp.task('clean', function(){
	return del.sync('dist')
})

gulp.task('cleanCache', function(){
	return cache.clearAll();
})

gulp.task('img', function(){
	return gulp.src('src/img/**/*')
	.pipe(tinypng('aO1Lqg50wayTq-AKfIay6l6_6ROPXXSI'))
	.pipe(gulp.dest('dist/img'));
})


gulp.task('watch', ['browser-sync','css-libs','scripts'], function(){
	gulp.watch('src/sass/**/*.scss',['scss']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});


gulp.task('build',['clean','img', 'scss', 'scripts'], function(){
var buildCss = gulp.src([
'src/css/libs.min.css',
'src/css/main.css',
'src/css/fonts.css'
	])
.pipe(gulp.dest('dist/css'));

var buildFonts = gulp.src('src/fonts/**/*')
.pipe(gulp.dest('dist/fonts'));

var buildJs = gulp.src('src/js/**/*')
.pipe(gulp.dest('dist/js'));

var buildHtml =gulp.src("src/*.html")
.pipe(gulp.dest('dist'));
})
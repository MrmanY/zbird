const gulp = require('gulp');
const imagemin = require('gulp-imagemin');  //图片压缩
const babel = require('gulp-babel');     //6=>5
const connect = require('gulp-connect');   // 页面刷新
const concat = require("gulp-concat");   // 多个文件合并一个
const uglify = require('gulp-uglify');   // 一行
const sass = require("gulp-sass-china"); //sass

// ./   当前路径;
// **/* 无论层级无论任何内容;

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'));
});

//css的预编译器; => SASS;
 
gulp.task('connect', function() {
    connect.server({
      port: 8888,
      root:"dist",
      livereload:true
    });
    // run some headless tests with phantomjs
    // when process exits:
    // connect.serverClose();
});
 
gulp.task('babelparse', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('Imagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task("index",function(){
    return gulp.src("index.html")
           .pipe(gulp.dest("dist"))
           .pipe(connect.reload())
});

gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task("watch",()=>{
    gulp.watch("index.html",["index"])
    gulp.watch("./sass/**/*.scss",["sass","index"])
})

gulp.task("build",["scripts","index","Imagemin"])

gulp.task('default', ['connect', 'watch']);

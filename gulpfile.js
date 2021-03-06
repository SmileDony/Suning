/*第三方插件
gulp-scss
gulp-minify-css
gulp-rename
*/
/*把index.scss=>index.css=>index.min.css*/
const gulp = require("gulp");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
const htmlmin=require("gulp-htmlmin");
const { task } = require("gulp");

// gulp.task("scss", function(){
//     return gulp.src("./stylesheet/index.scss")
//     .pipe(scss())
//     .pipe(gulp.dest("dist/css"))
//     .pipe(minifyCSS())
//     .pipe(rename("index.min.css"))
//     .pipe(gulp.dest("dist/css"))
//     .pipe(connect.reload());
// })

var copyHtml = function(){
    return gulp.src("*.html")
    .pipe(
        htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true,
        })
    )
    .pipe(gulp.dest("dist/"))
    // .pipe(connect.reload())
}
// 图片放进gulp
var images=function(){
    return gulp.src("./images/*{jpg,png}")
    .pipe(gulp.dest("dist/images"))
}
// gulp.task("images",function(){
//     return gulp.src("./images/*{jpg,png}")
//     .pipe(gulp.dest("dist/images"))
// })

var desimages=function(){
    return gulp.src("./desimages/*{jpg,png}")
    .pipe(gulp.dest("dist/desimages"))
}
var loginImges=function(){
    return gulp.src("./loginImges/*{jpg,png}")
    .pipe(gulp.dest("dist/loginImges"))
}
var scripts=function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    // .pipe(connect.reload())
}
var data=function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    // .pipe(connect.reload())
}


var sass=function(){
    return gulp.src(["./stylesheet/index.scss"])
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    // .pipe(connect.reload())
}
var php=function(){
    return gulp.src("*.php")
    .pipe(gulp.dest("dist/php"))
    // .pipe(connect.reload());
}

 //监听，只要数据发生变化，自动去执行对应的任务，完成更新
 function watch(){
    gulp.watch("*.html",gulp.series([copyHtml]));
    gulp.watch("images/**/*",gulp.series([images]));
    gulp.watch("desimages/**/*",gulp.series([desimages]));
    gulp.watch("loginImges/**/*",gulp.series([loginImges]));
    gulp.watch("*.json",gulp.series([data]));
    gulp.watch("*.php",gulp.series([php]));
    gulp.watch("./stylesheet/index.scss",gulp.series([sass]));
    gulp.watch("*.js",gulp.series([scripts]));
    // gulp.watch(["./javascript1/*.js","./javascript2/*.js"],scripts);
};

//启动一个临时服务器
const connect=require("gulp-connect");
function server(){
    connect.server({
        root:"dist",
        port:5080,//除保留端口号以外 0~65535
        livereload:true,//实时更新
    })
};

//最后同时启动服务和监听，对默认任务来说，可以直接通过gulp 来启动
// gulp.task("default",["watch"]);
exports.default = gulp.parallel(watch,server)


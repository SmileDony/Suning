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

gulp.task("scss", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
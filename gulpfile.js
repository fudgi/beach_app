const gulp = require("gulp");
const postcss = require("gulp-postcss");
const nested = require("postcss-nested");
const scss = require("postcss-scss");
const autoprefixer = require("autoprefixer");
const stripInlineComments = require("postcss-strip-inline-comments");
const newer = require("gulp-newer");
const javascriptObfuscator = require("gulp-javascript-obfuscator");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

gulp.task("css", () =>
  gulp
    .src("./src/**/*.css")
    .pipe(
      postcss([nested, stripInlineComments, autoprefixer], { syntax: scss })
    )
    .pipe(gulp.dest("dest"))
);

gulp.task("js", () =>
  gulp
    .src("./src/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
        targets: {
          ie: "11",
        },
      })
    )
    // .pipe(javascriptObfuscator())
    .pipe(gulp.dest("dest"))
);

gulp.task("html", () => gulp.src("./src/*.html").pipe(gulp.dest("dest")));

gulp.task("assets", function () {
  return gulp
    .src("src/img/**", { since: gulp.lastRun("assets") })
    .pipe(newer("dest"))
    .pipe(gulp.dest("dest/img/"));
});

gulp.task("bg", function () {
  return gulp
    .src("src/bg/**", { since: gulp.lastRun("bg") })
    .pipe(newer("dest"))
    .pipe(gulp.dest("dest/bg/"));
});


gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**", { since: gulp.lastRun("fonts") })
    .pipe(newer("dest"))
    .pipe(gulp.dest("dest/fonts/"));
});

gulp.task("video", function () {
  return gulp
    .src("src/video/**", { since: gulp.lastRun("video") })
    .pipe(newer("dest"))
    .pipe(gulp.dest("dest/video/"));
});

gulp.task("build", gulp.parallel("css", "js", "html", "assets", 'fonts','bg','video'));

gulp.task("watch", () => {
  gulp.watch("src/*.css", gulp.series("css"));
  gulp.watch("src/*.js", gulp.series("js"));
  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/img", gulp.series("assets"));
  gulp.watch("src/fonts", gulp.series("fonts"));
  gulp.watch("src/video", gulp.series("video"));
  gulp.watch("src/bg", gulp.series("bg"));
});

gulp.task("serve", () => {
  browserSync.init({
    server: "dest",
  });
  browserSync.watch("dest/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));

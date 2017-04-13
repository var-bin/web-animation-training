// gulpfile.babel.js

"use strict";

// node.js modules
import fs from "fs";
import path from "path";

import gulp from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import gulpStylelint from "gulp-stylelint";
import rename from "gulp-rename";

gulp.task("styles", () => {
  return gulp.src("progressIndicator/styles/*.css")
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: "string",
          console: true
        }
      ]
    }))
    .pipe(postcss())
    .pipe(gulp.dest("progressIndicator/dest"));
});

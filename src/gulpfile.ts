import {dest, src, } from "gulp";
import ts = require("gulp-typescript");

function build() {
  return src(["**/*.js"])
  .pipe(src("**/*.json"))
  .pipe(dest("../dist/"));
  }

exports.build = build;

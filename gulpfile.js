"use strict"

var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var reactify = require("reactify");
var exorcist = require("exorcist");
var fs = require("fs");
var path = require("path");

//gulp主动设置的命令
gulp.task("admin_module_list", function () {
    // 通过 Browserify管理依赖
    browserify({
        // 入口点,app.jsx
        entries: ["public/static/scripts/src/pages/admin.module.list.jsx"],
        // 利用Reactify工具将jsx转换为js
        transform: [reactify],
        debug: true
    })
    //转换为gulp能识别的流
        .bundle()
        //输出的目标文件
        //.pipe(source("admin.modules.js"))
        //输出Map文件
        .pipe(exorcist(path.join(__dirname, "/public/static/scripts/build/pages/admin.module.list.js.map")))
        //输出的目录
        //.pipe(gulp.dest("public/static/scripts/build/pages/"))
        .pipe(fs.createWriteStream(path.join(__dirname, "/public/static/scripts/build/pages/admin.module.list.js")), "utf-8");
});

gulp.task("admin_module_addedit", function () {
    // 通过 Browserify管理依赖
    browserify({
        // 入口点,app.jsx
        entries: ["public/static/scripts/src/pages/admin.module.addedit.jsx"],
        // 利用Reactify工具将jsx转换为js
        transform: [reactify],
        debug: true
    })
    //转换为gulp能识别的流
        .bundle()
        //输出的目标文件
        //.pipe(source("admin.modules.js"))
        //输出Map文件
        .pipe(exorcist(path.join(__dirname, "/public/static/scripts/build/pages/admin.module.addedit.js.map")))
        //输出的目录
        //.pipe(gulp.dest("public/static/scripts/build/pages/"))
        .pipe(fs.createWriteStream(path.join(__dirname, "/public/static/scripts/build/pages/admin.module.addedit.js")), "utf-8");
});


//gulp默认命令
gulp.task("default", ["admin_module_list","admin_module_addedit"]);










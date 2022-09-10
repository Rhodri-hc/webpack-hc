#!/usr/bin/env node
const parse = require("./parseArgs");
const auth = require("./auth");
const getFileType = require("./getFileType");
const getFileTime = require("./getFileTime");
const fs = require("fs");

// 解析命令
const { isAll, isList, args } = parse();
// 获取当前文件夹
const dir = process.cwd();
let files = fs.readdirSync(dir);
let output = ""


if(!isAll){
    files = files.filter(file => file.indexOf('.') !== 0); 
}

if (!isList) {
    output = files.join('\t');
} else {
    /**
     * Unix (Linux、MacOs) 文件权限体系
     * 
     */
    const outputFiles =  files.map(file => {
        const stat = fs.statSync(file);
        const mode = stat.mode

        const typeAuthString = `${getFileType(mode)}${auth(mode)}     ${getFileTime(stat)}     ${file}`

        return typeAuthString;
    })

    output = outputFiles.join('\n');
}

console.log(output);
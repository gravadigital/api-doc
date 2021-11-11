'use strict';
const fs = require('fs');
let files;

function runPaths(absolutePath) {
    fs.readdirSync(absolutePath).forEach(file => {
        let location = absolutePath + '/' + file
        let stats = fs.statSync(location);
        if(stats.isDirectory()) {
            runPaths(location)
        } else {
            files.push(location);
        }
    });
}

function checkPath(absolutePath) {
    files = [];
    runPaths(absolutePath);
    return files;
}

module.exports = checkPath;
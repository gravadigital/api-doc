'use strict';
const fs = require('fs');

function runPaths(absolutePath, files) {
    fs.readdirSync(absolutePath).forEach(file => {
        let location = absolutePath + '/' + file
        let stats = fs.statSync(location);
        if(stats.isDirectory()) {
            runPaths(location, files)
        } else {
            files.push(location);
        }
    });
}

function checkPath(absolutePath) {
    let files = [];
    runPaths(absolutePath, files);
    return files;
}

module.exports = checkPath;
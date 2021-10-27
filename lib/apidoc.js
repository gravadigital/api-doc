'use strict';
const {processFile} = require('./files-definition-exporter');

function process({filesPath}) {
  return processFile(filesPath);
}

module.exports = process;

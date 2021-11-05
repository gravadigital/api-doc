'use strict';
const {analizeContent} = require('./definition-analizer');

function process({filesPath}) {
  return analizeContent(filesPath);
}

module.exports = process;

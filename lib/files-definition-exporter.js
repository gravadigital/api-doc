'use strict';
const fs = require('fs');
const {analizeContent} = require('./definition-analizer');

function processFile(path) {
  const content = fs.readFileSync(
    path,
    {
      encoding: 'utf8',
      flag: 'r'
    }
  );
  return analizeContent(content);
}

module.exports = {
  processFile
};

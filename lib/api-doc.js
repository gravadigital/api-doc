'use strict';
const path = require('path');
const analizeContent = require('./definition-analizer');
const generateDocumentation = require('./generate-documentation');
const checkPath = require('./check-path');

function process({filesPath, destintation}) {
  const absolutePath = path.resolve(filesPath);
  const files = checkPath(absolutePath);
  const declarations = [];
  files.forEach((filePath) => {
    const fileDeclarations = analizeContent(filePath);
    declarations.push(...fileDeclarations);
  });
  return generateDocumentation({
    declarations,
    destintation
  });
}

module.exports = process;

'use strict';
const analizeContent = require('./definition-analizer');
const generateDocumentation = require('./generate-documentation');

function fakeGetFiles(path) {
    return [path];
}

function process({filesPath, destintation}) {
  const files = fakeGetFiles(filesPath);
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

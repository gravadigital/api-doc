'use strict';
const fs = require('fs');

function generateDeclarationDoc(declaration) {
  let result = `### ${declaration.route.method} ${declaration.route.path} - ${declaration.name}\n`;
  result += `${declaration.description}\n`;
  result += '\n';
  if (declaration.queryparams || declaration.bodyparams) {
    result += '##### Parameters\n';
    result += '\n';
    result += '| Name | Location | Data type | Required | Description |\n';
    result += '| ---- | -------- | --------- | -------- | ----------- |\n';
    if (declaration.queryparams) {
      declaration.queryparams.forEach((elem) => {
        result += `| ${elem.name} | query | ${elem.type} | ${elem.required ? 'True' : 'False' } | ${elem.description} |\n`;
      });
    }
    if (declaration.bodyparams) {
      declaration.bodyparams.forEach((elem) => {
        result += `| ${elem.name} | body | ${elem.type} | ${elem.required ? 'True' : 'False' } | ${elem.description} |\n`;
      });
    }
  }
  result += '\n';
  if (declaration.responses) {
    result += '##### Responses\n';
    result += '\n';
    declaration.responses.forEach((elem) => {
      result += `###### ${elem.name}\n`;
      result += `Status: ${elem.status}\n`;
      result += '\n';
      if (elem.bodyparams) {
        result += 'Body:\n';
        result += '\n';
        result += '| Name | Data type | Description |\n';
        result += '| ---- | --------- | ----------- |\n';
        elem.bodyparams.forEach((elemParam) => {
          result += `| ${elemParam.name} | ${elemParam.type} | ${elemParam.description} |\n`;
        });
        result += '\n';
      }
    });
  }
  return result;
};

function saveOutput(path, content) {
  try {
    fs.writeFileSync(path, content)
  } catch (error) {
    console.error(`ERROR: Saving oputput file error - ${error.message}`);
  }
}

function generateDocumentation({declarations, destintation}) {
    let result = '';
    result += '# Documentation example\n\n';
    result += '## Routes\n\n';
    declarations
      .map((elem) => generateDeclarationDoc(elem))
      .forEach((elem) => {
        result += `${elem}\n\n`;
      });
    return saveOutput(destintation, result);
}

module.exports = generateDocumentation;

'use strict';
const fs = require('fs');

function generateDeclarationDoc(declaration) {
  let result = `## ${declaration.route.method} ${declaration.route.path} - ${declaration.name} {#${declaration.route.method}-${declaration.route.path}-title}\n`;
  result += `${declaration.description}\n`;
  result += '\n';
  if (declaration.queryparams || declaration.bodyparams || declaration.urlparams) {
    result += `### Parameters {#${declaration.route.method}-${declaration.route.path}-parameters}\n`;
    result += '\n';
    result += '| Name | Location | Data type | Required | Description |\n';
    result += '| ---- | -------- | --------- | -------- | ----------- |\n';
    if (declaration.headerparams) {
      declaration.headerparams.forEach((elem) => {
        result += `| ${elem.name} | header | ${elem.type} | ${elem.required ? 'True' : 'False' } | ${elem.description} |\n`;
      });
    }
    if (declaration.urlparams) {
      declaration.urlparams.forEach((elem) => {
        result += `| ${elem.name} | url | ${elem.type} | ${elem.required ? 'True' : 'False' } | ${elem.description} |\n`;
      });
    }
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
    result += `### Responses {#${declaration.route.method}-${declaration.route.path}-responses}\n`;
    result += '\n';
    declaration.responses.forEach((elem) => {
      result += `##### [${elem.status}] ${elem.name}\n`;
      result += '\n';
      if (elem.bodyparams) {
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
}

function saveOutput(path, content) {
  try {
    fs.writeFileSync(path, content)
  } catch (error) {
    console.error(`ERROR: Saving oputput file error - ${error.message}`);
    process.exit(1);
  }
}

function generateDocumentation({declarations, destintation}) {
    let result = '';
    declarations
      .map((elem) => generateDeclarationDoc(elem))
      .forEach((elem) => {
        result += `${elem}\n\n`;
      });
    if (destintation) {
      return saveOutput(destintation, result);
    }
    console.log(result);
}

module.exports = generateDocumentation;

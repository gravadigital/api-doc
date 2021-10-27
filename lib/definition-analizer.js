'use strict';
const fs = require('fs');
const declarationRegex = /\/\*((?!\*\/).)*\*\//sg;

function exportQueryParamsTag(declaration) {
  const lines = extractDefaultTag(declaration, 'queryparam', true);
  if (!lines) {
    return null;
  }
  const results = [];
  lines.map((line) => {
    const tagRegex = /(\(optional\) )?\{(.*)\} \[(.*)\] (.*)/g;
    return tagRegex.exec(line);
  }).forEach((match) => {
    if (match) {
      results.push({
        type: match[2],
        name: match[3],
        description: match[4],
        required: !match[1]
      });
    }
  });
  if (results.length === 0) {
    return null;
  }
  return results;
}

function exportBodyParamsTag(declaration) {
  const lines = extractDefaultTag(declaration, 'bodyparam', true);
  if (!lines) {
    return null;
  }
  const results = [];
  lines.map((line) => {
    const tagRegex = /(\(optional\) )?\{(.*)\} \[(.*)\] (.*)/g;
    return tagRegex.exec(line);
  }).forEach((match) => {
    if (match) {
      results.push({
        type: match[2],
        name: match[3],
        description: match[4],
        required: !match[1]
      });
    }
  });
  if (results.length === 0) {
    return null;
  }
  return results;
}

function extractDefaultTag(declaration, tagName, multiple) {
  const tagRegex = new RegExp(`\@${tagName}(.*)`, 'g');
  const tag = `@${tagName}`;
  const tagLength = tag.length;

  let values = declaration.match(tagRegex);
  if (!values) {
    return null;
  }
  values = values.map((value) => {
    return value.slice(value.indexOf(tag) + tagLength).trim();
  });
  if (multiple) {
    return values;
  }
  return values[0];
}

function decodeDeclaration(declaration) {
  const data = {};
  data.name = extractDefaultTag(declaration, 'name', false);
  data.description = extractDefaultTag(declaration, 'description', false);
  data.route = extractDefaultTag(declaration, 'route', false);
  data.bodyparams = exportBodyParamsTag(declaration);
  data.queryparams = exportQueryParamsTag(declaration);
  return data;
}

function analizeContent(content) {
  const declarations = content.match(declarationRegex);
  return declarations.map(decodeDeclaration);
}

module.exports = {
  analizeContent
};

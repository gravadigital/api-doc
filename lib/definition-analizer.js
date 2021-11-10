'use strict';
const fs = require('fs');
const declarationRegex = /\/\*((?!\*\/).)*\*\//sg;

function exportParamTags(declaration, tagname) {
  const lines = extractDefaultTag(declaration, tagname, true);
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

function extractRouteTag(declaration) {
  const line = extractDefaultTag(declaration, 'route', false);
  if (!line) {
    return null;
  }
  const tagRegex = /\{(.*)\} (.*)/g;
  const match = tagRegex.exec(line);
  if (!match) {
    return null;
  }
  return {
    method: match[1],
    path: match[2]
  };
}

function extractResponseTag(declaration) {
  const header = extractDefaultTag(declaration, 'response', false);

  const headerRegex = /\{(.*)\} (.*)/g;
  const match = headerRegex.exec(header);
  if (!match) {
    return null;
  }
  const data = {
    status: match[1],
    name: match[2],
    bodyparams: []
  };
  const bodyLines = extractDefaultTag(declaration, 'responsebody', true);
  const results = [];
  bodyLines.map((line) => {
    const tagRegex = /\{(.*)\} \[(.*)\] (.*)/g;
    return tagRegex.exec(line);
  }).forEach((match) => {
    if (match) {
      data.bodyparams.push({
        type: match[1],
        name: match[2],
        description: match[3]
      });
    }
  });
  return data;
}

function extractResponseTags(declaration) {
  const allResponseRegex = /@response((?!@response ).)*/sg;

  const responseDeclarations = declaration.match(allResponseRegex);
  if (!responseDeclarations) {
    return null;
  }
  const results = [];
  responseDeclarations.map((responseDeclaration) => {
    return extractResponseTag(responseDeclaration);
  }).forEach((elem) => {
    if (elem) {
      results.push(elem);
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
  data.route = extractRouteTag(declaration, 'route', false);
  data.bodyparams = exportParamTags(declaration, 'bodyparam');
  data.queryparams = exportParamTags(declaration, 'queryparam');
  data.responses = extractResponseTags(declaration);
  return data;
}

function validDeclaration(declaration) {
    return declaration.name && declaration.name !== '' &&
           declaration.route &&
           declaration.route.method && declaration.route.method !== '' &&
           declaration.route.path && declaration.route.path !== '';
}

function analizeContent(path) {
  const content = fs.readFileSync(
    path,
    {
      encoding: 'utf8',
      flag: 'r'
    }
  );
  const declarations = content.match(declarationRegex);
  if (!declarations) {
    return [];
  }
  return declarations
    .map(decodeDeclaration)
    .filter((declaration) => {
      return validDeclaration(declaration);
    });
}

module.exports = analizeContent;

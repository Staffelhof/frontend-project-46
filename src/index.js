import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import jsYaml from 'js-yaml';

const diff = {};

function filenameWithDirectory(filename) {
  const separator = path.sep;
  return filename.includes(separator);
}

function readFile(file) {
  const pathToFile = filenameWithDirectory(file) ? file : path.resolve(process.cwd(), file);
  return fs.readFileSync(pathToFile, 'utf8');
}

function findDiffToJson(json1, json2) {
  const firstKeys = _.sortBy(Object.keys(json1));
  const secondKeys = _.sortBy(Object.keys(json2));
  const keys = _.union(firstKeys, secondKeys);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!Object.prototype.hasOwnProperty.call(json2, key) || json2[key] !== json1[key]) {
      diff[`- ${key}`] = json1[key];
    }
    if (!Object.prototype.hasOwnProperty.call(json1, key) || json1[key] !== json2[key]) {
      diff[`+ ${key}`] = json2[key];
    }
    if (json1[key] === json2[key]) {
      diff[`  ${key}`] = json1[key];
    }
  }
}

const getParser = (extName) => {
  let parser;
  if (extName === '.json') {
    parser = JSON.parse;
  }
  if (extName === '.yaml' || extName === '.yml') {
    parser = jsYaml.load;
  }
  return parser;
};

const readFiles = (file1, file2, options) => {
  const f1 = readFile(file1);
  const f2 = readFile(file2);
  const parser1 = getParser(path.extname(file1));
  const parser2 = getParser(path.extname(file2));
  const parsed1 = parser1(f1);
  const parsed2 = parser2(f2);

  if (options.format === 'json' || options === 'json') {
    findDiffToJson(parsed1, parsed2);
  }
};

const genDiff = (filepath1, filepath2, f = 'json') => {
  readFiles(filepath1, filepath2, f);
  return JSON.stringify(diff, null, 2).replaceAll('"', '');
};

export default genDiff;

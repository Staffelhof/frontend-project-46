import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';

const diff = {};

function isFilenameWithDirectory(filename) {
  const separator = path.sep;
  return filename.includes(separator);
}

function readFile(file) {
  const pathToFile = isFilenameWithDirectory(file) ? file : path.resolve(process.cwd(), file);
  return fs.readFileSync(pathToFile, 'utf8');
}

function findDiffToJson(json1, json2) {
  const strings1 = _.sortBy(Object.keys(json1));
  for (let i = 0; i < strings1.length; i += 1) {
    const key = strings1[i];
    if (!Object.prototype.hasOwnProperty.call(json2, key) || json2[key] !== json1[key]) {
      diff[`- ${key}`] = json1[key];
    } else {
      diff[`  ${key}`] = json1[key];
    }
  }
  const strings = _.sortBy(Object.keys(json2));
  for (let i = 0; i < strings.length; i += 1) {
    const key = strings[i];
    if (!Object.prototype.hasOwnProperty.call(json1, key) || json1[key] !== json2[key]) {
      diff[`+ ${key}`] = json2[key];
    } else {
      diff[`  ${key}`] = json2[key];
    }
  }
}

const readFiles = (file1, file2, options) => {
  const f1 = readFile(file1);
  const f2 = readFile(file2);

  const parsed1 = path.extname(file1) === '.json' ? JSON.parse(f1) : undefined;
  const parsed2 = path.extname(file2) === '.json' ? JSON.parse(f2) : undefined;

  if (options.format === 'json' || options === 'json') {
    findDiffToJson(parsed1, parsed2);
  }
};

const genDiff = (filepath1, filepath2, f = 'json') => {
  readFiles(filepath1, filepath2, f);
  return JSON.stringify(diff, null, 2).replaceAll('"', '');
};

export default genDiff;

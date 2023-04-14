import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';
import jsYaml from 'js-yaml';
import formatDiff from './formatters/index.js';

function filenameWithDirectory(filename) {
  const separator = path.sep;
  return filename.includes(separator);
}

function readFile(file) {
  const pathToFile = filenameWithDirectory(file) ? file : path.resolve(process.cwd(), file);
  return fs.readFileSync(pathToFile, 'utf8');
}

const findDiff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sorted = _.sortBy(keys);
  return sorted.reduce((acc, key) => {
    const [value1, value2] = [file1[key], file2[key]];
    const result = {};
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      _.extend(result, findDiff(value1, value2))
    } else if (!_.has(file1, key)) {
     _.extend(result, { value: value2, status: 'added' })
    } else if (!_.has(file2, key)) {
     _.extend(result, { value: value1, status: 'deleted' })
    } else if (!_.isEqual(value1, value2)) {
      _.extend(result, { value: value1, value2, status: 'changed' })
    } else {
      _.extend(result,{ value: value1, status: 'equal' })
    }
    return { ...acc, [key]: result };
  }, {});
};
// if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
//   return { ...acc, [key]: findDiff(value1, value2) };
// }
// console.log(value2)
// if (!_.has(file1, key)) {
//   return { ...acc, [key]: { value: value2, status: 'added' } };
// }
// if (!_.has(file2, key)) {
//   return { ...acc, [key]: { value: value1, status: 'deleted' } };
// }
// if (!_.isEqual(value1, value2)) {
//   return { ...acc, [key]: { value: value1, value2, status: 'changed' } };
// }
// return { ...acc, [key]: { value: value1, status: 'equal' } };
const getParser = (extName) => {
  if (extName === '.json') {
    return JSON.parse;
  }
  if (extName === '.yaml' || extName === '.yml') {
    return jsYaml.load;
  }
  return null;
};

const getDiff = (file1, file2) => {
  const f1 = readFile(file1);
  const f2 = readFile(file2);
  const parser1 = getParser(path.extname(file1));
  const parser2 = getParser(path.extname(file2));
  const parsed1 = parser1(f1);
  const parsed2 = parser2(f2);

  return findDiff(parsed1, parsed2);
};

const genDiff = (filepath1, filepath2, f = 'stylish') => {
  const diff = getDiff(filepath1, filepath2);
  console.log(diff)
  return formatDiff(diff, f);
};

export default genDiff;

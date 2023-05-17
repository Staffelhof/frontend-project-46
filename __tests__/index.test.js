import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import { jsonResult, plainResult, stylishNestedResult } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const extensions = ['json', 'yaml'];
let stylishExpected;
let plainExpected;
let jsonExpected;

beforeAll(() => {
  stylishExpected = stylishNestedResult;
  plainExpected = plainResult;
  jsonExpected = jsonResult;
});
test.each(extensions)('[%# TEST] %s format test for nested fixtures', (ext) => {
  const fixturePath = getFixturePath(`nested1.${ext}`);
  const fixturePath1 = getFixturePath(`nested2.${ext}`);
  expect(genDiff(fixturePath, fixturePath1, 'stylish')).toEqual(stylishExpected);
  expect(genDiff(fixturePath, fixturePath1, 'plain')).toEqual(plainExpected);
  expect(genDiff(fixturePath, fixturePath1, 'json')).toEqual(jsonExpected);
});

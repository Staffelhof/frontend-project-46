import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { plainResult, stylishNestedResult } from '../__fixtures__/testResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('Is string equals', () => {
  expect(genDiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'))).toEqual(stylishNestedResult);
});
test('Is Plain text equals', () => {
  expect(genDiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'), 'plain')).toEqual(plainResult);
});

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { stylishNestedResult } from '../__fixtures__/testResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('Is string equals', () => {
  expect(genDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'))).toEqual(stylishNestedResult);
});

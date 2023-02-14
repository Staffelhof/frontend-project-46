import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { jsonPlainResult } from '../__fixtures__/testResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('Is string equals', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(jsonPlainResult);
});

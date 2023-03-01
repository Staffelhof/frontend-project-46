import genDiff from '../src/index.js';
import { formatsAndResults, getFixturePath } from '../__utils__/helper.js';

const firstFile = getFixturePath('nested1.json');
const secondFile = getFixturePath('nested2.json');

test.each(formatsAndResults)('$format test', ({ format, result }) => {
  expect(genDiff(firstFile, secondFile, format)).toEqual(result);
});

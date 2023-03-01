import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { jsonResult, plainResult, stylishNestedResult } from './results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

export const formatsAndResults = [
  { format: 'stylish', result: stylishNestedResult },
  { format: 'plain', result: plainResult },
  { format: 'json', result: jsonResult },
];

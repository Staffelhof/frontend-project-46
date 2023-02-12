import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);


test('Is string equals', () => {
  expect(genDiff(getFixturePath("file1.json"), getFixturePath("file2.json"))).toEqual("{\n" +
    "  - follow: false,\n" +
    "    host: hexlet.io,\n" +
    "  - proxy: 123.234.53.22,\n" +
    "  - timeout: 50,\n" +
    "  + timeout: 20,\n" +
    "  + verbose: true\n" +
    "}")
});

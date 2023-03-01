import makeStylishDiff from './stylishFormatter.js';
import makePlainDiff from './plainFormatter.js';
import makeJsonDiff from './jsonFormatter.js';

const formatDiff = (diff, options) => {
  let format = null;
  if (options.format === 'stylish' || options === 'stylish') {
    format = makeStylishDiff(diff);
  }
  if (options.format === 'plain' || options === 'plain') {
    format = makePlainDiff(diff);
  }
  if (options.format === 'json' || options === 'json') {
    format = makeJsonDiff(diff);
  }
  return format;
};

export default formatDiff;

import makeStylishDiff from './stylishFormatter.js';
import makePlainDiff from './plainFormatter.js';

const formatDiff = (diff, options) => {
  if (options.format === 'stylish' || options === 'stylish') {
    return makeStylishDiff(diff);
  }
  if (options.format === 'plain' || options === 'plain') {
    return makePlainDiff(diff);
  }
  return null;
};

export default formatDiff;

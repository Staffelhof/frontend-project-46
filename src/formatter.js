import makeStylishDiff from "./formatters/stylishFormatter.js";


const formatDiff = (diff, options) => {
  if (options.format === 'stylish' || options === 'stylish') {
    return makeStylishDiff(diff);
  }
}

export default formatDiff;

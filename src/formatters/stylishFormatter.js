import _ from 'lodash';

const makeStylishDiff = (diff) => {
  const diffSymbol = {
    added: '  + ',
    deleted: '  - ',
    equal: '    ',
  };

  const iter = (nest, depth) => {
    if (!_.isPlainObject(nest)) {
      return `${nest}`;
    }

    const endBracketPadding = '    '.repeat(depth);
    const padding = `${'    '.repeat(depth + 1)}`;
    const sorted = _.sortBy(Object.entries(nest));

    const lines = sorted.reduce((acc, [key, value]) => {
      const lineMaker = (k = key, v = value, p = padding) => `${p}${k}: ${iter(v, depth + 1)}`;
      const status = (value || { }).status;

      if (status === 'changed') {
        const newPadding = `${'    '.repeat(depth)}${diffSymbol.deleted}`;
        const newPadding2 = `${'    '.repeat(depth)}${diffSymbol.added}`;
        return [...acc, lineMaker(key, nest[key].value, newPadding),
          lineMaker(key, nest[key].value2, newPadding2)];
      }

      if (status) {
        const newPadding = `${'    '.repeat(depth)}${diffSymbol[status]}`;
        return [...acc, lineMaker(key, nest[key].value, newPadding)];
      }

      return [...acc, lineMaker()];
    }, []);
    return ['{', ...lines, `${endBracketPadding}}`].join('\n');
  };

  return iter(diff, 0, []);
};

export default makeStylishDiff;

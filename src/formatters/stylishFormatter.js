import _ from 'lodash';

const spaces = '    ';

const diffSymbol = {
  added: '  + ',
  deleted: '  - ',
  equal: '    ',
};

const iter = (nest, depth) => {
  if (!_.isPlainObject(nest)) {
    return `${nest}`;
  }

  const endBracketPadding = spaces.repeat(depth);
  const padding = `${spaces.repeat(depth + 1)}`;
  const sorted = _.sortBy(Object.entries(nest));

  const lines = sorted.reduce((acc, [key, value]) => {
    const lineMaker = (k = key, v = value, p = padding) => `${p}${k}: ${iter(v, depth + 1)}`;
    const { status } = value || { };

    if (status === 'changed') {
      const newPadding = `${spaces.repeat(depth)}${diffSymbol.deleted}`;
      const newPadding2 = `${spaces.repeat(depth)}${diffSymbol.added}`;
      return [...acc, lineMaker(key, nest[key].value, newPadding),
        lineMaker(key, nest[key].value2, newPadding2)];
    }
    if (status) {
      const newPadding = `${spaces.repeat(depth)}${diffSymbol[status]}`;
      return [...acc, lineMaker(key, nest[key].value, newPadding)];
    }
    return [...acc, lineMaker()];
  }, []);
  return ['{', ...lines, `${endBracketPadding}}`].join('\n');
};

const makeStylishDiff = (diff) => iter(diff, 0, []);

export default makeStylishDiff;

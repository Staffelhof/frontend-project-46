import _ from 'lodash';

const convertToString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlainDiff = (diff) => {
  const iter = (nest, path = []) => {
    const sorted = _.sortBy(Object.entries(nest));
    const lines = sorted.reduce((acc, [key, value]) => {
      const currentPath = [...path, key];
      const { status } = value || { };

      if (status) {
        const returnValue = convertToString(value.value);
        const returnValue2 = convertToString(value.value2);
        const possibleStatus = {
          added: `was added with value: ${returnValue}`,
          deleted: 'was removed',
          changed: `was updated. From ${returnValue} to ${returnValue2}`,
        };

        if (status === 'equal') {
          return [...acc];
        }
        return [...acc, `Property '${currentPath.join('.')}' ${possibleStatus[status]}`];
      }

      return [...acc, iter(value, currentPath)];
    }, []);

    return lines.join('\n');
  };

  return iter(diff);
};

export default makePlainDiff;

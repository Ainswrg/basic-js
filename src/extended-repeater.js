const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let newArr = [];
  let result;

  if (options.repeatTimes) {
    for (let i = 0; i < options.repeatTimes; i++) {
      newArr.push(str);
    }
  } else {
    newArr.push(str);
  }
  if (String(options.addition) !== 'undefined') {
    if (options.additionSeparator) {
      newArr = newArr.map(
        (e) =>
          `${e}${(options.addition + options.additionSeparator).repeat(
            options.additionRepeatTimes - 1
          )}${options.addition}`
      );
    } else {
      newArr = newArr.map(
        (e) =>
          `${e}${(options.addition + '|').repeat(
            options.additionRepeatTimes - 1
          )}${options.addition}`
      );
    }
  }

  if (options.separator) {
    result = newArr.join(options.separator);
  } else {
    result = newArr.join('+');
  }

  return result;
}

module.exports = {
  repeater,
};

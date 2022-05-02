const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const arr = String(n).split('');
  const res = [];
  let digit = 0;
  for (let i = 0; i < arr.length; i++) {
    digit = arr.filter((e, k) => k !== i);
    res.push(digit.join(''));
  }
  const maxDigit = Math.max(...res);
  return maxDigit;
}

module.exports = {
  deleteDigit,
};

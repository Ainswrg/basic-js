const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  res: new Array(),
  getLength() {
    return this.res.length;
  },
  addLink(value) {
    if (typeof value !== 'string') {
      const regEx = /{([\s\S]+?)}/g;
      value = String(value).replace(regEx, '{ }');
    }
    this.res.push(String(value));
    return this;
  },
  removeLink(position) {
    if (
      !position ||
      position < 0 ||
      typeof position !== 'number' ||
      position > this.res.length
    ) {
      this.res = [];
      throw new Error("You can't remove incorrect link!");
    }
    this.res = [
      ...this.res.slice(0, position - 1),
      ...this.res.slice(position),
    ];
    return this;
  },
  reverseChain() {
    this.res = this.res.reverse();
    return this;
  },
  finishChain() {
    let result = this.res.map((e) => `( ${e} )`).join('~~');
    this.res = [];
    return result;
  },
};

module.exports = {
  chainMaker,
};

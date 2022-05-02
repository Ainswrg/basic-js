const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(type) {
    this.lang = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.moduleN = this.lang.length;
    this.type = type;
  }

  encrypt(text, key) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }
    let fullKey = key;
    //fill empty key space
    for (; fullKey.length < text.length; ) {
      fullKey = fullKey.repeat(2);
    }
    //uppercase and split in array
    fullKey = fullKey.toUpperCase().split('');
    let textArr = text.toUpperCase().split('');
    // add space like in origin text
    textArr.forEach((e, i) => {
      e == ' ' ? fullKey.splice(i, 0, ' ') : null;
    });
    //slice fullKey length
    fullKey = fullKey.slice(0, textArr.length);
    //create arr with index letter
    const keyCodeIndex = fullKey.map((e, i) => this.lang.indexOf(e));
    const originCodeIndex = textArr.map((e, i) => this.lang.indexOf(e));
    //create arr with encrypted index letter
    const encryptArrIndex = originCodeIndex.map((e, i) => {
      let sum = '';
      if (e === -1) {
        sum = e;
      } else {
        sum = e + keyCodeIndex[i];
        if (sum >= this.moduleN) {
          sum = sum - this.moduleN;
        }
      }
      return sum;
    });
    // create arr with encrypted letter
    let encryptArr = [];
    for (let i = 0; i < encryptArrIndex.length; i++) {
      const letter = this.lang[encryptArrIndex[i]];
      if (letter == undefined) {
        encryptArr.push(text.split('')[i]);
      } else {
        encryptArr.push(letter);
      }
    }
    //encrypt type: direct or reverse
    let resultMessage =
      this.type === false
        ? encryptArr.reverse().join('')
        : encryptArr.join('');
    return resultMessage;
  }
  decrypt(text, key) {
    if (!text || !key) {
      throw new Error('Incorrect arguments!');
    }
    let fullKey = key;
    //fill empty key space
    for (; fullKey.length < text.length; ) {
      fullKey = fullKey.repeat(2);
    }
    //uppercase and split in array
    fullKey = fullKey.toUpperCase().split('');
    let textArr = text.toUpperCase().split('');
    // add space like in origin text
    textArr.forEach((e, i) => {
      e == ' ' ? fullKey.splice(i, 0, ' ') : null;
    });
    //slice fullKey length
    fullKey = fullKey.slice(0, textArr.length);
    //create arr with index letter
    const keyCodeIndex = fullKey.map((e, i) => this.lang.indexOf(e));
    const originCodeIndex = textArr.map((e, i) => this.lang.indexOf(e));
    //create arr with enscrypted index letter
    const encryptArrIndex = originCodeIndex.map((e, i) => {
      let sum = '';
      if (e === -1) {
        sum = e;
      } else {
        sum = e - keyCodeIndex[i];
        if (e < keyCodeIndex[i]) {
          sum = e + this.moduleN - keyCodeIndex[i];
        }
      }
      return sum;
    });
    // create arr with enscrypted letter
    let encryptArr = [];
    for (let i = 0; i < encryptArrIndex.length; i++) {
      const letter = this.lang[encryptArrIndex[i]];
      if (letter == undefined) {
        encryptArr.push(text.split('')[i]);
      } else {
        encryptArr.push(letter);
      }
    }
    //encrypt type: direct or reverse
    let resultMessage =
      this.type === false
        ? encryptArr.reverse().join('')
        : encryptArr.join('');
    return resultMessage;
  }
}

module.exports = {
  VigenereCipheringMachine,
};

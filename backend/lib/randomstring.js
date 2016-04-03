'use strict';

// Imports
const getRandomInt = require('./utils').getRandomInt;


class Randomstring {
  constructor(options) {
    this.charset = options.charset.split('');
    this.genlength = options.length || 5;
    this.characters = [];
    this.shifted = 0;

    this.generate();
  }

  /**
   * Fills the Randomstring-Object with the specified charset and length
   */
  generate() {
    for (let i = 0; i < this.genlength; i++) {
      this.characters[i] = getRandomInt(0, this.charset.length - 1);
    }
  }

  /**
   * Shift character-positions, beginning from last character to first.
   * It should work like a clock: aaa => aab => aac => aba => abc => aca => acb
   */
  shift() {
    this.shifted++;

    // Loop through the positions of the generated characters
    let position = this.characters.length - 1;
    for (let i = 0; i < this.characters.length; i++) {
      // If current position should be shifted

      if (i === 0 || this.shifted % Math.pow(this.charset.length, i) === 0) {
        this.shiftAt(position);
      }
      position--;
    }
  }

  /**
   * Shift a character by its given position
   * @param  {int} pos Position to shift
   */
  shiftAt(pos) {
    if (this.characters[pos] === this.charset.length - 1) {
      this.characters[pos] = 0;
    } else {
      this.characters[pos]++;
    }
  }

  /**
   * Convert Randomstring to String
   * @return {str}
   */
  toString() {
    let str = '';
    this.characters.forEach(char => {
      str += this.charset[char];
    });
    return str;
  }
}

module.exports = Randomstring;

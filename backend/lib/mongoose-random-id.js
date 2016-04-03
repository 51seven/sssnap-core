'use strict';

// Adds an auto-generated, unique and random ID to your schema.
// Note: You have to add the id-field in the schema by yourself.
// Usage:
// ```
// const randomId = require('./mongoose-random-id');
//
// const yourSchema = new mongoose.Schema({});
//
// yourSchema.plugin(randomId, { padding: Number, min: Number, max: Number })
// ```
//
// You have to add the id-field in your schema, because I like having an
// overview about all my fields in my schema


// Imports
const getRandomInt = require('./utils').getRandomInt;


module.exports = exports = function randomIdPlugin(schema, options) {
  const defaults = {
    padding: 1000000000000,
    max: 999999999999,
    min: 111111111111
  };
  const opts = Object.assign({}, defaults, options);
  const maxShift = 20;

  function generateId() {
    return opts.padding + getRandomInt(opts.min, opts.max);
  }

  /**
   * Recursive function to find a unique id
   * @param  {Number}   carriedId Passed ID in recursion step
   * @param  {Number}   tries     Integer counts the shifting of IDs
   * @param  {Object}   _this     `this`-scope of schema
   * @param  {Function} next      Callback
   */
  function generateUniqueId(carriedId, tries, _this, next) {
    let id = carriedId || generateId();

    // Generate a new random id, if
    //  - shifting exceeded `maxShift`, to kick-off new random process
    //  - id exceeds `opts.max` to prevent overflow
    if (tries >= maxShift || id >= opts.padding + opts.max) {
      generateUniqueId(null, 0, _this, next);
      return;
    }

    // Shift id, if we carry one around
    if (carriedId) id++;

    // Try to find a document with the generated id.
    // Recurse, if duplicate found.
    // Set id and continue, if id is unique.
    _this.constructor.findOne({ id })
      .then((found) => {
        if (found) return generateUniqueId(id, tries + 1, _this, next);

        _this.id = id; // eslint-disable-line no-param-reassign
        return next();
      });
  }

  // Register pre save hook
  schema.pre('save', function (next) {
    generateUniqueId(null, 0, this, next);
  });
};

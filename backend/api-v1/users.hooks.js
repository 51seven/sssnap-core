'use strict';

// Module dependencies
const hooks = require('feathers-hooks');


module.exports.before = {
  create: [hooks.disable('external')]
};

'use strict';

// API Version 1

// Module dependencies

// Imports
const users = require('./api-v1/users');


module.exports = function () {
  const app = this;

  app.configure(users);
};

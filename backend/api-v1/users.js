'use strict';

// Imports
const UsersService = require('./users.service');
const hooks = require('./users.hooks');


module.exports = function () {
  const app = this;

  // Register Service
  app.use('/v1/users', new UsersService());
  const service = app.service('/v1/users');

  service.before(hooks.before);
};

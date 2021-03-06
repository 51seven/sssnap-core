'use strict';


const User = require('../models/users.model');

class UsersService {
  setup(app) {
    this.app = app;
  }

  find(params) {
    return User.find(params);
  }

  get(id) {
    return Promise.resolve({ id });
  }

  create(data) {
    const user = new User({});
    return user.save();
  }
}

module.exports = UsersService;

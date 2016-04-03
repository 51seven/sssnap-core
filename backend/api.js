'use strict';

// API Feathers Application

// Module dependencies
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');

// Imports
const v1 = require('./api.v1');
const errorHandler = require('./middleware/api.error-handler');


const api = feathers();
api.configure(hooks());
api.configure(rest());
api.configure(v1);
api.use(errorHandler());


module.exports = api;

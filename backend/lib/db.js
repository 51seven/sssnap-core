'use strict';

// This only exists to use the native Promise instead of
// mongoose's promise-implementation.

// Module dependencies
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

module.exports = mongoose;

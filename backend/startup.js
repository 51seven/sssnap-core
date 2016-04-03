'use strict';

// Register dotenv configuration
require('dotenv').config();

// Imports
const startApp = require('./app').start;
const connectDB = require('./lib/db.connect');
const dotenvEnsure = require('./lib/dotenv.ensure');


Promise.resolve()
  .then(connectDB)
  .then(dotenvEnsure)
  .then(startApp)
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

'use strict';

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Imports
const api = require('./api');
const passport = require('./lib/passport');
const auth = require('./middleware/auth');


const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/auth', auth);
// app.use(passport.session());
app.use('/api', api);

function start() {
  return new Promise((resolve, reject) => {
    const server = app.listen(3000);
    server.on('listening', resolve);
  });
}

module.exports.app = app;
module.exports.start = start;

'use strict';

const request = require('request');
const test = require('ava');
const mongoose = require('mongoose');
const app = require('../backend/app');

const dbURI = 'mongodb://localhost/sssnap-test';

let server;

test.cb.before(t => {
  mongoose.connect(dbURI, () => {
    server = app.listen(3001);
    server.once('listening', () => t.end());
  });
});

test.cb.after(t => {
  server.close(() => {
    mongoose.connection.close(() => t.end());
  });
});

test.cb('App runs', t => {
  request('http://localhost:3001', (err, res, body) => {
    t.is(res.statusCode, 404);
    t.end();
  });
});

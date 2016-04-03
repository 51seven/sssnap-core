'use strict';

// Module dependencies
const db = require('./db');

const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};


function connect() {
  return new Promise((resolve, reject) => {
    db.connect('mongodb://localhost/sssnap', options);
    const connection = db.connection;
    connection
      .on('error', reject)
      .once('open', resolve);
  });
}

module.exports = connect;

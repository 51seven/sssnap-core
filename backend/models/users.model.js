'use strict';

// Imports
const db = require('../lib/db');
const randomId = require('../lib/mongoose-random-id');


const Schema = db.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true
    }
  },
  {
    id: false,
    noVirtualId: true
  }
);

UserSchema.plugin(randomId);

module.exports = db.model('User', UserSchema);

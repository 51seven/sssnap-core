'use strict';

// Imports
const db = require('../lib/db');
const randomId = require('../lib/mongoose-random-id');


const Schema = db.Schema;

const UserSchema = new Schema(
  {
    id: { type: Number, unique: true, index: true },
    googleId: { type: String, unique: true },
    googleData: { type: Schema.Types.Mixed },
    email: { type: String },
    name: { type: String }
  },
  {
    id: false,
    noVirtualId: true
  }
);

UserSchema.plugin(randomId);

module.exports = db.model('User', UserSchema);

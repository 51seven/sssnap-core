'use strict';

// Module dependencies
const auth = require('express').Router(); // eslint-disable-line new-cap

// Imports
const passport = require('../lib/passport');


auth.get('/google',
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  )
);

auth.get('/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/' }
  ),
  (req, res) => {
    res.send('what');
  }
);


module.exports = auth;

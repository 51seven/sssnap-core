'use strict';

// Module dependencies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Imports
const User = require('../models/users.model');


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH2_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, next) => {
    const json = profile._json;

    // Try to find the google-authenticated user.
    // If he's already registered, login and continue.
    // If he's not there, create him, login and continue.
    User.findOne({ googleId: json.id })
      .then(user => {
        if (user) {
          return next(user);
        }

        const newUser = new User({
          googleId: json.id,
          googleData: {
            etag: json.etag
          },
          email: json.emails[0].value,
          name: json.displayName
        });

        return newUser.save();
      })
      .then((user) => (next(user)));
  }
));


module.exports = passport;

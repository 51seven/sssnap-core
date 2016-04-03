'use strict';

// Check if environment variables exist
// Heavily inspired by https://github.com/rolodato/dotenv-safe

// Module dependencies
const dotenv = require('dotenv');
const fs = require('fs');


// Remove keys with empty values from object
function removeEmptyValues(env) {
  const clean = {};
  Object.keys(env).forEach(key => {
    if (env[key]) clean[key] = env[key];
  });
  return clean;
}

// Return the values from arrayA, which are not present in arrayB
function difference(a, b) {
  return a.filter(aKey => (b.indexOf(aKey) < 0));
}


module.exports = function () {
  return new Promise((resolve, reject) => {
    // Get necessary env-variables and the currently present env-variables
    const defaultEnv = dotenv.parse(fs.readFileSync('.env.default'));
    const currentEnv = removeEmptyValues(process.env);

    // Missing env-variables in process.env
    const missingEnv =
      difference(Object.keys(defaultEnv), Object.keys(currentEnv));

    // Reject, if missing env-variables are found
    // Server should not start!
    if (missingEnv.length > 0) {
      const msg = `Missing environment variables: ${missingEnv.join(', ')}`;
      const err = new Error(msg);
      err.code = 'MISSINGENV';
      reject(err);
      return;
    }

    resolve();
  });
};

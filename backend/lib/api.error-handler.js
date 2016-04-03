'use strict';

// Error handler for API calls

module.exports = function () {
  return function (err, req, res, next) {
    res.json(err);
  };
};

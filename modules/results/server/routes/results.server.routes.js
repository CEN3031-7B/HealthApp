'use strict';

/**
 * Module dependencies.
 */
var resultsPolicy = require('../policies/results.server.policy'),
  results = require('../controllers/results.server.controller');

module.exports = function (app) {
  // results collection routes
  app.route('/api/results').all(resultsPolicy.isAllowed)
    .get(results.list)
    .post(results.create);

  // Single result routes
  app.route('/api/results/:resultId').all(resultsPolicy.isAllowed)
    .get(results.read)
    .put(results.update)
    .delete(results.delete);

  // Finish by binding the result middleware
  app.param('resultId', results.resultByID);
};

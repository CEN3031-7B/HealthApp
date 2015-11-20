'use strict';

/**
 * Module dependencies.
 */
var diseasesPolicy = require('../policies/diseases.server.policy'),
  diseases = require('../controllers/diseases.server.controller');

module.exports = function (app) {

console.log("export route");

  // Diseases collection routes
  app.route('/api/diseases').all(diseasesPolicy.isAllowed)
    .get(diseases.list)
    .post(diseases.create);

  // Single disease routes
  app.route('/api/diseases/:diseaseId').all(diseasesPolicy.isAllowed)
    .get(diseases.read)
    .put(diseases.update)
    .delete(diseases.delete);

  // Finish by binding the disease middleware
  app.param('diseaseId', diseases.diseaseByID);
};

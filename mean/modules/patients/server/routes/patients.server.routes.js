'use strict';

/**
 * Module dependencies.
 */
var patientsPolicy = require('../policies/patients.server.policy'),
  patients = require('../controllers/patients.server.controller');

module.exports = function (app) {
  // Patients collection routes
  app.route('/api/patients').all(patientsPolicy.isAllowed)
    .get(patients.list)
    .post(patients.create);

  // Single patient routes
  app.route('/api/patients/:patientId').all(patientsPolicy.isAllowed)
    .get(patients.read)
    .put(patients.update)
    .delete(patients.delete);

  // Finish by binding the patient middleware
  app.param('patientId', patients.patientByID);
};

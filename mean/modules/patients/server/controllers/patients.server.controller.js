'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Patient = mongoose.model('Patient'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a patient
 */
exports.create = function (req, res) {
  var patient = new Patient(req.body);
  patient.user = req.user;

  patient.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * Show the current patient
 */
exports.read = function (req, res) {
  res.json(req.patient);
};

/**
 * Update a patient
 */
exports.update = function (req, res) {
  var patient = req.patient;

  patient.firstname = req.body.firstname;
  patient.lastname = req.body.lastname;
  patient.content = req.body.content;

  patient.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * Delete an patient
 */
exports.delete = function (req, res) {
  var patient = req.patient;

  patient.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patient);
    }
  });
};

/**
 * List of Patients
 */
exports.list = function (req, res) {
  Patient.find().sort('-created').populate('user', 'displayName').exec(function (err, patients) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(patients);
    }
  });
};

/**
 * Patient middleware
 */
exports.patientByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Patient is invalid'
    });
  }

  Patient.findById(id).populate('user', 'displayName').exec(function (err, patient) {
    if (err) {
      return next(err);
    } else if (!patient) {
      return res.status(404).send({
        message: 'No patient with that identifier has been found'
      });
    }
    req.patient = patient;
    next();
  });
};
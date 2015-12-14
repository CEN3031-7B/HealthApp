'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Disease = mongoose.model('Disease'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Disease
 */
exports.create = function (req, res) {
  var disease = new Disease(req.body);
  disease.suggestions = req.body.suggestions;

  disease.save(function (err) {
    console.log(err);
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(disease);
    }
  });
};

/**
 * Show the current disease
 */
exports.read = function (req, res) {
  res.json(req.disease);
};

/**
 * Update a disease
 */
exports.update = function (req, res) {
  var disease = req.disease;
  disease.suggestions = req.body.suggestions;
  disease.diseaseName = req.body.diseaseName;

  disease.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(disease);
    }
  });
};

/**
 * Delete a disease
 */
exports.delete = function (req, res) {
  var disease = req.disease;

  disease.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(disease);
    }
  });
};

/**
 * List of Diseases
 */
exports.list = function (req, res) {
  Disease.find().sort('-created').populate('suggestions').exec(function (err, diseases) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(diseases);
    }
  });
};


/**
 * Disease middleware
 */
exports.diseaseByID = function (req, res, next, id) {
   Disease.findById(id).populate('suggestions').exec(function (err, disease) {
     if (err) return next(err);
     if(! disease) return next(new Error('Failed to load Disease' + id));

    req.disease = disease;
    next();
  });  
};
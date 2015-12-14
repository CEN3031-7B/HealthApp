'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Result = mongoose.model('Result'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a result
 */
exports.create = function (req, res) {
  var result = new Result(req.body);
  result.user = req.user;

  result.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * Show the current result
 */
exports.read = function (req, res) {
  res.json(req.result);
};

/**
 * Update a result
 */
exports.update = function (req, res) {
  var result = req.result;

  result.name = req.body.name;
  result.content = req.body.content;

  result.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * Delete an result
 */
exports.delete = function (req, res) {
  var result = req.result;

  result.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * List of results
 */
exports.list = function (req, res) {
  Result.find().sort('-created').populate('user', 'displayName').exec(function (err, results) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(results);
    }
  });
};

/**
 * result middleware
 */
exports.resultByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'result is invalid'
    });
  }

  Result.findById(id).populate('user', 'displayName').exec(function (err, result) {
    if (err) {
      return next(err);
    } else if (!result) {
      return res.status(404).send({
        message: 'No result with that identifier has been found'
      });
    }
    req.result = result;
    next();
  });
};

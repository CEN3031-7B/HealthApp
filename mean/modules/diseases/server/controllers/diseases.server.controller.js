'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Disease = mongoose.model('Disease'),
  DiseaseSuggestion = mongoose.model('DiseaseSuggestion'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Disease
 */
exports.create = function (req, res) {
  console.log("create disease");
  var disease = new Disease(req.body);
  disease.suggestions = req.suggestions;

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
 * Create a DiseaseSuggestion
 */
// exports.create = function (req, res) {
//   console.log("create suggestion");
//   var diseaseSuggestion = new DiseaseSuggestion(req.body);
//   diseaseSuggestion.name = req.name;

//   diseaseSuggestion.save(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(diseaseSuggestion);
//     }
//   });
// };

/**
 * Show the current disease
 */
exports.read = function (req, res) {
  console.log("read");
  res.json(req.disease);
};

/**
 * Update a disease
 */
exports.update = function (req, res) {
  console.log("update");
  var disease = req.disease;

  disease.diseaseName = req.body.diseaseName;
  disease.suggestions = req.body.suggestions;

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
  console.log("delete");
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
  console.log("list Disease");
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
 * List of DiseaseSuggestions
 */
// exports.list = function (req, res) {
//   console.log("list");
//   DiseaseSuggestion.find().sort('-created').populate('suggestions').exec(function (err, diseases) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(diseases);
//     }
//   });
// };

/**
 * Disease middleware
 */
exports.diseaseByID = function (req, res, next, id) {
  console.log("diseaseById");
  // Disease.findById(id).populate('suggestions').exec(function(err, disease) {
  //   if (err) return next(err);
  //   if(! disease) return next(new Error('Failed to load Disease' + id));

    req.disease = disease;
    next();
  // });  
};
  //   if (err) {
  //     return next(err);
  //   } else if (!disease) {
  //     return res.status(404).send({
  //       message: 'No Disease with that identifier has been found'
  //     });
  //   }
  //   req.disease = disease;
  //   next();
  // });

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Disease is invalid'
//     });
//   }
// };

/**
 * DiseaseSuggestion middleware
 */
// exports.diseaseSuggestionByID = function (req, res, next, id) {
//   Disease.findById(id).populate('name', 'field').exec(function(err, disease) {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send({
//         message: 'DiseaseSuggestion is invalid'
//       });
//     }

//     req.disease = disease;
//     next();
//   });
// };

  // DiseaseSuggestion.findById(id).populate('name', 'displayName').exec(function (err, diseaseSuggestion) {
  //   if (err) {
  //     return next(err);
  //   } else if (!diseaseSuggestion) {
  //     return res.status(404).send({
  //       message: 'No Disease Suggestion with that identifier has been found'
  //     });
  //   }
  //   req.diseaseSuggestion = diseaseSuggestion;
  //});

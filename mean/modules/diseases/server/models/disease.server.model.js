'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConditionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  diseaseName: {
    type: String,
    trim: true,
    required: 'Disease Name cannot be blank'
  },
  lastTreated: {
    type: Date,
  },
  nextTeatment: {
    type: Date
  },
  suggestions: [{
      name: {
        type: String,
        trim: true,
        required: 'Suggested Treatment Name cannot be blank'
      },
      field: {
        type: String,
        required: 'Field is required'
      },
      specialConditionParameterName: {
        type: String,
        default: ''
      },
      specialConditionParameterValue: {
        type: String,
        default: ''
      }
  }],
});

mongoose.model('Disease', ConditionSchema);
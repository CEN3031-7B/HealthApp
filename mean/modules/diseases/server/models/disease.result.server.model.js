'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Disease Condition Schema
 */
var DiseaseResultSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
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
});

var ConditionSchema = new Schema({
  diseaseName: {
    type: String,
    trim: true,
    required: 'Disease Name cannot be blank'
  },
  suggestions:[DiseaseResultSchema]
});

mongoose.model('DiseaseSuggestion', DiseaseResultSchema);
mongoose.model('Disease', ConditionSchema);

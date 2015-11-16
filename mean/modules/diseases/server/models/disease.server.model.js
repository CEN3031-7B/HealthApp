'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ConditionSchema = new Schema({
  diseaseName: {
    type: String,
    trim: true,
    required: 'Disease Name cannot be blank'
  },
  suggestions: [{
    type: Schema.ObjectId,
    ref: 'DiseaseSuggestion'
  }]
});

/**
 * Disease Condition Schema
 */
var DiseaseResultSchema = new Schema({
  name: {
    type: String,
    trim: true,
    //required: 'Suggested Treatment Name cannot be blank'
  },
  field: {
    type: String,
    //required: 'Field is required'
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

mongoose.model('DiseaseSuggestion', DiseaseResultSchema);

mongoose.model('Disease', ConditionSchema);

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * result Schema
 */
var ResultSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  results: [{
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

mongoose.model('Result', ResultSchema);

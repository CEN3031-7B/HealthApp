'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstname: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  lastname: {
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
  }
});

mongoose.model('Patient', PatientSchema);

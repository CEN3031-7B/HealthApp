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
  vitalStats: [{
      title: {
        type: String,
        trim: true,
        required: 'Vital Stats Title cannot be blank'
      },
      content: {
        type: Number,
        required: 'Vital Stat value is required'
      }
  }],
  hasDisease: [{
      title: {
        type: String,
        trim: true,
        required: 'Disease title cannot be blank'
      },
      content: {
        type: Boolean,
        default: 'false'
        // required: 'Field is required'
      }
  }],
  patientInfo: [{
    title: {
      type: String,
      trim: true,
      required: 'patient info title cannot be blank'
    },
    content: {
      type: String,
      required: 'patient info field is required'
    }
  }],
  firstname: {
    type: String,
    required: 'First name is required'
  },
  lastname: {
    type: String,
    required: 'Last name is required'
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

mongoose.model('Patient', PatientSchema);

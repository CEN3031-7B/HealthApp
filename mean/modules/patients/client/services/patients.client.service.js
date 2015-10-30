'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('patients').factory('Patients', ['$resource',
  function ($resource) {
    return $resource('api/patients/:patientId', {
      patientId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

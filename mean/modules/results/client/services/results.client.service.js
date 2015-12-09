'use strict';

//results service used for communicating with the results REST endpoints
angular.module('results').factory('Results', ['$resource',
  function ($resource) {
    return $resource('api/results/:resultId', {
      resultId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

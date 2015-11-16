'use strict';

//Diseases service used for communicating with the diseases REST endpoints
angular.module('diseases').factory('Diseases', ['$resource',
  function ($resource) {
    return $resource('api/diseases/:diseaseId', {
      diseaseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('diseases').factory('DiseaseSuggestion', ['$resource',
  function ($resource) {
    return $resource('api/diseases/:diseaseId', {
      diseaseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
'use strict';

// Setting up route
angular.module('diseases').config(['$stateProvider',
  function ($stateProvider) {
    // Diseases state routing
    $stateProvider
      .state('diseases', {
        abstract: true,
        url: '/diseases',
        template: '<ui-view/>'
      })
      .state('diseases.list', {
        url: '',
        templateUrl: 'modules/diseases/client/views/list-diseases.client.view.html'
      })
      .state('diseases.create', {
        url: '/create',
        templateUrl: 'modules/diseases/client/views/create-disease.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('diseases.view', {
        url: '/:diseaseId',
        templateUrl: 'modules/diseases/client/views/view-disease.client.view.html'
      })
      .state('diseases.edit', {
        url: '/:diseaseId/edit',
        templateUrl: 'modules/diseases/client/views/edit-disease.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);

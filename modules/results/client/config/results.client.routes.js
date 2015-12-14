'use strict';

// Setting up route
angular.module('results').config(['$stateProvider',
  function ($stateProvider) {
    // results state routing
    $stateProvider
      .state('results', {
        abstract: true,
        url: '/results',
        template: '<ui-view/>'
      })
      .state('results.list', {
        url: '',
        templateUrl: 'modules/results/client/views/list-results.client.view.html'
      })
      .state('results.create', {
        url: '/create',
        templateUrl: 'modules/results/client/views/create-result.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('results.view', {
        url: '/:resultId',
        templateUrl: 'modules/results/client/views/view-result.client.view.html'
      })
      .state('results.edit', {
        url: '/:resultId/edit',
        templateUrl: 'modules/results/client/views/edit-result.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);

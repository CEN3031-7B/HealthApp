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
      });
  }
]);

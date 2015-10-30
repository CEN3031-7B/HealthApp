'use strict';

// Setting up route
angular.module('patients').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('patients', {
        abstract: true,
        url: '/patients',
        template: '<ui-view/>'
      })
      .state('patients.list', {
        url: '',
        templateUrl: 'modules/patients/client/views/list-patients.client.view.html'
      })
      .state('patients.create', {
        url: '/create',
        templateUrl: 'modules/patients/client/views/create-patient.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('patients.view', {
        url: '/:patientId',
        templateUrl: 'modules/patients/client/views/view-patient.client.view.html'
      })
      .state('patients.edit', {
        url: '/:patientId/edit',
        templateUrl: 'modules/patients/client/views/edit-patient.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);

'use strict';

// Configuring the Articles module
angular.module('patients').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Patients',
      state: 'patients',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'patients', {
      title: 'List Prticles',
      state: 'patients.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'patients', {
      title: 'Create Prticles',
      state: 'patients.create',
      roles: ['user']
    });
  }
]);

'use strict';

// Configuring the Patients module
angular.module('patients').run(['Menus',
  function (Menus) {
    // Add the patients dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Patients',
      state: 'patients',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'patients', {
      title: 'List Patients',
      state: 'patients.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'patients', {
      title: 'Create Patients',
      state: 'patients.create',
      roles: ['user']
    });
  }
]);

'use strict';

// Configuring the Diseases module
angular.module('diseases').run(['Menus',
  function (Menus) {
    // Add the diseases dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Diseases',
      state: 'Diseases',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'diseases', {
      title: 'List Diseases',
      state: 'diseases.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'diseases', {
      title: 'Create Diseases',
      state: 'diseases.create',
      roles: ['user']
    });
  }
]);

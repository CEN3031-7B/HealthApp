'use strict';

// Configuring the Results module
angular.module('results').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'results',
      state: 'results',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'results', {
      title: 'List Results',
      state: 'results.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create Results',
      state: 'results.create',
      roles: ['user']
    });
  }
]);

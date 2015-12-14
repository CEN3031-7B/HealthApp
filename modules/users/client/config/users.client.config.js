'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
    angular.module('users').run(['Menus',
      function (Menus) {
        // Add the users dropdown item
        Menus.addMenuItem('topbar', {
          title: 'Users',
          state: 'users',
          type: 'dropdown',
          roles: ['*']
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'users', {
          title: 'List Users',
          state: 'users.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'users', {
          title: 'Create Users',
          state: 'users.create',
          roles: ['user']
        });
      }
    ]);
  }
]);

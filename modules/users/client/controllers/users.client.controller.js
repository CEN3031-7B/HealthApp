'use strict';

// users controller
angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Users',
  function ($scope, $stateParams, $location, Authentication, Users) {
    $scope.authentication = Authentication;

    // Status of edit button in order to show/hide certain buttons on survey page
    $scope.editEnabled = [];

    // Create new user
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      // Create new user object
      var user = new Users({
        firstname: this.firstname,
        lastname: this.lastname,
        content: this.content
      });

      // Redirect after save
      user.$save(function (response) {
        $location.path('users/' + response._id);

        // Clear form Entrys
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing user
    $scope.remove = function (user) {
      if (user) {
        user.$remove();

        for (var i in $scope.users) {
          if ($scope.users[i] === user) {
            $scope.users.splice(i, 1);
          }
        }
      } else {
        $scope.user.$remove(function () {
          $location.path('users');
        });
      }
    };

    // Update existing user
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $location.path('users/' + user._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of users
    $scope.find = function () {
      $scope.users = Users.query();
    };

    // Find existing user
    $scope.findOne = function () {
      $scope.user = Users.get({
        userId: $stateParams.userId
      });
    };

    /* Functions for nested arrays that appear on survey page; Add/Update/Delete without interruption */
    // Add new entry
    $scope.addEntry = function () {
      // Create new user object
      var user = new Users({
        firstname: this.firstname,
        lastname: this.lastname,
        content: this.content
      });

      // Save data
      user.$save(function () {
        // New object appears to be displayed immediately on the interface
        $scope.users.push(user);
        // Clear form Entrys
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Enable edit
    $scope.editEntry = function(index) {
      $scope.editEnabled[index] = angular.copy($scope.users[index]);
    };

    // Update existing entry
    $scope.updateEntry = function(index) {
      var user = $scope.users[index];
      // Edits appear to be displayed immediately on the interface
      $scope.$apply(function () {
        Users.update({userId: user._id}, user);
      });
      $scope.editEnabled[index] = false;
      // Update data
      user.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Cancel
    $scope.cancel = function(index) {
      $scope.users[index] = angular.copy($scope.editEnabled[index]);
      $scope.editEnabled[index] = false;
    };

    // Delete entry
    $scope.deleteEntry = function(index) {
      var user = $scope.users[index];
      // Appears to be immediately removed
      $scope.users.splice(index, 1);
      if (user) {
        // Delete data
        user.$remove();
        for (var i in $scope.users) {
          if ($scope.users[i] === user) {
            $scope.users.splice(i, 1);
          }
        }
      } else {
        $scope.user.$remove(function () {
          $location.path('users');
        });
      }
    }; /* .Functions for nested arrays on survey page */

  }
]);

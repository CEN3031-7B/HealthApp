'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window','$modal', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, $modal, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();
    $scope.animationsEnabled = true;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect to correct landing page
    if ($scope.authentication.user) {
      if ($scope.authentication.user.admin) {
        $location.path('/admin_landing');
      }
      else if (!$scope.authentication.user.admin){
        $location.path('/patients');
      }
    }
    // Else (not logged in) cannot access any page but the index page
    else {
      $location.path('/');
    }

    // Title links to certain landing page based on whether an admin or a user is logged in
    $scope.logoState = function() {
      if ($scope.authentication.user) {
        if ($scope.authentication.user.admin) {
          return "admin-landing";
        }
        else if (!$scope.authentication.user.admin) {
          return "patients.list";
        }
      }
      else {
        return "home";
      }
    };

    $scope.open = function (size, id) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: id,
        controller: function ($scope, $modalInstance) {
          $scope.cancel = function () {
            console.log("canceling");
            $modalInstance.dismiss('cancel');
          };

          $scope.signup = function (isValid) {
            $scope.error = null;

            if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'userForm');

              return false;
            }

            $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
              // If successful we assign the response to the global user model
              // $scope.authentication.user = response;

              // And redirect to the previous or home page
              // $state.go($state.previous.state.name || 'admin_landing', $state.previous.params);
            });
            // .error(function (response) {
            //   $scope.error = response.message;
            // });
            $modalInstance.dismiss('cancel');
          };

          $scope.sendMail = function(isValid) {
            $scope.error = null;

            if (!isValid) {
              $scope.$broadcast('show-errors-check-validity', 'userForm');
              return false;
            }
            var link = "mailto:me@example.com" + "?subject=" + $scope.message.user + " is concerned!" + "&body=" + $scope.message.text;
            window.location.href = link;
            $modalInstance.dismiss('cancel');
          };
        },
        size: size
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
        if ($scope.authentication.user.admin === true){
          $state.go($state.previous.state.name || 'admin-landing', $state.previous.params);
        }
        else {
          $state.go('patients.list', $state.previous.params);
        }
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

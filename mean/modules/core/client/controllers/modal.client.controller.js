'use strict';

angular.module('core').controller('ModalController', ['$scope','$modal' ,'$http', '$log',
  function ($scope, $modal, $http, $log) {

  $scope.animationsEnabled = true;

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: function ($scope, $modalInstance) {
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size
      });
    };

    $scope.sendMail = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }

      // Simple POST request example (passing data) :
      $http.post('/mail', {name: contact_name, email: contact_email, msg: contact_message}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }
]);

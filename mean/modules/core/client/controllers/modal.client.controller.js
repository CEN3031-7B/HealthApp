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
    }
  }
]);

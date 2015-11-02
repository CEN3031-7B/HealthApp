'use strict';

angular.module('core').controller('ModalController', ['$scope','$modal' ,'$http', '$log', '$state',
  function ($scope, $modal, $http, $log, $state) {

    $("modal-content").load("/manage.client.view.html");

  $scope.animationsEnabled = true;

    $scope.open = function (size, id) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: id,
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
    };
  }
]);

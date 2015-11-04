'use strict';

angular.module('core').controller('ModalController', ['$scope','$modal' ,'$http', '$log','$window','$location',
  function ($scope, $modal, $http, $log, $window, $location) {
<<<<<<< HEAD

    //$("modal-content").load("/manage.client.view.html");
=======
>>>>>>> master

  $scope.animationsEnabled = true;

    $scope.open = function (size, id) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: id,
        controller: function ($scope, $modalInstance) {
          $scope.cancel = function () {
            console.log("canceling");
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
          };
        },
        size: size
      });
    };
  }
]);

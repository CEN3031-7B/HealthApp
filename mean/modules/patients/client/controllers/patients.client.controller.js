'use strict';

// Articles controller
angular.module('patients').controller('PatientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patients',
  function ($scope, $stateParams, $location, Authentication, Patients) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'patientForm');

        return false;
      }

      // Create new Article object
      var patient = new Patients({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      patient.$save(function (response) {
        $location.path('patients/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (patient) {
      if (patient) {
        patient.$remove();

        for (var i in $scope.patients) {
          if ($scope.patients[i] === patient) {
            $scope.patients.splice(i, 1);
          }
        }
      } else {
        $scope.patient.$remove(function () {
          $location.path('patients');
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'patientForm');

        return false;
      }

      var patient = $scope.patient;

      patient.$update(function () {
        $location.path('patients/' + patient._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.patients = Patients.query();
    };

    // Find existing patient
    $scope.findOne = function () {
      $scope.patient = Patients.get({
        patientId: $stateParams.patientId
      });
    };
  }
]);

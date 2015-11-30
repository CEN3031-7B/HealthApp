'use strict';

// Patients controller
angular.module('patients').controller('PatientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patients',
  function ($scope, $stateParams, $location, Authentication, Patients) {
    $scope.authentication = Authentication;

    // Status of edit button in order to show/hide certain buttons on survey page
    $scope.editEnabled = [];

    // Create new Patient
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'patientForm');

        return false;
      }

      // Create new Patient object
      var patient = new Patients({
        firstname: this.firstname,
        lastname: this.lastname,
        content: this.content
      });

      // Redirect after save
      patient.$save(function (response) {
        $location.path('patients/' + response._id);

        // Clear form Entrys
        $scope.firstname = '';
        $scope.lastname = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Patient
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

    // Update existing Patient
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

    // Find a list of Patients
    $scope.find = function () {
      $scope.patients = Patients.query();
    };

    // Find existing patient
    $scope.findOne = function () {
      $scope.patient = Patients.get({
        patientId: $stateParams.patientId
      });
    };

    /* Functions for nested arrays that appear on survey page; Add/Update/Delete without interruption */
    // Add new entry
    $scope.addEntry = function () {
      // Create new Patient object
      var patient = new Patients({
        firstname: this.firstname,
        lastname: this.lastname,
        content: this.content
      });

      // Save data
      patient.$save(function () {
        // New object appears to be displayed immediately on the interface
        $scope.patients.push(patient);
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
      $scope.editEnabled[index] = angular.copy($scope.patients[index]);
    };

    // Update existing entry
    $scope.updateEntry = function(index) {
      var patient = $scope.patients[index];
      // Edits appear to be displayed immediately on the interface
      $scope.$apply(function () {
        Patients.update({patientId: patient._id}, patient);
      });
      $scope.editEnabled[index] = false;
      // Update data
      patient.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Cancel
    $scope.cancel = function(index) {
      $scope.patients[index] = angular.copy($scope.editEnabled[index]);
      $scope.editEnabled[index] = false;
    };

    // Delete entry
    $scope.deleteEntry = function(index) {
      var patient = $scope.patients[index];
      // Appears to be immediately removed
      $scope.patients.splice(index, 1);
      if (patient) {
        // Delete data
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
    }; /* .Functions for nested arrays on survey page */

  }
]);
'use strict';

// Patients controller
angular.module('patients').controller('PatientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patients', 'Diseases',
  function ($scope, $stateParams, $location, Authentication, Patients, Diseases) {
    $scope.authentication = Authentication;

    $scope.arr = ["Date of Birth", "Gender", "Phone Number", "Address", "Name of Plan", "Alternate Phone Number", "Preferred Language", "Name of Medical Practitioner"];
    $scope.number = ["Weight", "Age", "LDL", "Blood Pressure"];

    $scope.arrObj = [];
    $scope.numberObj = [];
    $scope.hasDisease = [];

    $scope.getNameArr = function(i) {
      return $scope.arr[i];
    };
    $scope.getNameNumber = function(i) {
    return $scope.number[i];
    };
    $scope.findDisease = function () {
      $scope.diseases = Diseases.query();
    };

    $scope.currentPage = 1;

    $scope.pages = [
    "/modules/patients/client/views/p1.view.html",
    "/modules/patients/client/views/p2.view.html",
    "/modules/patients/client/views/p3.view.html"];
    $scope.lastPage = $scope.pages.length;

    // Status of edit button in order to show/hide certain buttons on survey page
    $scope.editEnabled = [];

    $scope.incrementPage = function() {
      $scope.currentPage++;
    };

    $scope.goNext = function() {
      if($scope.currentPage < $scope.lastPage) {
        //insert logic based on answers
        $scope.currentPage++;
      }
    };

    $scope.goBack = function() {
      if($scope.currentPage > 1) {
        //insert logic based on answers?
        $scope.currentPage--;
      }
    };

    $scope.previousDisabled = function() {
      return $scope.currentPage === 1 ? "disabled" : "";
    };

    $scope.nextDisabled = function() {
      return $scope.currentPage === $scope.lastPage ? "disabled" : "";
    };

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
        patientInfo: $scope.arrObj,
        hasDisease: $scope.hasDisease,
        vitalStats: $scope.numberObj
      });

      // Redirect after save
      patient.$save(function (response) {
        $location.path('patients');

         // Clear form Entrys
        $scope.firstname ='';
        $scope.lastname ='';
   			$scope.arrObj = [{}];
   			$scope.numberObj = [{}];
   			$scope.hasDisease = [{}];
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
      console.log(patient.patientInfo);
      patient.patientInfo = $scope.arrObj;
      patient.hasDisease = $scope.hasDisease;
      patient.vitalStats = $scope.numberObj;

      patient.$update(
        function () {
        $location.path('patients');
      },
      function (errorResponse) {
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

      $scope.patient.$promise.then(function(data) {     

          $scope.arrObj = data.patientInfo;
          $scope.numberObj = data.vitalStats;
          $scope.hasDisease = data.hasDisease;
          console.log(data.hasDisease);
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

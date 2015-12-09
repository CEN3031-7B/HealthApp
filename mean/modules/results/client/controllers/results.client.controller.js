'use strict';

// results controller
angular.module('diseases').controller('ResultsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Diseases', 'Patients',
  function ($scope, $stateParams, $location, Authentication, Diseases, Patients) {
    $scope.authentication = Authentication;

    $scope.resultsFields = ["Education", "Referrels", "Medications", "Laboratory", "Screening", "Vaccinations", "DME", "Medication Adherence"];
    $scope.results = [];
    $scope.search = "true";

    // Find the list of Diseases
      $scope.find = function () {
          $scope.diseases = Diseases.query();
          $scope.patients = Patients.query();
          console.log($scope.patients);

      };

      // Find existing Disease
      $scope.findOne = function () {
       	$scope.disease = Diseases.get({
      		diseaseId: $stateParams.diseaseId
      	});
      };

      $scope.updateDate = function(isValid){
        $scope.error = null;

        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'tableForm');
          return false;
        }
      };
  }
]);

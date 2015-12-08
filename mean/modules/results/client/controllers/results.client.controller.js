'use strict';

// results controller
angular.module('diseases').controller('ResultsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Diseases',
  function ($scope, $stateParams, $location, Authentication, Diseases) {
    $scope.authentication = Authentication;

    $scope.resultsFields = ["Education", "Referrels", "Medications", "Laboratory", "Screening", "Vaccinations", "DME", "Medication Adherence"];

    // Find a list of Diseases
      $scope.find = function () {
        $scope.diseases = Diseases.query();
      };
  }
]);

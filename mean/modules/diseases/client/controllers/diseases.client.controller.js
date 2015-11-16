'use strict';

//Disease Results Controller
angular.module('diseases').controller('DiseasesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Diseases', 'DiseaseSuggestion',
  function ($scope, $stateParams, $location, Authentication, Disease, DiseaseSuggestion) {
		$scope.authenitcation = Authentication;

		$scope.resultsFields = ["Education", "Referrels", "Medications", "Laboratory", "Screening", "Vaccinations", "DME", "Medication Adherence"];

		$scope.suggestions = [new DiseaseSuggestion({})];

		$scope.addSuggestion = function() {
			$scope.suggestions.push(new DiseaseSuggestion({}));
		};

		//Removes Suggestion from the array
		$scope.removeSuggestion = function(index) {
			$scope.suggestions.splice(index, 1);
		};

		//Create new Disease Results
		$scope.create = function(isValid) {
			$scope.error = null;

			if(!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'diseaseForm');

				return false;
			}

			//Generates Disease Suggestions and an array of response Ids
			var responseId = [];
			var i;
			//for(i = 0; i < $scope.suggestions.length; ++i) {
				$scope.suggestions[0].$save(function(response) {
					console.log(response._id);
					responseId.push(response._id);
					if(responseId.length === $scope.suggestions.length) {



						console.log(responseId);


						var disease = new Disease({
							diseaseName: $scope.diseaseName,

							//Need to define suggestions as an array of disease result condition
							suggestions: responseId
						});

						console.log(disease);
						//Redirect after save
						disease.$save(function (response) {

							$location.path('diseases/' + response._id);

							//Clear form fields
							$scope.diseaseName ='';
							$scope.suggestions = [];
						}, function(err) {
							$scope.error = err.data.message;
						});
					}



				});
			//}










		};


		//Remove existing Disease 
		$scope.remove = function (disease) {
			if(disease) {
				disease.$remove();

				for(var i in $scope.diseases) {
					if($scope.diseases[i] === disease) {
						$scope.diseases.splice(i,1);
					}
				}
			} else {
				$scope.disease.$remove(function() {
					$location.path('diseases');
				});
			}
		};

		//Update Existing Disease
		$scope.update = function (isValid) {
			$scope.error = null;

			if(!isValid) {
				$scope.broadcast('show-errors-check-validity', 'diseaseForm');

				return false;
			}

			var disease = $scope.disease;

			disease.$update(function() {
				$location.path('diseases/' + disease._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Diseases
	    $scope.find = function () {
	      $scope.diseases = Disease.query();
	    };

	    // Find existing Disease
	    $scope.findOne = function () {
	      $scope.disease = Disease.get({
	        diseaseId: $stateParams.diseaseId
	      });
	    };
	}
]); 
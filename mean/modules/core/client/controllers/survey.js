var myApp = angular.module('myApp', []);

myApp.controller('PgCtrl', function ($scope){
  $scope.currentPage = 1;
  $scope.pages = ["This is page 1", "This is page 2","This is page 3"];
  $scope.lastPage = $scope.pages.length;
  
  $scope.previousDisabled = function() {
    return $scope.currentPage === 1 ? "disabled" : "";
  };
  
  $scope.nextDisabled = function() {
    return $scope.currentPage === $scope.lastPage ? "disabled" : "";
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
  
});
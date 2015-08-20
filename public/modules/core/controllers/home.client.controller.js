'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','Mainworkouts','$location',
	function($scope, Authentication, Mainworkouts,$location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


    // Find a list of Mainworkouts
    $scope.findMainWorkout = function() {
      $scope.mainworkouts = Mainworkouts.query();
    };

    // Find existing Mainworkout
    $scope.findOne = function() {
      $scope.mainworkout = Mainworkouts.get({
        mainworkoutId: $stateParams.mainworkoutId
      });
    };


    $scope.goToSpecificWorkout = function(){
      $location.path('/specificworkouts');
    };
	}
]);

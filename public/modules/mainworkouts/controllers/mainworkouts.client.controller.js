'use strict';

// Mainworkouts controller
angular.module('mainworkouts').controller('MainworkoutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mainworkouts',
	function($scope, $stateParams, $location, Authentication, Mainworkouts) {
		$scope.authentication = Authentication;

		// Create new Mainworkout
		$scope.create = function() {
			// Create new Mainworkout object
			var mainworkout = new Mainworkouts ({
				name: this.name,
				img : this.img
			});

			// Redirect after save
			mainworkout.$save(function(response) {
				$location.path('mainworkouts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mainworkout
		$scope.remove = function(mainworkout) {
			if ( mainworkout ) { 
				mainworkout.$remove();

				for (var i in $scope.mainworkouts) {
					if ($scope.mainworkouts [i] === mainworkout) {
						$scope.mainworkouts.splice(i, 1);
					}
				}
			} else {
				$scope.mainworkout.$remove(function() {
					$location.path('mainworkouts');
				});
			}
		};

		// Update existing Mainworkout
		$scope.update = function() {
			var mainworkout = $scope.mainworkout;

			mainworkout.$update(function() {
				$location.path('mainworkouts/' + mainworkout._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mainworkouts
		$scope.find = function() {
			$scope.mainworkouts = Mainworkouts.query();
		};

		// Find existing Mainworkout
		$scope.findOne = function() {
			$scope.mainworkout = Mainworkouts.get({ 
				mainworkoutId: $stateParams.mainworkoutId
			});
		};
	}
]);

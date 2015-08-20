'use strict';

// Specificworkouts controller
angular.module('specificworkouts').controller('SpecificworkoutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Specificworkouts',
	function($scope, $stateParams, $location, Authentication, Specificworkouts) {
		$scope.authentication = Authentication;

		// Create new Specificworkout
		$scope.create = function() {
			// Create new Specificworkout object
			var specificworkout = new Specificworkouts ({
				name: this.name
			});

			// Redirect after save
			specificworkout.$save(function(response) {
				$location.path('specificworkouts/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Specificworkout
		$scope.remove = function(specificworkout) {
			if ( specificworkout ) { 
				specificworkout.$remove();

				for (var i in $scope.specificworkouts) {
					if ($scope.specificworkouts [i] === specificworkout) {
						$scope.specificworkouts.splice(i, 1);
					}
				}
			} else {
				$scope.specificworkout.$remove(function() {
					$location.path('specificworkouts');
				});
			}
		};

		// Update existing Specificworkout
		$scope.update = function() {
			var specificworkout = $scope.specificworkout;

			specificworkout.$update(function() {
				$location.path('specificworkouts/' + specificworkout._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Specificworkouts
		$scope.find = function() {
			$scope.specificworkouts = Specificworkouts.query();
		};

		// Find existing Specificworkout
		$scope.findOne = function() {
			$scope.specificworkout = Specificworkouts.get({ 
				specificworkoutId: $stateParams.specificworkoutId
			});
		};
	}
]);
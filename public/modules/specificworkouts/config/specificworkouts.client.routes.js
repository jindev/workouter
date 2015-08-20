'use strict';

//Setting up route
angular.module('specificworkouts').config(['$stateProvider',
	function($stateProvider) {
		// Specificworkouts state routing
		$stateProvider.
		state('listSpecificworkouts', {
			url: '/specificworkouts',
			templateUrl: 'modules/specificworkouts/views/list-specificworkouts.client.view.html'
		}).
		state('createSpecificworkout', {
			url: '/specificworkouts/create',
			templateUrl: 'modules/specificworkouts/views/create-specificworkout.client.view.html'
		}).
		state('viewSpecificworkout', {
			url: '/specificworkouts/:specificworkoutId',
			templateUrl: 'modules/specificworkouts/views/view-specificworkout.client.view.html'
		}).
		state('editSpecificworkout', {
			url: '/specificworkouts/:specificworkoutId/edit',
			templateUrl: 'modules/specificworkouts/views/edit-specificworkout.client.view.html'
		});
	}
]);
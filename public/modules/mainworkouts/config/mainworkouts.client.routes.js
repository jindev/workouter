'use strict';

//Setting up route
angular.module('mainworkouts').config(['$stateProvider',
	function($stateProvider) {
		// Mainworkouts state routing
		$stateProvider.
		state('listMainworkouts', {
			url: '/mainworkouts',
			templateUrl: 'modules/mainworkouts/views/list-mainworkouts.client.view.html'
		}).
		state('createMainworkout', {
			url: '/mainworkouts/create',
			templateUrl: 'modules/mainworkouts/views/create-mainworkout.client.view.html'
		}).
		state('viewMainworkout', {
			url: '/mainworkouts/:mainworkoutId',
			templateUrl: 'modules/mainworkouts/views/view-mainworkout.client.view.html'
		}).
		state('editMainworkout', {
			url: '/mainworkouts/:mainworkoutId/edit',
			templateUrl: 'modules/mainworkouts/views/edit-mainworkout.client.view.html'
		});
	}
]);
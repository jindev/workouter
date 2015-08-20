'use strict';

//Mainworkouts service used to communicate Mainworkouts REST endpoints
angular.module('mainworkouts').factory('Mainworkouts', ['$resource',
	function($resource) {
		return $resource('mainworkouts/:mainworkoutId', { mainworkoutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
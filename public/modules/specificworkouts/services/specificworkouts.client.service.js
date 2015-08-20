'use strict';

//Specificworkouts service used to communicate Specificworkouts REST endpoints
angular.module('specificworkouts').factory('Specificworkouts', ['$resource',
	function($resource) {
		return $resource('specificworkouts/:specificworkoutId', { specificworkoutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('specificworkouts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Specificworkouts', 'specificworkouts', 'dropdown', '/specificworkouts(/create)?');
		Menus.addSubMenuItem('topbar', 'specificworkouts', 'List Specificworkouts', 'specificworkouts');
		Menus.addSubMenuItem('topbar', 'specificworkouts', 'New Specificworkout', 'specificworkouts/create');
	}
]);
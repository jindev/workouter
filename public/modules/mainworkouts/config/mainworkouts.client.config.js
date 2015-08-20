'use strict';

// Configuring the Articles module
angular.module('mainworkouts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Mainworkouts', 'mainworkouts', 'dropdown', '/mainworkouts(/create)?');
		Menus.addSubMenuItem('topbar', 'mainworkouts', 'List Mainworkouts', 'mainworkouts');
		Menus.addSubMenuItem('topbar', 'mainworkouts', 'New Mainworkout', 'mainworkouts/create');
	}
]);
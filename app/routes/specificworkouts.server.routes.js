'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var specificworkouts = require('../../app/controllers/specificworkouts.server.controller');

	// Specificworkouts Routes
	app.route('/specificworkouts')
		.get(specificworkouts.list)
		.post(users.requiresLogin, specificworkouts.create);

	app.route('/specificworkouts/:specificworkoutId')
		.get(specificworkouts.read)
		.put(users.requiresLogin, specificworkouts.hasAuthorization, specificworkouts.update)
		.delete(users.requiresLogin, specificworkouts.hasAuthorization, specificworkouts.delete);

	// Finish by binding the Specificworkout middleware
	app.param('specificworkoutId', specificworkouts.specificworkoutByID);
};

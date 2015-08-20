'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mainworkouts = require('../../app/controllers/mainworkouts.server.controller');

	// Mainworkouts Routes
	app.route('/mainworkouts')
		.get(mainworkouts.list)
		.post(users.requiresLogin, mainworkouts.create);

	app.route('/mainworkouts/:mainworkoutId')
		.get(mainworkouts.read)
		.put(users.requiresLogin, mainworkouts.hasAuthorization, mainworkouts.update)
		.delete(users.requiresLogin, mainworkouts.hasAuthorization, mainworkouts.delete);

	// Finish by binding the Mainworkout middleware
	app.param('mainworkoutId', mainworkouts.mainworkoutByID);
};

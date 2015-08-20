'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mainworkout = mongoose.model('Mainworkout'),
	_ = require('lodash');

/**
 * Create a Mainworkout
 */
exports.create = function(req, res) {
	var mainworkout = new Mainworkout(req.body);
	mainworkout.user = req.user;

	mainworkout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mainworkout);
		}
	});
};

/**
 * Show the current Mainworkout
 */
exports.read = function(req, res) {
	res.jsonp(req.mainworkout);
};

/**
 * Update a Mainworkout
 */
exports.update = function(req, res) {
	var mainworkout = req.mainworkout ;

	mainworkout = _.extend(mainworkout , req.body);

	mainworkout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mainworkout);
		}
	});
};

/**
 * Delete an Mainworkout
 */
exports.delete = function(req, res) {
	var mainworkout = req.mainworkout ;

	mainworkout.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mainworkout);
		}
	});
};

/**
 * List of Mainworkouts
 */
exports.list = function(req, res) { 
	Mainworkout.find().sort('-created').populate('user', 'displayName').exec(function(err, mainworkouts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mainworkouts);
		}
	});
};

/**
 * Mainworkout middleware
 */
exports.mainworkoutByID = function(req, res, next, id) { 
	Mainworkout.findById(id).populate('user', 'displayName').exec(function(err, mainworkout) {
		if (err) return next(err);
		if (! mainworkout) return next(new Error('Failed to load Mainworkout ' + id));
		req.mainworkout = mainworkout ;
		next();
	});
};

/**
 * Mainworkout authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mainworkout.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

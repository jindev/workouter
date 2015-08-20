'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Specificworkout = mongoose.model('Specificworkout'),
	_ = require('lodash');

/**
 * Create a Specificworkout
 */
exports.create = function(req, res) {
	var specificworkout = new Specificworkout(req.body);
	specificworkout.user = req.user;

	specificworkout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(specificworkout);
		}
	});
};

/**
 * Show the current Specificworkout
 */
exports.read = function(req, res) {
	res.jsonp(req.specificworkout);
};

/**
 * Update a Specificworkout
 */
exports.update = function(req, res) {
	var specificworkout = req.specificworkout ;

	specificworkout = _.extend(specificworkout , req.body);

	specificworkout.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(specificworkout);
		}
	});
};

/**
 * Delete an Specificworkout
 */
exports.delete = function(req, res) {
	var specificworkout = req.specificworkout ;

	specificworkout.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(specificworkout);
		}
	});
};

/**
 * List of Specificworkouts
 */
exports.list = function(req, res) { 
	Specificworkout.find().sort('-created').populate('user', 'displayName').exec(function(err, specificworkouts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(specificworkouts);
		}
	});
};

/**
 * Specificworkout middleware
 */
exports.specificworkoutByID = function(req, res, next, id) { 
	Specificworkout.findById(id).populate('user', 'displayName').exec(function(err, specificworkout) {
		if (err) return next(err);
		if (! specificworkout) return next(new Error('Failed to load Specificworkout ' + id));
		req.specificworkout = specificworkout ;
		next();
	});
};

/**
 * Specificworkout authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.specificworkout.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

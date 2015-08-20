'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Specificworkout = mongoose.model('Specificworkout');

/**
 * Globals
 */
var user, specificworkout;

/**
 * Unit tests
 */
describe('Specificworkout Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			specificworkout = new Specificworkout({
				name: 'Specificworkout Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return specificworkout.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			specificworkout.name = '';

			return specificworkout.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Specificworkout.remove().exec();
		User.remove().exec();

		done();
	});
});
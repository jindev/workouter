'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Specificworkout = mongoose.model('Specificworkout'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, specificworkout;

/**
 * Specificworkout routes tests
 */
describe('Specificworkout CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Specificworkout
		user.save(function() {
			specificworkout = {
				name: 'Specificworkout Name'
			};

			done();
		});
	});

	it('should be able to save Specificworkout instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Specificworkout
				agent.post('/specificworkouts')
					.send(specificworkout)
					.expect(200)
					.end(function(specificworkoutSaveErr, specificworkoutSaveRes) {
						// Handle Specificworkout save error
						if (specificworkoutSaveErr) done(specificworkoutSaveErr);

						// Get a list of Specificworkouts
						agent.get('/specificworkouts')
							.end(function(specificworkoutsGetErr, specificworkoutsGetRes) {
								// Handle Specificworkout save error
								if (specificworkoutsGetErr) done(specificworkoutsGetErr);

								// Get Specificworkouts list
								var specificworkouts = specificworkoutsGetRes.body;

								// Set assertions
								(specificworkouts[0].user._id).should.equal(userId);
								(specificworkouts[0].name).should.match('Specificworkout Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Specificworkout instance if not logged in', function(done) {
		agent.post('/specificworkouts')
			.send(specificworkout)
			.expect(401)
			.end(function(specificworkoutSaveErr, specificworkoutSaveRes) {
				// Call the assertion callback
				done(specificworkoutSaveErr);
			});
	});

	it('should not be able to save Specificworkout instance if no name is provided', function(done) {
		// Invalidate name field
		specificworkout.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Specificworkout
				agent.post('/specificworkouts')
					.send(specificworkout)
					.expect(400)
					.end(function(specificworkoutSaveErr, specificworkoutSaveRes) {
						// Set message assertion
						(specificworkoutSaveRes.body.message).should.match('Please fill Specificworkout name');
						
						// Handle Specificworkout save error
						done(specificworkoutSaveErr);
					});
			});
	});

	it('should be able to update Specificworkout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Specificworkout
				agent.post('/specificworkouts')
					.send(specificworkout)
					.expect(200)
					.end(function(specificworkoutSaveErr, specificworkoutSaveRes) {
						// Handle Specificworkout save error
						if (specificworkoutSaveErr) done(specificworkoutSaveErr);

						// Update Specificworkout name
						specificworkout.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Specificworkout
						agent.put('/specificworkouts/' + specificworkoutSaveRes.body._id)
							.send(specificworkout)
							.expect(200)
							.end(function(specificworkoutUpdateErr, specificworkoutUpdateRes) {
								// Handle Specificworkout update error
								if (specificworkoutUpdateErr) done(specificworkoutUpdateErr);

								// Set assertions
								(specificworkoutUpdateRes.body._id).should.equal(specificworkoutSaveRes.body._id);
								(specificworkoutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Specificworkouts if not signed in', function(done) {
		// Create new Specificworkout model instance
		var specificworkoutObj = new Specificworkout(specificworkout);

		// Save the Specificworkout
		specificworkoutObj.save(function() {
			// Request Specificworkouts
			request(app).get('/specificworkouts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Specificworkout if not signed in', function(done) {
		// Create new Specificworkout model instance
		var specificworkoutObj = new Specificworkout(specificworkout);

		// Save the Specificworkout
		specificworkoutObj.save(function() {
			request(app).get('/specificworkouts/' + specificworkoutObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', specificworkout.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Specificworkout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Specificworkout
				agent.post('/specificworkouts')
					.send(specificworkout)
					.expect(200)
					.end(function(specificworkoutSaveErr, specificworkoutSaveRes) {
						// Handle Specificworkout save error
						if (specificworkoutSaveErr) done(specificworkoutSaveErr);

						// Delete existing Specificworkout
						agent.delete('/specificworkouts/' + specificworkoutSaveRes.body._id)
							.send(specificworkout)
							.expect(200)
							.end(function(specificworkoutDeleteErr, specificworkoutDeleteRes) {
								// Handle Specificworkout error error
								if (specificworkoutDeleteErr) done(specificworkoutDeleteErr);

								// Set assertions
								(specificworkoutDeleteRes.body._id).should.equal(specificworkoutSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Specificworkout instance if not signed in', function(done) {
		// Set Specificworkout user 
		specificworkout.user = user;

		// Create new Specificworkout model instance
		var specificworkoutObj = new Specificworkout(specificworkout);

		// Save the Specificworkout
		specificworkoutObj.save(function() {
			// Try deleting Specificworkout
			request(app).delete('/specificworkouts/' + specificworkoutObj._id)
			.expect(401)
			.end(function(specificworkoutDeleteErr, specificworkoutDeleteRes) {
				// Set message assertion
				(specificworkoutDeleteRes.body.message).should.match('User is not logged in');

				// Handle Specificworkout error error
				done(specificworkoutDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Specificworkout.remove().exec();
		done();
	});
});
'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mainworkout = mongoose.model('Mainworkout'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mainworkout;

/**
 * Mainworkout routes tests
 */
describe('Mainworkout CRUD tests', function() {
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

		// Save a user to the test db and create new Mainworkout
		user.save(function() {
			mainworkout = {
				name: 'Mainworkout Name'
			};

			done();
		});
	});

	it('should be able to save Mainworkout instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mainworkout
				agent.post('/mainworkouts')
					.send(mainworkout)
					.expect(200)
					.end(function(mainworkoutSaveErr, mainworkoutSaveRes) {
						// Handle Mainworkout save error
						if (mainworkoutSaveErr) done(mainworkoutSaveErr);

						// Get a list of Mainworkouts
						agent.get('/mainworkouts')
							.end(function(mainworkoutsGetErr, mainworkoutsGetRes) {
								// Handle Mainworkout save error
								if (mainworkoutsGetErr) done(mainworkoutsGetErr);

								// Get Mainworkouts list
								var mainworkouts = mainworkoutsGetRes.body;

								// Set assertions
								(mainworkouts[0].user._id).should.equal(userId);
								(mainworkouts[0].name).should.match('Mainworkout Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mainworkout instance if not logged in', function(done) {
		agent.post('/mainworkouts')
			.send(mainworkout)
			.expect(401)
			.end(function(mainworkoutSaveErr, mainworkoutSaveRes) {
				// Call the assertion callback
				done(mainworkoutSaveErr);
			});
	});

	it('should not be able to save Mainworkout instance if no name is provided', function(done) {
		// Invalidate name field
		mainworkout.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mainworkout
				agent.post('/mainworkouts')
					.send(mainworkout)
					.expect(400)
					.end(function(mainworkoutSaveErr, mainworkoutSaveRes) {
						// Set message assertion
						(mainworkoutSaveRes.body.message).should.match('Please fill Mainworkout name');
						
						// Handle Mainworkout save error
						done(mainworkoutSaveErr);
					});
			});
	});

	it('should be able to update Mainworkout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mainworkout
				agent.post('/mainworkouts')
					.send(mainworkout)
					.expect(200)
					.end(function(mainworkoutSaveErr, mainworkoutSaveRes) {
						// Handle Mainworkout save error
						if (mainworkoutSaveErr) done(mainworkoutSaveErr);

						// Update Mainworkout name
						mainworkout.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mainworkout
						agent.put('/mainworkouts/' + mainworkoutSaveRes.body._id)
							.send(mainworkout)
							.expect(200)
							.end(function(mainworkoutUpdateErr, mainworkoutUpdateRes) {
								// Handle Mainworkout update error
								if (mainworkoutUpdateErr) done(mainworkoutUpdateErr);

								// Set assertions
								(mainworkoutUpdateRes.body._id).should.equal(mainworkoutSaveRes.body._id);
								(mainworkoutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mainworkouts if not signed in', function(done) {
		// Create new Mainworkout model instance
		var mainworkoutObj = new Mainworkout(mainworkout);

		// Save the Mainworkout
		mainworkoutObj.save(function() {
			// Request Mainworkouts
			request(app).get('/mainworkouts')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mainworkout if not signed in', function(done) {
		// Create new Mainworkout model instance
		var mainworkoutObj = new Mainworkout(mainworkout);

		// Save the Mainworkout
		mainworkoutObj.save(function() {
			request(app).get('/mainworkouts/' + mainworkoutObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mainworkout.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mainworkout instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mainworkout
				agent.post('/mainworkouts')
					.send(mainworkout)
					.expect(200)
					.end(function(mainworkoutSaveErr, mainworkoutSaveRes) {
						// Handle Mainworkout save error
						if (mainworkoutSaveErr) done(mainworkoutSaveErr);

						// Delete existing Mainworkout
						agent.delete('/mainworkouts/' + mainworkoutSaveRes.body._id)
							.send(mainworkout)
							.expect(200)
							.end(function(mainworkoutDeleteErr, mainworkoutDeleteRes) {
								// Handle Mainworkout error error
								if (mainworkoutDeleteErr) done(mainworkoutDeleteErr);

								// Set assertions
								(mainworkoutDeleteRes.body._id).should.equal(mainworkoutSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mainworkout instance if not signed in', function(done) {
		// Set Mainworkout user 
		mainworkout.user = user;

		// Create new Mainworkout model instance
		var mainworkoutObj = new Mainworkout(mainworkout);

		// Save the Mainworkout
		mainworkoutObj.save(function() {
			// Try deleting Mainworkout
			request(app).delete('/mainworkouts/' + mainworkoutObj._id)
			.expect(401)
			.end(function(mainworkoutDeleteErr, mainworkoutDeleteRes) {
				// Set message assertion
				(mainworkoutDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mainworkout error error
				done(mainworkoutDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mainworkout.remove().exec();
		done();
	});
});
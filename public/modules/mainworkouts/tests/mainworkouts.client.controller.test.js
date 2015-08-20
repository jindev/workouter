'use strict';

(function() {
	// Mainworkouts Controller Spec
	describe('Mainworkouts Controller Tests', function() {
		// Initialize global variables
		var MainworkoutsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Mainworkouts controller.
			MainworkoutsController = $controller('MainworkoutsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mainworkout object fetched from XHR', inject(function(Mainworkouts) {
			// Create sample Mainworkout using the Mainworkouts service
			var sampleMainworkout = new Mainworkouts({
				name: 'New Mainworkout'
			});

			// Create a sample Mainworkouts array that includes the new Mainworkout
			var sampleMainworkouts = [sampleMainworkout];

			// Set GET response
			$httpBackend.expectGET('mainworkouts').respond(sampleMainworkouts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mainworkouts).toEqualData(sampleMainworkouts);
		}));

		it('$scope.findOne() should create an array with one Mainworkout object fetched from XHR using a mainworkoutId URL parameter', inject(function(Mainworkouts) {
			// Define a sample Mainworkout object
			var sampleMainworkout = new Mainworkouts({
				name: 'New Mainworkout'
			});

			// Set the URL parameter
			$stateParams.mainworkoutId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mainworkouts\/([0-9a-fA-F]{24})$/).respond(sampleMainworkout);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mainworkout).toEqualData(sampleMainworkout);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mainworkouts) {
			// Create a sample Mainworkout object
			var sampleMainworkoutPostData = new Mainworkouts({
				name: 'New Mainworkout'
			});

			// Create a sample Mainworkout response
			var sampleMainworkoutResponse = new Mainworkouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Mainworkout'
			});

			// Fixture mock form input values
			scope.name = 'New Mainworkout';

			// Set POST response
			$httpBackend.expectPOST('mainworkouts', sampleMainworkoutPostData).respond(sampleMainworkoutResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mainworkout was created
			expect($location.path()).toBe('/mainworkouts/' + sampleMainworkoutResponse._id);
		}));

		it('$scope.update() should update a valid Mainworkout', inject(function(Mainworkouts) {
			// Define a sample Mainworkout put data
			var sampleMainworkoutPutData = new Mainworkouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Mainworkout'
			});

			// Mock Mainworkout in scope
			scope.mainworkout = sampleMainworkoutPutData;

			// Set PUT response
			$httpBackend.expectPUT(/mainworkouts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mainworkouts/' + sampleMainworkoutPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mainworkoutId and remove the Mainworkout from the scope', inject(function(Mainworkouts) {
			// Create new Mainworkout object
			var sampleMainworkout = new Mainworkouts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mainworkouts array and include the Mainworkout
			scope.mainworkouts = [sampleMainworkout];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mainworkouts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMainworkout);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mainworkouts.length).toBe(0);
		}));
	});
}());
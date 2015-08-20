'use strict';

(function() {
	// Specificworkouts Controller Spec
	describe('Specificworkouts Controller Tests', function() {
		// Initialize global variables
		var SpecificworkoutsController,
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

			// Initialize the Specificworkouts controller.
			SpecificworkoutsController = $controller('SpecificworkoutsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Specificworkout object fetched from XHR', inject(function(Specificworkouts) {
			// Create sample Specificworkout using the Specificworkouts service
			var sampleSpecificworkout = new Specificworkouts({
				name: 'New Specificworkout'
			});

			// Create a sample Specificworkouts array that includes the new Specificworkout
			var sampleSpecificworkouts = [sampleSpecificworkout];

			// Set GET response
			$httpBackend.expectGET('specificworkouts').respond(sampleSpecificworkouts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.specificworkouts).toEqualData(sampleSpecificworkouts);
		}));

		it('$scope.findOne() should create an array with one Specificworkout object fetched from XHR using a specificworkoutId URL parameter', inject(function(Specificworkouts) {
			// Define a sample Specificworkout object
			var sampleSpecificworkout = new Specificworkouts({
				name: 'New Specificworkout'
			});

			// Set the URL parameter
			$stateParams.specificworkoutId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/specificworkouts\/([0-9a-fA-F]{24})$/).respond(sampleSpecificworkout);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.specificworkout).toEqualData(sampleSpecificworkout);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Specificworkouts) {
			// Create a sample Specificworkout object
			var sampleSpecificworkoutPostData = new Specificworkouts({
				name: 'New Specificworkout'
			});

			// Create a sample Specificworkout response
			var sampleSpecificworkoutResponse = new Specificworkouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Specificworkout'
			});

			// Fixture mock form input values
			scope.name = 'New Specificworkout';

			// Set POST response
			$httpBackend.expectPOST('specificworkouts', sampleSpecificworkoutPostData).respond(sampleSpecificworkoutResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Specificworkout was created
			expect($location.path()).toBe('/specificworkouts/' + sampleSpecificworkoutResponse._id);
		}));

		it('$scope.update() should update a valid Specificworkout', inject(function(Specificworkouts) {
			// Define a sample Specificworkout put data
			var sampleSpecificworkoutPutData = new Specificworkouts({
				_id: '525cf20451979dea2c000001',
				name: 'New Specificworkout'
			});

			// Mock Specificworkout in scope
			scope.specificworkout = sampleSpecificworkoutPutData;

			// Set PUT response
			$httpBackend.expectPUT(/specificworkouts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/specificworkouts/' + sampleSpecificworkoutPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid specificworkoutId and remove the Specificworkout from the scope', inject(function(Specificworkouts) {
			// Create new Specificworkout object
			var sampleSpecificworkout = new Specificworkouts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Specificworkouts array and include the Specificworkout
			scope.specificworkouts = [sampleSpecificworkout];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/specificworkouts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSpecificworkout);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.specificworkouts.length).toBe(0);
		}));
	});
}());
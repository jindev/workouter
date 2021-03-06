'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Specificworkout Schema
 */
var SpecificworkoutSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Specificworkout name',
		trim: true
	},
	type: {
		type: String,
		default: '',
		required: 'Please fill Specificworkout type',
		trim: true
	},
	url:{
		type : String,
		default : '',
		trim : true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Specificworkout', SpecificworkoutSchema);

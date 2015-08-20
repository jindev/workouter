'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mainworkout Schema
 */
var MainworkoutSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Mainworkout name',
		trim: true
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

mongoose.model('Mainworkout', MainworkoutSchema);
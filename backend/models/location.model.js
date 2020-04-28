const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		node: {
			type: Object,
			required: true,
		},
		world: {
			type: String,
			required: true,
		},
		campaign: {
			type: String,
			required: true,
		},
		factions: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

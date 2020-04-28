const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const worldSchema = new Schema(
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
		size: {
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

const World = mongoose.model('World', worldSchema);

module.exports = World;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaignSchema = new Schema(
	{
		name: {
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

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

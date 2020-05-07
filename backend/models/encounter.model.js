const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const encounterSchema = new Schema(
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
			required: false,
		},
		world: {
			type: String,
			required: true,
		},
		campaign: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		factions: {
			type: String,
			required: false,
		},
		playerCharacters: {
			type: Array,
			required: false,
		},
		npc: {
			type: Array,
			required: false,
		},
		monsters: {
			type: Array,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Encounter = mongoose.model('Encounter', encounterSchema);

module.exports = Encounter;

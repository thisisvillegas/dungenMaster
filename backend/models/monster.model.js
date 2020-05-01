const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monsterSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		node: {
			type: Object,
			required: false,
		},
		desc: {
			type: String,
			required: true,
		},
		level: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		world: {
			type: String,
			required: false,
		},
		worlds: {
			type: Array,
			required: false,
		},
		campaigns: {
			type: Array,
			required: false,
		},
		locations: {
			type: Array,
			required: false,
		},
		encounters: {
			type: Array,
			required: false,
		},
		alignment: {
			type: String,
			required: false,
		},
		armorClass: {
			type: Number,
			required: false,
		},
		hitPoints: {
			type: Number,
			required: false,
		},
		speed: {
			type: Number,
			required: false,
		},
		str: {
			type: Number,
			required: false,
		},
		dex: {
			type: Number,
			required: false,
		},
		con: {
			type: Number,
			required: false,
		},
		int: {
			type: Number,
			required: false,
		},
		wis: {
			type: Number,
			required: false,
		},
		cha: {
			type: Number,
			required: false,
		},
		damageResistances: {
			type: String,
			required: false,
		},
		damageImmunities: {
			type: String,
			required: false,
		},
		conditionImmunities: {
			type: String,
			required: false,
		},
		savingThrows: {
			type: String,
			required: false,
		},
		skills: {
			type: String,
			required: false,
		},
		senses: {
			type: String,
			required: false,
		},
		languages: {
			type: String,
			required: false,
		},
		abilities: {
			type: String,
			required: false,
		},
		actions: {
			type: String,
			required: false,
		},
		challenge: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;

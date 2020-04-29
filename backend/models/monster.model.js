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
		characterClass: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;

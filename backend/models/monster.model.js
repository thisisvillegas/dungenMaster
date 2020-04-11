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
			required: true,
		},
		world: {
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

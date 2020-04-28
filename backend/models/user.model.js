const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		firstName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		lastName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
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

const User = mongoose.model('User', userSchema);

module.exports = User;

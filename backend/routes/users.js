const router = require('express').Router();
let User = require('../models/user.model');

//TODO update and delete

router.route('/').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	console.log(req.body);
	const username = req.body.username;
	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json('User Added!'))
		.catch(err => res.status(400).json(err));
});

module.exports = router;

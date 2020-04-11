const router = require('express').Router();
const User = require('../models/User.model');

router.route('/').get((req, res) => {
	User.find()
		.then(User => res.json(User))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	let userRoute = `/admin/users/${req.body.username}`;

	let nodePackage = {
		[`${userRoute}`]: {
			path: `${userRoute}`,
			type: 'file',
			category: 'users',
			content: 'some stuff',
		},
	};
	const username = req.body.username;
	const node = nodePackage;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;

	const newUser = new User({
		username,
		node,
		firstName,
		lastName,
	});
	console.log('newUser', newUser);
	newUser
		.save()
		.then(() => res.json('User was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	User.findById(req.params.id)
		.then(User => res.json(User))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(User => res.json('User Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	User.findByIdAndUpdate(req.params.id)
		.then(User => {
			User.username = req.body.username;
			User.node = req.body.node;
			User.firstName = req.body.firstName;
			User.lastName = req.body.lastName;

			User.save()
				.then(() => res.json('User updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

const router = require('express').Router();
const Location = require('../models/location.model');

router.route('/').get((req, res) => {
	Location.find()
		.then(Location => res.json(Location))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	let locationRoute = `/root/${req.body.world}/${req.body.campaign}/${req.body.name}`;

	let nodePackage = {
		[`${locationRoute}`]: {
			path: `${locationRoute}`,
			type: 'folder',
			category: 'locations',
			children: [],
		},
	};

	console.log(req.body);
	const name = req.body.name;
	const node = nodePackage;
	const world = req.body.world;
	const campaign = req.body.campaign;
	const factions = Number(req.body.factions);

	const newLocation = new Location({
		name,
		node,
		world,
		campaign,
		factions,
	});

	newLocation
		.save()
		.then(() => res.json('Location was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	Location.findById(req.params.id)
		.then(Location => res.json(Location))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	Location.findByIdAndDelete(req.params.id)
		.then(Location => res.json('Location Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id)
		.then(Location => {
			Location.name = req.body.name;
			Location.node = req.body.node;
			Location.world = req.body.world;
			Location.campaign = req.body.campaign;
			Location.factions = Number(req.body.factions);

			Location.save()
				.then(() => res.json('Location updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

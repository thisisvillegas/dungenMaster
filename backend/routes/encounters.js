const router = require('express').Router();
const Encounter = require('../models/encounter.model');

router.route('/').get((req, res) => {
	Encounter.find()
		.then(Encounter => res.json(Encounter))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	let encounterRoute = `/root/${req.body.world}/${req.body.campaign}/${req.body.location}/${req.body.name}`;

	let nodePackage = {
		[`${encounterRoute}`]: {
			path: `${encounterRoute}`,
			type: 'file',
			category: 'encounters',
			content: 'some stuff',
		},
	};
	console.log(req.body);
	const name = req.body.name;
	const node = nodePackage;
	const world = req.body.world;
	const campaign = req.body.campaign;
	const location = req.body.location;
	const factions = Number(req.body.factions);

	const newEncounter = new Encounter({
		name,
		node,
		world,
		campaign,
		location,
		factions,
	});

	newEncounter
		.save()
		.then(() => res.json('Encounter was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	Encounter.findById(req.params.id)
		.then(Encounter => res.json(Encounter))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	Encounter.findByIdAndDelete(req.params.id)
		.then(Encounter => res.json('Encounter Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id)
		.then(Encounter => {
			Encounter.name = req.body.name;
			Encounter.node = req.body.node;
			Encounter.world = req.body.world;
			Encounter.campaign = req.body.campaign;
			Encounter.location = req.body.location;
			Encounter.factions = Number(req.body.factions);

			Encounter.save()
				.then(() => res.json('Encounter updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

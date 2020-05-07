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
	const name = req.body.name;
	const type = 'encounters';
	const node = nodePackage;
	const world = req.body.world;
	const campaign = req.body.campaign;
	const location = req.body.location;
	const factions = req.body.factions;
	const playerCharacters = req.body.playerCharacters;
	const monsters = req.body.monsters;
	const npc = req.body.npc;

	const newEncounter = new Encounter({
		name,
		type,
		node,
		world,
		campaign,
		location,
		factions,
		playerCharacters,
		monsters,
		npc,
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
	Encounter.findByIdAndUpdate(req.params.id)
		.then(encounter => {
			// console.log('req.body', req.body);
			encounter.name = req.body.name;
			encounter.world = req.body.world;
			encounter.campaign = req.body.campaign;
			encounter.location = req.body.location;
			encounter.factions = req.body.factions;
			encounter.playerCharacters = req.body.playerCharacters;
			encounter.monsters = req.body.monsters;
			encounter.npc = req.body.npc;

			console.log('encounter', encounter);
			encounter
				.save()
				.then(() => res.json('Encounter updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

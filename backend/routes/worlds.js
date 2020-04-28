const router = require('express').Router();
const World = require('../models/world.model');

router.route('/').get((req, res) => {
	World.find()
		.then(world => res.json(world))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	let worldRoute = `/root/${req.body.name}`;
	let nodePackage = {
		[`${worldRoute}`]: {
			path: `${worldRoute}`,
			type: 'folder',
			category: 'worlds',
			children: [],
		},
	};

	const name = req.body.name;
	const type = 'worlds';
	const node = nodePackage;
	const size = req.body.size;
	const factions = Number(req.body.factions);

	const newWorld = new World({
		name,
		type,
		node,
		size,
		factions,
	});

	newWorld
		.save()
		.then(() => res.json('World was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	World.findById(req.params.id)
		.then(world => res.json(world))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	World.findByIdAndDelete(req.params.id)
		.then(world => res.json('World Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	World.findByIdAndUpdate(req.params.id)
		.then(world => {
			world.size = req.body.size;
			world.factions = Number(req.body.factions);
			world
				.save()
				.then(() => res.json('World updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

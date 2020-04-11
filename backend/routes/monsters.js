const router = require('express').Router();
const Monster = require('../models/monster.model');

router.route('/').get((req, res) => {
	Monster.find()
		.then(monster => res.json(monster))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	let monsterRoute = `/admin/monsters/${req.body.name}`;

	let nodePackage = {
		[`${monsterRoute}`]: {
			path: `${monsterRoute}`,
			type: 'file',
			category: 'monsters',
			content: 'some stuff',
		},
	};
	const name = req.body.name;
	const node = nodePackage;
	const world = req.body.world;

	const newMonster = new Monster({
		name,
		node,
		world,
	});

	newMonster
		.save()
		.then(() => res.json('Monster was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	Monster.findById(req.params.id)
		.then(monster => res.json(monster))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	Monster.findByIdAndDelete(req.params.id)
		.then(monster => res.json('Monster Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id)
		.then(monster => {
			monster.name = req.body.name;
			monster.node = req.body.node;
			monster.world = req.body.world;

			Monster.save()
				.then(() => res.json('Monster updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

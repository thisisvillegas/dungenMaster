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
	const desc = req.body.desc;
	const level = req.body.level;
	const type = 'monsters';

	const world = req.body.world;
	const worlds = req.body.worlds;
	const campaigns = req.body.campaigns;
	const locations = req.body.locations;
	const encounters = req.body.encounters;

	const alignment = req.body.alignment;
	const armorClass = req.body.armorClass;
	const hitPoints = req.body.hitPoints;
	const speed = req.body.speed;
	const str = req.body.str;
	const dex = req.body.dex;
	const con = req.body.con;
	const int = req.body.int;
	const wis = req.body.wis;
	const cha = req.body.cha;
	const damageResistances = req.body.damageResistances;
	const damageImmunities = req.body.damageImmunities;
	const conditionImmunities = req.body.conditionImmunities;
	const savingThrows = req.body.savingThrows;
	const skills = req.body.skills;
	const senses = req.body.senses;
	const languages = req.body.languages;
	const challenge = req.body.challenge;
	const abilities = req.body.abilities;
	const actions = req.body.actions;

	const newMonster = new Monster({
		name,
		node,
		desc,
		level,
		type,
		world,
		worlds,
		campaigns,
		locations,
		encounters,
		alignment,
		armorClass,
		hitPoints,
		speed,
		str,
		dex,
		con,
		int,
		wis,
		cha,
		damageResistances,
		damageImmunities,
		conditionImmunities,
		savingThrows,
		skills,
		senses,
		languages,
		challenge,
		abilities,
		actions,
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
	Monster.findByIdAndUpdate(req.params.id)
		.then(monster => {
			monster.name = req.body.name;
			monster.desc = req.body.desc;
			monster.level = req.body.level;
			monster.world = req.body.world;
			monster.alignment = req.body.alignment;
			monster.armorClass = req.body.armorClass;
			monster.hitPoints = req.body.hitPoints;
			monster.speed = req.body.speed;
			monster.str = req.body.str;
			monster.dex = req.body.dex;
			monster.con = req.body.con;
			monster.int = req.body.int;
			monster.wis = req.body.wis;
			monster.cha = req.body.cha;
			monster.damageResistances = req.body.damageResistances;
			monster.damageImmunities = req.body.damageImmunities;
			monster.conditionImmunities = req.body.conditionImmunities;
			monster.savingThrows = req.body.savingThrows;
			monster.skills = req.body.skills;
			monster.senses = req.body.senses;
			monster.languages = req.body.languages;
			monster.challenge = req.body.challenge;
			monster.abilities = req.body.abilities;
			monster.actions = req.body.actions;

			monster
				.save()
				.then(() => res.json('Monster updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => {
			res.status(400).json(err);
			console.log('err', err);
		});
});
module.exports = router;

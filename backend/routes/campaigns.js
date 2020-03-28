const router = require('express').Router();
const Campaign = require('../models/campaign.model');

router.route('/').get((req, res) => {
	Campaign.find()
		.then(Campaign => res.json(Campaign))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	console.log(req.body);
	const name = req.body.name;
	const node = req.body.node;
	const world = req.body.world;
	const factions = Number(req.body.factions);

	const newCampaign = new Campaign({
		name,
		node,
		world,
		factions,
	});

	newCampaign
		.save()
		.then(() => res.json('Campaign was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	Campaign.findById(req.params.id)
		.then(Campaign => res.json(Campaign))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	Campaign.findByIdAndDelete(req.params.id)
		.then(Campaign => res.json('Campaign Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id)
		.then(Campaign => {
			Campaign.name = req.body.name;
			Campaign.node = req.body.node;
			Campaign.world = req.body.world;
			Campaign.factions = Number(req.body.factions);

			Campaign.save()
				.then(() => res.json('Campaign updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
	Exercise.find()
		.then(exercises => res.json(exercises))
		.catch(err => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
	console.log(req.body);
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date,
	});

	newExercise
		.save()
		.then(() => res.json('Exercise was Added!'))
		.catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
	console.log(req.params);
	Exercise.findById(req.params.id)
		.then(exercise => res.json(exercise))
		.catch(err => res.status(404).json(err));
});

router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(exercise => res.json('Exercise Deleted'))
		.catch(err => res.status(400).json(err));
});

router.route('/update/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id)
		.then(exercise => {
			exercise.username = req.body.username;
			exercise.description = req.body.description;
			exercise.duration = Number(req.body.duration);
			exercise.date = Date.parse(req.body.date);

			exercise
				.save()
				.then(() => res.json('Exercise updated'))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});
module.exports = router;

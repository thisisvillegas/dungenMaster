const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

const uri = process.env.ATLAS_URI;
console.log(uri);
// const uri = 'mongodb+srv://databaseMaster:dungen@cluster0-da853.mongodb.net/test?retryWrites=true&w=majority';
// const uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const worldsRouter = require('./routes/worlds');
const campaignsRouter = require('./routes/campaigns');
const locationsRouter = require('./routes/locations');
const encountersRouter = require('./routes/encounters');
const monstersRouter = require('./routes/monsters');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/worlds', worldsRouter);
app.use('/campaigns', campaignsRouter);
app.use('/locations', locationsRouter);
app.use('/encounters', encountersRouter);
app.use('/monsters', monstersRouter);

app.listen(port, () => {
	console.log(`Server is running on port; ${port}`);
});

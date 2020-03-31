import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/css/sideNav.css';
import 'typeface-roboto';

// import Navbar from './components/navbar.component';
// import ExerciseList from './components/exercises-list.component';
// import EditExercise from './components/edit-exercises.component';
// import CreateExercise from './components/create-exercise.component';
// import CreateUser from './components/create-user.component';

// import TreeNav from './components/global/materialTree.component';

import Worlds from './components/world/worlds.component';
// import CreateWorld from './components/world/create-world.component';
// import EditWorld from './components/world/edit-world.component';

// import Campaigns from './components/campaign/campaigns.component';
// import Locations from './components/location/locations.component';
// import Encounters from './components/encounter/encounters.component';

// import Users from './components/user/users.component';
// import Monsters from './components/monster/monsters.component';
// import Items from './components/item/items.component';
// import Maps from './components/map/maps.component';

// import Splash from './components/splash.component';

// import Explorer from './components/global/components/App';
import Explorer2 from './components/global/components/FileExplorer';

function App() {
	return (
		<Router>
			<div>
				<Explorer2 />
			</div>
		</Router>
	);
}

export default App;

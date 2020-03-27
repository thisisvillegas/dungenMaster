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

// import Worlds from './components/world/worlds.component';
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

import Explorer from './components/global/components/App';

function App() {
	return (
		<Router>
			<div>
				<section class="blk-sect" id="i9icj">
					<div class="row" id="ix3s">
						<div id="nav" title="navspace" class="cell">
							{/* <TreeNav /> */}
							<Explorer />
						</div>
						{/* <div class="cell" id="i817">
							<div className="container">
								<br />
								<Route path="/" exact component={Splash} />
								<Route path="/splash" exact component={Splash} />
								<Route path="/edit/:id" exact component={EditExercise} />
								<Route path="/create" exact component={CreateExercise} />
								<Route path="/user" exact component={CreateUser} />

								<Route path="/worlds" exact component={Worlds} />
								<Route path="/createworld" exact component={CreateWorld} />
								<Route path="/editworld/:id" exact component={EditWorld} />

								<Route path="/campaigns" exact component={Campaigns} />
								<Route path="/locations" exact component={Locations} />
								<Route path="/encounters" exact component={Encounters} />
								<Route path="/users" exact component={Users} />
								<Route path="/monsters" exact component={Monsters} />
								<Route path="/items" exact component={Items} />
								<Route path="/maps" exact component={Maps} />
							</div>
						</div> */}
					</div>
				</section>
			</div>
		</Router>
	);
}

export default App;

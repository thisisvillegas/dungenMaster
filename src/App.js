import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './components/css/sideNav.css';
import 'typeface-roboto';
import Explorer2 from './components/global/components/FileExplorer';
require('dotenv').config();

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

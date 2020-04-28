import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
// import { Link } from 'react-router-dom';
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from '../components/navbar.component';

import CreateWorlds from '../../world/create-world.component';
import EditWorlds from '../../world/edit-world.component';

import CreateCampaign from '../../campaign/create-campaign.component';
import EditCampaigns from '../../campaign/edit-campaign.component';

import CreateLocation from '../../location/create-location.component';

import CreateEncounter from '../../encounter/create-encounter.component';

import EncounterBuilder from '../../encounter/encounter.builder.component';

import Users from '../../user/user.component';
import CreateUser from '../../user/create-user.component';

import Monsters from '../../monster/monster.component';
import CreateMonster from '../../monster/create-monster.component';

import Splash from '../../splash.component';
import ObjView from '../../global/object.view.component';
import ObjList from '../object.list.component';

const StyledFileExplorer = styled.div`
	width: 100%;
	max-width: 100%;
	display: flex;
	background-color: black;
	color: white;
`;

const TreeWrapper = styled.div`
	width: 300px;
	background-color: black;
	height: 1000px;
	padding-top: 15px;
`;

export default class FileExplorer extends Component {
	state = {
		selectedFile: null,
	};

	onSelect = file => this.setState({ selectedFile: file });

	render() {
		// eslint-disable-next-line
		const { selectedFile } = this.state;

		return (
			<div>
				<NavBar />

				<StyledFileExplorer>
					<TreeWrapper>
						<Tree onSelect={this.onSelect} />
					</TreeWrapper>

					<div align={'center'} style={{ display: 'inline', width: '1620px' }}>
						{/* {selectedFile && selectedFile.type === 'file' && selectedFile.content} */}
						<Route path="/createworld" exact component={CreateWorlds} />
						<Route path="/editworld/:id" exact component={EditWorlds} />

						<Route path="/createcampaign" exact component={CreateCampaign} />
						<Route path="/editcampaign/:id" exact component={EditCampaigns} />

						<Route path="/createlocation" exact component={CreateLocation} />

						<Route path="/createencounter" exact component={CreateEncounter} />

						<Route path="/users" exact component={Users} />
						<Route path="/createuser" exact component={CreateUser} />

						<Route path="/monsters" exact component={Monsters} />
						<Route path="/createmonster" exact component={CreateMonster} />

						<Route path="/" exact component={Splash} />
						<Route path="/splash" exact component={Splash} />

						<Route path="/view/:id" exact component={ObjView} />
						<Route path="/list/:type" exact component={ObjList} />

						<Route path="/encounterbuilder" exact component={EncounterBuilder} />
					</div>
					{/* <div>stuff</div> */}
				</StyledFileExplorer>
			</div>
		);
	}
}

import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Worlds from '../../world/worlds.component';
import CreateWorlds from '../../world/create-world.component';
import EditWorlds from '../../world/edit-world.component';
import Campaigns from '../../campaign/campaigns.component';
import Splash from '../../splash.component';

const StyledFileExplorer = styled.div`
	width: 100%;
	max-width: 100%;
	display: flex;
`;

const TreeWrapper = styled.div`
	width: 300px;
`;

export default class FileExplorer extends Component {
	state = {
		selectedFile: null,
	};

	onSelect = file => this.setState({ selectedFile: file });

	render() {
		const { selectedFile } = this.state;

		return (
			<StyledFileExplorer>
				<TreeWrapper>
					<Tree onSelect={this.onSelect} />
				</TreeWrapper>

				<div>
					{/* {selectedFile && selectedFile.type === 'file' && selectedFile.content} */}
					<Route path="/worlds" exact component={Worlds} />
					<Route path="/createworld" exact component={CreateWorlds} />
					<Route path="/editworld" exact component={EditWorlds} />
					<Route path="/campaigns" exact component={Campaigns} />
					<Route path="/" exact component={Splash} />
					<Route path="/splash" exact component={Splash} />
				</div>
			</StyledFileExplorer>
		);
	}
}

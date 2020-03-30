import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Worlds from '../../world/worlds.component';
import Campaigns from '../../campaign/campaigns.component';

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
					<Router>
						{selectedFile && selectedFile.type === 'file' && selectedFile.content}
						<Route path="/worlds" exact component={Worlds} />
						<Route path="/campaigns" exact component={Campaigns} />
					</Router>
				</div>
			</StyledFileExplorer>
		);
	}
}

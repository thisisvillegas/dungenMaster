import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';

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
				<div>{selectedFile && selectedFile.type === 'file' && selectedFile.content}</div>
			</StyledFileExplorer>
		);
	}
}

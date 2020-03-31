import React, { Component } from 'react';
import axios from 'axios';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode';

let rooter = {
	'/root': {
		path: '/root',
		category: 'splash',
		type: 'folder',
		isRoot: true,
		children: [],
	},
};

async function getData() {
	function getWorlds() {
		return axios.get('http://localhost:5000/worlds/');
	}

	function getCampaigns() {
		return axios.get('http://localhost:5000/campaigns/');
	}

	function getLocations() {
		return axios.get('http://localhost:5000/locations/');
	}

	function getEcounters() {
		return axios.get('http://localhost:5000/encounters/');
	}

	axios.all([getWorlds(), getCampaigns(), getLocations(), getEcounters()]).then(
		axios.spread(function(worlds, campaigns, locations, encounters) {
			for (let index = 0; index < worlds.data.length; index++) {
				Object.assign(rooter, worlds.data[index].node);
				rooter[`/root`].children.push(Object.keys(worlds.data[index].node));
				// console.log('worlds.data[index].node', worlds.data[index].node);
			}

			for (let index = 0; index < campaigns.data.length; index++) {
				Object.assign(rooter, campaigns.data[index].node);
				rooter[`/root/${campaigns.data[index].world}`].children.push(Object.keys(campaigns.data[index].node));
			}

			for (let index = 0; index < locations.data.length; index++) {
				Object.assign(rooter, locations.data[index].node);
				rooter[`/root/${locations.data[index].world}/${locations.data[index].campaign}`].children.push(
					Object.keys(locations.data[index].node)
				);
			}

			for (let index = 0; index < encounters.data.length; index++) {
				Object.assign(rooter, encounters.data[index].node);
				rooter[
					`/root/${encounters.data[index].world}/${encounters.data[index].campaign}/${encounters.data[index].location}`
				].children.push(Object.keys(encounters.data[index].node));
			}
			// console.log('rooter', rooter);
		})
	);
}

export default class Tree extends Component {
	state = {
		nodes: rooter,
	};

	componentDidMount() {
		getData();
	}

	getRootNodes = () => {
		const { nodes } = this.state;
		return values(nodes).filter(node => node.isRoot === true);
	};

	getChildNodes = node => {
		const { nodes } = this.state;
		if (!node.children) return [];
		return node.children.map(path => nodes[path]);
	};

	onToggle = node => {
		const { nodes } = this.state;
		nodes[node.path].isOpen = !node.isOpen;
		this.setState({ nodes });
	};

	onNodeSelect = node => {
		const { onSelect } = this.props;
		onSelect(node);
	};

	render() {
		const rootNodes = this.getRootNodes();
		return (
			<div>
				{rootNodes.map(node => (
					<TreeNode
						node={node}
						key={node}
						getChildNodes={this.getChildNodes}
						onToggle={this.onToggle}
						onNodeSelect={this.onNodeSelect}
					/>
				))}
			</div>
		);
	}
}

Tree.propTypes = {
	onSelect: PropTypes.func.isRequired,
};

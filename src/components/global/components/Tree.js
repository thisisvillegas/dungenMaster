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
	'/admin': {
		path: '/admin',
		category: 'splash',
		type: 'folder',
		isRoot: true,
		children: ['/admin/users', '/admin/monsters'],
	},
	'/admin/users': {
		path: '/admin/users',
		category: 'users',
		type: 'folder',
		children: [],
	},
	'/admin/monsters': {
		path: '/admin/monsters',
		category: 'monsters',
		type: 'folder',
		children: [],
	},
};

async function getData() {
	function getWorlds() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`);
	}

	function getCampaigns() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/`);
	}

	function getLocations() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/locations/`);
	}

	function getEcounters() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/encounters/`);
	}

	function getMonsters() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/monsters/`);
	}

	function getUsers() {
		return axios.get(`${process.env.REACT_APP_LOCAL_DB}/users/`);
	}

	let worldArray = [],
		campaignArray = [],
		locationArray = [],
		encounterArray = [],
		monsterArray = [],
		userArray = [],
		nugget = {};

	axios.all([getWorlds(), getCampaigns(), getLocations(), getEcounters(), getMonsters(), getUsers()]).then(
		axios.spread(function(worlds, campaigns, locations, encounters, monsters, users) {
			for (let i = 0; i < worlds.data.length; i++) {
				Object.assign(rooter, worlds.data[i].node);
				rooter[`/root`].children.push(Object.keys(worlds.data[i].node));
				worldArray.push(worlds.data[i]);
			}

			for (let i = 0; i < campaigns.data.length; i++) {
				Object.assign(rooter, campaigns.data[i].node);
				// console.log('campaigns.data[i]', campaigns.data[i]);
				rooter[`/root/${campaigns.data[i].world}`].children.push(Object.keys(campaigns.data[i].node));
				campaignArray.push(campaigns.data[i]);
			}

			for (let i = 0; i < locations.data.length; i++) {
				// console.log('locations.data[i].campaign', locations.data[i].campaign);
				Object.assign(rooter, locations.data[i].node);
				rooter[`/root/${locations.data[i].world}/${locations.data[i].campaign}`].children.push(
					Object.keys(locations.data[i].node)
				);
				locationArray.push(locations.data[i]);
			}

			for (let i = 0; i < encounters.data.length; i++) {
				Object.assign(rooter, encounters.data[i].node);
				rooter[
					`/root/${encounters.data[i].world}/${encounters.data[i].campaign}/${encounters.data[i].location}`
				].children.push(Object.keys(encounters.data[i].node));
				encounterArray.push(encounters.data[i]);
			}

			for (let i = 0; i < monsters.data.length; i++) {
				// console.log('monsters.data[i].node', monsters.data[i].node);
				Object.assign(rooter, monsters.data[i].node);
				rooter[`/admin/monsters`].children.push(Object.keys(monsters.data[i].node));
				monsterArray.push(monsters.data[i]);
			}

			for (let i = 0; i < users.data.length; i++) {
				// console.log('users.data[i].node', users.data[i]);
				Object.assign(rooter, users.data[i].node);
				rooter[`/admin/users`].children.push(Object.keys(users.data[i].node));
				userArray.push(users.data[i]);
			}
		})
	);
	return { worldArray, campaignArray, locationArray, encounterArray, monsterArray, userArray };
}

export default class Tree extends Component {
	state = {
		nodes: rooter,
		worlds: [],
		campaigns: [],
		list: {},
		locations: [],
		encounters: [],
		monsters: [],
		users: [],
		type: '',
	};

	componentDidMount() {
		getData().then(res => {
			this.setState({
				worlds: res.worldArray,
				campaigns: res.campaignArray,
				locations: res.locationArray,
				encounters: res.encounterArray,
				monsters: res.monsterArray,
				users: res.userArray,
			});
		});

		// console.log('aggregation', aggregation);
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
		// console.log('this.state inside render', this.state);
		return (
			<div>
				{rootNodes.map(node => (
					<TreeNode
						dataBundle={this.state}
						node={node}
						key={node.path}
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

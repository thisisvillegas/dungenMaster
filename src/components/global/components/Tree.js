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

	axios.all([getWorlds(), getCampaigns(), getLocations(), getEcounters(), getMonsters(), getUsers()]).then(
		axios.spread(function(worlds, campaigns, locations, encounters, monsters, users) {
			for (let index = 0; index < worlds.data.length; index++) {
				Object.assign(rooter, worlds.data[index].node);
				rooter[`/root`].children.push(Object.keys(worlds.data[index].node));
				// console.log('worlds.data[index].node', worlds.data[index].node);
			}

			for (let index = 0; index < campaigns.data.length; index++) {
				Object.assign(rooter, campaigns.data[index].node);
				// console.log('campaigns.data[index]', campaigns.data[index]);
				rooter[`/root/${campaigns.data[index].world}`].children.push(Object.keys(campaigns.data[index].node));
			}

			for (let index = 0; index < locations.data.length; index++) {
				// console.log('locations.data[index].campaign', locations.data[index].campaign);
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

			for (let index = 0; index < monsters.data.length; index++) {
				// console.log('monsters.data[index].node', monsters.data[index].node);
				Object.assign(rooter, monsters.data[index].node);
				rooter[`/admin/monsters`].children.push(Object.keys(monsters.data[index].node));
			}

			for (let index = 0; index < users.data.length; index++) {
				// console.log('users.data[index].node', users.data[index]);
				Object.assign(rooter, users.data[index].node);
				rooter[`/admin/users`].children.push(Object.keys(users.data[index].node));
			}

			console.log('rooter', rooter);
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

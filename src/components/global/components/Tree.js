import React, { Component } from 'react';
import axios from 'axios';
import values from 'lodash/values';
import PropTypes from 'prop-types';
// import getData from '../navBuilder';

import TreeNode from './TreeNode';

const data = {
	'/root': {
		path: '/root',
		type: 'folder',
		isRoot: true,
		children: ['/root/world', '/root/admin'],
	},
	'/root/world': {
		path: '/root/world',
		type: 'folder',
		children: ['/root/world/campaign', '/root/world/readme.md'],
	},
	'/root/world/readme.md': {
		path: '/root/world/readme.md',
		type: 'file',
		content:
			'Thanks for reading me me. But there is nothing here, just little old me hanging around waiting for someone like you to read me, thanks for doing so.',
	},
	'/root/world/campaign': {
		path: '/root/world/campaign',
		type: 'folder',
		children: ['/root/world/campaign/location'],
	},
	'/root/world/campaign/location': {
		path: '/root/world/campaign/location',
		type: 'folder',
		children: ['/root/world/campaign/location/encounter'],
	},
	'/root/world/campaign/location/encounter': {
		path: '/root/world/campaign/location/encounter',
		type: 'folder',
		children: [
			'/root/world/campaign/location/encounter/encounter1',
			'/root/world/campaign/location/encounter/encounter2',
		],
	},
	'/root/world/campaign/location/encounter/encounter1': {
		path: '/root/world/campaign/location/encounter/encounter1',
		type: 'file',
		content: 'this is encounter 1',
	},
	'/root/world/campaign/location/encounter/encounter2': {
		path: '/root/world/campaign/location/encounter/encounter2',
		type: 'file',
		content: 'this is encounter 2',
	},
	'/root/admin': {
		path: '/root/admin',
		type: 'folder',
		children: ['/root/admin/projects', '/root/admin/vblogs'],
	},
	'/root/admin/projects': {
		path: '/root/admin/projects',
		type: 'folder',
		children: ['/root/admin/projects/treeview'],
	},
	'/root/admin/projects/treeview': {
		path: '/root/admin/projects/treeview',
		type: 'folder',
		children: [],
	},
	'/root/admin/vblogs': {
		path: '/root/admin/vblogs',
		type: 'folder',
		children: [],
	},
};

let rooter = {
	'/root': {
		path: '/root',
		type: 'folder',
		isRoot: true,
		children: [],
	},
};

async function getWorlds() {
	axios
		.get('http://localhost:5050/worlds/')
		.then(res => {
			console.log(res.data);
			for (let index = 0; index < res.data.length; index++) {
				Object.assign(rooter, res.data[index].node);
				rooter['/root'].children.push(Object.keys(res.data[index].node));
				console.log('rooter', rooter);
			}
			return res.data;
		})

		.catch(err => console.log(err));
	// return worlds;
}

async function getCampaigns() {
	axios
		.get('http://localhost:5050/campaigns/')
		.then(res => {
			for (let index = 0; index < res.data.length; index++) {
				Object.assign(rooter, res.data[index].node);

				rooter[`/root/earth`].children.push(Object.keys(res.data[index].node));
				console.log('rooter', rooter);
			}
		})

		.catch(err => console.log(err));
}

async function getData() {
	getWorlds().then(worlds => {
		// console.log(typeof worlds);
		getCampaigns();
	});

	// for (let index = 0; index < wld.data.length; index++) {
	// 	Object.assign(rooter, wld.data[index].node);
	// 	rooter['/root'].children.push(Object.keys(wld.data[index].node));
	// 	console.log('rooter', rooter);
	// }
	// this.setState({
	// 	nodes: rooter,
	// });
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

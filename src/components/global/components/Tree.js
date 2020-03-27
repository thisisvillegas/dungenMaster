import React, { Component } from 'react';
import axios from 'axios';
import values from 'lodash/values';
import PropTypes from 'prop-types';

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

// let rooter = {
// 	'/root': {
// 		path: '/root',
// 		type: 'folder',
// 		isRoot: true,
// 		children: ['/root/world'],
// 	},
// 	'/root/world': {
// 		path: '/root/world',
// 		type: 'folder',
// 		children: [],
// 	},
// };

export default class Tree extends Component {
	state = data;

	componentDidMount() {
		axios
			.get('http://localhost:5050/worlds/')
			.then(res => {
				let resData = res.data;
				console.log('resNode', res.data[1].node);
				// resData.forEach(node => {});
				// Object.assign(nodes, newData[1].node);
				// Object.assign(rooter, resData[1].node);
				// Object.assign(nodes, newData[1].node);
				// Object.assign(nodes, newData[2]);
				// Object.assign(nodes, newData[3]);
				// console.log('nodes', rooter);
				// this.setState({
				// 	rooter,
				// });
			})
			.catch(err => console.log(err));
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

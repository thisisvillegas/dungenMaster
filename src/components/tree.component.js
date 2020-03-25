import React, { Component } from 'react';
import axios from 'axios';
import Tree from '@naisutech/react-tree';

const nodes = [
	{
		label: 'Worlds',
		id: 1234,
		parentId: null,
		items: null,
	},
	{
		label: 'Campaigns',
		id: 1236,
		parentId: 1234,
		items: null,
	},
	{
		label: 'Location',
		id: 1235,
		parentId: 1236,
		items: null,
	},
	{
		label: 'Encounter',
		id: 1237,
		parentId: 1235,
		items: [
			{
				label: 'Encounter 1',
				parentId: 1234,
				id: 5678,
			},
			{
				label: 'Encounter 2',
				parentId: 1234,
				id: 5679,
			},
			{
				label: 'Encounter 3',
				parentId: 1234,
				id: 5688,
			},
		],
	},
];

export default class TreeNav extends Component {
	constructor(props) {
		super(props);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
		};
	}

	componentDidMount() {
		this.setState({
			username: 'test User',
		});
	}
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const user = {
			username: this.state.username,
		};

		console.log(user);

		axios.post('http://localhost:5000/users/add', user).then(res => console.log(res.data));

		this.setState({
			username: '',
		});
	}

	onSelect(e) {}
	render() {
		return (
			<div className="App" style={{ display: 'flex' }}>
				<Tree nodes={nodes} size="full width" />
			</div>
		);
	}
}

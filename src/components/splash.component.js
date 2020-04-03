import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateWorld from '../components/world/create-world.component';
import CreateUser from '../components/user/create-user.component';

const World = props => (
	<tr>
		<td>{props.world.username}</td>
		<td>{props.world.description}</td>
		<td>{props.world.duration}</td>
		<td>{props.world.date.substring(0, 10)}</td>
		<td>
			<Link to={'/edit/' + props.world._id}>edit</Link> |{' '}
			<a
				href="#"
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class WorldsList extends Component {
	constructor(props) {
		super(props);

		this.deleteWorld = this.deleteWorld.bind(this);

		this.state = { worlds: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/exercises/')
			.then(res => {
				this.setState({ worlds: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteWorld(id) {
		axios.delete('http://localhost:5000/exercises/' + id).then(res => console.log(res.data));
		this.setState({
			worlds: this.state.worlds.filter(el => el._id !== id),
		});
	}

	worldList() {
		return this.state.worlds.map(currentworld => {
			return <World world={currentworld} deleteWorld={this.deleteWorld} key={currentworld._id} />;
		});
	}
	render() {
		return (
			<div>
				<h1>Quick Links</h1>
				<Link to={'/createworld'}>Create World</Link>
				<br />
				<Link to={'/createcampaign'}>Create Campaign</Link>
				<br />
				<Link to={'/createlocation'}>Create Location</Link>
				<br />
				<Link to={'/createencounter'}>Create Encounter</Link>
				<br />
				<Link to={'/createuser'}>Create User</Link>
			</div>
		);
	}
}

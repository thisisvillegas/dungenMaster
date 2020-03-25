import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
			.get('http://localhost:5050/exercises/')
			.then(res => {
				this.setState({ worlds: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteWorld(id) {
		axios.delete('http://localhost:5050/exercises/' + id).then(res => console.log(res.data));
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
				<h3>Campaigns Available</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.worldList()}</tbody>
				</table>
			</div>
		);
	}
}

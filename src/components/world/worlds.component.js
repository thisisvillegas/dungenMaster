import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const World = props => (
	<tr>
		<td>{props.world.name}</td>
		<td>{props.world.size}</td>
		<td>{props.world.factions}</td>
		<td>
			<Link to={'/editworld/' + props.world._id}>edit</Link> |{' '}
			<a
				href="#"
				onClick={() => {
					props.deleteWorld(props.world._id);
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
			.get('http://localhost:5000/worlds/')
			.then(res => {
				this.setState({ worlds: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteWorld(id) {
		axios.delete('http://localhost:5000/worlds/' + id).then(res => console.log(res.data));
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
				<h3>Worlds Available</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Name</th>
							<th>Size</th>
							<th>Factions</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.worldList()}</tbody>
				</table>
				<div>
					<Link to="/createworld">Create New</Link>
				</div>
			</div>
		);
	}
}

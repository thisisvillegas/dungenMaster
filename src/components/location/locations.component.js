import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = props => (
	<tr>
		<td>{props.location.name}</td>
		<td>{props.location.world}</td>
		<td>{props.location.campaign}</td>
		<td>{props.location.size}</td>
		<td>
			<Link to={'/edit/' + props.location._id}>edit</Link> |{' '}
			<a
				href="#"
				onClick={() => {
					props.deleteLocation(props.location._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class LocationsList extends Component {
	constructor(props) {
		super(props);
		this.deleteLocation = this.deleteLocation.bind(this);
		this.state = { locations: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5001/locations/')
			.then(res => {
				this.setState({ locations: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteLocation(id) {
		axios.delete('http://localhost:5001/locations/' + id).then(res => console.log(res.data));
		this.setState({
			locations: this.state.locations.filter(el => el._id !== id),
		});
	}

	locationList() {
		return this.state.locations.map(currentlocation => {
			return (
				<Location location={currentlocation} deleteLocation={this.deleteLocation} key={currentlocation._id} />
			);
		});
	}
	render() {
		return (
			<div>
				<h3>Locations Available</h3>
				<div>
					<Link to="/createlocation">Create New Location </Link>| {'   '}
					<Link to="/createencounter">Create New Encounter</Link>
				</div>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Name</th>
							<th>World</th>
							<th>Campaign</th>
							<th>Size</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.locationList()}</tbody>
				</table>
			</div>
		);
	}
}

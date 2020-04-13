import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Encounter = props => (
	<tr>
		<td>{props.encounter.name}</td>
		<td>{props.encounter.world}</td>
		<td>{props.encounter.campaign}</td>
		<td>{props.encounter.location}</td>
		<td>{props.encounter.factions}</td>
		<td>
			<Link to={'/edit/' + props.encounter._id}>edit</Link> |{' '}
			<a
				href="/encounters"
				onClick={() => {
					props.deleteEncounter(props.encounter._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class EncountersList extends Component {
	constructor(props) {
		super(props);
		this.deleteEncounter = this.deleteEncounter.bind(this);
		this.state = { encounters: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5001/encounters/')
			.then(res => {
				this.setState({ encounters: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteEncounter(id) {
		axios.delete('http://localhost:5001/encounters/' + id).then(res => console.log(res.data));
		this.setState({
			encounters: this.state.encounters.filter(el => el._id !== id),
		});
	}

	encounterList() {
		return this.state.encounters.map(currentencounter => {
			return (
				<Encounter
					encounter={currentencounter}
					deleteEncounter={this.deleteEncounter}
					key={currentencounter._id}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<h3>Encounters Available</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Name</th>
							<th>World</th>
							<th>Campaign</th>
							<th>Location</th>
							<th>Factions</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.encounterList()}</tbody>
				</table>
			</div>
		);
	}
}

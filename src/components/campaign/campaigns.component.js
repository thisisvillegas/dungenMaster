import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Campaign = props => (
	<tr>
		<td>{props.campaign.name}</td>
		<td>{props.campaign.size}</td>
		<td>{props.campaign.factions}</td>
		<td>
			<Link to={'/edit/' + props.campaign._id}>edit</Link> |{' '}
			<a
				href="#"
				onClick={() => {
					props.deleteCampaign(props.campaign._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class CampaignsList extends Component {
	constructor(props) {
		super(props);

		this.deleteCampaign = this.deleteCampaign.bind(this);

		this.state = { campaigns: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5001/campaigns/')
			.then(res => {
				this.setState({ campaigns: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteCampaign(id) {
		axios.delete('http://localhost:5001/campaigns/' + id).then(res => console.log(res.data));
		this.setState({
			campaigns: this.state.campaigns.filter(el => el._id !== id),
		});
	}

	worldList() {
		return this.state.campaigns.map(currentcampaign => {
			return (
				<Campaign campaign={currentcampaign} deleteCampaign={this.deleteCampaign} key={currentcampaign._id} />
			);
		});
	}
	render() {
		return (
			<div>
				<h3>Campaigns Available</h3>
				<div>
					<Link to="/createcampaign">Create New Campaign </Link>| {'   '}
					<Link to="/createlocation">Create New Location</Link>
				</div>
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

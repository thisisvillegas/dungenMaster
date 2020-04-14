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
				href="/worlds"
				onClick={() => {
					props.deleteWorld(props.world._id, props.world.name);
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
		this.state = { worlds: [], campaigns: [] };
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`)
			.then(res => {
				this.setState({ worlds: res.data });
			})
			.catch(err => console.log(err));
		axios
			.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/`)
			.then(res => {
				this.setState({ campaigns: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteWorld(id, name) {
		// let filtered = this.state.campaigns.filter(campaign => campaign.world === name);
		if (this.state.campaigns.filter(campaign => campaign.world === name).length < 1) {
			console.log('true');
			axios.delete(`${process.env.REACT_APP_LOCAL_DB}/worlds/` + id).then(res => console.log(res.data));
			this.setState({
				worlds: this.state.worlds.filter(el => el._id !== id),
			});
		} else {
			console.log('false');
			alert('Node has children, cant delete, will break things');
		}
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
				<div>
					<Link to="/createworld">Create New World </Link>| {'   '}
					<Link to="/createcampaign">Create New Campaign</Link>
				</div>
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
			</div>
		);
	}
}

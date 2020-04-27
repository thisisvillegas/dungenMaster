import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

// const DeleteThings = props => (
// 	<a
// 		href="/worlds"
// 		onClick={() => {
// 			console.log('props', props);
// 			props.deleteWorld(props.worlds._id, props.worlds.name);
// 		}}
// 	>
// 		delete
// 	</a>
// );

async function loadData() {
	let data = {
		columns: [
			{
				label: 'Name',
				field: 'name',
				sort: 'asc',
				width: 150,
			},
			{
				label: 'Size',
				field: 'size',
				sort: 'asc',
				width: 270,
			},
			{
				label: 'Factions',
				field: 'factions',
				sort: 'asc',
				width: 200,
			},
		],
		rows: [],
	};

	let worldArray = [],
		campaignArray = [],
		listArray = [],
		nugget = {};

	async function getWorlds() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`);
	}

	async function getCampaigns() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/`);
	}

	await axios.all([getWorlds(), getCampaigns()]).then(
		axios.spread(function(worlds, campaigns) {
			for (let i = 0; i < worlds.data.length; i++) {
				// console.log('worlds.data', worlds.data[i]);
				worldArray.push(worlds.data[i]);
				nugget = {
					name: <Link to={'/view/' + worlds.data[i]._id}>{worlds.data[i].name}</Link>,
					size: worlds.data[i].size,
					factions: worlds.data[i].factions,
					// action: <DeleteThings />,
				};
				data.rows.push(nugget);
				// console.log('nugget', nugget);
			}
			// console.log('data', data);
			// console.log('worldArray', worldArray);

			for (let i = 0; i < campaigns.data.length; i++) {
				console.log('campaigns.data[i]', campaigns.data[i]);
				campaignArray.push(campaigns.data[i]);
			}
		})
	);

	return { worldArray, data, campaignArray };
}

export default class WorldsList extends Component {
	constructor(props) {
		super(props);
		// this.deleteWorld = this.deleteWorld.bind(this);
		this.state = { worlds: [], campaigns: [], list: {} };
	}

	componentDidMount() {
		loadData().then(res => {
			console.log('res', res);
			console.log('res.worldArray', res.worldArray);
			console.log('res.data', res.data);
			this.setState({
				worlds: res.worldArray,
				list: res.data,
				campaigns: res.campaignArray,
			});
		});
	}

	// deleteWorld(id, name) {
	// 	// let filtered = this.state.campaigns.filter(campaign => campaign.world === name);
	// 	if (this.state.campaigns.filter(campaign => campaign.world === name).length < 1) {
	// 		console.log('true');
	// 		axios.delete(`${process.env.REACT_APP_LOCAL_DB}/worlds/` + id).then(res => console.log(res.data));
	// 		this.setState({
	// 			worlds: this.state.worlds.filter(el => el._id !== id),
	// 		});
	// 	} else {
	// 		console.log('false');
	// 		alert('Node has children, cant delete, will break things');
	// 	}
	// }

	render() {
		return (
			<div>
				{console.log('state in render', this.state)}
				<h3>Worlds Available</h3>
				<div>
					<Link to="/createworld">Create New World </Link>| {'   '}
					<Link to="/createcampaign">Create New Campaign</Link>
				</div>
				<MDBDataTable striped hover data={this.state.list} />
			</div>
		);
	}
}

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

async function loadData(type) {
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
			// {
			// 	label: 'Action',
			// 	field: 'action',
			// 	sort: 'asc',
			// 	width: 100,
			// },
		],
		rows: [],
	};

	console.log('type', type);

	let worldArray = [],
		campaignArray = [],
		locationArray = [],
		encounterArray = [],
		listArray = [],
		nugget = {};

	async function getWorlds() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`);
	}

	async function getCampaigns() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/`);
	}

	async function getLocations() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/locations/`);
	}

	async function getEcounters() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/encounters/`);
	}

	await axios.all([getWorlds(), getCampaigns(), getLocations(), getEcounters()]).then(
		axios.spread(function(worlds, campaigns, locations, encounters) {
			switch (type.type) {
				case 'worlds':
					{
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
					}
					break;
				case 'campaigns':
					{
						data.columns.push({
							label: 'World',
							field: 'world',
							sort: 'asc',
							width: 100,
						});

						for (let i = 0; i < campaigns.data.length; i++) {
							campaignArray.push(campaigns.data[i]);

							nugget = {
								name: <Link to={'/view/' + campaigns.data[i]._id}>{campaigns.data[i].name}</Link>,
								world: campaigns.data[i].world,
								size: campaigns.data[i].size,
								factions: campaigns.data[i].factions,
								// action: <DeleteThings />,
							};
							data.rows.push(nugget);
							// console.log('nugget', nugget);
						}
					}
					break;
				case 'locations':
					{
						data.columns.push({
							label: 'World',
							field: 'world',
							sort: 'asc',
							width: 100,
						});

						data.columns.push({
							label: 'Campaign',
							field: 'campaign',
							sort: 'asc',
							width: 100,
						});

						for (let i = 0; i < locations.data.length; i++) {
							locationArray.push(locations.data[i]);

							nugget = {
								name: <Link to={'/view/' + locations.data[i]._id}>{locations.data[i].name}</Link>,
								world: locations.data[i].world,
								size: locations.data[i].size,
								factions: locations.data[i].factions,
								campaign: locations.data[i].campaign,
								// action: <DeleteThings />,
							};
							data.rows.push(nugget);
							// console.log('nugget', nugget);
						}
					}
					break;
				case 'encounters':
					{
						data.columns.push({
							label: 'World',
							field: 'world',
							sort: 'asc',
							width: 100,
						});

						data.columns.push({
							label: 'Campaign',
							field: 'campaign',
							sort: 'asc',
							width: 100,
						});

						data.columns.push({
							label: 'Location',
							field: 'location',
							sort: 'asc',
							width: 100,
						});

						for (let i = 0; i < encounters.data.length; i++) {
							encounterArray.push(encounters.data[i]);

							nugget = {
								name: <Link to={'/view/' + encounters.data[i]._id}>{encounters.data[i].name}</Link>,
								world: encounters.data[i].world,
								size: encounters.data[i].size,
								factions: encounters.data[i].factions,
								campaign: encounters.data[i].campaign,
								location: encounters.data[i].location,
								// action: <DeleteThings />,
							};
							data.rows.push(nugget);
							// console.log('nugget', nugget);
						}
					}
					break;
			}
		})
	);

	return { worldArray, data, campaignArray, locationArray, encounterArray };
}

export default class WorldsList extends Component {
	constructor(props) {
		super(props);
		// this.deleteWorld = this.deleteWorld.bind(this);
		this.state = { worlds: [], campaigns: [], list: {}, locations: [], encounters: [], type: '' };
	}

	componentDidMount() {
		loadData(this.props.match.params).then(res => {
			console.log('this.props.match.params', this.props.match.params.type);
			console.log('res', res);
			console.log('res.worldArray', res.worldArray);
			console.log('res.data', res.data);
			this.setState({
				worlds: res.worldArray,
				list: res.data,
				campaigns: res.campaignArray,
				locations: res.locationArray,
				encounters: res.encounterArray,
				type: this.props.match.params.type,
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
				<h3>{this.state.type}</h3>
				{/* <div>
					<Link to="/createworld">Create New World </Link>| {'   '}
					<Link to="/createcampaign">Create New Campaign</Link>
				</div> */}
				<MDBDataTable striped hover data={this.state.list} />
			</div>
		);
	}
}

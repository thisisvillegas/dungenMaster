import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import styled from 'styled-components';
import axios from 'axios';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

// console.log = function() {};

const StyledTable = styled.div`
	background-color: black;
	color: white;
	margin: 3% 10% 10% 10%;
	width: auto;
	min-width: 720px;
	text-align: left;

	.h3 {
		text-align: center;
	}

	.row {
		margin: auto;
	}
`;

async function loadData(type) {
	console.log('type', type);
	console.log('type.type', type.type);
	let data = {
		columns: [
			{
				label: 'View',
				field: 'icon',
				sort: 'asc',
				width: 25,
			},
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
		locationArray = [],
		encounterArray = [],
		userArray = [],
		monsterArray = [],
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

	async function getUsers() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/users/`);
	}

	async function getMonsters() {
		return await axios.get(`${process.env.REACT_APP_LOCAL_DB}/monsters/`);
	}

	function populateNugget(type, typeArray) {
		// console.log('type that we are conditioning', type.data[0]);

		for (let i = 0; i < type.data.length; i++) {
			// console.log('type.data[i]', type.data[i]);
			if (type.data[i].type === 'users') {
				typeArray.push(type.data[i]);
				nugget = {
					icon: (
						<Link
							to={{
								pathname: '/view/' + type.data[i]._id,
								state: { ...type.data[i] },
							}}
						>
							<ZoomInIcon></ZoomInIcon>
						</Link>
					),
					username: type.data[i].username,
					firstName: type.data[i].firstName,
					lastName: type.data[i].lastName,
					characterClass: type.data[i].characterClass,
					level: type.data[i].level,
				};
				data.rows.push(nugget);
			} else if (type.data[i].type === 'monsters') {
				typeArray.push(type.data[i]);
				nugget = {
					icon: (
						<Link
							to={{
								pathname: '/view/' + type.data[i]._id,
								state: { ...type.data[i] },
							}}
						>
							<ZoomInIcon></ZoomInIcon>
						</Link>
					),
					name: type.data[i].name,
					desc: type.data[i].desc,
					alignment: type.data[i].alignment,
					level: type.data[i].level,
				};
				data.rows.push(nugget);
			} else {
				// console.log('type.data[i]', type.data[i]);
				typeArray.push(type.data[i]);
				nugget = {
					icon: (
						<Link
							to={{
								pathname: '/view/' + type.data[i]._id,
								state: { ...type.data[i] },
							}}
						>
							<ZoomInIcon></ZoomInIcon>
						</Link>
					),
					name: type.data[i].name,
					type: type.data[i].type,
					world: type.data[i].world,
					size: type.data[i].size,
					factions: type.data[i].factions,
					campaign: type.data[i].campaign,
					location: type.data[i].location,
				};
				data.rows.push(nugget);
			}
		}
	}

	await axios.all([getWorlds(), getCampaigns(), getLocations(), getEcounters(), getUsers(), getMonsters()]).then(
		axios.spread(function(worlds, campaigns, locations, encounters, users, monsters) {
			switch (type.type) {
				case 'worlds':
					populateNugget(worlds, worldArray);

					break;
				case 'campaigns':
					data.columns.push({
						label: 'World',
						field: 'world',
						sort: 'asc',
						width: 100,
					});

					populateNugget(campaigns, campaignArray);

					break;
				case 'locations':
					data.columns = [];
					data.columns.push({
						label: 'View',
						field: 'icon',
						sort: 'asc',
						width: 25,
					});
					data.columns.push({
						label: 'Name',
						field: 'name',
						sort: 'asc',
						width: 150,
					});
					data.columns.push({
						label: 'Factions',
						field: 'factions',
						sort: 'asc',
						width: 150,
					});

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

					populateNugget(locations, locationArray);

					break;
				case 'encounters':
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

					populateNugget(encounters, encounterArray);

					break;
				case 'users':
					data.columns = [];
					data.columns.push({
						label: 'View',
						field: 'icon',
						sort: 'asc',
						width: 25,
					});
					data.columns.push({
						label: 'Username',
						field: 'username',
						sort: 'asc',
						width: 100,
					});
					data.columns.push({
						label: 'First Name',
						field: 'firstName',
						sort: 'asc',
						width: 100,
					});
					data.columns.push({
						label: 'Last Name',
						field: 'lastName',
						sort: 'asc',
						width: 100,
					});
					data.columns.push({
						label: 'Level',
						field: 'level',
						sort: 'asc',
						width: 100,
					});
					data.columns.push({
						label: 'Class',
						field: 'characterClass',
						sort: 'asc',
						width: 100,
					});
					populateNugget(users, userArray);
					break;
				case 'monsters':
					data.columns = [];
					data.columns.push({
						label: 'View',
						field: 'icon',
						sort: 'asc',
						width: 25,
					});
					data.columns.push({
						label: 'Name',
						field: 'name',
						sort: 'asc',
						width: 100,
					});

					data.columns.push({
						label: 'Level',
						field: 'level',
						sort: 'asc',
						width: 100,
					});

					data.columns.push({
						label: 'Description',
						field: 'desc',
						sort: 'asc',
						width: 100,
					});
					data.columns.push({
						label: 'Alignment',
						field: 'alignment',
						sort: 'asc',
						width: 100,
					});

					populateNugget(monsters, monsterArray);

					break;
				default:
					console.log('you should never get this');
			}
		})
	);

	return { worldArray, data, campaignArray, locationArray, encounterArray, userArray, monsterArray };
}

export default class WorldsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			worlds: [],
			campaigns: [],
			list: {},
			locations: [],
			encounters: [],
			type: '',
			users: [],
			monsters: [],
		};
	}

	componentDidMount() {
		loadData(this.props.match.params).then(res => {
			// console.log('res', res);
			this.setState({
				worlds: res.worldArray,
				list: res.data,
				campaigns: res.campaignArray,
				locations: res.locationArray,
				encounters: res.encounterArray,
				type: this.props.match.params.type,
				users: res.userArray,
				monsters: res.monsterArray,
			});
		});
	}

	componentWillReceiveProps = nextProps => {
		console.log('nextProps', nextProps);

		// console.log('this.props.match.params', this.props.match.params);
		console.log('nextProps.location.state', nextProps.location.state);
		// let res = nextProps.location.state;
		loadData(nextProps.location.state).then(res => {
			console.log('res', res);
			console.log('res.data', res.data);
			this.setState({
				worlds: res.worldArray,
				list: res.data,
				campaigns: res.campaignArray,
				locations: res.locationArray,
				encounters: res.encounterArray,
				type: this.props.match.params.type,
				users: res.userArray,
				monsters: res.monsterArray,
			});
		});
	};

	render() {
		return (
			<div>
				{console.log('this.state in olc render', this.state)}
				<h3 style={{ textAlign: 'left', margin: '3% 0 3% 10%' }}>{this.state.type}</h3>
				<StyledTable>
					<MDBDataTable
						tbodyTextWhite={true}
						theadTextWhite={true}
						dark={true}
						striped
						hover
						data={this.state.list}
					/>
				</StyledTable>
			</div>
		);
	}
}

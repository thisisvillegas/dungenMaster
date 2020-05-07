import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const SaveButton = props => {
	let { toggle, modal, onSubmit, state } = props;
	// console.log('peropp', props);

	return !modal ? (
		<input
			type="submit"
			value="Create Encounter"
			className="btn btn-primary"
			onClick={() => {
				onSubmit(props.state);
				toggle();
			}}
		/>
	) : (
		<p>Huzzah! Enconter Initiated, Move to the Next Screen </p>
	);
};

export default class CreateEncounter extends Component {
	state = {
		name: '',
		world: '',
		worlds: [],
		campaign: '',
		campaigns: [],
		location: '',
		locations: [],
		factions: 0,
		modal: false,
		playerCharacters: [],
		monsters: [],
		npc: [],
	};

	componentDidMount() {
		axios.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`).then(res => {
			if (res.data.length > 0) {
				this.setState({
					worlds: res.data.map(world => world.name),
					// world: res.data[0].name,
				});
			}
		});

		axios.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/`).then(res => {
			if (res.data.length > 0) {
				this.setState({
					campaigns: res.data.map(campaign => {
						return { name: campaign.name, world: campaign.world };
					}),
					// campaign: res.data[0].name,
				});
			}
		});

		axios.get(`${process.env.REACT_APP_LOCAL_DB}/locations/`).then(res => {
			if (res.data.length > 0) {
				this.setState({
					locations: res.data.map(location => {
						// console.log('location.name', location.name);
						return { name: location.name, world: location.world, campaign: location.campaign };
					}),
					// location: res.data[0].name,
				});
			}
		});
	}
	onChangeName = e => {
		this.setState({
			name: e.target.value,
		});
	};
	onChangeWorld = e => {
		this.setState({
			world: e.target.value,
		});
	};
	onChangeCampaign = e => {
		this.setState({
			campaign: e.target.value,
		});
	};
	onChangeLocation = e => {
		this.setState({
			location: e.target.value,
		});
	};
	onChangeFactions = e => {
		this.setState({
			factions: e.target.value,
		});
	};
	onChangePlayerCharacters = e => {
		this.setState({
			playerCharacters: e.target.value,
		});
	};
	onChangeMonsters = e => {
		this.setState({
			monsters: e.target.value,
		});
	};
	onChangeNPC = e => {
		this.setState({
			npc: e.target.value,
		});
	};

	toggle = () => {
		// console.log('this.state.modal', this.state.modal);
		this.setState({
			modal: !this.state.modal,
		});
	};

	onSubmit = e => {
		const encounter = { ...e };
		console.log(encounter);
		// window.activeEncounter = encounter;
		axios.post(`${process.env.REACT_APP_LOCAL_DB}/encounters/add`, encounter).then(res => console.log(res.data));
	};
	render() {
		return (
			<div>
				{/* {console.log('this.state', this.state)} */}
				<h3>Create New Encounter</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.name}
							onChange={this.onChangeName}
						/>
					</div>
					<div className="form-group">
						<label>World: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.world}
							onChange={this.onChangeWorld}
						>
							<option> -- </option>
							{this.state.worlds.map(world => {
								return (
									<option key={world} value={world}>
										{world}
									</option>
								);
							})}
						</select>
					</div>
					{/* <Link to="/addWorld">
						<button>+</button>
					</Link> */}
					<div className="form-group">
						<label>Campaign: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.campaign}
							onChange={this.onChangeCampaign}
						>
							<option> -- </option>
							{this.state.campaigns
								.filter(campaign => campaign.world === this.state.world)
								.map(campaign => {
									return (
										<option key={campaign.name} value={campaign.name}>
											{campaign.name}
										</option>
									);
								})}
						</select>
					</div>
					<div className="form-group">
						<label>Location: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.location}
							onChange={this.onChangeLocation}
						>
							<option> -- </option>
							{this.state.locations
								.filter(location => location.world === this.state.world)
								.filter(location => location.campaign === this.state.campaign)
								.map(location => {
									return (
										<option key={location.name} value={location.name}>
											{location.name}
										</option>
									);
								})}
						</select>
					</div>
					<div className="form-group">
						<label>Factions: </label>
						<input
							type="number"
							className="form-control"
							value={this.state.factions}
							onChange={this.onChangeFactions}
						/>
					</div>
					<div className="form-group">
						<SaveButton
							modal={this.state.modal}
							toggle={this.toggle}
							onSubmit={this.onSubmit}
							state={this.state}
						/>
						{/* <input
							type="submit"
							value="Create Encounter"
							className="btn btn-primary"
							onClick={this.toggle}
						/> */}
					</div>
				</form>
			</div>
		);
	}
}

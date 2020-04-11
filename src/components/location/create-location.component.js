import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateLocation extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeCampaign = this.onChangeCampaign.bind(this);
		this.onChangeWorld = this.onChangeWorld.bind(this);
		this.onChangeFactions = this.onChangeFactions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			world: '',
			worlds: [],
			campaign: '',
			campaigns: [],
			factions: 0,
		};
	}

	componentDidMount() {
		axios.get('http://localhost:5001/worlds/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					worlds: res.data.map(world => world.name),
					world: res.data[0].name,
				});
			}
		});

		axios.get('http://localhost:5001/campaigns/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					campaigns: res.data.map(campaign => {
						return { name: campaign.name, world: campaign.world };
					}),
					campaign: res.data[0].name,
				});
			}
		});
	}
	onChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}
	onChangeWorld(e) {
		this.setState({
			world: e.target.value,
		});
	}
	onChangeCampaign(e) {
		this.setState({
			campaign: e.target.value,
		});
	}
	onChangeFactions(e) {
		this.setState({
			factions: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const location = {
			name: this.state.name,
			world: this.state.world,
			campaign: this.state.campaign,
			size: this.state.size,
			factions: this.state.factions,
		};

		console.log(location);

		axios.post('http://localhost:5001/locations/add', location).then(res => console.log(res.data));

		window.location = '/locations';
	}
	render() {
		return (
			<div>
				<h3>Create New Location</h3>
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
							{this.state.worlds.map(world => {
								return (
									<option key={world} value={world}>
										{world}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<label>Campaign: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.campaign}
							onChange={this.onChangeCampaign}
						>
							{this.state.campaigns
								.filter(campaign => campaign.world === this.state.world)
								.map(campaign => {
									return (
										<option key={campaign} value={campaign}>
											{campaign.name}
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
						<input type="submit" value="Create Location" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateCampaign extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeWorld = this.onChangeWorld.bind(this);
		this.onChangeSize = this.onChangeSize.bind(this);
		this.onChangeFactions = this.onChangeFactions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			world: '',
			worlds: [' '],
			size: '',
			factions: 0,
		};
	}

	componentDidMount() {
		axios.get('http://localhost:5001/worlds/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					worlds: res.data.map(world => world.name),
				});
				console.log('res.data', res.data);
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
	onChangeSize(e) {
		this.setState({
			size: e.target.value,
		});
	}
	onChangeFactions(e) {
		this.setState({
			factions: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const campaign = {
			name: this.state.name,
			world: this.state.world,
			size: this.state.size,
			factions: this.state.factions,
		};

		console.log(campaign);

		if (campaign.name !== '' && campaign.world !== '' && campaign.size !== '') {
			axios.post('http://localhost:5001/campaigns/add', campaign).then(res => console.log(res.data));
			window.location = '/campaigns';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createcampaign';
		}
	}
	render() {
		return (
			<div>
				<h3>Create New Campaign</h3>
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
					<div className="form-group">
						<label>Size: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.size}
							onChange={this.onChangeSize}
						/>
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
						<input type="submit" value="Create Campaign" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

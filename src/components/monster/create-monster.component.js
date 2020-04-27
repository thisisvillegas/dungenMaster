import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeWorld = this.onChangeWorld.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			world: '',
			worlds: [],
			alignment: '',
			armorClass: 0,
			hitPoints: 0,
			speed: 0,
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0,
			savingThrows: 0,
			damageImmunities: [],
			conditionImmunities: [],
			senses: [],
			languages: [],
			challenge: 0,
			magicResistance: 0,
			magicalW: 0,
		};
	}

	componentDidMount() {
		axios.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/`).then(res => {
			if (res.data.length > 0) {
				this.setState({
					worlds: res.data.map(world => world.name),
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

	onSubmit(e) {
		e.preventDefault();
		const monster = {
			name: this.state.name,
			world: this.state.world,
		};

		console.log(monster);

		if (monster.name !== '' && monster.world !== '') {
			axios.post(`${process.env.REACT_APP_LOCAL_DB}/monsters/add`, monster).then(res => console.log(res.data));
			window.location = '/monsters';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createmonster';
		}
	}
	render() {
		return (
			<div>
				<h3>Create New Monster</h3>
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
						<input type="submit" value="Create Monster" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

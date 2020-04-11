import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
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

		axios.post('http://localhost:5001/monsters/add', monster).then(res => console.log(res.data));

		window.location = '/monsters';
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

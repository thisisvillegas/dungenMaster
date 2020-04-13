import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateWorld extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeSize = this.onChangeSize.bind(this);
		this.onChangeFactions = this.onChangeFactions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			size: '',
			factions: 0,
		};
	}

	// componentDidMount() {
	// 	axios.get('http://162.243.61.25:5000/users/').then(res => {
	// 		if (res.data.length > 0) {
	// 			this.setState({
	// 				users: res.data.map(user => user.username),
	// 				username: res.data[0].username,
	// 			});
	// 		}
	// 	});
	// }
	onChangeName(e) {
		this.setState({
			name: e.target.value,
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
		const world = {
			name: this.state.name,
			size: this.state.size,
			factions: this.state.factions,
		};

		console.log(world);

		if (world.name !== '' && world.size !== '') {
			axios.post('http://localhost:5001/worlds/add', world).then(res => console.log(res.data));
			window.location = '/worlds';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createworld';
		}
	}
	render() {
		return (
			<div>
				<h3>Create New World</h3>
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
						<input type="submit" value="Create Worlds" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

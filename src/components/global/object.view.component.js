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

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_LOCAL_DB}/worlds/` + this.props.match.params.id)
			.then(res => {
				this.setState({
					name: res.data.name,
					size: res.data.size,
					factions: res.data.factions,
				});
			})
			.catch(err => console.log(err));

		// axios.get('http://localhost:5000/users/').then(res => {
		// 	if (res.data.length > 0) {
		// 		this.setState({
		// 			users: res.data.map(user => user.username),
		// 		});
		// 	}
		// });
	}
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
			axios.post(`${process.env.REACT_APP_LOCAL_DB}/worlds/add`, world).then(res => console.log(res.data));
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
				{console.log('this.state in Render/OVC', this.state)}
				<h1>{this.state.name}</h1>
				<p>Size:</p>

				<h2>{this.state.size}</h2>
				<p>Factions:</p>

				<h2>{this.state.factions}</h2>

				<br />

				<button
					onClick={() => {
						window.location = `/list/${this.state.name}`;
					}}
				>
					Go back
				</button>

				{/* <form onSubmit={this.onSubmit}>
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
				</form> */}
			</div>
		);
	}
}

import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
			firstName: '',
			lastName: '',
		};
	}

	// componentDidMount() {
	// 	axios.get('http://localhost:5000/users/').then(res => {
	// 		if (res.data.length > 0) {
	// 			this.setState({
	// 				users: res.data.map(user => user.username),
	// 				username: res.data[0].username,
	// 			});
	// 		}
	// 	});
	// }
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onChangeFirstName(e) {
		this.setState({
			firstName: e.target.value,
		});
	}
	onChangeLastName(e) {
		this.setState({
			lastName: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const user = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};

		console.log(user);

		if (user.username !== '' && user.firstName !== '' && user.lastName !== '') {
			axios.post('http://localhost:5001/users/add', user).then(res => console.log(res.data));
			window.location = '/users';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createuser';
		}
	}
	render() {
		return (
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						/>
					</div>
					<div className="form-group">
						<label>First Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.firstName}
							onChange={this.onChangeFirstName}
						/>
					</div>
					<div className="form-group">
						<label>Last Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.lastName}
							onChange={this.onChangeLastName}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create User" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

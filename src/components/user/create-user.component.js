import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateUser extends Component {
	state = {
		username: '',
		firstName: '',
		lastName: '',
		characterClass: '',
		level: 0,
		type: 'users',
		externalLink: '',
	};

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
	onChangeUsername = node => {
		this.setState({
			username: node.target.value,
		});
	};
	onChangeFirstName = node => {
		this.setState({
			firstName: node.target.value,
		});
	};
	onChangeLastName = node => {
		this.setState({
			lastName: node.target.value,
		});
	};
	onChangeCharacterClass = node => {
		this.setState({
			characterClass: node.target.value,
		});
	};
	onChangeLevel = node => {
		this.setState({
			level: node.target.value,
		});
	};
	onChangeExternalLink = node => {
		this.setState({
			externalLink: node.target.value,
		});
	};
	onSubmit = node => {
		node.preventDefault();
		const user = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			characterClass: this.state.characterClass,
			level: this.state.level,
			externalLink: this.state.externalLink,
		};

		console.log(user);

		if (user.username !== '' && user.firstName !== '' && user.lastName !== '') {
			axios.post(`${process.env.REACT_APP_LOCAL_DB}/users/add`, user).then(res => console.log(res.data));
			window.location = '/list/users';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createuser';
		}
	};
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
						<label>Class: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.characterClass}
							onChange={this.onChangeCharacterClass}
						/>
					</div>
					<div className="form-group">
						<label>Level: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.level}
							onChange={this.onChangeLevel}
						/>
					</div>
					<div className="form-group">
						<label>External Link: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.externalLink}
							onChange={this.onChangeExternalLink}
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

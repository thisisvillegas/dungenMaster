import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
	<tr>
		<td>{props.user.username}</td>
		<td>{props.user.firstName}</td>
		<td>{props.user.lastName}</td>
		<td>
			<Link to={'/edit/' + props.user._id}>edit</Link> |{' '}
			<a
				href="/users"
				onClick={() => {
					props.deleteUser(props.user._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class UsersList extends Component {
	constructor(props) {
		super(props);
		this.deleteUser = this.deleteUser.bind(this);
		this.state = { users: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5001/users/')
			.then(res => {
				this.setState({ users: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteUser(id) {
		axios.delete('http://localhost:5001/users/' + id).then(res => console.log(res.data));
		this.setState({
			users: this.state.users.filter(el => el._id !== id),
		});
	}

	userList() {
		return this.state.users.map(currentuser => {
			return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
		});
	}
	render() {
		return (
			<div>
				<h3>Users Available</h3>
				<div>
					<Link to="/createuser">Create New User</Link>
				</div>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.userList()}</tbody>
				</table>
			</div>
		);
	}
}

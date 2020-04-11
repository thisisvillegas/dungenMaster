import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateWorld from '../components/world/create-world.component';
import CreateUser from '../components/user/create-user.component';

export default class WorldsList extends Component {
	constructor(props) {
		super(props);
		this.state = { worlds: [] };
	}

	render() {
		return (
			<div>
				<h1>splash yeah</h1>
			</div>
		);
	}
}

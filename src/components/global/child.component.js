import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const Child = props => <td>{props.child.username}</td>;

export default class ChildrenList extends Component {
	constructor(props) {
		super(props);

		this.state = { children: [] };
	}

	componentDidMount() {
		axios
			.get('http://localhost:5050/exercises/')
			.then(res => {
				this.setState({ children: res.data });
			})
			.catch(err => console.log(err));
	}

	childList() {
		return this.state.children.map(currentChild => {
			return <Child child={currentChild} key={currentChild._id} />;
		});
	}
	render() {
		return <div>{this.childList()}</div>;
	}
}

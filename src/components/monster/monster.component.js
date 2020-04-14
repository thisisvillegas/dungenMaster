import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Monster = props => (
	<tr>
		<td>{props.monster.name}</td>
		<td>{props.monster.world}</td>
		<td>
			<Link to={'/edit/' + props.monster._id}>edit</Link> |
			<a
				href="/monsters"
				onClick={() => {
					props.deleteMonster(props.monster._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class MonstersList extends Component {
	constructor(props) {
		super(props);
		this.deleteMonster = this.deleteMonster.bind(this);
		this.state = { monsters: [] };
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_LOCAL_DB}/monsters/`)
			.then(res => {
				console.log('res.data', res.data);
				this.setState({ monsters: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteMonster(id) {
		axios.delete(`${process.env.REACT_APP_LOCAL_DB}/monsters/` + id).then(res => console.log(res.data));
		this.setState({
			monsters: this.state.monsters.filter(el => el._id !== id),
		});
	}

	monsterList() {
		return this.state.monsters.map(currentmonster => {
			return <Monster monster={currentmonster} deleteMonster={this.deleteMonster} key={currentmonster._id} />;
		});
	}
	render() {
		return (
			<div>
				<h3>Monsters Available</h3>
				<div>
					<Link to="/createmonster">Create New Monster</Link>
				</div>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Name</th>
							<th>World</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.monsterList()}</tbody>
				</table>
			</div>
		);
	}
}

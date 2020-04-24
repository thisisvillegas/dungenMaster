import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditCampaign extends Component {
	constructor(props) {
		super(props);
		this.onChangeSize = this.onChangeSize.bind(this);
		this.onChangeFaction = this.onChangeFaction.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			name: '',
			world: '',
			size: '',
			factions: 0,
		};
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_LOCAL_DB}/campaigns/` + this.props.match.params.id)
			.then(res => {
				this.setState({
					name: res.data.name,
					world: res.data.world,
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
	onChangeSize(e) {
		this.setState({
			size: e.target.value,
		});
	}
	onChangeFaction(e) {
		this.setState({
			factions: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const campaign = {
			name: this.state.name,
			world: this.state.world,
			size: this.state.size,
			factions: this.state.factions,
		};

		console.log(campaign);
		axios
			.put(`${process.env.REACT_APP_LOCAL_DB}/campaigns/update/` + this.props.match.params.id, campaign)
			.then(res => console.log(res.data));

		window.location = '/campaigns';
	}
	render() {
		return (
			<div>
				<h3>Edit Campaign</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input type="text" className="form-control" value={this.state.name} contentEditable="false" />
					</div>
					<div className="form-group">
						<label>World: </label>
						<input type="text" className="form-control" value={this.state.world} contentEditable="false" />
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
							type="text"
							className="form-control"
							value={this.state.factions}
							onChange={this.onChangeFaction}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Edit Campaign" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}

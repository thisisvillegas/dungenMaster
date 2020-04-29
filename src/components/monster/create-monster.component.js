import React, { Component } from 'react';
import styled from 'styled-components';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBInput } from 'mdbreact';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const StyledCard = styled.div`
	background-color: black;
`;

export default class CreateMonster extends Component {
	state = {
		name: '',
		desc: '',
		level: '',
		type: 'monster',
		world: '',
		worlds: [],
		campaigns: [],
		locations: [],
		encounters: [],
		alignment: '',
		armorClass: 0,
		hitPoints: 0,
		speed: 0,
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
		damageResistances: [],
		damageImmunities: [],
		conditionImmunities: [],
		savingThrows: [],
		skills: [],
		senses: [],
		languages: [],
		challenge: 0,
		abilities: [],
		actions: [],
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
	onChangeName = node => {
		this.setState({
			name: node.target.value,
		});
	};
	onChangeDesc = node => {
		this.setState({
			desc: node.target.value,
		});
	};
	onChangeAlignment = node => {
		this.setState({
			alignment: node.target.value,
		});
	};
	onChangeArmorClass = node => {
		this.setState({
			armorClass: node.target.value,
		});
	};
	onChangeHitPoints = node => {
		this.setState({
			hitPoints: node.target.value,
		});
	};
	onChangeSpeed = node => {
		this.setState({
			speed: node.target.value,
		});
	};
	onChangeStr = node => {
		this.setState({
			str: node.target.value,
		});
	};
	onChangeDex = node => {
		this.setState({
			dex: node.target.value,
		});
	};
	onChangeCon = node => {
		this.setState({
			con: node.target.value,
		});
	};
	onChangeInt = node => {
		this.setState({
			int: node.target.value,
		});
	};
	onChangeWis = node => {
		this.setState({
			wis: node.target.value,
		});
	};
	onChangeCha = node => {
		this.setState({
			cha: node.target.value,
		});
	};
	onChangeDamageResistance = node => {
		this.setState({
			damageResistance: node.target.value,
		});
	};
	onChangeDamageImmunities = node => {
		this.setState({
			damageImmunities: node.target.value,
		});
	};
	onChangeConditionImmunities = node => {
		this.setState({
			conditionImmunities: node.target.value,
		});
	};
	onChangeSavingThrows = node => {
		this.setState({
			savingThrows: node.target.value,
		});
	};
	onChangeSkills = node => {
		this.setState({
			skills: node.target.value,
		});
	};
	onChangeSenses = node => {
		this.setState({
			senses: node.target.value,
		});
	};
	onChangeLanguages = node => {
		this.setState({
			languages: node.target.value,
		});
	};
	onChangeChallenge = node => {
		this.setState({
			challenge: node.target.value,
		});
	};
	onChangeAbilities = node => {
		this.setState({
			abilities: node.target.value,
		});
	};
	onChangeActions = node => {
		this.setState({
			actions: node.target.value,
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
		const monster = {
			name: this.state.name,
			desc: this.state.desc,
			level: this.state.level,
			type: 'monster',
			world: this.state.world,
			worlds: [],
			campaigns: [],
			locations: [],
			encounters: [],
			alignment: this.state.alignment,
			armorClass: this.state.armorClass,
			hitPoints: this.state.hitPoints,
			speed: this.state.speed,
			str: this.state.str,
			dex: this.state.dex,
			con: this.state.con,
			int: this.state.int,
			wis: this.state.wis,
			cha: this.state.cha,
			damageResistances: this.state.damageResistances,
			damageImmunities: this.state.damageImmunities,
			conditionImmunities: this.state.conditionImmunities,
			savingThrows: this.state.savingThrows,
			skills: this.state.skills,
			senses: this.state.senses,
			languages: this.state.languages,
			challenge: this.state.challenge,
			abilities: this.state.abilities,
			actions: this.state.actions,
		};

		console.log(monster);

		if (monster.name !== '') {
			axios.post(`${process.env.REACT_APP_LOCAL_DB}/monsters/add`, monster).then(res => console.log(res.data));
			window.location = '/list/monsters';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createuser';
		}
	};
	render() {
		return (
			<div>
				<h3>Create New Monster</h3>

				<MDBCol style={{ maxWidth: '35rem', paddingTop: '3%' }}>
					{/* {console.log('props.details in users and monsters', props.details)} */}
					<MDBCard>
						{/* <MDBCardImage className="img-fluid" src={} waves /> */}
						<StyledCard>
							<MDBCardBody>
								<MDBCardTitle>WE CREATING MONSTERS BITCH</MDBCardTitle>
								<MDBCardText>
									<MDBInput label="Name" type="text" onChange={this.onChangeName} />
									card text, this is where the fields will go.
								</MDBCardText>
								<MDBBtn
									style={{ color: 'white', border: '1px solid #962727' }}
									href={`/list/${this.state.type}`}
								>
									Go Back
								</MDBBtn>
								<MDBBtn
									style={{ color: 'white', border: '1px solid #962727', margin: '0 0 0 20px' }}
									onClick={console.log('this is where we save the data')}
								>
									Summon
								</MDBBtn>
							</MDBCardBody>
						</StyledCard>
					</MDBCard>
				</MDBCol>
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
						<label>Level: </label>
						<input
							type="number"
							className="form-control"
							value={this.state.level}
							onChange={this.onChangeLevel}
						/>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.desc}
							onChange={this.onChangeDesc}
						/>
					</div>
					<div className="form-group">
						<label>Alignment: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.alignment}
							onChange={this.onChangeAlignment}
						/>
					</div>
					<div className="form-group">
						<label>Armor Class: </label>
						<input
							type="number"
							className="form-control"
							value={this.state.armorClass}
							onChange={this.onChangeArmorClass}
						/>
					</div>
					<div className="form-group">
						<label>Hit Points:</label>
						<input
							type="number"
							className="form-control"
							value={this.state.hitPoints}
							onChange={this.onChangeHitPoints}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Create User" className="btn btn-primary" />
					</div>
				</form> */}
			</div>
		);
	}
}

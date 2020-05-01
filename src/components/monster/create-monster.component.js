import React, { Component } from 'react';
import styled from 'styled-components';
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
	MDBCol,
	MDBInput,
	MDBRow,
} from 'mdbreact';
// import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const StyledCard = styled.div`
	background-color: black;
	.row {
		margin: -35px 5px 0 5px;
	}
	.btn {
	}
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
		damageResistances: '',
		damageImmunities: '',
		conditionImmunities: '',
		savingThrows: '',
		skills: '',
		senses: '',
		languages: '',
		challenge: 0,
		abilities: '',
		actions: '',
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
		console.log('welcome to on submit');
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

		console.log('payload to be posted', monster);

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
			<MDBCol style={{ maxWidth: '55rem', paddingTop: '2%' }}>
				{/* {console.log('props.details in users and monsters', props.details)} */}
				<MDBCard>
					{/* <MDBCardImage
						className="img-fluid"
						width="50%"
						src={'https://cdn.pixabay.com/photo/2013/07/13/12/04/death-159120_960_720.png'}
						waves
					/> */}
					<StyledCard>
						<MDBCardBody>
							<MDBCardTitle>WE CREATING MONSTERS BITCH</MDBCardTitle>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="name" type="text" onChange={this.onChangeName} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="level" type="number" onChange={this.onChangeLevel} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="6">
									<MDBInput label="desc" type="text" onChange={this.onChangeDesc} />
								</MDBCol>
								<MDBCol size="6">
									<MDBInput label="alignment" type="text" onChange={this.onChangeAlignment} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="armor class" type="number" onChange={this.onChangeArmorClass} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="hit points" type="number" onChange={this.onChangeHitPoints} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="speed" type="number" onChange={this.onChangeSpeed} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="2">
									<MDBInput label="str" type="number" onChange={this.onChangeStr} />
								</MDBCol>
								<MDBCol size="2">
									<MDBInput label="dex" type="number" onChange={this.onChangeDex} />
								</MDBCol>
								<MDBCol size="2">
									<MDBInput label="con" type="number" onChange={this.onChangeCon} />
								</MDBCol>
								<MDBCol size="2">
									<MDBInput label="int" type="number" onChange={this.onChangeInt} />
								</MDBCol>
								<MDBCol size="2">
									<MDBInput label="wis" type="number" onChange={this.onChangeWis} />
								</MDBCol>
								<MDBCol size="2">
									<MDBInput label="cha" type="number" onChange={this.onChangeCha} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput
										label="damage resistances"
										type="text"
										onChange={this.onChangeDamageResistance}
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput
										label="damage immunities"
										type="text"
										onChange={this.onChangeDamageImmunities}
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput
										label="condition immunities"
										type="text"
										onChange={this.onChangeConditionImmunities}
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="saving throws" type="text" onChange={this.onChangeSavingThrows} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="skills" type="text" onChange={this.onChangeSkills} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="senses" type="text" onChange={this.onChangeSenses} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="language" type="text" onChange={this.onChangeLanguages} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="challenge" type="text" onChange={this.onChangeChallenge} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="abilities" type="text" onChange={this.onChangeAbilities} />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="actions" type="text" onChange={this.onChangeActions} />
								</MDBCol>
							</MDBRow>
							<MDBCardText>
								<span>Happy Hunting</span>
							</MDBCardText>
							<MDBBtn href={`/list/${this.state.type}`}>Go Back</MDBBtn>
							<MDBBtn style={{ margin: '0 0 0 20px' }} onClick={this.onSubmit}>
								Summon
							</MDBBtn>
						</MDBCardBody>
					</StyledCard>
				</MDBCard>
			</MDBCol>
		);
	}
}

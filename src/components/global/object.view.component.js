import React, { Component } from 'react';
import styled from 'styled-components';
import {
	MDBAlert,
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCardText,
	MDBCol,
	MDBContainer,
	MDBInput,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
} from 'mdbreact';
import axios from 'axios';
// import SettingsIcon from '@material-ui/icons/Settings';
import MonsterEditModal from './edit-modal.component';

// console.log = function() {};

const StyledCard = styled.div`
	display: inline-block;
	.btn {
		margin: 0 10px 0 10px;
		color: primary;
	}
	.col {
		maxwidth: 35rem;
		padding: 3% 10% 0 5%;
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card-body {
		background-color: black;
	}
	.card-text {
		display: grid;
	}
	.card {
		border: 1px solid white;
	}
	.span {
		display: inline-block;
	}
`;

const StyledCard2 = styled.div`
	display: flex;
	.btn {
		margin: 0 10px 0 10px;
		color: primary;
	}
	.col {
		maxwidth: 35rem;
		padding: 3% 2% 2% 2%;
		width: 45%;
		display: inline-block;
	}
	.card-body {
		background-color: black;
	}
	.card-text {
		display: grid;
	}
	.card {
		border: 1px solid white;
	}
	.span {
		display: inline-block;
	}
`;

function setImageUrl(props) {
	switch (props.details.type) {
		case 'worlds':
			return 'https://cdn.pixabay.com/photo/2018/08/15/13/10/galaxy-3608029_960_720.jpg';
		case 'campaigns':
			return 'https://cdn.pixabay.com/photo/2016/01/09/18/28/old-1130743_960_720.jpg';
		case 'locations':
			return 'https://cdn.pixabay.com/photo/2017/07/22/11/46/adventure-2528477_960_720.jpg';
		case 'encounters':
			return 'https://cdn.pixabay.com/photo/2018/11/29/20/30/fantasy-3846432__340.jpg';
		case 'users':
			return 'https://cdn.pixabay.com/photo/2020/04/18/13/56/fantasy-5059251_960_720.jpg';
		case 'monsters':
			return 'https://image.shutterstock.com/image-illustration/kraken-creature-scandinavian-folklore-said-600w-1520624258.jpg';
		default:
			return 'https://cdn.pixabay.com/photo/2012/05/07/12/03/frog-48234_960_720.png';
	}
}

const EncounterData = props => {
	return (
		<StyledCard>
			<MDBCol>
				{console.log('props.details in card example', props.details)}
				<MDBCard>
					<MDBCardImage className="img-fluid" src={setImageUrl(props)} waves />

					<MDBCardBody>
						<MDBCardTitle>
							{props.details.type === 'users' ? props.details.username : props.details.name}
						</MDBCardTitle>
						<MDBCardText>
							{!props.details.factions ? '' : <span>Factions: {props.details.factions}</span>}
							{!props.details.size ? '' : <span>Size: {props.details.size}</span>}
							{!props.details.world ? '' : <span>World: {props.details.world}</span>}
							{!props.details.campaign ? '' : <span>Campaign: {props.details.campaign}</span>}
							{!props.details.location ? '' : <span>Location: {props.details.location}</span>}
							{!props.details.lastName ? '' : <span>Last Name: {props.details.lastName}</span>}
							{!props.details.characterClass ? '' : <span>Class: {props.details.characterClass}</span>}
							{!props.details.level ? '' : <span>Level: {props.details.level}</span>}
						</MDBCardText>
						<MDBBtn color="elegant" size="sm" href={`/list/${props.details.type}`}>
							Go Back
						</MDBBtn>
						<MDBBtn color="elegant" size="sm" onClick={props.toggle}>
							Edit
						</MDBBtn>
						<MDBBtn color="elegant" size="sm" onClick={props.toggle}>
							Delete
						</MDBBtn>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</StyledCard>
	);
};

const Monsters = props => {
	return (
		<StyledCard2>
			<MDBCol>
				{console.log('props.details in card example', props)}
				<MDBCard>
					<MDBCardBody>
						<MDBCardTitle>{props.details.name}</MDBCardTitle>
						<MDBCardText>
							{!props.details.desc ? '' : <span>Description: {props.details.desc}</span>}
							{!props.details.level ? '' : <span>Level: {props.details.level}</span>}
							{!props.details.world ? '' : <span>world: {props.details.world}</span>}
							{/* {!props.details.worlds ? '' : <span>worlds: {props.details.worlds}</span>}
							{!props.details.campaigns ? '' : <span>campaigns: {props.details.campaigns}</span>}
							{!props.details.locations ? '' : <span>locations: {props.details.locations}</span>}
							{!props.details.encounters ? '' : <span>encounters: {props.details.encounters}</span>} */}
							{!props.details.alignment ? '' : <span>Alignment: {props.details.alignment}</span>}
							{!props.details.armorClass ? '' : <span>armorClass: {props.details.armorClass}</span>}
							{!props.details.hitPoints ? '' : <span>hitPoints: {props.details.hitPoints}</span>}
							{!props.details.speed ? '' : <span>speed: {props.details.speed}</span>}
							{!props.details.str ? '' : <span>str: {props.details.str}</span>}
							{!props.details.dex ? '' : <span>dex: {props.details.dex}</span>}
							{!props.details.con ? '' : <span>con: {props.details.con}</span>}
							{!props.details.int ? '' : <span>int: {props.details.int}</span>}
							{!props.details.wis ? '' : <span>wis: {props.details.wis}</span>}
							{!props.details.cha ? '' : <span>cha: {props.details.cha}</span>}
							{!props.details.damageResistances ? (
								''
							) : (
								<span>damageResistances: {props.details.damageResistances}</span>
							)}
							{!props.details.damageImmunities ? (
								''
							) : (
								<span>damageImmunities: {props.details.damageImmunities}</span>
							)}
							{!props.details.conditionImmunities ? (
								''
							) : (
								<span>conditionImmunities: {props.details.conditionImmunities}</span>
							)}
							{!props.details.savingThrows ? '' : <span>savingThrows: {props.details.savingThrows}</span>}
							{!props.details.skills ? '' : <span>skills: {props.details.skills}</span>}
							{!props.details.senses ? '' : <span>senses: {props.details.senses}</span>}
							{!props.details.languages ? '' : <span>languages: {props.details.languages}</span>}
							{!props.details.challenge ? '' : <span>challenge: {props.details.challenge}</span>}
							{!props.details.abilities ? '' : <span>abilities: {props.details.abilities}</span>}
							{!props.details.actions ? '' : <span>actions: {props.details.actions}</span>}
						</MDBCardText>
						<MDBBtn color="elegant" size="sm" href={`/list/${props.details.type}`}>
							Go Back
						</MDBBtn>
						<MDBBtn color="elegant" size="sm" onClick={props.toggle}>
							Edit
						</MDBBtn>
						<MDBBtn
							color="elegant"
							size="sm"
							onClick={() => {
								window.confirm('You cool with deleting this?')
									? props.deleteElement(props.details.type, props.details._id)
									: console.log('');
							}}
						>
							Delete
						</MDBBtn>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
			<MDBCol>
				{/* {console.log('props.details in card example', props.details)} */}
				<MDBCard>
					<MDBCardImage className="img-fluid" src={setImageUrl(props)} waves />
				</MDBCard>
			</MDBCol>
		</StyledCard2>
	);
};

export default class ShowObject extends Component {
	state = {
		campaign: '',
		location: '',
		size: '',
		factions: 0,
		username: '',
		firstName: '',
		lastName: '',
		characterClass: '',

		name: '',
		desc: '',
		level: '',
		type: '',
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

	componentDidMount = () => {
		const res = this.props.location.state;
		console.log('receivedObject', res);

		this.setState({ ...res, modal: false });
	};

	componentWillReceiveProps = nextProps => {
		console.log('nextProps in View', nextProps.location.state);
		let res = nextProps.location.state;
		this.setState({ ...res });
	};
	toggle = () => {
		console.log('this.state.modal', this.state.modal);
		this.setState({
			modal: !this.state.modal,
		});
	};

	deleteElement = (type, id) => {
		this.toggle();
		console.log(`deleting this type ${type} with id ${id}`);
		axios.delete(`${process.env.REACT_APP_LOCAL_DB}/${type}/` + id).then(res => console.log(res.data));
		window.location = `/list/${type}`;
	};

	dothisthing = (e, type) => {
		console.log('e ', e);
		console.log('type', type);

		this.setState({ ...e });

		// console.log('this.state in do this thing', this.state);

		const element = { ...this.state };

		console.log(element);

		if (element.name !== '' || element.username !== '') {
			axios
				.put(`${process.env.REACT_APP_LOCAL_DB}/${type}/update/` + element._id, e)
				.then(res => console.log('Success!!here is the response from the database \n', res.data));
			console.log('hey, we sent shit out.');
		} else {
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~shit broke');
			// alert('Please fill out all fields');
		}
	};

	onChangeName = e => {
		console.log('e', e);
		this.setState({
			name: e.target.value,
		});
	};
	onChangeSize = e => {
		console.log('e', e);
		this.setState({
			size: e.target.value,
		});
	};
	onChangeFactions = e => {
		this.setState({
			factions: e.target.value,
		});
	};
	onChangeUsername = e => {
		this.setState({
			username: e.target.value,
		});
	};
	onChangeFirstName = e => {
		this.setState({
			firstName: e.target.value,
		});
	};
	onChangeLastName = e => {
		this.setState({
			lastName: e.target.value,
		});
	};
	onChangeCharacterClass = e => {
		this.setState({
			characterClass: e.target.value,
		});
	};
	onChangeLevel = e => {
		this.setState({
			level: e.target.value,
		});
	};

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		return (
			<div>
				{this.props.location.state.type === 'monsters' ? (
					<div>
						<Monsters
							details={this.state}
							dothisthing={this.dothisthing}
							toggle={this.toggle}
							deleteElement={this.deleteElement}
						></Monsters>
						<MonsterEditModal
							props={this.state}
							handleInput={this.handleInput}
							toggle={this.toggle}
							dothisthing={this.dothisthing}
							state={this.props.location.state}
						></MonsterEditModal>
					</div>
				) : (
					<div>
						<EncounterData
							details={this.state}
							dothisthing={this.dothisthing}
							toggle={this.toggle}
						></EncounterData>

						<MonsterEditModal
							props={this.state}
							handleInput={this.handleInput}
							toggle={this.toggle}
							dothisthing={this.dothisthing}
							state={this.props.location.state}
						></MonsterEditModal>
					</div>
				)}
			</div>
		);
	}
}

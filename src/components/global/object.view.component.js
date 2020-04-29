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
	background-color: black;
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
		default:
			return 'https://cdn.pixabay.com/photo/2012/05/07/12/03/frog-48234_960_720.png';
	}
}

const EncounterData = props => {
	return (
		<MDBCol style={{ maxWidth: '35rem', paddingTop: '3%' }}>
			{/* {console.log('props.details in card example', props.details)} */}
			<MDBCard>
				<MDBCardImage className="img-fluid" src={setImageUrl(props)} waves />
				<StyledCard>
					<MDBCardBody>
						<MDBCardTitle>{props.details.name}</MDBCardTitle>
						<MDBCardText>
							<span>Factions: {props.details.factions}</span>

							{!props.details.size ? '' : <span>Size: {props.details.size}</span>}
							{!props.details.world ? '' : <span>World: {props.details.world}</span>}
							{!props.details.campaign ? '' : <span>Campaign: {props.details.campaign}</span>}
							{!props.details.location ? '' : <span>Location: {props.details.location}</span>}
						</MDBCardText>
						<MDBBtn
							style={{ color: 'white', border: '1px solid #962727' }}
							href={`/list/${props.details.type}`}
						>
							Go Back
						</MDBBtn>
						<MDBBtn
							style={{ color: 'white', border: '1px solid #962727', margin: '0 20px 0 20px' }}
							onClick={props.toggle}
						>
							Edit
						</MDBBtn>
						<MDBBtn style={{ color: 'white', border: '1px solid #962727' }} onClick={props.toggle}>
							Delete
						</MDBBtn>
					</MDBCardBody>
				</StyledCard>
			</MDBCard>
		</MDBCol>
	);
};

const UsersAndMonsters = props => {
	return (
		<MDBCol style={{ maxWidth: '35rem', paddingTop: '3%' }}>
			{/* {console.log('props.details in users and monsters', props.details)} */}
			<MDBCard>
				<MDBCardImage className="img-fluid" src={setImageUrl(props)} waves />
				<StyledCard>
					<MDBCardBody>
						<MDBCardTitle>{props.details.username}</MDBCardTitle>
						<MDBCardText>
							<span>First Name: {props.details.firstName}</span>
							<span>Last Name: {props.details.lastName}</span>
							<span>Class: {props.details.characterClass}</span>
							<span>Level: {props.details.level}</span>
						</MDBCardText>
						<MDBBtn
							style={{ color: 'white', border: '1px solid #962727' }}
							href={`/list/${props.details.type}`}
						>
							Go Back
						</MDBBtn>
						<MDBBtn
							style={{ color: 'white', border: '1px solid #962727', margin: '0 20px 0 20px' }}
							onClick={props.toggle}
						>
							Edit
						</MDBBtn>
						<MDBBtn style={{ color: 'white', border: '1px solid #962727' }} onClick={props.toggle}>
							Delete
						</MDBBtn>
					</MDBCardBody>
				</StyledCard>
			</MDBCard>
		</MDBCol>
	);
};

export default class ShowObject extends Component {
	state = {
		type: '',
		name: '',
		world: '',
		campaign: '',
		location: '',
		size: '',
		factions: 0,
		username: '',
		firstName: '',
		lastName: '',
		characterClass: '',
		level: '',
	};

	componentDidMount = () => {
		const res = this.props.location.state;
		console.log('receivedObject', res);

		this.setState({
			_id: res._id,
			type: res.type,
			name: res.name,
			world: res.world,
			campaign: res.campaign,
			location: res.location,
			size: res.size,
			factions: res.factions,
			modal: false,
			username: res.username,
			firstName: res.firstName,
			lastName: res.lastName,
			characterClass: res.characterClass,
			level: res.level,
		});
	};

	componentWillReceiveProps = nextProps => {
		console.log('nextProps', nextProps.location.state);
		let res = nextProps.location.state;
		this.setState({
			type: res.type,
			name: res.name,
			world: res.world,
			campaign: res.campaign,
			location: res.location,
			size: res.size,
			factions: res.factions,
			username: res.username,
			firstName: res.firstName,
			lastName: res.lastName,
			characterClass: res.characterClass,
			level: res.level,
		});
	};
	toggle = () => {
		console.log('this.state.modal', this.state.modal);
		this.setState({
			modal: !this.state.modal,
		});
	};

	dothisthing = (e, type) => {
		console.log('e ', e);
		console.log('type', type);

		this.setState({
			name: e.name,
			size: e.size,
			factions: e.factions,
			username: e.username,
			firstName: e.firstName,
			lastName: e.lastName,
			characterClass: e.characterClass,
			level: e.level,
		});

		// console.log('this.state in do this thing', this.state);

		const element = { ...this.state };

		console.log(element);

		if (element.name !== '' && element.size !== '' && element.username !== '') {
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
				{this.props.location.state.type === 'users' ? (
					<div>
						<UsersAndMonsters
							details={this.state}
							dothisthing={this.dothisthing}
							toggle={this.toggle}
						></UsersAndMonsters>
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

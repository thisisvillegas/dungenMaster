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
import 'react-datepicker/dist/react-datepicker.css';

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
		default:
			return 'https://cdn.pixabay.com/photo/2012/05/07/12/03/frog-48234_960_720.png';
	}
}

const CardExample = props => {
	return (
		<MDBCol style={{ maxWidth: '35rem', paddingTop: '3%' }}>
			{/* {console.log('props.details', props)} */}
			<MDBCard>
				<MDBCardImage className="img-fluid" src={setImageUrl(props)} waves />
				<StyledCard>
					<MDBCardBody>
						<MDBCardTitle>
							<h3>{props.details.name}</h3>
						</MDBCardTitle>
						<MDBCardText>
							<p>Size: {props.details.size}</p>
							<p>Factions: {props.details.factions}</p>

							{!props.details.world ? '' : <p>World: {props.details.world}</p>}
							{!props.details.campaign ? '' : <p>Campaign: {props.details.campaign}</p>}
							{!props.details.location ? '' : <p>Location: {props.details.location}</p>}
						</MDBCardText>
						<MDBBtn href={`/list/${props.details.type}`}>Go Back</MDBBtn>
						<MDBBtn onClick={props.toggle}>Edit</MDBBtn>
					</MDBCardBody>
				</StyledCard>
			</MDBCard>
		</MDBCol>
	);
};

export default class ShowObject extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeSize = this.onChangeSize.bind(this);
		this.onChangeFactions = this.onChangeFactions.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.dothisthing = this.dothisthing.bind(this);

		this.state = {
			type: '',
			name: '',
			world: '',
			campaign: '',
			location: '',
			size: '',
			factions: 0,
		};
	}

	componentDidMount() {
		const res = this.props.location.state;
		console.log('receivedObject', res);

		this.setState({
			type: res.type,
			name: res.name,
			world: res.world,
			campaign: res.campaign,
			location: res.location,
			size: res.size,
			factions: res.factions,
			modal: false,
		});
	}

	componentWillReceiveProps(nextProps) {
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
		});
	}
	toggle = () => {
		console.log('this.state.modal', this.state.modal);
		this.setState({
			modal: !this.state.modal,
		});
	};

	dothisthing(e, type) {
		console.log('e in the do this ting', e);
		console.log('type', type);
		console.log('this.state.size', this.state.size);

		this.setState({
			name: e.name,
			size: e.size,
			factions: e.factions,
		});
	}

	onChangeName(e) {
		console.log('e', e);
		this.setState({
			name: e.target.value,
		});
	}
	onChangeSize(e) {
		console.log('e', e);
		this.setState({
			size: e.target.value,
		});
	}
	onChangeFactions(e) {
		this.setState({
			factions: e.target.value,
		});
	}

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	onSubmit(e) {
		e.preventDefault();
		const world = {
			name: this.state.name,
			size: this.state.size,
			factions: this.state.factions,
		};

		console.log(world);

		if (world.name !== '' && world.size !== '') {
			axios.post(`${process.env.REACT_APP_LOCAL_DB}/worlds/add`, world).then(res => console.log(res.data));
			window.location = '/list/worlds';
		} else {
			console.log('shit broke');
			alert('Please fill out all fields');
			window.location = 'createworld';
		}
	}
	render() {
		// console.log('currentstate', currentstate);
		console.log('this.props.location', this.props.location);
		return (
			<div>
				{console.log('this.state in Render/OVC', this.state)}
				<CardExample details={this.state} dothisthing={this.dothisthing} toggle={this.toggle}></CardExample>
				<MDBContainer>
					<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
						<MDBModalHeader style={{ color: 'black' }} toggle={this.toggle}>
							Enter in new value
						</MDBModalHeader>
						<MDBModalBody style={{ color: 'black' }}>
							<form className="mx-3 grey-text">
								<MDBInput
									hint="enter in a cool name"
									type="text"
									name="name"
									value={this.state.name}
									onInput={this.handleInput}
								/>
								<MDBInput
									hint="enter in a cool size"
									type="text"
									name="size"
									value={this.state.size}
									onInput={this.handleInput}
								/>
								<MDBInput
									hint="enter in number of factions"
									type="text"
									name="factions"
									value={this.state.factions}
									onInput={this.handleInput}
								/>
							</form>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn
								color="secondary"
								onClick={() => {
									this.toggle();
									this.dothisthing(this.props.location.state);
								}}
							>
								Close
							</MDBBtn>
							<MDBBtn
								color="primary"
								onClick={() => {
									this.dothisthing(this.state);
									this.toggle();
								}}
							>
								Save changes
							</MDBBtn>
						</MDBModalFooter>
					</MDBModal>
				</MDBContainer>
			</div>
		);
	}
}

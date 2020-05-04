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
	MDBRow,
} from 'mdbreact';
import axios from 'axios';

import Encounters from './encounter.counter.component';
import ObjectList from '../global/object.list.component';

const StyledCard = styled.div`
	display: inline-block;
	width: 360px;

	.btn {
		margin: 0 10px 0 10px;
		color: primary;
	}
	.col {
		padding: 3% 10% 0 5%;

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
		height: 425px;
		width: 300px;
		border: 1px solid white;
	}
	.span {
		display: inline-block;
	}
	.row {
		margin: -35px 0 0 0;
	}
`;

const StyledCard2 = styled.div`
	display: inline-block;
	width: 360px;

	.btn {
		margin: 0 10px 0 10px;
		color: primary;
	}
	.col {
		padding: 3% 10% 0 5%;

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
		height: 250px;
		width: 300px;
		border: 1px solid white;
	}
	.span {
		display: inline-block;
	}
`;

const FactionData = props => {
	return (
		<StyledCard>
			<MDBCol>
				{console.log('props.details in card example', props.details)}
				<MDBCard>
					{/* <x/MDBCardImage className="img-fluid" src={} waves /> */}

					<MDBCardBody>
						<MDBCardTitle>Faction</MDBCardTitle>
						<MDBCardText>
							<span>Monster 1</span>
							<span>Monster 1</span>
							<span>Monster 1</span>
							<span>Monster 1</span>
							<span>Monster 2</span>
							<span>Monster 2</span>
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</StyledCard>
	);
};

let mockCampaigns = ['Camp1', 'Camp2'];

const EncounterData = props => {
	return (
		<StyledCard>
			<MDBCol>
				{console.log('props.details in Encounter Data', props.details)}
				<MDBCard>
					{/* <MDBCardImage
						className="img-fluid"
						src={'https://www.searchpng.com/wp-content/uploads/2019/12/versus-Image-PNG-715x715.jpg'}
						waves
					/> */}

					<MDBCardBody>
						<MDBCardTitle>Encounter Details</MDBCardTitle>
						<MDBCardText>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="name" type="text" />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="location" type="text" />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="style" type="text" />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<MDBInput label="description" type="text" />
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol size="12">
									<select label="Location" value={'Location'}>
										{props.details.locations.map(location => {
											return (
												<option key={location.name} value={location.name}>
													{location.name}
												</option>
											);
										})}
									</select>
								</MDBCol>
							</MDBRow>
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</StyledCard>
	);
};

const DataPickers = props => {
	return (
		<StyledCard2>
			<MDBCol>
				{console.log('props.details in card example', props.details)}
				<MDBCard>
					{/* <MDBCardImage className="img-fluid" src={} waves /> */}

					<MDBCardBody>
						<MDBCardTitle>Monsters</MDBCardTitle>
						<MDBCardText>
							<span>Monster 1</span>
							<span>Monster 2</span>
							<span>Monster 3</span>
						</MDBCardText>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</StyledCard2>
	);
};

export default class CreateEncounter extends Component {
	state = {
		name: '',
		world: '',
		worlds: [],
		campaign: '',
		campaigns: [],
		location: '',
		locations: [],
		factions: 0,
	};

	componentDidMount = () => {
		axios.get('http://localhost:5001/worlds/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					worlds: res.data.map(world => world.name),
					world: res.data[0].name,
				});
			}
		});

		axios.get('http://localhost:5001/campaigns/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					campaigns: res.data.map(campaign => {
						return { name: campaign.name, world: campaign.world };
					}),
					campaign: res.data[0].name,
				});
			}
		});

		axios.get('http://localhost:5001/locations/').then(res => {
			if (res.data.length > 0) {
				this.setState({
					locations: res.data.map(location => {
						return { name: location.name, world: location.world, campaign: location.campaign };
					}),
					location: res.data[0].name,
				});
			}
		});
	};
	onChangeName = e => {
		this.setState({
			name: e.target.value,
		});
	};
	onChangeWorld = e => {
		this.setState({
			world: e.target.value,
		});
	};
	onChangeCampaign = e => {
		this.setState({
			campaign: e.target.value,
		});
	};
	onChangeLocation = e => {
		this.setState({
			location: e.target.value,
		});
	};
	onChangeFactions = e => {
		this.setState({
			factions: e.target.value,
		});
	};
	onSubmit = e => {
		e.preventDefault();
		const encounter = {
			name: this.state.name,
			world: this.state.world,
			campaign: this.state.campaign,
			location: this.state.location,
			factions: this.state.factions,
		};

		console.log(encounter);

		axios.post('http://localhost:5001/encounters/add', encounter).then(res => console.log(res.data));

		window.location = '/encounters';
	};
	render() {
		return (
			<div>
				<FactionData
					details={this.state}
					dothisthing={this.dothisthing}
					toggle={this.toggle}
					deleteElement={this.deleteElement}
				></FactionData>
				<EncounterData
					details={this.state}
					dothisthing={this.dothisthing}
					toggle={this.toggle}
					deleteElement={this.deleteElement}
				></EncounterData>
				<FactionData
					details={this.state}
					dothisthing={this.dothisthing}
					toggle={this.toggle}
					deleteElement={this.deleteElement}
				></FactionData>
				<br />
				<DataPickers></DataPickers>
				<DataPickers></DataPickers>
				<DataPickers></DataPickers>
			</div>
		);
	}
}

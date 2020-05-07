// import React, { Component } from 'react';
// import Dustbin from './Dustbin';
// import Box from './Box';
import axios from 'axios';
// import styled from 'styled-components';
// import {
// 	MDBBtn,
// 	MDBCard,
// 	MDBCardBody,
// 	MDBCardImage,
// 	MDBCardTitle,
// 	MDBCardText,
// 	MDBCol,
// 	MDBInput,
// 	MDBRow,
// } from 'mdbreact';
// import WorldsList from '../../splash.component';

// const StyledCard = styled.div`
// 	background-color: black;
// 	.row {
// 		margin: -35px 5px 0 5px;
// 	}
// 	.btn {
// 	}
// `;

// export default class CreateMonster extends Component {
// 	state = {
// 		users: [],
// 	};

// 	componentDidMount() {
// axios.get(`${process.env.REACT_APP_LOCAL_DB}/users/`).then(res => {
// 	if (res.data.length > 0) {
// 		this.setState({
// 			users: res.data.map(user => user.username),
// 		});
// 	}
// });
// 	}

// 	render() {
// 		return (
// 			<MDBCol style={{ maxWidth: '55rem', paddingTop: '2%' }}>
// 				{console.log('this.state', this.state)}
// 				<MDBCard>
// 					<StyledCard>
// 						<MDBCardBody>
// 							<MDBCardTitle>WE CREATING MONSTERS BITCH</MDBCardTitle>
// 							<div style={{ display: 'flex' }}>
// 								{/* {console.log('userArray[0]', userArray[0])} */}
// 								<div style={{ overflow: 'hidden', clear: 'both', color: 'black' }}>
// 									{this.state.users.map(user => {
// 										return <Box name={user} />;
// 									})}
// 								</div>
// 								<div style={{ overflow: 'hidden', clear: 'both' }}>
// 									<Dustbin allowedDropEffect="any" />
// 									<Dustbin allowedDropEffect="any" />
// 								</div>
// 							</div>
// 						</MDBCardBody>
// 					</StyledCard>
// 				</MDBCard>
// 			</MDBCol>
// 		);
// 	}
// }

import React, { useState, useCallback, useEffect } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';
import ItemTypes from './ItemTypes';
import update from 'immutability-helper';
const Container = () => {
	const [dustbins, setDustbins] = useState([
		{ accepts: [ItemTypes.MONSTER], lastDroppedItem: null },
		{ accepts: [ItemTypes.MONSTER], lastDroppedItem: null },
	]);
	const [boxes, setBoxes] = useState([
		{ name: 'Monster', type: ItemTypes.MONSTER },
		{ name: 'Monster2', type: ItemTypes.MONSTER },
	]);
	const [droppedBoxNames, setDroppedBoxNames] = useState([]);
	function isDropped(boxName) {
		return droppedBoxNames.indexOf(boxName) > -1;
	}
	const handleDrop = useCallback(
		(index, item) => {
			const { name } = item;
			setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
			setDustbins(
				update(dustbins, {
					[index]: {
						lastDroppedItem: {
							$set: item,
						},
					},
				})
			);
		},
		[droppedBoxNames, dustbins]
	);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_LOCAL_DB}/users/`).then(res => {
			if (res.data.length > 0) {
				// console.log('res.data', res.data);
				res.data.forEach(user => {
					console.log('user in user Effect', user);
					setBoxes(boxes, { $merge: { name: user.username, type: ItemTypes.FOOD } });
					console.log('boxes', boxes);
				});
			}
		});
	});
	return (
		<div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				{dustbins.map(({ accepts, lastDroppedItem }, index) => (
					<Dustbin
						accept={accepts}
						lastDroppedItem={lastDroppedItem}
						onDrop={item => handleDrop(index, item)}
						key={index}
					/>
				))}
			</div>

			<div style={{ overflow: 'hidden', clear: 'both', color: 'black' }}>
				{boxes.map(({ name, type }, index) => (
					<Box name={name} type={type} isDropped={isDropped(name)} key={index} />
				))}
			</div>
		</div>
	);
};
export default Container;

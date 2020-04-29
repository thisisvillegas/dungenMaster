import React, { Component } from 'react';
// import styled from 'styled-components';
import {
	MDBBtn,
	// MDBCard,
	// MDBCardBody,
	// MDBCardImage,
	// MDBCardTitle,
	// MDBCardText,
	// MDBCol,
	MDBContainer,
	MDBInput,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
} from 'mdbreact';

const InputFields = props => {
	// console.log('props in Input Field', props.data.props);
	// console.log('state in Input Field', props.data.state);
	const {
		name,
		username,
		firstName,
		lastName,
		characterClass,
		level,
		size,
		factions,
		modal,
		type,
	} = props.data.props;
	const { handleInput, toggle, dothisthing } = props.data;

	switch (props.data.props.type) {
		case 'users':
			return (
				<form className="mx-3 grey-text">
					<MDBInput
						hint="enter in a cool username"
						label="username"
						type="text"
						name="username"
						value={username}
						onInput={handleInput}
					/>
					<MDBInput
						hint="enter in a first name"
						label="first name"
						type="text"
						name="firstName"
						value={firstName}
						onInput={handleInput}
					/>
					<MDBInput
						hint="enter in last name"
						label="last name"
						type="text"
						name="lastName"
						value={lastName}
						onInput={handleInput}
					/>
					<MDBInput
						hint="enter in character class"
						label="class"
						type="text"
						name="characterClass"
						value={characterClass}
						onInput={handleInput}
					/>
					<MDBInput
						hint="enter in level"
						label="level"
						type="text"
						name="level"
						value={level}
						onInput={handleInput}
					/>
				</form>
			);
			break;
		case 'monsters':
			return (
				<form className="mx-3 grey-text">
					<MDBInput
						hint="enter in a cool name"
						type="text"
						name="name"
						value={name}
						onInput={handleInput}
						readonly="readOnly"
					/>
					<MDBInput hint="enter in a cool size" type="text" name="size" value={size} onInput={handleInput} />
					<MDBInput
						hint="enter in number of factions"
						type="text"
						name="factions"
						value={factions}
						onInput={handleInput}
					/>
				</form>
			);
			break;
		case 'locations':
			return (
				<form className="mx-3 grey-text">
					<MDBInput
						hint="enter in a cool name"
						type="text"
						name="name"
						value={name}
						onInput={handleInput}
						readonly="readOnly"
					/>
					{/* <MDBInput hint="enter in a cool size" type="text" name="size" value={size} onInput={handleInput} /> */}
					<MDBInput
						hint="enter in number of factions"
						type="text"
						name="factions"
						value={factions}
						onInput={handleInput}
					/>
				</form>
			);
			break;
		default:
			return (
				<form className="mx-3 grey-text">
					<MDBInput
						hint="enter in a cool name"
						type="text"
						name="name"
						value={name}
						onInput={handleInput}
						readonly="readonly"
					/>
					<MDBInput hint="enter in a cool size" type="text" name="size" value={size} onInput={handleInput} />
					<MDBInput
						hint="enter in number of factions"
						type="text"
						name="factions"
						value={factions}
						onInput={handleInput}
					/>
				</form>
			);
	}
};

const EditModal = props => {
	console.log('this.state in editModal', props);
	const { name, size, factions, modal, type } = props.props;
	const { handleInput, toggle, dothisthing } = props;
	// const { locationState } = props.state;

	return (
		<MDBContainer>
			<MDBModal isOpen={modal} toggle={toggle}>
				<MDBModalHeader style={{ color: 'black' }} toggle={toggle}>
					Enter in new value
				</MDBModalHeader>
				<MDBModalBody style={{ color: 'black' }}>
					<InputFields data={props}></InputFields>
				</MDBModalBody>
				<MDBModalFooter>
					<MDBBtn
						color="secondary"
						onClick={() => {
							toggle();
							dothisthing(props.state, type);
						}}
					>
						Close
					</MDBBtn>
					<MDBBtn
						color="primary"
						onClick={() => {
							dothisthing(props.props, type);
							toggle();
						}}
					>
						Save changes
					</MDBBtn>
				</MDBModalFooter>
			</MDBModal>
		</MDBContainer>
	);
};

export default EditModal;

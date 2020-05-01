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
	console.log('props in Input Field', props.data.props);
	console.log('state in Input Field', props.data.state);
	const {
		username,
		firstName,
		lastName,
		characterClass,
		size,
		factions,
		modal,
		name,
		node,
		desc,
		level,
		type,
		world,
		worlds,
		campaigns,
		locations,
		encounters,
		alignment,
		armorClass,
		hitPoints,
		speed,
		str,
		dex,
		con,
		int,
		wis,
		cha,
		damageResistances,
		damageImmunities,
		conditionImmunities,
		savingThrows,
		skills,
		senses,
		languages,
		challenge,
		abilities,
		actions,
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
					<MDBInput hint="desc" type="text" name="desc" value={desc} onInput={handleInput} />
					<MDBInput hint="level" type="text" name="level" value={level} onInput={handleInput} />
					<MDBInput hint="world" type="text" name="world" value={world} onInput={handleInput} />
					<MDBInput hint="alignment" type="text" name="alignment" value={alignment} onInput={handleInput} />
					<MDBInput
						hint="armorClass"
						type="number"
						name="armorClass"
						value={armorClass}
						onInput={handleInput}
					/>
					<MDBInput hint="hitPoints" type="text" name="hitPoints" value={hitPoints} onInput={handleInput} />
					<MDBInput hint="speed" type="text" name="speed" value={speed} onInput={handleInput} />
					<MDBInput hint="str" type="text" name="str" value={str} onInput={handleInput} />
					<MDBInput hint="dex" type="text" name="dex" value={dex} onInput={handleInput} />
					<MDBInput hint="con" type="text" name="con" value={con} onInput={handleInput} />
					<MDBInput hint="int" type="text" name="int" value={int} onInput={handleInput} />
					<MDBInput hint="wis" type="text" name="wis" value={wis} onInput={handleInput} />
					<MDBInput hint="cha" type="text" name="cha" value={cha} onInput={handleInput} />
					<MDBInput
						hint="damageResistances"
						type="text"
						name="damageResistances"
						value={damageResistances}
						onInput={handleInput}
					/>
					<MDBInput
						hint="damageImmunities"
						type="text"
						name="damageImmunities"
						value={damageImmunities}
						onInput={handleInput}
					/>
					<MDBInput
						hint="conditionImmunities"
						type="text"
						name="conditionImmunities"
						value={conditionImmunities}
						onInput={handleInput}
					/>
					<MDBInput
						hint="savingThrows"
						type="text"
						name="savingThrows"
						value={savingThrows}
						onInput={handleInput}
					/>
					<MDBInput hint="skills" type="text" name="skills" value={skills} onInput={handleInput} />
					<MDBInput hint="senses" type="text" name="senses" value={senses} onInput={handleInput} />
					<MDBInput hint="languages" type="text" name="languages" value={languages} onInput={handleInput} />
					<MDBInput hint="abilities" type="text" name="abilities" value={abilities} onInput={handleInput} />
					<MDBInput hint="actions" type="text" name="actions" value={actions} onInput={handleInput} />
					<MDBInput hint="challenge" type="text" name="challenge" value={challenge} onInput={handleInput} />
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
						hint="enter in a cool-name"
						type="text"
						name="name"
						value={name}
						onInput={handleInput}
						readonly="readOnly"
					/>
					<MDBInput hint="enter in a coolsize" type="text" name="size" value={size} onInput={handleInput} />
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

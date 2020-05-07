import React from 'react';
import {
	MDBCarousel,
	MDBCarouselCaption,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	MDBMask,
	MDBContainer,
	MDBRow,
	MDBCol,
} from 'mdbreact';
import { DndProvider } from 'react-dnd';
import Example from './dnd/example';
import Backend from 'react-dnd-html5-backend';

const AddActor = props => {
	return (
		<MDBContainer fluid size="md">
			<DndProvider backend={Backend}>
				<Example type={props.type} />
			</DndProvider>
		</MDBContainer>
	);
};

export default AddActor;

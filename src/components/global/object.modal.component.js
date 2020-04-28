import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
	state = {
		modal2: false,
		modal3: false,
		modal4: false,
		modal5: false,
	};

	toggle = nr => () => {
		let modalNumber = 'modal' + nr;
		this.setState({
			[modalNumber]: !this.state[modalNumber],
		});
	};

	render() {
		return (
			<MDBContainer>
				<MDBBtn color="primary" onClick={this.toggle(2)}>
					Medium modal
				</MDBBtn>
				<MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
					<MDBModalHeader toggle={this.toggle(2)}>MDBModal title</MDBModalHeader>
					<MDBModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color="secondary" onClick={this.toggle(2)}>
							Close
						</MDBBtn>
						<MDBBtn color="primary">Save changes</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
				<MDBBtn color="primary" onClick={this.toggle(3)}>
					Small modal
				</MDBBtn>
				<MDBModal isOpen={this.state.modal3} toggle={this.toggle(3)} size="sm">
					<MDBModalHeader toggle={this.toggle(3)}>MDBModal title</MDBModalHeader>
					<MDBModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color="secondary" size="sm" onClick={this.toggle(3)}>
							Close
						</MDBBtn>
						<MDBBtn color="primary" size="sm">
							Save changes
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
				<MDBBtn color="primary" onClick={this.toggle(4)}>
					Large modal
				</MDBBtn>
				<MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
					<MDBModalHeader toggle={this.toggle(4)}>MDBModal title</MDBModalHeader>
					<MDBModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color="secondary" onClick={this.toggle(4)}>
							Close
						</MDBBtn>
						<MDBBtn color="primary">Save changes</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
				<MDBBtn color="primary" onClick={this.toggle(5)}>
					Fluid modal
				</MDBBtn>
				<MDBModal isOpen={this.state.modal5} toggle={this.toggle(5)} size="fluid">
					<MDBModalHeader toggle={this.toggle(5)}>MDBModal title</MDBModalHeader>
					<MDBModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat.
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color="secondary" onClick={this.toggle(5)}>
							Close
						</MDBBtn>
						<MDBBtn color="primary">Save changes</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		);
	}
}

export default ModalPage;

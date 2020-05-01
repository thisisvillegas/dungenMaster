import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDropDown = styled.div`
	.dropdown-item {
		margin-left: 20px;
	}
`;
export default class Navbar extends Component {
	render() {
		return (
			<StyledDropDown>
				<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
					<Link to="/" className="navbar-brand" style={{ marginRight: '100px' }}>
						DungenMaster Arena
					</Link>
					<div className="collpase navbar-collpase">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="true"
								>
									Create
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" id="createDropDown" href="/createworld">
										World
									</a>
									<a className="dropdown-item" id="createDropDown" href="/createcampaign">
										Campaign
									</a>
									<a className="dropdown-item" id="createDropDown" href="/createlocation">
										Location
									</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" id="createDropDown" href="/createuser">
										User
									</a>
									<a className="dropdown-item" id="createDropDown" href="/createmonster">
										Monster
									</a>
								</div>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="true"
								>
									Show
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" id="createworld" href="/list/worlds">
										Worlds
									</a>
									<a className="dropdown-item" id="createworld1" href="/list/campaigns">
										Campaigns
									</a>
									<a className="dropdown-item" id="createworld1" href="/list/locations">
										Locations
									</a>
									<a className="dropdown-item" id="createworld1" href="/list/encounters">
										Encounters
									</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" id="createworld2" href="/list/users">
										Users
									</a>
									<a className="dropdown-item" id="createworld2" href="/list/monsters">
										Monsters
									</a>
								</div>
							</li>
							<li className="navbar-item">
								<Link to="/encounterbuilder" className="nav-link">
									Encounter Builder
								</Link>
							</li>
							<li className="navbar-item">
								<Link to="/encounterrunner" className="nav-link">
									Encounter Runner
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</StyledDropDown>
		);
	}
}

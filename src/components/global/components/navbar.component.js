import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
	render() {
		return (
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
								<a className="dropdown-item" id="createworld" href="/createworld">
									World
								</a>
								<a className="dropdown-item" id="createworld1" href="/createcampaign">
									Campaign
								</a>
								<a className="dropdown-item" id="createworld1" href="/createlocation">
									Location
								</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" id="createworld2" href="/createuser">
									User
								</a>
								<a className="dropdown-item" id="createworld2" href="/createmonster">
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
								<a className="dropdown-item" id="createworld" href="/worlds">
									Worlds
								</a>
								<a className="dropdown-item" id="createworld1" href="/campaigns">
									Campaigns
								</a>
								<a className="dropdown-item" id="createworld1" href="/locations">
									Locations
								</a>
								<a className="dropdown-item" id="createworld1" href="/encounters">
									Encounters
								</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" id="createworld2" href="/users">
									Users
								</a>
								<a className="dropdown-item" id="createworld2" href="/monsters">
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
		);
	}
}

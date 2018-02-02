import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const NavBar = () => (
	<div className="navbar-container">
		<Navbar collapseOnSelect>
			<div className="nav-header">
				<Navbar.Header>
					<Navbar.Brand>
						<NavLink to="/">
							<img className="logo" src="/images/logo.png" />
						</NavLink>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
			</div>
			<Navbar.Collapse>
				<Nav pullRight>
					<NavItem eventKey={1}>
						<NavLink className="link-item" exact to="/" activeClassName="active--home">
							Home
						</NavLink>
					</NavItem>
					<NavItem eventKey={2}>
						<NavLink className="link-item" to="/portfolio" activeClassName="active--portfolio">
							Portfolio
						</NavLink>
					</NavItem>
					<NavItem eventKey={3}>
						<NavLink className="link-item" to="/certification" activeClassName="active--certificates">
							Certifications
						</NavLink>
					</NavItem>
					<NavDropdown eventKey={4} title="About Me" id="basic-nav-dropdown">
						<MenuItem className="menu-items" eventKey={4.1}>
							<NavLink className="link-item" to="/what-I-do">
								What I Do
							</NavLink>
						</MenuItem>
						<MenuItem className="menu-items" eventKey={4.2}>
							<NavLink className="link-item" to="/skills" activeClassName="active--about-me">
								Skills
							</NavLink>
						</MenuItem>
						<MenuItem className="menu-items" eventKey={4.3}>
							<NavLink className="link-item" to="/current-jobs" activeClassName="active--about-me">
								Current Jobs
							</NavLink>
						</MenuItem>
						<MenuItem divider />
						<MenuItem className="solo-items menu-items" eventKey={4.4}>
							<NavLink className="link-item" to="/current-jobs" activeClassName="active--about-me">
								Contact Me
							</NavLink>
						</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
			<hr className="seperator" />
		</Navbar>
	</div>
);

export default NavBar;

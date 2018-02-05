import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	render() {
		return (
			<div>
				<Navbar className="navbar" color="faded" light expand="md">
					<NavbarBrand>
						<NavLink exact to="/">
							<img src="/images/logo.png" className="logo" />
						</NavLink>
					</NavbarBrand>
					<hr className="seperator" />
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink className="nav-item" exact to="/" activeClassName="active--home">
									Home
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-item" to="/portfolio" activeClassName="active--portfolio">
									Portfolio
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-item" to="/qualifications" activeClassName="active--portfolio">
									Qualifications
								</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle className="dropdown-item" nav caret>
									About Me
								</DropdownToggle>
								<DropdownMenu id="basic-nav-dropdown">
									<DropdownItem>
											<NavLink
												className="nav-item"
												to="/what-i-do"
												activeClassName="active--portfolio"
											>
												What I Do
											</NavLink>
									</DropdownItem>
									<DropdownItem>
											<NavLink
												className="nav-item"
												to="/what-i-do"
												activeClassName="active--portfolio"
											>
												Skills
											</NavLink>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>Contact Me</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import Headroom from 'react-headroom';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.onClose = this.onClose.bind(this);
		this.state = {
			active: false,
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	onClose() {
		this.setState({ active: true });
		setTimeout(() => {
			this.props.update(false);
		}, 1000);
	}

	render() {
		return (
			<div
				className={
					this.props.pomo
						? this.state.active ? 'animated slideOutUp navbar-pomo' : 'animated slideInDown navbar-pomo'
						: this.state.active ? 'animated slideOutUp' : 'animated slideInDown'
				}
			>
				<div className="nav-container">
					<Navbar className="navbar" color="faded" light expand="md">
						<NavLink to="/">
							<img src="/images/logo.png" className="logo" />
						</NavLink>
						<hr className="seperator" />
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavLink className="nav-item" exact to="/" activeClassName="active--home">
									Home
								</NavLink>
								<NavLink className="nav-item" to="/portfolio" activeClassName="active--portfolio">
									Portfolio
								</NavLink>
								<NavLink className="nav-item" to="/qualifications" activeClassName="active--portfolio">
									Qualifications
								</NavLink>
								<UncontrolledDropdown nav>
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
												to="/skills"
												activeClassName="active--portfolio"
											>
												Skills
											</NavLink>
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem>
											<NavLink
												className="nav-item"
												to="/contact-me"
												activeClassName="active--portfolio"
											>
												Contact Me
											</NavLink>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Collapse>
					</Navbar>
					{this.props.update && (
						<span className="closeNav" onClick={this.onClose}>
							<i className="fa fa-times animated pulse infinite" />
						</span>
					)}
				</div>
			</div>
		);
	}
}

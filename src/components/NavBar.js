import React from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            isOpen: false,
        };
        this.toggle = this.toggle.bind(this);
        this.onClose = this.onClose.bind(this);
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
                    this.state.active
                        ? `animated slideOutUp ${this.props.pomo && "navbar-pomo"} ${this.props
                              .ttt && "navbar-TTT"}`
                        : `animated slideInDown ${this.props.pomo && "navbar-pomo"} ${this.props
                              .ttt && "navbar-TTT"}`
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
                                <NavLink
                                    className="nav-item nav-home"
                                    exact
                                    to="/"
                                    activeClassName="active--home"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    className="nav-item nav-portfolio"
                                    to="/portfolio"
                                    activeClassName="active--portfolio"
                                >
                                    Portfolio
                                </NavLink>
                                <NavLink
                                    className="nav-item nav-qual"
                                    to="/skills"
                                    activeClassName="active--qualifications"
                                >
                                    Skills
                                </NavLink>
                                <NavLink
                                    className="nav-item nav-me"
                                    to="/contact-me"
                                    activeClassName="active--qualifications"
                                >
                                    Contact Me
                                </NavLink>
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

import React from 'react';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };
    }

	handleOnClick = () => {
		this.setState({
			redirect: true,
		});
	};

	render() {
		if (this.state.redirect) {
			return <Redirect push to='/portfolio'/>;
		}
		return (
			<div className="header">
				<div className="container">
					<h1 className="header__title">{this.props.title}</h1>
					{this.props.subtitle && <h2 className="header__subtitle">{this.props.subtitle}</h2>}
					<button className="button button--indecision" onClick={this.handleOnClick}>Go Back</button>
				</div>
			</div>
		);
	}
}

Header.defaultProps = {
	title: 'Indecision',
};

export default Header;

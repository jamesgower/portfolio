import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };

    handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);


        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p className="indecision--optionError">{this.state.error}</p>}
                <form className="indecision--addOption" onSubmit={this.handleAddOption}>
                    <input className="indecision--addOption__input" type="text" name="option" />
                    <button className="indecision--addOptionButton">Add Option</button>
                </form>
            </div>
        );
    }
}

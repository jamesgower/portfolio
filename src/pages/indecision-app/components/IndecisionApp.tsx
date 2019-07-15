import * as React from "react";
import AddOption from "./AddOption";
import Action from "./Action";
import Header from "./Header";
import Options from "./OptionContainer";
import OptionModal from "./OptionModal";
import IndecisionState from "../interfaces/indecision.i";

export default class IndecisionApp extends React.Component<{}, IndecisionState> {
  public readonly state = {
    options: [],
    selectedOption: undefined,
  };

  public componentDidMount(): void {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState({ options });
      }
    } catch (e) {
      console.error(e);
    }
  }

  public componentDidUpdate(prevProps, prevState): void {
    const { options } = this.state;
    if (prevState.options.length !== options.length) {
      const json = JSON.stringify(options);
      localStorage.setItem("options", json);
    }
  }

  private clearSelectedOption = (): void => {
    this.setState({
      selectedOption: undefined,
    });
  };

  private handleDeleteOptions = (): void => {
    this.setState({ options: [] });
  };

  private handleDeleteOption = (optionToRemove): void => {
    this.setState(
      (prevState): IndecisionState => ({
        options: prevState.options.filter((option): boolean => optionToRemove !== option),
      }),
    );
  };

  private handlePick = (): void => {
    const { options } = this.state;
    const randomNum = Math.floor(Math.random() * options.length);
    const option = options[randomNum];
    this.setState({
      selectedOption: option,
    });
  };

  private handleAddOption = (optionToAdd: string): string | void => {
    const { options } = this.state;
    if (!optionToAdd) {
      return "Enter valid value to add item";
    }

    if (options.indexOf(optionToAdd) > -1) {
      return "This option already exists";
    }

    return this.setState(
      (prevState): IndecisionState => ({
        options: prevState.options.concat(optionToAdd),
      }),
    );
  };

  public render(): JSX.Element {
    const { options, selectedOption } = this.state;

    return (
      <div className="indecision-app">
        <Header />
        <div className="container">
          <Action hasOptions={options.length > 0} handlePick={this.handlePick} />
          <div className="widget">
            <Options
              options={options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={selectedOption}
          clearSelectedOption={this.clearSelectedOption}
        />
      </div>
    );
  }
}

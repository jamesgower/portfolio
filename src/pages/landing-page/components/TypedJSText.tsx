import React from "react";
import Typed, { TypedOptions } from "typed.js";

interface TypedProps {
  strings: string[];
  name: string;
}

class TypedJSText extends React.Component<TypedProps, {}> {
  public nameTyped: Typed;
  public skillsTyped: Typed;

  public componentDidMount(): void {
    const { strings, name } = this.props;

    const nameOptions: TypedOptions = {
      strings: [name],
      typeSpeed: 60,
      showCursor: false,
    };

    const skillOptions: TypedOptions = {
      strings,
      startDelay: 2500,
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };

    this.nameTyped = new Typed("#name-typed", nameOptions);
    this.skillsTyped = new Typed("#skills-typed", skillOptions);
  }

  public componentWillUnmount(): void {
    this.nameTyped.destroy();
    this.skillsTyped.destroy();
  }

  public render(): JSX.Element {
    return (
      <div className="typed__container">
        <div id="name-typed" className="typed__text" />
        <div id="skills-typed" className="typed__text" />
      </div>
    );
  }
}

export default TypedJSText;

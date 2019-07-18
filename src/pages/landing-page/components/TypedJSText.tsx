import React from "react";
import { TypedOptions } from "typed.js";

const Typed = require("typed.js");

const { TypedOptions } = Typed;

interface TypedProps {
  strings: string[];
  name: string;
}

class TypedJSText extends React.Component<TypedProps, {}> {
  private nameRef = React.createRef<HTMLDivElement>();
  private skillsRef = React.createRef<HTMLDivElement>();
  public nameTyped: TypedJSText;
  public skillsTyped: TypedJSText;

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

    this.nameTyped = new Typed(this.nameRef.current, nameOptions);
    this.skillsTyped = new Typed(this.skillsRef.current, skillOptions);
  }

  public render(): JSX.Element {
    return (
      <div className="typed__container">
        <div ref={this.nameRef} className="typed__text" />
        <div ref={this.skillsRef} className="typed__text" />
      </div>
    );
  }
}

export default TypedJSText;

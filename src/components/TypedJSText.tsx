import * as React from "react";
import Typed, { TypedOptions } from "typed.js";

interface TypedProps {
  strings: string[];
  name: string;
}

class TypedJSText extends React.Component<TypedProps, {}> {
  public componentDidMount(): void {
    const { strings, name } = this.props;
    const nameOptions: TypedOptions = {
      strings: [name],
      typeSpeed: 60,
    };
    const skillOptions: TypedOptions = {
      strings,
      startDelay: 2500,
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };
    this.nameTyped = new Typed(this.nameEl, nameOptions);
    this.skillTyped = new Typed(this.skillEl, skillOptions);
  }

  public render(): JSX.Element {
    return (
      <div>
        <div className="typed-wrap">
          <p
            ref={nameEl => (this.nameEl = nameEl)}
            style={{
              whiteSpace: "pre",
              display: "block",
              textAlign: "center",
              color: "black",
              fontFamily: "Oswald",
              fontSize: "2.8em",
            }}
          />
          <p
            ref={skillEl => (this.skillEl = skillEl)}
            style={{
              whiteSpace: "pre",
              display: "block",
              textAlign: "center",
              color: "black",
              fontFamily: "Oswald",
              fontSize: "2.6em",
            }}
          />
        </div>
      </div>
    );
  }
}

export default TypedJSText;

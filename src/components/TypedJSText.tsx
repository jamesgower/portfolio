import * as React from "react";

const Typed = require("typed.js");

interface TypedProps {
  strings: string[];
  name: string;
}

class TypedJSText extends React.Component<TypedProps, {}> {
  private nameRef = React.createRef<HTMLParagraphElement>();
  private skillsRef = React.createRef<HTMLParagraphElement>();

  public componentDidMount(): void {
    const { strings, name } = this.props;
    const nameOptions = {
      strings: [name],
      typeSpeed: 60,
    };
    const skillOptions = {
      strings,
      startDelay: 2500,
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };
    new Typed(this.nameRef.current, nameOptions);
    new Typed(this.skillsRef.current, skillOptions);
  }

  public render(): JSX.Element {
    return (
      <>
        <div className="typed-wrap">
          <p
            ref={this.nameRef}
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
            ref={this.skillsRef}
            id="skillsContainer"
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
      </>
    );
  }
}

export default TypedJSText;

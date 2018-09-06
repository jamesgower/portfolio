import React from "react";
import Typed from "typed.js";

class TypedJSText extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        const { strings, name } = this.props;
        const nameOptions = {
            strings: name,
            typeSpeed: 80,
        };
        const skillOptions = {
            strings,
            startDelay: 2500,
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            showCursor: false,
        };
        this.nameTyped = new Typed(this.nameEl, nameOptions);
        this.skillTyped = new Typed(this.skillEl, skillOptions);
    }
    render() {
        return (
            <div>
                <div className="typed-wrap">
                    <h1
                        ref={nameEl => (this.nameEl = nameEl)}
                        style={{
                            whiteSpace: "pre",
                            display: "block",
                            textAlign: "center",
                            color: "black",
                        }}
                    />

                    <h1
                        ref={skillEl => (this.skillEl = skillEl)}
                        style={{
                            whiteSpace: "pre",
                            display: "block",
                            textAlign: "center",
                            color: "black",
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default TypedJSText;

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
                            fontFamily: "Oswald",
                            fontSize: "2.8em"                    
                        }}
                    />

                    <h1
                        ref={skillEl => (this.skillEl = skillEl)}
                        style={{
                            whiteSpace: "pre",
                            display: "block",
                            textAlign: "center",
                            color: "black",
                            fontFamily: "Oswald",
                            fontSize: "2.6em"                            
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default TypedJSText;

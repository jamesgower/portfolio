import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import TypedJSText from "./TypedJSText";
import meImg from "../../public/images/displayImg.jpg";

const LandingPage = () => (
    <div className="landingPageBackground">
        <img src={meImg} className="profileImg" />
        <div className="button__container">
            <Link className="button__link" to="/portfolio">
                <TypedJSText
                    strings={[
                        "I develop front-end solutions.",
                        "I develop full-stack applications.",
                        "I develop web applications.",
                        "I develop back-end servers.",
                        "I develop database solutions.",
                    ]}
                    name={["Hello, I'm James."]}
                />
                <Button
                    outline
                    size="lg"
                    color="secondary"
                    className="button__enter animated slideInRight"
                >
                    Open Portfolio
                </Button>
            </Link>
        </div>
    </div>
);
export default LandingPage;

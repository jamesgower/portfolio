import * as React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import TypedJSText from "./TypedJSText";
import * as meImg from "../../../../public/images/displayImg.jpg";

const LandingPage: React.SFC = (): JSX.Element => (
  <div className="landing__container">
    <div className="landing__image-container">
      <img src={meImg} alt="Me!" className="landing__image" />
    </div>
    <TypedJSText
      strings={[
        "I develop front-end solutions.",
        "I develop full-stack applications.",
        "I develop web applications.",
        "I develop back-end servers.",
        "I develop database solutions.",
      ]}
      name={"Hi, I'm James."}
    />
    <Link className="landing__link" to="/portfolio">
      <Button
        outline
        size="lg"
        color="secondary"
        className="landing__open-button animated slideInRight"
      >
        Open Portfolio
      </Button>
    </Link>
  </div>
);
export default LandingPage;

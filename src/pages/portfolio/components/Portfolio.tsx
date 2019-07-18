import React from "react";
import Headroom from "react-headroom";
import { Container } from "reactstrap";
import GridLayout from "./Grid";
import NavBar from "../../nav-bar/components/NavBar";

const Portfolio: React.SFC = (): JSX.Element => (
  <div className="background">
    <Headroom>
      <NavBar color="#000" />
    </Headroom>
    <Container className="content-container">
      <div className="portfolio--container">
        <h1 className="portfolio--title" style={{ marginBottom: "20px" }}>
          Portfolio
        </h1>
        <p className="skills--text">
          Here are a few of the projects that I have created during my Software
          Developments career. Most <b>Front-End</b> projects are built using <b>React</b>
          , although I am currently learning <b>Angular 6</b>, so expect projects from
          this technology soon.
        </p>
        <p className="skills--text">
          For <b>Back-End</b> solutions I prefer to use <b>Node.JS</b> - mainly{" "}
          <b>Express.JS</b> for servers and maintaining connections, alongside a{" "}
          <b>No-Sql</b> database such as <b>MongoDB</b>.
        </p>
      </div>
      <GridLayout />
    </Container>
  </div>
);

export default Portfolio;

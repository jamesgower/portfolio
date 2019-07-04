import React from "react";
import Headroom from "react-headroom";
import NavBar from "./HiddenNavBar";
import { Col, Row, Container, Button } from "reactstrap";

export default () => (
  <div className="background">
    <Headroom>
      <NavBar />
    </Headroom>
    <Container className="content-container" />
  </div>
);

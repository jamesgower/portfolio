import React from "react";
import NavBar from "./NavBar";
import Headroom from "react-headroom";
import { Container } from "reactstrap";
import Grid from "./Grid";

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="background">
                <Headroom>
                    <NavBar />
                </Headroom>
                <Container className="content-container">
                    <h1 className="portfolio--title" style={{marginBottom: "20px"}}>Portfolio</h1>
                    <Grid />
                </Container>
            </div>
        );
    }
}

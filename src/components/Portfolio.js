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
                    <h1 className="portfolio--title">Portfolio</h1>
                    <p className="blog-text" style={{marginTop: "20px"}}>
                        Here is a selection of the projects I have completed during my Software
                        Development journey. All of my <b>full-stack</b> projects are built using
						the <b>MERN</b> stack - <b>M</b>ongoDB, <b>E</b>xpress, <b>R</b>eact & <b>N</b>ode.JS.
                    </p>
                    <p className="blog-text">
                        All smaller projects are usually built with <b>React</b>, although I am
						currently learning both <b>Vue.JS</b> and <b>Angular5</b>, so expect projects
						with these frameworks uploaded here soon.
					</p>
					<p className="blog-text">
						I normally create API's and back-end servers using <b>Node.JS</b> - specifically <b>Express</b>, 
						although I am also familiar with <b>Java</b>, so this is a possible alternative.
					</p>
                    <Grid />
                </Container>
            </div>
        );
    }
}

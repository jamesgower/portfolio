import React, { Component } from "react";
import Headroom from "react-headroom";
import NavBar from "./NavBar";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

/*
    TODO
    [ ] Confirm twitter account and add it to the link.
*/

class AboutMe extends Component {
    render() {
        return (
            <div className="background">
                <Headroom>
                    <NavBar />
                </Headroom>
                <div className="content-container" style={{ height: "100%" }}>
                    <div className="skills--container">
                        <h1 className="contact--title">About Me</h1>
                        <div className="row">
                            <div className="col-md-6">
                                <h3 className="contact--subtitle">Education</h3>
                                <p className="contact--text">
                                    I have completed multiple courses to get where I am now, the
                                    latest being my HNC in Computing course. While completing this
                                    course I learnt <b>programming fundamentals</b> in various
                                    languages such as <b>JavaScript</b> & <b>Java</b>, and{" "}
                                    <b>Object-Oriented programming</b> principles.
                                </p>
                                <p className="contact--text">
                                    After successfully graduating from these courses, I decided to
                                    self-learn the latest web development frameworks, such as{" "}
                                    <b>React</b> and <b>Node.JS</b> via popular Udemy courses,
                                    alongside completing the majority of the FreeCodeCamp
                                    certifications. After completing these courses, I created
                                    multiple projects to showcase these skills, and feel confident
                                    in being able to create <b>Full-Stack</b> applications using the{" "}
                                    <b>MERN</b> stack (MongoDB, Express.JS, React & Node.JS).
                                </p>
                                <p className="contact--text">
                                    I am currently in the process of enrolling into a Computing & IT
                                    (Software) bachelors degree, which will be completed part-time,
                                    and <b>outside</b> of working hours - taking 4 years to complete
                                    starting in April 2019.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="contact--socialMediaContainer">
                                    <div
                                        onClick={() =>
                                            (location.href = "https://github.com/jamesgower")
                                        }
                                        className="contact--socialContainer"
                                        style={{ color: "#000" }}
                                    >
                                        <i className="fab fa-github contact--socialIcon" />
                                        <p className="contact--socialText">
                                            Check out my GitHub history
                                        </p>
                                    </div>
                                    <div
                                        onClick={() =>
                                            (location.href =
                                                "https://www.linkedin.com/in/james-gower-45a753153/")
                                        }
                                        className="contact--socialContainer"
                                        style={{ color: "#0077B5" }}
                                    >
                                        <i className="fab fa-linkedin contact--socialIcon" />
                                        <p className="contact--socialText">
                                            Add me to your network on LinkedIn
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => (location.href = "https://www.twitter.com")}
                                        className="contact--socialContainer"
                                        style={{ color: "#1B95E0" }}
                                    >
                                        <i className="fab fa-twitter contact--socialIcon" />
                                        <p className="contact--socialText">
                                            Send me a Direct Message on Twitter
                                        </p>
                                    </div>
                                    <div
                                        onClick={() =>
                                            (location.href = "mailto:jgower.dev@gmail.com")
                                        }
                                        className="contact--socialContainer"
                                        style={{ color: "#f74245" }}
                                    >
                                        <i className="far fa-envelope contact--socialIcon" />
                                        <p className="contact--socialText">Send me an email</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact--formContainer">
                            <p className="skills--text">
                                I'd love to hear from you, whether it be for a quote or a bit of
                                extra information of projects I have completed. Please complete the
                                form below, or alternatively send me a message on one of the linked
                                social media accounts. I will aim to reply as soon as possible!
                            </p>
                            <Form>
                                <FormGroup>
                                    <Label for="name" className="formLabels">
                                        Name:
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        className="formInputs"
                                        placeholder="Please enter your full name"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email" className="formLabels">
                                        Email Address:
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        className="formInputs"
                                        placeholder="Please enter your email address"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="textField" className="formLabels">
                                        Details
                                    </Label>
                                    <Input
                                        type="textarea"
                                        rows={6}
                                        name="textField"
                                        className="formInputs"
                                        placeholder="Please enter any details you wish to discuss with me - the more descriptive, the better!"
                                    />
                                </FormGroup>
                                <Button
                                    color="primary"
                                    size="lg"
                                    style={{
                                        margin: "0 auto",
                                        fontSize: "1.7em",
                                        display: "block",
                                    }}
                                    onClick={this.sendEmail}
                                >
                                    Send
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutMe;

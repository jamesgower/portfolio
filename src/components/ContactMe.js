import React, { Component } from "react";
import Headroom from "react-headroom";
import NavBar from "./NavBar";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";

class ContactMe extends Component {
    render() {
        return (
            <div className="background">
                <Headroom>
                    <NavBar />
                </Headroom>
                <div className="content-container" style={{height: "100%"}}>
                    <div className="skills--container">
                        <h1 className="contact--title">Contact Me</h1>
                        <p className="skills--text">
                            I'd love to hear from you, whether it be for a quote or a bit of extra
                            information of projects I have completed. Please complete the form
                            below, or alternatively send me a message on one of the linked social
                            media accounts. I will aim to reply as soon as possible!
                        </p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="contact--formContainer">
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
                                            <Input type="textarea" rows={6} name="textField" className="formInputs" placeholder="Please enter any details you wish to discuss with me - the more descriptive, the better!"
                                            />
                                        </FormGroup>
                                        <Button color="primary" size="lg" style={{margin: "0 auto", fontSize: "1.7em", display: "block"}} onClick={this.sendEmail}>Send</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactMe;

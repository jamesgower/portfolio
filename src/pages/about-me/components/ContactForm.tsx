import React, { Component, createRef } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { isEmail } from "validator";
import ContactFormState from "../interfaces/contactForm.i";

/**
 * TODO
 * [ ] Restyle Form
 * [ ] Fix Modal
 * [ ] Add Certifications
 * [ ] Remove Twitter
 * [ ] Sort out footer
 * [ ] Outline on TicTacToe
 * [ ] Reset all button on TicTacToe
 * [ ] Simon Says
 */

class ContactForm extends Component<{}, ContactFormState> {
  public readonly state: ContactFormState = {
    name: "",
    email: "",
    details: "",
    emailSend: false,
    emailResponse: null,
    nameError: false,
    emailError: false,
    detailsError: false,
  };

  private formContainerRef = createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.formContainerRef.current.addEventListener(
      "keydown",
      (e: KeyboardEvent): void => {
        if (e.key === "Enter") {
          this.validateDetails();
        }
      },
    );
  }

  private validateDetails = (): void => {
    const { name, email, details } = this.state;
    let validated = true;
    if (name.length === 0) {
      this.setState({ nameError: true });
      validated = false;
    }
    if (!isEmail(email) || email.length === 0) {
      this.setState({ emailError: true });
      validated = false;
    }
    if (details.length <= 4) {
      this.setState({ detailsError: true });
      validated = false;
    }

    if (validated) this.onSendEmail();
  };

  private onSendEmail = async (): Promise<void> => {
    const { name, email, details } = this.state;

    this.setState({ emailSend: true, emailResponse: false });
    if (name && email && details) {
      const res = await axios({
        method: "POST",
        url: "/api/send_mail",
        params: {
          name,
          email,
          details,
        },
      });

      if (res.data) {
        this.setState({ emailResponse: true });
        setTimeout((): void => {
          this.setState({
            name: "",
            email: "",
            details: "",
          });
        }, 1000);
        setTimeout((): void => {
          this.setState({
            emailSend: false,
            emailResponse: null,
          });
        }, 1000);
      }
    }
  };

  public render(): JSX.Element {
    const {
      emailResponse,
      emailSend,
      nameError,
      emailError,
      detailsError,
      name,
      email,
      details,
    } = this.state;
    return (
      <div className="form--container" ref={this.formContainerRef}>
        <Form>
          <h1 className="form--title">Contact Me</h1>
          <FormGroup>
            <Label for="name" className="form--labels">
              Name:
            </Label>
            <Input
              name="name"
              className="form--inputs"
              invalid={nameError}
              value={name}
              onChange={(e): void =>
                this.setState({ name: e.target.value, nameError: false })
              }
              placeholder="Please enter your name"
            />
            <FormFeedback>Please input a valid name</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email" className="form--labels">
              Email Address:
            </Label>
            <Input
              name="email"
              className="form--inputs"
              invalid={emailError}
              value={email}
              onChange={(e): void =>
                this.setState({ email: e.target.value, emailError: false })
              }
              placeholder="Please enter your email address"
            />
            <FormFeedback>Please input a valid email address</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="textField" className="form--labels">
              Details:
            </Label>
            <Input
              type="textarea"
              rows={6}
              name="textField"
              invalid={detailsError}
              value={details}
              maxLength={500}
              onChange={(e): void =>
                this.setState({ details: e.target.value, detailsError: false })
              }
              className="form--inputs"
              placeholder="Please enter any details you wish to discuss with me - the more descriptive, the better!"
            />
            <FormFeedback>Please enter some details</FormFeedback>
          </FormGroup>
          <Button
            color="primary"
            size="lg"
            style={{
              margin: "0 auto",
              fontSize: "1.7em",
              display: "block",
            }}
            onClick={this.validateDetails}
          >
            {emailResponse === false && <i className="fa fa-spinner fa-spin" />}
            {!emailSend ? "Submit" : emailResponse ? "Sent!" : "  Sending..."}
          </Button>
        </Form>
      </div>
    );
  }
}

export default ContactForm;

import React, { Component, createRef } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { isEmail } from "validator";
import { FormState } from "../interfaces/contactForm.i";

class ContactForm extends Component<{}, FormState> {
  public readonly state: FormState = {
    name: "",
    email: "",
    details: "",
    emailSend: false,
    emailResponse: null,
    nameError: false,
    emailError: false,
    detailsError: false,
    sentError: false,
  };

  private formContainerRef = createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.formContainerRef.current.addEventListener("keydown", this.onFormEnterPress);
  }

  public componentWillUnmount(): void {
    this.formContainerRef.current.removeEventListener("keydown", this.onFormEnterPress);
  }

  private onFormEnterPress = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      this.validateDetails();
    }
  };

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
    if (details.length === 0) {
      this.setState({ detailsError: true });
      validated = false;
    }

    if (validated) this.onSendEmail();
  };

  private onSendEmail = async (): Promise<void> => {
    const { name, email, details } = this.state;

    this.setState({ emailSend: true, emailResponse: false });

    try {
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
    } catch (err) {
      this.setState({ sentError: true });
      setTimeout((): void => {
        this.setState({ sentError: false, emailSend: false, emailResponse: null });
      }, 4000);
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
      sentError,
    } = this.state;
    return (
      <>
        <div className="form__text-container" id="contact-form">
          <h1 className="about__title">CONTACT ME</h1>
          <p className="about__text">
            I&apos;d love to hear from you, whether it be for a quote or a bit of extra
            information of projects I have completed. Please complete the form below, or
            alternatively send me a message on one of the linked social media accounts. I
            will aim to reply as soon as possible!
          </p>
        </div>

        <div className="form--container" ref={this.formContainerRef}>
          <Form>
            <h3 className="form--title">Contact Form</h3>
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
            {sentError && (
              <p className="form__error-text">
                Could not connect to server, please try again.
              </p>
            )}
            <Button
              color={sentError ? "danger" : "primary"}
              size="lg"
              style={{
                margin: "10px auto 0",
                fontSize: "18px",
                display: "block",
              }}
              onClick={this.validateDetails}
            >
              {emailResponse === false && !sentError && (
                <i className="fas fa-spinner fa-spin" />
              )}
              {sentError
                ? "Error!"
                : !emailSend
                ? "Submit"
                : emailResponse
                ? "Sent!"
                : "  Sending..."}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default ContactForm;

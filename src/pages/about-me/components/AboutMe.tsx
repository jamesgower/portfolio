import React from "react";
import Headroom from "react-headroom";
import { Container } from "reactstrap";
import NavBar from "../../nav-bar/components/NavBar";
import ContactForm from "./ContactForm";

/*
    TODO
    [ ] Confirm twitter account and add it to the link.
    [ ] Add server and client side validation for 
*/

const AboutMe: React.SFC = (): JSX.Element => (
  <div className="background">
    <Headroom>
      <NavBar color="#000" />
    </Headroom>
    <Container className="content-container">
      <div className="skills--container">
        <h1 className="contact--title">About Me</h1>
        <p className="contact--text">
          Hi, I&apos;m James Gower. I am a 24 year old Full-Stack developer from
          Tonbridge, Kent. I prefer to implement applications using React and Node.JS,
          with MongoDB for storing information, although I am a fast learning versatile
          individual with knowledge of multiple frameworks and languages to achieve top
          results for a variety of projects.
        </p>
        <div className="row">
          <div className="col-md-6">
            <h3 className="contact--subtitle">Education</h3>
            <p className="contact--text">
              I have completed multiple courses to get where I am now, the latest being my
              HNC in Computing course. While completing this course I learnt{" "}
              <b>programming fundamentals</b> in various languages such as{" "}
              <b>JavaScript</b> & <b>Java</b>, and <b>Object-Oriented programming</b>{" "}
              principles.
            </p>
            <p className="contact--text">
              After successfully graduating from these courses, I decided to self-learn
              the latest web development frameworks, such as <b>React</b> and{" "}
              <b>Node.JS</b> via popular Udemy courses, alongside completing the majority
              of the FreeCodeCamp certifications. After completing these courses, I
              created multiple projects to showcase these skills, and feel confident in
              being able to create <b>Full-Stack</b> applications using the <b>MERN</b>{" "}
              stack (MongoDB, Express.JS, React & Node.JS).
            </p>
            <p className="contact--text">
              I am currently in the process of enrolling into a Computing & IT (Software)
              bachelors degree, which will be completed part-time, and <b>outside</b> of
              working hours - taking 4 years to complete starting in April 2019.
            </p>
          </div>
          <div className="col-md-6">
            <div className="contact--socialMediaContainer">
              <div
                onClick={(): string => (location.href = "https://github.com/jamesgower")}
                className="contact--socialContainer"
                style={{ color: "#000" }}
                role="button"
                tabIndex={0}
              >
                <i className="fab fa-github contact--socialIcon" />
                <p className="contact--socialText">Check out my GitHub history</p>
              </div>
              <div
                onClick={(): string =>
                  (location.href = "https://www.linkedin.com/in/james-gower-45a753153/")
                }
                className="contact--socialContainer"
                style={{ color: "#0077B5" }}
                role="button"
                tabIndex={0}
              >
                <i className="fab fa-linkedin contact--socialIcon" />
                <p className="contact--socialText">Add me to your network on LinkedIn</p>
              </div>
              <div
                onClick={(): string => (location.href = "https://www.twitter.com")}
                className="contact--socialContainer"
                style={{ color: "#1B95E0" }}
                role="button"
                tabIndex={0}
              >
                <i className="fab fa-twitter contact--socialIcon" />
                <p className="contact--socialText">Send me a Direct Message on Twitter</p>
              </div>
              <div
                onClick={(): string => (location.href = "mailto:jgower.dev@gmail.com")}
                className="contact--socialContainer"
                style={{ color: "#f74245" }}
                role="button"
                tabIndex={0}
              >
                <i className="far fa-envelope contact--socialIcon" />
                <p className="contact--socialText">Send me an email</p>
              </div>
            </div>
          </div>
        </div>
        <p className="contact--text">
          I&apos;d love to hear from you, whether it be for a quote or a bit of extra
          information of projects I have completed. Please complete the form below, or
          alternatively send me a message on one of the linked social media accounts. I
          will aim to reply as soon as possible!
        </p>
        <ContactForm />
      </div>
    </Container>
  </div>
);

export default AboutMe;

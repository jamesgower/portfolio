import React, { useState } from "react";
import Headroom from "react-headroom";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import ContactForm from "./ContactForm";
import NavBar from "../../nav-bar/components/NavBar";
import Modal from "./Modal";

const AboutMe: React.FC = (): JSX.Element => (
  <div className="background">
    <Headroom>
      <NavBar color="#000" />
    </Headroom>
    <Container className="content-container">
      <div className="skills--container">
        <h1 className="contact--title">About Me</h1>
        <p className="contact--text">
          Hi, I&apos;m James Gower. I am a 24 year old full-stack developer from
          Tonbridge, Kent. I prefer to create applications using <b>MERN</b> stack -{" "}
          <b>MongoDB</b>, <b>Express.JS</b>, <b>React</b> (preferably with{" "}
          <b>TypeScript</b>, or alternatively <b>JavaScript</b>) and <b>Node.JS</b>);
          however I am fast learning and eager to try out new frameworks and languages to
          achieve an optimum solution for any project.
        </p>
        <div className="row">
          <article className="col-md-6">
            <h3 className="contact--subtitle">Education</h3>
            <p className="contact--text">
              I have completed multiple courses and achieved a variety of certifications
              in my programming journey so far. I attended West Kent College to complete a{" "}
              <b>Higher National Diploma in Computing</b>, and previous to that I
              completed a <b>Level 3 Extended Diploma in ICT Practitioners</b>. During
              this time I learnt <b>programming fundamentals</b> in various languages such
              as JavaScript, PHP & Java, including <b>Object-Oriented programming</b>,{" "}
              Graphical Design,
              <b>Software Engineering</b>, Security, Data Analytics &{" "}
              <b>Website Development</b>.
            </p>
            <p className="contact--text">
              After successfully graduating from these courses I decided to self-learn the
              latest web development frameworks - such as <b>React</b> and <b>Node.JS</b>{" "}
              via popular Udemy courses, alongside completing the majority of the
              FreeCodeCamp certifications. After completing these courses I created
              multiple projects to showcase these skills (which can be found{" "}
              <Link to="/portfolio">here</Link>), and feel confident in my ability to
              deploy Full-Stack applications.
            </p>
            <div className="about__certification-container">
              <p className="contact--text text-center">
                To view all certifications, please click the button below!
              </p>
              <Modal />
            </div>
          </article>
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

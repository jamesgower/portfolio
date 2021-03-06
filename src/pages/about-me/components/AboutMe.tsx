import React from "react";
import { Row, Col } from "reactstrap";
import scrollToElement from "scroll-to-element";
import Modal from "./Modal";

const AboutMe: React.FC = (): JSX.Element => (
  <div className="about__container" id="about-me">
    <h1 className="about__title">ABOUT ME</h1>
    <p className="about__text">
      Hi, I&apos;m James Gower. I am a 24 year old full-stack developer from Tonbridge,
      Kent. I prefer to create applications using <b>MERN</b> stack - <b>MongoDB</b>,{" "}
      <b>Express.JS</b>, <b>React</b> (preferably with <b>TypeScript</b>, or alternatively{" "}
      <b>JavaScript</b>) and <b>Node.JS</b> - however I am fast learning and eager to try
      out new frameworks and languages to achieve an optimum solution for any project.
    </p>
    <Row>
      <Col lg={7}>
        <h3 className="about__subtitle">Education</h3>
        <p className="about__text">
          I have completed multiple courses and achieved a variety of certifications in my
          programming journey so far. I attended West Kent College to complete a{" "}
          <b>Higher National Diploma in Computing</b>, and previous to that I completed a{" "}
          <b>Level 3 Extended Diploma in ICT Practitioners</b>.
        </p>
        <p className="about__text">
          During this time I learnt <b>programming fundamentals</b> in various languages
          such as JavaScript, PHP & Java, including <b>Object-Oriented programming</b>,
          Graphical Design, <b>Software Engineering</b>, Security, Data Analytics &{" "}
          <b>Website Development</b>.
        </p>
        <p className="about__text">
          After successfully graduating from these courses I decided to self-learn the
          latest web development frameworks - such as <b>React</b> and <b>Node.JS</b> via
          popular Udemy courses, alongside completing the majority of the FreeCodeCamp
          certifications. After completing these courses I created multiple projects to
          showcase these skills (which can be found{" "}
          <span
            role="button"
            tabIndex={0}
            onClick={(): void => scrollToElement("#current-work")}
          >
            here
          </span>
          ), and feel confident in my ability to deploy Full-Stack applications.
        </p>
        <div className="about__certification-container">
          <p className="about__text text-center">
            To view all certifications, please click the button below!
          </p>
          <Modal />
        </div>
      </Col>
      <Col lg={5}>
        <div className="about__social-container">
          <div
            onClick={(): string => (location.href = "https://github.com/jamesgower")}
            className="about__social-inner-container"
            style={{ color: "#000" }}
            role="button"
            tabIndex={0}
          >
            <i className="fab fa-github about__social--icon" />
            <p className="about__social--text">Check out my GitHub history</p>
          </div>
          <div
            onClick={(): string =>
              (location.href = "https://www.linkedin.com/in/james-gower-45a753153/")
            }
            className="about__social-inner-container"
            style={{ color: "#0077B5" }}
            role="button"
            tabIndex={0}
          >
            <i className="fab fa-linkedin about__social--icon" />
            <p className="about__social--text">Add me to your network on LinkedIn</p>
          </div>
          <div
            onClick={(): string => (location.href = "mailto:jgower.dev@gmail.com")}
            className="about__social-inner-container"
            style={{ color: "#f74245" }}
            role="button"
            tabIndex={0}
          >
            <i className="far fa-envelope about__social--icon" />
            <p className="about__social--text">Send me an email</p>
          </div>
        </div>
      </Col>
    </Row>
  </div>
);

export default AboutMe;

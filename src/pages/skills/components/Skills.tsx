import React from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../../nav-bar/components/NavBar";

const Skills: React.SFC = (): JSX.Element => (
  <div className="content-background">
    <NavBar color="black" />
    <Container className="content-container" style={{ paddingBottom: "20px" }}>
      <h1 className="skills--title" style={{ marginBottom: "24px" }}>
        Skills
      </h1>
      <div className="skills--container">
        <p className="skills--text">
          I am a <b>full-stack</b> developer with 2+ years experience with the{" "}
          <b>latest technologies</b>. I am a strong problem solver and creative
          individual, and pride myself on having a great eye for detail, and willingness
          to complete all projects to the highest standard in a timely manner.
        </p>
        <Row>
          <Col md={6}>
            <h3 className="skills--frontEndHeader">Front-End</h3>
            <p className="skills--text">
              I prefer to build applications using the <b>React</b> framework alongside{" "}
              <b>TypeScript</b> or occasionally JavaScript.
            </p>
            <p className="skills--text">
              All of the projects use <b>Babel</b> to transpile TypeScript/ES6 JavaScript
              to ES5 JavaScript, so it can be run in all browsers, including older
              versions of Internet Explorer.
            </p>
            <p className="skills--text">
              All projects are styled using the CSS pre-processors <b>SASS</b>, alongside
              responsive CSS frameworks, such as <b>Bootstrap</b> or <b>Reactstrap</b>. I
              also tend to write mobile-first CSS, which is a must-have design concept in
              our mobile driven generation.
            </p>
            <p className="skills--text">
              All of the projects is bundled using <b>Webpack 4</b>, with additional
              plugins used for cleaning, optimising, configuring and transpiling the
              projects assets.
            </p>
          </Col>
          <Col md={6}>
            <h3 className="skills--backEndHeader">Back-End</h3>
            <p className="skills--text">
              For creating my back-end API&apos;s or servers I have a preference of using{" "}
              <b>Node.js</b>, usually utilising the <b>Express.js</b> framework.
            </p>
            <p className="skills--text">
              I am also proficient in using <b>Python</b> and <b>Java</b>, so servers can
              be created in those languages if required.
            </p>
            <p className="skills--text">
              The database solutions that I prefer to work with are <b>No-SQL</b>{" "}
              databases, such as <b>MongoDB</b> or <b>Firebase</b>, although I have no
              objection to using <b>SQL</b> databases, should there be a need for it.
            </p>
            <p className="skills--text">
              All of my projects are controlled with source control management systems
              such as <b>GitHub</b> or <b>BitBucket</b> to store my projects.
            </p>
          </Col>
          <Col md={6}>
            <h3 className="skills--designHeader">Design</h3>
            <p className="skills--text">
              Although I don&apos;t consider myself to be a UI/UX designer, I have
              completed multiple projects where I have <b>created and implemented</b>{" "}
              design ideas into a fully working applications.
            </p>
            <p className="skills--text">
              To complete these design tasks I usually begin with sketching out
              wireframes, and then translating these sketches to a template in{" "}
              <b>Adobe Photoshop</b>, <b>Gimp</b>, or another similar graphic design
              application.
            </p>
          </Col>
          <Col md={6}>
            <h3 className="skills--toolsHeader">IDE & Developer Tools</h3>
            <p className="skills--text">
              The chosen IDE that I use for developing my application is{" "}
              <b>Visual Studio Code</b> for most tasks, although for projects involving
              Python or Java I choose to use <b>IntelliJ IDEA</b> or <b>PyCharm</b>.
            </p>
            <p className="skills--text">
              To make sure my code is readable to all developers who interact with it I
              use tools such as <b>Prettier</b> and <b>ESLint</b>. These tools ensure that
              everything is formatted in a especially readable and consistent throughout
              the whole codebase.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  </div>
);

export default Skills;

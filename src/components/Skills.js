import React from "react";
import Headroom from "react-headroom";
import NavBar from "./HiddenNavBar";
import CircularProgressBar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      desktop: window.innerWidth > 768,
      mobile: window.innerWidth < 576,
      modalChoice: "design",
      frontEndPercent: 0,
      backEndPercent: 0,
      designPercent: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    const desktop = window.innerWidth > 768;
    const mobile = window.innerWidth < 576;

    this.setState({ desktop, mobile });
  };

  render() {
    return (
      <div className="background">
        <Headroom>
          <NavBar />
        </Headroom>
        <div className="content-container" style={{ paddingBottom: "20px" }}>
          <h1 className="skills--title" style={{ marginBottom: "24px" }}>
            Skills
          </h1>
          <div className="skills--container">
            <p className="skills--text">
              I am a <b>full-stack</b> developer with 2+ years experience with
              the <b>latest technologies</b>. I am a strong problem solver and
              creative individual, and pride myself on having a great eye for
              detail, and willingness to complete all projects to the highest
              standard in a timely manner.
            </p>
            <div className="row">
              <div className="col-md-6">
                <h3 className="skills--frontEndHeader">Front-End</h3>
                <p className="skills--text">
                  I specialise in building the UI of my applications in{" "}
                  <b>React 16</b>, although I am capable of using{" "}
                  <b>Angular 5/6</b>. I am also currently learning <b>Vue.JS</b>
                  , so expect projects using this framework soon.
                </p>
                <p className="skills--text">
                  I usually create my applications with <b>JavaScript (ES6+)</b>
                  , and occasionally <b>TypeScript</b>, if necessary. All of my
                  applications will work in all browsers due to configuring{" "}
                  <b>Babel</b> so it can transpile ES6/ES7+ JavaScript into ES5
                  code.
                </p>
                <p className="skills--text">
                  I like to style all projects using the CSS preprocessors{" "}
                  <b>SASS/SCSS</b>, alongside responsive CSS frameworks, such as{" "}
                  <b>Bootstrap</b> or <b>Reactstrap</b>. I also tend to write
                  mobile-first CSS, which is a must-have design concept in our
                  mobile driven generation.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="skills--backEndHeader">Back-End</h3>
                <p className="skills--text">
                  For creating my back-end API's or servers I have a preference
                  of using <b>Node.js</b>, by utilising frameworks such as{" "}
                  <b>Express.js</b> or <b>Meteor.js</b>. I am also proficient in
                  using <b>Python</b> and <b>Java</b>, should there be a need to
                  use either one of these tools for a certain job.
                </p>
                <p className="skills--text">
                  The database solutions that I prefer to work with are{" "}
                  <b>No-SQL</b> databases, such as <b>MongoDB</b> or{" "}
                  <b>Firebase</b>, although I have no objection to using{" "}
                  <b>SQL</b> databases, should there be a need for it.
                </p>
                <p className="skills--text">
                  I am also proficient in using <b>Webpack</b> for bundling all
                  of my assets together, and using source control management
                  systems such as <b>GitHub</b> or <b>BitBucket</b> to store my
                  projects.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="skills--designHeader">Design</h3>
                <p className="skills--text">
                  Although I don't consider myself to be a UI/UX designer, I
                  have completed multiple projects where I have had to create
                  and implement design ideas into a fully working applications.
                </p>
                <p className="skills--text">
                  To complete these design tasks I usually begin with sketching
                  out wireframes, and then translating these sketches to a
                  template in <b>Adobe Photoshop</b>, <b>Gimp</b>, or another
                  similar graphic design application.
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="skills--toolsHeader">IDE & Developer Tools</h3>
                <p className="skills--text">
                  The chosen IDE that I use for developing my application is
                  Visual Studio Code for most tasks, although for projects
                  involving Python or Java I choose to use IntelliJ IDEA or
                  PyCharm.
                </p>
                <p className="skills--text">
                  To make sure my code is readable to all developers who
                  interact with it I use tools such as Prettier and ESLint.
                  These tools ensure that everything is formatted in a
                  especially readable and consistent throughout the whole
                  codebase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

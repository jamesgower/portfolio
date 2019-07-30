import React, { useEffect } from "react";
import Headroom from "react-headroom";
import { Container } from "reactstrap";
import GridLayout from "./Grid";
import NavBar from "../../nav-bar/components/NavBar";
import LandingPage from "./LandingPage";

const Portfolio: React.SFC = (): JSX.Element => {
  let workTop: number = null;
  useEffect((): void => {
    const { scrollHeight } = document.getElementById("current-work");
    workTop = scrollHeight;
    console.log(workTop);
  });
  return (
    <div className="portfolio__main-container">
      <LandingPage />
      <div className="content-background">
        {window.innerWidth > workTop && (
          <Headroom>
            <NavBar color="black" />
          </Headroom>
        )}
        <Container className="content-container">
          <div className="portfolio__container" id="current-work">
            <h1 className="portfolio__title">MY WORK</h1>
            <p className="portfolio__text">
              Here are a few of the projects that I have created during my Software
              Developments career. Most of the <b>front-end</b> projects are built using{" "}
              <b>React</b> with <b>TypeScript</b> or <b>JavaScript</b>.
            </p>
            <p className="portfolio__text">
              For the <b>back-end</b> of my applications I usually use <b>Node.JS</b> to
              create servers and API&apos;s, alongside a <b>no-SQL</b> database such as{" "}
              <b>MongoDB</b> or <b>FireBase</b>.
            </p>
            <p className="portfolio__text">
              All of the projects are bundled together using <b>Webpack 4</b>, and use{" "}
              <b>Babel</b> to transpile all TypeScript/ES6 JavaScript to ES5 JavaScript to
              use on all internet browsers - including older version of Internet Explorer.
            </p>
          </div>
          <GridLayout />
        </Container>
      </div>
    </div>
  );
};

export default Portfolio;

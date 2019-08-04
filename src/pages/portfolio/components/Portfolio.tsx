import React, { useEffect, useState } from "react";
import Headroom from "react-headroom";
import GridLayout from "./Grid";
import NavBar from "../../nav-bar/components/NavBar";
import LandingPage from "./LandingPage";

const Portfolio: React.SFC = (): JSX.Element => {
  const [showNav, setShowNav] = useState(false);
  const [activePosition, setActivePosition] = useState("home");

  const handleResize = (): void => {
    const nav = document.getElementById("content");
    if (window.scrollY > nav.offsetTop + nav.offsetHeight) {
      setShowNav(true);
      setActivePosition("portfolio");
    } else {
      setShowNav(false);
    }
  };

  useEffect((): (() => void) => {
    window.addEventListener("scroll", handleResize);
    return (): void => {
      window.removeEventListener("scroll", handleResize);
    };
  });

  return (
    <div className="portfolio__main-container">
      <LandingPage setActive={(): void => setActivePosition("portfolio")} />
      <div id="content" />
      {showNav ? (
        <Headroom>
          <NavBar color="black" active={activePosition} />
        </Headroom>
      ) : (
        <div className="headroom" id="portfolio-nav">
          <NavBar color="black" active={activePosition} />
        </div>
      )}
      <div className="content-background">
        <div className="container content-container">
          <div className="portfolio__container" id="current-work">
            <h1 className="portfolio__title">MY WORK</h1>
            <p className="portfolio__text">
              Here are a few examples of the projects that I have created during my
              Software Development journey. Most of the front-end of these projects are
              normally built using <b>React</b> with <b>TypeScript</b> and occasionally{" "}
              <b>JavaScript</b>, whilst the back-end is normally built using{" "}
              <b>Node.JS</b>, alongside a database such as <b>MongoDB</b> or{" "}
              <b>FireBase</b>.
            </p>
            <p className="portfolio__text">
              Hover over each of the tiles to see which technologies were used for the
              project, and optionally click the &quot;View Source&quot; button to view the
              source code on GitHub. Click on the tile to open the project - larger
              projects are hosted on Heroku&apos;s free plan, so may take a few moments to
              load.
            </p>
          </div>
          <GridLayout />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

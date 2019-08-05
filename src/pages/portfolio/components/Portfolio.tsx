import React, { useEffect, useState } from "react";
import Headroom from "react-headroom";
import { Container } from "reactstrap";
import scrollToElement from "scroll-to-element";
import ContactForm from "../../contact-form/components/ContactForm";
import AboutMe from "../../about-me/components/AboutMe";
import Projects from "./Projects";
import NavBar from "../../nav-bar/components/NavBar";
import LandingPage from "../../landing-page/components/LandingPage";
import background from "../images/background.jpeg";

const Portfolio: React.SFC = (): JSX.Element => {
  const [showNav, setShowNav] = useState(false);
  const [activePosition, setActivePosition] = useState("home");

  useEffect((): void => {
    const { hash } = window.location;
    if (hash) {
      scrollToElement(hash);
      history.replaceState(null, null, " ");
    }
  }, []);

  const onScroll = (): void => {
    const home = document.getElementById("landing-page");
    const about = document.getElementById("about-me");
    const work = document.getElementById("current-work");
    const contact = document.getElementById("contact-form");

    if (home.getBoundingClientRect().bottom >= 0) {
      setShowNav(false);
      setActivePosition("home");
    }
    if (about.getBoundingClientRect().top <= 0) {
      setShowNav(true);
      setActivePosition("about");
    }
    if (work.getBoundingClientRect().top <= 0) {
      setActivePosition("portfolio");
    }
    if (contact.getBoundingClientRect().top <= 0) {
      setActivePosition("contact");
    }
  };

  useEffect((): (() => void) => {
    window.addEventListener("scroll", onScroll);
    return (): void => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div
      className="portfolio__main-container"
      style={{
        background: `url(${background}) no-repeat center center fixed`,
      }}
    >
      <LandingPage setActive={(): void => setActivePosition("about")} />
      {showNav ? (
        <Headroom>
          <NavBar home color="black" active={activePosition} />
        </Headroom>
      ) : (
        <div className="headroom" id="portfolio-nav">
          <NavBar home color="black" active={activePosition} />
        </div>
      )}

      <Container className="content-container">
        <AboutMe />
        <Projects />
        <ContactForm />
      </Container>
    </div>
  );
};

export default Portfolio;

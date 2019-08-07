import React, { useState, useEffect } from "react";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import Modal from "react-modal";
import { CarouselImage } from "../interfaces/modal.i";
import frontEndCert from "../images/front-end-cert.png";
import jsAlgorithmCert from "../images/js-algorithms-cert.png";
import dataCert from "../images/js-algorithms-data-structures-cert.jpg";
import jsWeirdCert from "../images/js-weird-parts-cert.jpg";
import nodeCert from "../images/node-cert.jpg";
import nodeReactCert from "../images/node-react-course.jpg";
import reactReduxCert from "../images/react-redux-cert.jpg";
import responsiveCert from "../images/responsive-cert.png";

const CertificationModal: React.FC = (): JSX.Element => {
  const items: CarouselImage[] = [
    {
      src: nodeCert,
      altText: "The Complete Node.JS Developer Course Certificate",
      caption: "Andrew Mead's Complete Node.JS Developer Course Certification",
    },
    {
      src: nodeReactCert,
      altText: "Node With React Full-Stack Web Development Certificate",
      caption:
        "Stephen Grider's Node With React Full-Stack Web Development Certification",
    },
    {
      src: jsWeirdCert,
      altText: "JavaScript - Understand The Weird Parts Certificate",
      caption: "Anthony Alicea's JavaScript: Understanding The Weird Parts Certification",
    },
    {
      src: dataCert,
      altText: "JavaScript Algorithms & Data Structures Masterclass Certificate",
      caption:
        "Colt Steele's JavaScript Algorithms & Data Structures Masterclass Certification",
    },
    {
      src: reactReduxCert,
      altText: "The Complete React Web Developer Course Certificate",
      caption:
        "Andrew Mead's Complete React Web Developer Course (with Redux) Certification",
    },
    {
      src: frontEndCert,
      altText: "FreeCodeCamp Front-End Libraries Certificate",
      caption: "FreeCodeCamp Certification for Front-End Libraries (React, Redux, SASS)",
    },
    {
      src: jsAlgorithmCert,
      altText: "FreeCodeCamp JavaScript Algorithms Certificate",
      caption: "FreeCodeCamp Certification for JavaScript Algorithms",
    },
    {
      src: responsiveCert,
      altText: "FreeCodeCamp Responsive Web Design Certificate",
      caption: "FreeCodeCamp Certification for Responsive Web Design",
    },
  ];

  const desktopStyles = {
    content: {
      margin: "0 auto",
      width: "60vw",
      display: "block",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const mobileStyles = {
    content: {
      margin: "0 auto",
      width: "90vw",
      display: "block",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [isOpen, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [desktop, setDesktop] = useState(window.innerWidth > 768);

  const checkWindowWidth = (): void => {
    if (window.innerWidth > 767) {
      return setDesktop(true);
    }
    return setDesktop(false);
  };

  useEffect((): (() => void) => {
    window.addEventListener("resize", checkWindowWidth);
    return (): void => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  const onExiting = (): void => setAnimating(true);

  const onExited = (): void => setAnimating(false);

  const next = (): void => {
    if (isAnimating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = (): void => {
    if (isAnimating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (index: number): void => {
    if (isAnimating) return;
    setActiveIndex(index);
  };

  const slides = items.map(
    (item): JSX.Element => (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
        <img src={item.src} alt={item.altText} className="carousel__image" />
        <CarouselCaption captionText={item.caption} />
      </CarouselItem>
    ),
  );

  Modal.setAppElement("#app");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={(): void => setOpen(false)}
        style={desktop ? desktopStyles : mobileStyles}
        contentLabel="Certification Modal"
      >
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          {slides}
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </Modal>
      <Button
        size="lg"
        color="success"
        className="about__button"
        onClick={(): void => setOpen(true)}
      >
        Show Certifications
      </Button>
    </>
  );
};

export default CertificationModal;

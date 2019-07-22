import React, { useState } from "react";
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import Modal from "react-modal";
import ModalProps from "../interfaces/modal.i";
import frontEndCert from "../images/front-end-cert.png";
import jsAlgoCert from "../images/js-algorithms-cert.png";
import nodeCert from "../images/node-course.jpg";
import nodeReactCert from "../images/node-react-course.jpg";
import responsiveCert from "../images/responsive-cert.png";

const CertificationModal: React.FC<ModalProps> = ({ isOpen, setOpen }): JSX.Element => {
  const items = [
    {
      src: frontEndCert,
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      src: jsAlgoCert,
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      src: nodeCert,
      altText: "Slide 3",
      caption: "Slide 3",
    },
    {
      src: nodeReactCert,
      altText: "Slide 3",
      caption: "Slide 3",
    },
    {
      src: responsiveCert,
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setAnimating] = useState(false);

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

  const goToIndex = (index): void => {
    if (isAnimating) return;
    setActiveIndex(index);
  };

  const slides = items.map(
    (item): JSX.Element => (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    ),
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={(): void => setOpen(false)}
        style={customStyles}
        contentLabel="Certification Modal"
      >
        <div className="modal__carousel-container">
          <Carousel
            slide={false}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </div>
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

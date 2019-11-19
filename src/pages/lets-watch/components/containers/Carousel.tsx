import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";

interface CarouselProps {
  element?: string;
  options: any;
  children: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({
  element = "glide",
  options,
  children,
}): JSX.Element => {
  const [slider] = useState(new Glide(`.${element}`, options));
  useEffect(() => {
    slider.mount();
    return (): void => slider.destroy();
  }, []);

  return (
    <div className={`glide ${element}`}>
      <div data-glide-el="controls">
        <button type="button" className="carousel__left-arrow" data-glide-dir="<">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 28 28"
          >
            <path d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z" />
          </svg>
        </button>
        <button className="carousel__right-arrow" type="button" data-glide-dir=">">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 28 28"
          >
            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
          </svg>
        </button>
      </div>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {children.map((slide, index) => {
            return React.cloneElement(slide, {
              key: index,
              className: `${slide.props.className} glide__slide`,
            });
          })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;

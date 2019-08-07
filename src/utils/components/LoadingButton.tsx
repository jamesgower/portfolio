import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Spinner } from "reactstrap";
import { LoadingButtonProps } from "../interfaces/loadingButton.i";

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  awaitingResponse,
  ...props
}): JSX.Element => {
  const [showSpinner, setShowSpinner] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect((): (() => void) => {
    if (awaitingResponse) {
      setShowSpinner(true);
    }

    if (!awaitingResponse && showSpinner) {
      const wait = setTimeout((): void => {
        setShowSpinner(false);
      }, 500);

      return (): void => {
        clearTimeout(wait);
      };
    }
  }, [awaitingResponse, showSpinner]);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect((): void => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const fadeOutProps = useSpring({ opacity: showSpinner ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: showSpinner ? 0 : 1 });
  const { color } = props;
  return (
    <button
      {...props}
      className="button__loader"
      ref={ref}
      type="button"
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {} || color
          ? {
              backgroundColor: color,
            }
          : {}
      }
    >
      {showSpinner ? (
        <animated.div style={fadeOutProps}>
          <Spinner />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
    </button>
  );
};

export default LoadingButton;

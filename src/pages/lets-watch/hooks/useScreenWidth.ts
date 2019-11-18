import { useState, useEffect } from "react";

export default (size?: boolean): string | number => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = (e: Event): void => {
      setWidth((e.target as Window).innerWidth);
    };
    window.addEventListener("resize", handler);
    return (): void => {
      window.removeEventListener("resize", handler);
    };
  });
  if (width >= 1200) {
    return size ? 5 : "lg";
  }
  if (width < 768) {
    return size ? 1 : "xs";
  }
  return size ? 3 : "md";
};

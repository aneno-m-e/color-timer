import { RgbColor } from "react-colorful";
import { RefObject, useEffect } from "react";

export const formatToRGBString = (colour: RgbColor): string => {
  return `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
};

// Improved version of https://usehooks.com/useOnClickOutside/
export const useClickOutside = <Element extends HTMLElement>(
  ref: RefObject<Element>,
  handler: EventListener
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener: EventListener = (event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart: EventListener = (event) => {
      startedWhenMounted = !!ref.current;
      startedInside =
        !!ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

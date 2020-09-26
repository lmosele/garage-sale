import { useState, useRef, useLayoutEffect } from "react";

const applyToAllAncestors = (el, method, ...args) => {
  if (el) {
    el[method](...args);
    return applyToAllAncestors(el.parentElement, method, ...args);
  }
  return null;
};

// Use this for setting and using component dimensions/position based on a window resize event
export const useBoundingBox = disabled => {
  const ref = useRef();
  const [boundingBox, setBbox] = useState({});

  const set = () =>
    void setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

  useLayoutEffect(() => {
    set();
    const currentRef = ref.current;
    if (disabled) {
      window.removeEventListener("resize", set);
      window.removeEventListener("scroll", set);
      applyToAllAncestors(currentRef, "removeEventListener", "scroll", set);
    } else {
      window.addEventListener("resize", set);
      window.addEventListener("scroll", set);
      applyToAllAncestors(currentRef, "addEventListener", "scroll", set);
    }
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("scroll", set);
      applyToAllAncestors(currentRef, "removeEventListener", "scroll", set);
    };
  }, [disabled]);

  return [boundingBox, ref];
};

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { useBoundingBox } from "../../utils/useBoundingBox";

export const ITEM_WIDTH = 300;

export const Arrow = styled.button`
  position: absolute;
  display: block;
  top: calc(60% - 40px);
  ${({ type }) => (type === "back" ? "left: 10px" : "right: 10px")}
  z-index: 3;
  overflow: hidden;
  border-width: 0;
  height: 40px;
  width: 40px;
  outline: none;
  border-radius: 40px;
  background-color: white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.5 ease-in-out;
  border: 1px solid lightgray;
  &:focus,
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.5 ease-in-out;
  }
  &:active {
    background-color: lightgray;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.7);
    transition: box-shadow 0.5 ease-in-out;
  }
  &:active .svg-inline--fa {
    color: blue;
  }
`;

export const Slide = styled.div.attrs({
  style: ({ translateX, transitionLengthInMillis }) => ({
    transform: `translateX(${translateX}px)`,
    transition: `all ${transitionLengthInMillis}ms ease-in-out`,
  }),
})`
  width: auto;
  display: inline-flex;
`;

export const SlideItem = styled.div`
  display: inline-flex;
  width: ${ITEM_WIDTH}px;
  margin-right: 20px;
  height: 100%;
  padding-left: ${(props) => props.itemPadding}px;
  justify-content: center;
  z-index: 2;
`;

export const Container = styled.div`
  position: relative;
  height: ${(props) => props.height}px;
  width: 100%;
  max-width: 1240px;
  background-color: white;
`;

export const SliderContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: ${({ whitespace }) => whitespace || "nowrap"};
  overflow: hidden;
  padding: 25px 0px 25px 0px;
`;

const UISlider = ({ children, height = 250 }) => {
  const [currentX, setCurrentX] = useState(0);
  const [containerBox, containerRef] = useBoundingBox();
  const [slideBox, slideRef] = useBoundingBox();

  const reachedEnd = useMemo(() => {
    // For the sake of calculating prior to image loading we can default to the containers width plus 1px
    const slideWidth = slideBox.width || containerBox.width + 1;
    const contentFits = containerBox.width >= slideWidth;
    const difference = Math.abs(containerBox.width - slideBox.width);
    const offSet = Math.abs(currentX);
    return offSet > difference || contentFits;
  }, [currentX, containerBox.width, slideBox.width]);

  const moveBack = () => {
    setCurrentX(currentX + ITEM_WIDTH);
  };

  const moveForward = () => {
    setCurrentX(currentX - ITEM_WIDTH);
  };

  const hasScrolled = currentX < 0;
  return (
    <Container
      ref={containerRef}
      height={height}
      className={`width-${containerBox.width} ${classNames({
        reachedEnd,
        hasScrolled,
      })}`}
      data-testid="slider-container"
    >
      {!reachedEnd && (
        <Arrow type="forward" onClick={moveForward}>
          ►
        </Arrow>
      )}
      {hasScrolled && (
        <Arrow type="back" onClick={moveBack}>
          ◄
        </Arrow>
      )}

      <SliderContainer>
        <Slide
          ref={slideRef}
          translateX={currentX}
          transitionLengthInMillis={200}
        >
          {children}
        </Slide>
      </SliderContainer>
    </Container>
  );
};

UISlider.Item = SlideItem;

export default UISlider;

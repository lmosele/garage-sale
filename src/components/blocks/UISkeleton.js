import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
 to {
    background-position: 1000px 100%;
		}
`;

const UISkeleton = styled.div`
  display: block;
  height: ${(props) => props.height || "30px"};
  margin-bottom: 10px;
  border-radius: 3px;
  animation: ${shimmer} 2s infinite;
  background: linear-gradient(
    to right,
    lightgray 4%,
    gray 25%,
    lightgray 36%
  );
  background-size: 1000px 100%;
`;

export default UISkeleton;

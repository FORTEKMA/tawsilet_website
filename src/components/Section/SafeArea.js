import React, { Children } from "react";
import styled from "styled-components";

export const Area = styled.div`
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(p) => p.theme.BACKGROUND_COLOR};
  color: ${(p) => p.theme.TEXT_COLOR};
`;

const SafeArea = ({ children, padTop }) => {
  // console.log(padTop)
  return (
    <Area style={{ paddingTop: padTop ? "80px" : "0px" }}>{children}</Area>
  );
};

export default SafeArea;

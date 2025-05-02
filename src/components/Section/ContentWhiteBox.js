import React from "react";
import styled from "styled-components";

const ContentWhiteBox = ({ children }) => {
  return <RoundedWhiteBox>{children}</RoundedWhiteBox>;
};

export default ContentWhiteBox;

export const RoundedWhiteBox = styled.div`
  width: 97vw;
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  /* padding-bottom: 5rem; */
  margin-inline: auto;
  border-radius: 20px;
  min-height: 100px;
  border-radius: 20px;
  border: 1px solid white;
  background-color: white;
  color: ${(p) => p.theme.BACKGROUND_COLOR};
  @media (max-width: 744px) {
    padding-top: 30px;
    border-radius: 0 0 20px 20px;
    width: 97%;
    overflow: visible;
  }
`;

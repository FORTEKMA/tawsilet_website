import React from "react";

import styled from "styled-components";
import * as style from "./StyleSheets";

export const DarkTypo = ({ heading, headingup, description }) => {
  return (
    <Section>
      <Heading>{heading}</Heading>
      <Title>{headingup}</Title>
      <Description>{description}</Description>
    </Section>
  );
};
export default DarkTypo;

const Section = styled.div`
  @media (max-width: 744px) {
    width: 100%;
    line-height: 40px;
  }
`;
const Icon = styled.img`
  width: 50px;
`;

const Heading = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 20px;
  line-height: 80px;
  /* padding-top: 38px; */
  padding-bottom: 20px;
  color: #18365A;
  @media (max-width: 744px) {
    padding: 0px;
    font-size: 16px;
    text-align: start;
    padding-bottom: 2px;
    line-height: 30px;

  }
`;
const Title = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 45px;
  color: #18365A;
  padding-bottom: 20px;
  line-height: 60px;
  @media (max-width: 744px) {
    padding: 0.5rem;
    font-size: 24px;
  margin-left:-7px;
    text-align: start;
    line-height: 40px;
  }
`;
const Description = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1rem;
  text-align: justify;
  /* text-justify: inter-word; */
font-weight: 400;
  color: rgba(24, 54, 90, 1);
  line-height: 30px;

  @media (max-width: 744px) {
    font-size: 0.9rem;
    line-height: 30px;
  }
`;

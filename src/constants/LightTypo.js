import React from "react";

import styled from "styled-components";
import * as style from "./StyleSheets";

export const LightTypo = ({ heading, headinge, headingup, headingupe, description, descriptione, descriptioneee,icon, icons }) => {
  return (
    <Section>
      <Heading>{heading}</Heading>
      <Headinge>{headinge}</Headinge>
      <Title>{headingup}</Title>
      <Titlee>{headingupe}</Titlee>
      <Description>{description}</Description>
      <Descriptione>{descriptione}</Descriptione>
      <Descriptioneee>{descriptioneee}</Descriptioneee>

      {/* {Icons && <Icons src={icons} alt="iconloog" />} */}
    </Section>
  );
};
export default LightTypo;

const Section = styled.div`
  @media (max-width: 744px) {
    width: 100%;
    line-height: 40px;
  }
`;
const Icon = styled.img`
  width: 50px;
`;

const Icons = styled.img`
  width: 150px;
  padding-top: 16px;
  @media (max-width: 744px) {
    width: 140px;
    padding: 10px;
  }
`;
const Heading = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1.25rem;
  width: 100%;
  font-weight: 600;
  margin-bottom: 25px;

  text-transform: uppercase;

  line-height: 160%;

  color: #fff;

  @media (max-width: 744px) {
    padding: 0px;
    font-size: 16px;
    text-align: start;
    margin-bottom: 2px;
  }
`;
const Headinge = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1.5rem;
  width: 100%;
  font-weight: 600;



  line-height: 160%;

  color: white;

  @media (max-width: 744px) {
    padding: 0px;
    font-size: 20px;
    text-align: start;
  }
`;
const Title = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;

  width: 100%;

  line-height: 155.556%;

  @media (max-width: 744px) {
    padding: 0.5rem;
    font-size: 24px;
 /* padding-top:  3rem; */
    text-align: start;
    margin-left: -7px;
  }
`;
const Titlee = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  width: 100%;
  color: var(--white, #fff);
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;

  

  line-height: 155.556%;

  @media (max-width: 744px) {
    padding: 0.5rem;
    font-size: 24px;
 /* padding-top:  3rem; */
    text-align: center;

  }
`;
const Description = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1rem;

  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0;

  @media (max-width: 744px) {
    line-height: 30px;
    font-size: 0.9rem;
    text-align: start;
    
  }
`;
const Descriptioneee = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1rem;

  font-weight: 400;
  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0;

  @media (max-width: 744px) {
    line-height: 30px;
    font-size: 0.9rem;
    text-align: start;
    
  }
`;
const Descriptione = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  width: 100%;
  font-size: 1rem;
color:white;
  font-weight: 300;
  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0;
margin-top: 5px;

  @media (max-width: 744px) {
    line-height: 30px;
    font-size: 0.9rem;
    text-align: start;
    line-height: 1.5rem;
    padding: 0;

    margin:0;
  }
`;
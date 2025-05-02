import InformationBtn from "./../../assets/icons/Vectordetails.png";

import React from "react";

import styled from "styled-components";
import * as style from "../../constants/StyleSheets";

export const Buttondetails = ({ Textbody, icon }) => {
  return (
    <Button404 dir="ltr">
      <Icon dir="rtl" src={icon} width="16px" height="16px" alt="iconn" />
      <Text dir="rtl">{Textbody}</Text>
    </Button404>
  );
};
export default Buttondetails;

const Text = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: #020111;
  font-weight: 600;
  font-size: 14px;
  margin-top: 0px !important;
  @media (max-width: 744px) {
    font-size: 0.6625rem;
  }
`;
const Icon = styled.img`
  width: 16px !important;
  object-fit: contain;
  transition: transform 0.4s ease;

  @media (max-width: 744px) {
    width: 0.91144rem;
    height: 0.91144rem;
  }

  width: 20px !important;
  height: 20px !important;
`;

const Button404 = styled.button`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 14px;
  color: #020111;
  background-color: #f37a1d;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-around;
  align-items: center;

  border-radius: 12px;
  width: 11.375rem;
  height: 3.0625rem;
  @media (max-width: 744px) {
    width: 9.25rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: #18365a;
    border: 1px solid #f37a1d;
    color: #f37a1d;
  }

  &:hover ${Icon} {
    -webkit-transform: translateX(140px) rotate(45deg);
    filter: brightness(0) saturate(100%) invert(75%) sepia(73%) saturate(1494%)
      hue-rotate(1deg) brightness(107%) contrast(103%);
    @media (max-width: 744px) {
      transform: translateX(100px);
    }
  }

  &:hover ${Text} {
    transition: transform 0.4s ease;
    transform: translateX(-35px);
    filter: brightness(0) saturate(100%) invert(75%) sepia(73%) saturate(1494%)
      hue-rotate(1deg) brightness(107%) contrast(103%);
    @media (max-width: 744px) {
      transform: translateX(-30px);
    }
  }
`;

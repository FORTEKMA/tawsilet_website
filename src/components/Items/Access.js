import Arrow from "./../../assets/icons/arrowdown.png";
import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
const Access = () => (
  <div style={{ width: "100vw", height: "100vw" }}>
    <Button404>
      <img src={Arrow} alt="arrow" className="icon-arrow" />
      <Text>Obtenez une estimation </Text>
    </Button404>
  </div>
);

const Content = styled.div``;
export const Content404 = styled.div``;

const Text = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: #020111;
  font-size: 14px;
  margin-left: -72px;
`;

export const Button404 = styled.button`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 16px;
  color: #020111;
  background-color: #f37a1d;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  width: 360px;
  height: 55.14px;

  /* &:hover {
    background-color:  #18365a;
    border: 1px solid #F37A1D;
    color:  #F37A1D;
  } */
  .icon-arrow {
    width: 20px;
    height: 20px;
  }
  /* &:hover .icon-arrow {
    transform: translateX(220px);
    filter: brightness(0) saturate(100%) invert(75%) sepia(73%) saturate(1494%) hue-rotate(1deg) brightness(107%) contrast(103%);
  }
  &:hover ${Text}{
    transition: transform 0.4s ease;
    transform: translateX(-20px);
    filter: brightness(0) saturate(100%) invert(75%) sepia(73%) saturate(1494%) hue-rotate(1deg) brightness(107%) contrast(103%);
  } */
`;
export default Access;

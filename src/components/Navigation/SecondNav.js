import React from "react";
import { Link } from "react-router-dom";

// import Lg from "../../assets/icons/logo.png";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import Cr from "../../assets/icons/Component 43.png";

export const SecondNav = ({ setShowMenu, navigationValues }) => {
  return (
    <Section>
   

      <DIV>
        {navigationValues?.navbar?.menu?.links?.map((item, index) => (
          <Link key={index} to={item.to} onClick={() => setShowMenu(false)}>
            <P>{item.label}</P>
          </Link>
        ))}
 
      </DIV>
    </Section>
  );
};

export default SecondNav;

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  background-color: #0c0c0c;
  display: none;
  z-index: 999999999999999999999 !important;
  @media (max-width: 1150px) {
    display: block;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 80px;
  }
`;
const Div = styled.div`
  @media (max-width: 1150px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    /* text-align: center; */
    background-color: red;
  }
`;
export const Button = styled.button`
  margin-inline: ${style.spacing.MARGIN_MEDIUM};
  padding: ${style.spacing.PADDING_SMALL} ${style.spacing.PADDING_LARGE};
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 10px;
  color: #d8b56c;
  border: 1px solid #d8b56c;
`;

const Hr = styled.hr`
  width: 30vw;
  background-color: #18365A;
  height: 2px;
`;

const P = styled.h1`
  color: #d8b56c;
  font-size: 20px;
  font-weight: 800;
  text-decoration: none;
  font-family: ${style.font.FONT_FAMILY};
`;
export const DIV = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 30px;
  padding: 50px 20px;
  flex-direction: column;
  /* text-align: center; */
  text-decoration: none;
  a {
    text-decoration: none;
  }
`;

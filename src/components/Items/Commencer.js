import styled, { css } from "styled-components";
import * as style from "../../constants/StyleSheets";
import React from "react";
// import path from "../../assets/images/block.png";
import { useTranslation } from "react-i18next";
const Commencer = ({ hasdessin = true }) => {
  const myStyle = {
    // backgroundImage:
    // `url(${path})`,
    // backgroundPosition: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  };
  const { t, i18n } = useTranslation();
  return (
    <CommancerContainer hasdessin={hasdessin} style={myStyle} dir="auto">
      <CommencerSection>
        <div style={{ width: "4%", minWidth: 350 }}>
          <Footer> {t("ACCEUILE.COMMENCER.title1")}</Footer>
          <Paragraph>{t("ACCEUILE.COMMENCER.desc")}</Paragraph>
        </div>
        {/* <Image src={path} style={{ position: "absolute", top: -100 }} /> */}

        <Button>{t("ACCEUILE.COMMENCER.btn-Comencer")}</Button>
      </CommencerSection>
    </CommancerContainer>
  );
};
export default Commencer;
const CommancerContainer = styled.section`
  flex-wrap: wrap;
  overflow: hidden;
  display: flex;
  background-color: white;
  width: 95%;
  height: 22rem;
  border-radius: 35px;
  //<<<<<<< newHomePage

  padding: 5rem;

  // background-image: ${(props) => (props.hasdessin ? `url(${path})` : "none")};

  background-position: center;
  //=======
  //  margin: 30px;
  // padding: 80px;
  // gap: 33.125rem;
  // margin-right: 40px;
  //  background-image: url(${path});
  // background-position: center;

  //>>>>>>> main
  @media (max-width: 744px) {
    margin: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: none;
  }
`;
const CommencerSection = styled.section`
  width: 100%;
  border-radius: 35px;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  @media (max-width: 744px) {
    justify-content: center;
    gap: 20px;
  }
`;
export const Footer = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 45px;
  line-height: 155.56%;
  color: #020111;
  @media (max-width: 744px) {
    font-size: 25px;
    text-align: center;
  }
`;
export const Paragraph = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.01em;
  color: #666666;
  margin-top: 10px;
  @media (max-width: 744px) {
    font-size: 0.8rem;
    line-height: 1.28125rem;
    text-align: center;
    margin: 0 auto;
    padding: 20px;
    width: 85%;
    /* border: 1px solid red; */
  }
`;
export const Ligne = styled.h2`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 48px;
  color: #333333;
  text-align: left;
`;
export const Agent = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
`;
export const Button = styled.button`
  width: 170px;
  color: #020111;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 29px;
  padding-left: 30px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.PRIMARY_COLOR};
  padding: ${style.spacing.PADDING_SMALL} ${style.spacing.PADDING_LARGE};
  background-color: #f37a1d;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  margin-bottom: 20px;
  border: none;
  &:hover {
    border-radius: 15px;
    border: 1px solid #f37a1d;
    background-color: ${(props) =>
      props.variant !== "outline" ? "#18365a" : "#F37A1D"};
    color: ${(props) => (props.variant !== "outline" ? "#F37A1D" : "#18365a")};
  }
`;
export const Li = styled.h6`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #666666;
`;
export const Image = styled.img`
  /* position: absolute; */
  top: 952px;
  left: 10px;
  /* yellow main color */
`;

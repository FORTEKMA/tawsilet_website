import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import driver from "../../assets/images/livreur.png";
import * as style from "../../constants/StyleSheets";
import stepperBackground from "../../assets/images/baniere.png";

const JoinSheelni = () => {
  const { t, i18n } = useTranslation();
  return (
    <Content>
      <Middle>
        <Containere>
          <Headinge>
            {" "}
            
            {t("JoinSeeelni.title")} <Span>{t("JoinSeeelni.span")}</Span> {t("JoinSeeelni.Sutitle1")}
          </Headinge>
          <Descriptione>
          {t("JoinSeeelni.description")}
          </Descriptione>
        </Containere>
        <Container>
        </Container>
      </Middle>
          <Image src={driver} alt="driver" />
    </Content>
  );
};

export default JoinSheelni;

const Content = styled.div`
margin-top: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  /* padding: 5rem; */
  background-image: url(${stepperBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 96%;
  /* height: 400px; */

  margin-inline: auto;

  @media (max-width: 744px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    background-position: left;
    height: 300px;
    margin-top: 0rem;
  }
`;
const Middle = styled.div`
  display: flex;
  padding-inline: 5rem;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  gap: 7%;
  
  @media (max-width: 744px) {
    width:  fit-content;
    padding-inline:1rem;
  }
`;
const Image = styled.img`
  width: 400px;
  position: absolute;
  bottom:0px;
  right:7rem;
  /* height: 462px; */
  /* height: 100%; */
  /* margin-top: -150px; */
  /* padding-right: 30px; */
  @media (max-width: 991px) {
    /* margin-left: 100px; */
    display: none;
    /* height: 455px; */
  }
`;
export const Heading = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 155.56%;

  color: rgba(24, 54, 90, 1);

  text-align: center;
  justify-content: center;
  display: flex;
  @media (max-width: 744px) {
    font-size: 14px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55%;
  position: relative;
  height: 28.9rem !important;
  margin-top: -150px;
  /* background-color: red; */
  /* @media (max-width: 3000px) {
    height: 29.9rem;
  }
  @media (max-width: 1300px) {
    height: 28.2rem;
  }
  @media (max-width: 1281px) {
    height: 28.2rem !;
  }

  @media (max-width: 800px) {
    display: none;
  } */
`;
const Containere = styled.div`
  width: 500px;
  @media (max-width: 800px) {
    width: 100%;

    /* padding-top: 30px; */
  }
`;
const Headinge = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1.6rem;
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
const Span = styled.span`
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1.6rem;
  width: 100%;
  font-weight: 600;

  line-height: 160%;

  color: #d8b56c;

  @media (max-width: 744px) {
    padding-top: 20px;
    font-size: 20px;
    text-align: start;
  }
`;
const Descriptione = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  width: 100%;
  font-size: 1rem;
  color: white;
  font-weight: 300;
  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0;
  margin-top: 5px;
  @media (max-width: 800px) {
    line-height: 40px;
    font-size: 0.9rem;
    text-align: start;
    line-height: 1.5rem;
    padding: 0;
    width: 440px;
    margin-top: 10px;
  }
  @media (max-width: 444px) {
    line-height: 40px;
    font-size: 0.9rem;
    text-align: start;
    line-height: 1.5rem;
    padding: 0;
    width: 300px;
  }
`;

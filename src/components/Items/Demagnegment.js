import React from "react";
import styled from "styled-components";
// import * as style from "../../constants/StyleSheets";
import cote from "../../assets/icons/quote-left-solid.svg";
// import replace from "../../assets/icons/Replace with your image (1).png";
import { useTranslation } from "react-i18next";
import clientImage from "../../assets/images/talel.jpeg";

const Demagnegment = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Card>
        <Image src={cote} alt="cote"></Image>
        <TextSection
          dir="auto"
          // style={{ width: "408px" }}
        >
          <Paragraph>
            {t("ABOUT.DEMENAGEMENT.Paragraph")}
            <Para>{t("ABOUT.DEMENAGEMENT.Para")}</Para>
          </Paragraph>
        </TextSection>
        <SECTION>
          <Img src={clientImage} alt="dszdqsdqsd"></Img>
          <Title>{t("ABOUT.DEMENAGEMENT.Nom-Client")}</Title>
        </SECTION>
      </Card>
    </div>
  );
};

export default Demagnegment;

export const SECTION = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  @media (max-width: 1050px) {
    align-items: flex-start;
    align-self: start;
  }
`;

const TextSection = styled.section`
  @media (max-width: 1050px) {
    width: 65vw;
    /* margin-left: -100px; */
  }
`;
export const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 0px !important;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid white;
  @media (max-width: 1050px) {
    width: 35px;
    height: 35px;
  }
`;
export const Card = styled.div`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  padding: 50px 20px;
  width: 560px;
  height: 570px;
  position: relative;
  gap: 90px;
  @media (max-width: 1050px) {
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    /* padding-left: 170px; */
    line-height: 50px;
  }
`;

export const Image = styled.img`
  width: 60px;
  height: 60px;
  margin: 60px;
  position: absolute;
  top: -92px;
  left: 0;
  @media (max-width: 1050px) {
    width: 40px;
    height: 40px;
    top: -80px;
  }
`;
export const Paragraph = styled.p`
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: white;
  margin-top: 30px;
  @media (max-width: 1050px) {
    font-size: 20px;
    /* width: 70%; */
  }
`;
export const Para = styled.span`
  font-family: "Barlow", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  margin-top: 20px;
  color: ${(props) => props.theme.PRIMARY_COLOR};
  @media (max-width: 1050px) {
    font-size: 20px;
    /* width: 70%; */
  }
`;

export const Title = styled.h6`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  color: #ffffff;
  @media (max-width: 1050px) {
    font-size: 16px;
  }
`;

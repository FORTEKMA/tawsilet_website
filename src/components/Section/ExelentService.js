import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import React, { useEffect } from "react";
import BabyIcon from "../../assets/images/Baby.png";
import GroupIcon from "../../assets/images/Group.png";
import DriverIcon from "../../assets/images/Driver.png";
import ExitIcon from "../../assets/images/Exit.png";
import TeamLeaderIcon from "../../assets/images/Team leader.png";
import ProtectionIcon from "../../assets/images/Protection.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const ExelentService = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { t } = useTranslation();
  return (
    <Content>
      <Middle>
        <Heading>{t("SERVICES_SECTION.heading")}</Heading>
        <HeadingUp>{t("SERVICES_SECTION.title")}</HeadingUp>
        <Description>{t("SERVICES_SECTION.description")}</Description>
      </Middle>
      <GridContainer containerwidth="100%" justify="center">
        <GridItem>
          <ServiceIcon src={GroupIcon} alt="Luxury Vehicles" />
          <HeadingBox>{t("SERVICES_SECTION.cards.luxury.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.luxury.desc")}</DescriptionBox>
        </GridItem>
        <GridItem>
          <ServiceIcon src={DriverIcon} alt="Professional Drivers" />
          <HeadingBox>{t("SERVICES_SECTION.cards.driver.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.driver.desc")}</DescriptionBox>
        </GridItem>
        <GridItem>
          <ServiceIcon src={ExitIcon} alt="Airport Transfers" />
          <HeadingBox>{t("SERVICES_SECTION.cards.airport.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.airport.desc")}</DescriptionBox>
        </GridItem>
        <GridItem>
          <ServiceIcon src={TeamLeaderIcon} alt="Business Transport" />
          <HeadingBox>{t("SERVICES_SECTION.cards.business.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.business.desc")}</DescriptionBox>
        </GridItem>
        <GridItem>
          <ServiceIcon src={ProtectionIcon} alt="Privacy & Discretion" />
          <HeadingBox>{t("SERVICES_SECTION.cards.privacy.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.privacy.desc")}</DescriptionBox>
        </GridItem>
        {/* <GridItem>
          <ServiceIcon src={BabyIcon} alt="Child-Friendly Options" />
          <HeadingBox>{t("SERVICES_SECTION.cards.child.title")}</HeadingBox>
          <DescriptionBox>{t("SERVICES_SECTION.cards.child.desc")}</DescriptionBox>
        </GridItem> */}
      </GridContainer>
    </Content>
  );
};
export default ExelentService;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 96%;
  height: 100%;
  border-radius: 32px;
  margin-inline: auto;
  @media (max-width: 744px) {
    text-align: center;
    padding: 2rem;
  }
  padding-bottom: 30px;
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
`;
export const Heading = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 155.56%;
  color: #0c0c0c;
  text-align: center;
  justify-content: center;
  display: flex;
  @media (max-width: 744px) {
    font-size: 14px;
  }
`;
export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #0c0c0c;
  line-height: 30px;
  width: 65%;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    width: 100%;
  }
`;
export const HeadingUp = styled.div`
  font-weight: 700;
  font-size: 2.8125rem;
  color: #0c0c0c;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 24px;
  }
`;
const DescriptionBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 0.9rem;
  color: #0c0c0c;
  line-height: 30px;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    color: #0c0c0c;
  }
`;
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  width: ${(props) => (props.containerwidth ? props.containerwidth : "100%")};
  padding-top: 5rem;
  justify-content: ${(props) =>
    props.justify ? props.justify : "space-evenly"};
  gap: 1rem;
  @media (max-width: 744px) {
    gap: 1rem;
    padding-top: 2rem;
  }
`;
const GridItem = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 3.12rem;
  gap: 1.5625rem;
  width: 340px;
  height: 340px;
  background: #f9f9f9;
  @media (max-width: 744px) {
    gap: 30px;
    padding: 40px;
    margin-right: 0px;
  }
`;
const HeadingBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 155.56%;
  color: #0c0c0c;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 16px;
  }
`;
const ServiceIcon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
  @media (max-width: 744px) {
    width: 48px;
    height: 48px;
  }
`;

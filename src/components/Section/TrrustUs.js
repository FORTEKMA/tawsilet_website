import React from 'react';
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// import LightTypo from "../../constants/LightTypo"; // Not needed for new design

// Placeholder images (replace with actual assets)
import driverImg from "../../assets/images/kisspng-taxi-airport-bus-car-luxury-vehicle-5adcf299374ac4 1.png"; // You need to add this image
// Or use a public URL for now
// const driverImg = "https://i.ibb.co/6bQ7Q0r/driver.png";

const TrrustUs = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Left>
        <Heading>
          {t("ACCEUILE.TRUSTUS_HERO.title.1")} <Gold>{t("ACCEUILE.TRUSTUS_HERO.title.2")}</Gold> {t("ACCEUILE.TRUSTUS_HERO.title.3")}<br />{t("ACCEUILE.TRUSTUS_HERO.title.4")}
        </Heading>
        <Subheading>
          {t("ACCEUILE.TRUSTUS_HERO.desc")}
        </Subheading>
        <Button>
          {t("ACCEUILE.TRUSTUS_HERO.button")} <ArrowIcon viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11.5 5.5M16 10L11.5 14.5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></ArrowIcon>
        </Button>
      </Left>
      <Right>
        <GoldShape />
        <DriverImg src={driverImg} alt="Driver" />
      </Right>
    </Wrapper>
  );
};

export default TrrustUs;

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  width: 90%;
  background: #fff;
  border-radius: 40px;
  padding: 3rem 2rem;
  box-sizing: border-box;
  min-height: 400px;
  position: relative;
  overflow: hidden;
   
  @media (max-width: 1200px) {
    padding: 2.5rem 1.5rem;
    border-radius: 28px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    border-radius: 18px;
    min-height: 320px;
    margin: 1.2rem 0.5rem;
  }
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem;
    min-height: 220px;
    border-radius: 10px;
    margin: 0.7rem 0.2rem;
  }
`;

const Left = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  z-index: 2;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    gap: 1.2rem;
  }
  @media (max-width: 600px) {
    gap: 0.7rem;
  }
`;

const Heading = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.7rem);
  font-weight: 700;
  color: #222;
  line-height: 1.1;
  margin: 0;
  @media (max-width: 900px) {
    font-size: clamp(1.2rem, 6vw, 2rem);
  }
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Gold = styled.span`
  color: #d4af37;
`;

const Subheading = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: #222;
  margin: 0;
  max-width: 520px;
  @media (max-width: 900px) {
    max-width: 100%;
    font-size: clamp(0.9rem, 3vw, 1rem);
  }
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const Button = styled.button`
  background: #d4af37;
  color: #222;
  font-weight: 600;
  max-width: 202px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 2.2rem 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  box-shadow: 0 4px 0 #222;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #bfa133;
  }
  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    justify-content: center;
    padding: 0.8rem 1.2rem;
    font-size: 0.98rem;
  }
  @media (max-width: 600px) {
    padding: 0.7rem 0.7rem;
    font-size: 0.95rem;
  }
`;

const ArrowIcon = styled.svg`
  width: 22px;
  height: 22px;
  display: inline-block;
  @media (max-width: 600px) {
    width: 18px;
    height: 18px;
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 320px;
  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 600px) {
    margin-top: 1rem;
    min-width: 0;
  }
`;

const GoldShape = styled.div`
  position: absolute;
  right: 18%;
  bottom: -28px;
  width: 120px;
  height: 220px;
  background: #d4af37;
  transform: skew(-25deg, 0deg);
  z-index: 1;
  border-width: 4px;
  border-color: black;
  @media (max-width: 900px) {
    right: 10%;
    width: 80px;
    height: 120px;
    bottom: -18px;
  }
  @media (max-width: 600px) {
    right: 5%;
    width: 50px;
    height: 70px;
    bottom: -10px;
  }
`;

const DriverImg = styled.img`
  position: absolute;
  right: 12%;
  top: -60px;
  z-index: 2;
  width: 160px;
  height: auto;
  object-fit: contain;
  margin-bottom: 0;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.18));
  @media (max-width: 900px) {
    width: 90px;
    right: 2%;
    top: -20px;
  }
  @media (max-width: 600px) {
    width: 60px;
    right: 0;
    top: -10px;
  }
`;

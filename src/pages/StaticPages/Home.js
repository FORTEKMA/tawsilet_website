import React, { lazy } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContentWhiteBox = lazy(() => import("../../components/Section/ContentWhiteBox"));
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));
const ContactezNous = lazy(() => import("../../components/Section/ContactezNous"));
const SuiviLivraision = lazy(() => import("../../components/Section/SuiviLivraision"));
const ExelentService = lazy(() => import("../../components/Section/ExelentService"));
const Telecharger = lazy(() => import("../../components/Items/Telecharger"));
const Footer = lazy(() => import("../../components/Section/Footer"));
import { Button } from "../../components/Items/Button";

const Home = () => {
  return (
    <>
      <HeroWrap>
        <HeroInner>
          <HeroHeading>Seamless rides and deliveries</HeroHeading>
          <HeroSub>Reliable, transparent and fast — built for everyday transport needs.</HeroSub>
          <HeroActions>
            <Link to="/estimation">
              <Button hasBackground>Get an estimate</Button>
            </Link>
            <Link to="/Sidentifierpartenaire">
              <Button hasborder="true">Become a partner</Button>
            </Link>
          </HeroActions>
        </HeroInner>
      </HeroWrap>

      <Container_Home>
        <ContentWhiteBox>
          <HomeAbout />
        </ContentWhiteBox>
        <SuiviLivraision />
        <ExelentService />
        <Telecharger />
        <ContactezNous />
      </Container_Home>
      <Footer />
    </>
  );
};

export default Home;

const HeroWrap = styled.section`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 24px 60px;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
  @media (max-width: 744px) {
    align-items: center;
    text-align: center;
  }
`;

const HeroHeading = styled.h1`
  font-size: 48px;
  line-height: 1.1;
  font-weight: 900;
  color: #111;
  letter-spacing: -0.02em;
  @media (max-width: 744px) { font-size: 32px; }
`;

const HeroSub = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 720px;
  margin: 6px 0 10px;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Container_Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  @media (max-width: 894px) {
    gap: 3rem;
  }
`;
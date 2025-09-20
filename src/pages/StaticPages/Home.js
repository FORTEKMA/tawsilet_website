import React, { lazy } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../../components/Items/Button";

const ContentWhiteBox = lazy(() => import("../../components/Section/ContentWhiteBox"));
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));
const ContactezNous = lazy(() => import("../../components/Section/ContactezNous"));
const SuiviLivraision = lazy(() => import("../../components/Section/SuiviLivraision"));
const ExelentService = lazy(() => import("../../components/Section/ExelentService"));
const Telecharger = lazy(() => import("../../components/Items/Telecharger"));
const Footer = lazy(() => import("../../components/Section/Footer"));

const Home = () => {
  return (
    <>
      <Hero>
        <HeroInner>
          <Kicker>TAWSILET</Kicker>
          <HeroHeading>
            Seamless rides and deliveries
          </HeroHeading>
          <HeroSub>
            Reliable, transparent and fast — built for everyday transport needs.
          </HeroSub>
          <Actions>
            <Link to="/estimation">
              <Button hasBackground>Get an estimate</Button>
            </Link>
            <Link to="/Sidentifierpartenaire">
              <Button hasborder="true">Become a partner</Button>
            </Link>
          </Actions>
          <Stats>
            <Stat><b>24/7</b> support</Stat>
            <Dot />
            <Stat><b>Transparent</b> pricing</Stat>
            <Dot />
            <Stat><b>Trusted</b> drivers</Stat>
          </Stats>
        </HeroInner>
      </Hero>

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

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.section`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 64px;
  border-bottom: 1px solid #f3f3f3;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  animation: ${fadeUp} 400ms ease both;
  @media (max-width: 744px) {
    align-items: center;
    text-align: center;
  }
`;

const Kicker = styled.div`
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #666;
  text-transform: uppercase;
`;

const HeroHeading = styled.h1`
  font-size: 56px;
  line-height: 1.06;
  font-weight: 900;
  color: #111;
  letter-spacing: -0.02em;
  @media (max-width: 900px) { font-size: 40px; }
  @media (max-width: 744px) { font-size: 32px; }
`;

const HeroSub = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 720px;
  margin: 4px 0 10px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Stats = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #666;
  font-size: 14px;
  b { color: #111; }
`;

const Stat = styled.span``;

const Dot = styled.span`
  width: 4px; height: 4px; border-radius: 50%; background: #ddd;
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

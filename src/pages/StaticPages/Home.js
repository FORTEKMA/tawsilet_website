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
          <Left>
            <Kicker>TAWSILET</Kicker>
            <HeroHeading>Seamless rides and deliveries</HeroHeading>
            <HeroSub>Reliable, transparent and fast — built for everyday transport needs.</HeroSub>
            <Actions>
              <Link to="/estimation"><Button hasBackground>Get an estimate</Button></Link>
              <Link to="/Sidentifierpartenaire"><Button hasborder="true">Become a partner</Button></Link>
            </Actions>
            <Stats>
              <Stat><b>24/7</b> support</Stat><Dot /><Stat><b>Transparent</b> pricing</Stat><Dot /><Stat><b>Trusted</b> drivers</Stat>
            </Stats>
          </Left>
          <Right>
            <CardFloat delay={80}>
              <CardTitle>Instant booking</CardTitle>
              <CardDesc>Request a ride or delivery in seconds.</CardDesc>
            </CardFloat>
            <CardFloat delay={160}>
              <CardTitle>Real‑time tracking</CardTitle>
              <CardDesc>Follow your driver live on the map.</CardDesc>
            </CardFloat>
            <CardFloat delay={240}>
              <CardTitle>Fair pricing</CardTitle>
              <CardDesc>No surprises, clear fees every time.</CardDesc>
            </CardFloat>
          </Right>
        </HeroInner>
      </Hero>

      <FeatureStrip>
        <Feature><DotLarge />Fast pickup</Feature>
        <Feature><DotLarge />Professional drivers</Feature>
        <Feature><DotLarge />Secure payments</Feature>
        <Feature><DotLarge />Support that cares</Feature>
      </FeatureStrip>

      <HowItWorks>
        <HowHead>How it works</HowHead>
        <Steps>
          <Step>
            <StepNo>01</StepNo>
            <StepTitle>Enter details</StepTitle>
            <StepDesc>Set pickup, drop‑off and time.</StepDesc>
          </Step>
          <Step>
            <StepNo>02</StepNo>
            <StepTitle>Get your price</StepTitle>
            <StepDesc>Transparent quote before you confirm.</StepDesc>
          </Step>
          <Step>
            <StepNo>03</StepNo>
            <StepTitle>Track & arrive</StepTitle>
            <StepDesc>Follow progress and arrive smoothly.</StepDesc>
          </Step>
        </Steps>
      </HowItWorks>

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
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Hero = styled.section`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 48px;
  border-bottom: 1px solid #f3f3f3;
`;

const HeroInner = styled.div`
  width: 100%;
  max-width: 1140px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${fadeUp} 420ms ease both;
  @media (max-width: 744px) { text-align: center; align-items: center; }
`;

const Right = styled.div`
  display: grid;
  gap: 14px;
`;

const Kicker = styled.div`
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #666;
  text-transform: uppercase;
`;

const HeroHeading = styled.h1`
  font-size: 54px;
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
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Stats = styled.div`
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

const CardFloat = styled.div`
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 16px 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  animation: ${floatIn} 380ms ease both;
  animation-delay: ${(p) => (p.delay ? `${p.delay}ms` : '0ms')};
`;

const CardTitle = styled.div`
  color: #111; font-weight: 700; margin-bottom: 6px; font-size: 16px;
`;

const CardDesc = styled.div`
  color: #666; font-size: 14px;
`;

const FeatureStrip = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 1140px;
  margin: 18px auto 28px;
  padding: 0 16px;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const Feature = styled.div`
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 12px 14px;
  color: #333;
  display: flex; align-items: center; gap: 10px;
`;

const DotLarge = styled.span`
  width: 8px; height: 8px; border-radius: 50%; background: #111; display: inline-block;
`;

const HowItWorks = styled.section`
  max-width: 1140px;
  margin: 16px auto 40px;
  padding: 0 16px;
`;

const HowHead = styled.h3`
  font-size: 22px; color: #111; font-weight: 800; margin: 0 0 12px 0;
`;

const Steps = styled.div`
  display: grid; gap: 12px; grid-template-columns: repeat(3, 1fr);
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Step = styled.div`
  background: #fff; border: 1px solid #ececec; border-radius: 14px; padding: 16px;
`;

const StepNo = styled.div`
  width: 44px; height: 44px; border-radius: 50%; background: #111; color: #fff; display:flex; align-items:center; justify-content:center; font-weight:800; margin-bottom:8px;
`;

const StepTitle = styled.div`
  font-weight: 700; color: #111; margin-bottom: 4px;
`;

const StepDesc = styled.div`
  color: #666; font-size: 14px;
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

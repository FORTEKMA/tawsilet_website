import React, { lazy, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../../components/Items/Button";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import decathlon from "../../assets/images/decathlon.png";
import geant from "../../assets/images/geant.png";
import carrefour from "../../assets/images/carrefour.png";

const ContentWhiteBox = lazy(() => import("../../components/Section/ContentWhiteBox"));
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));
const ContactezNous = lazy(() => import("../../components/Section/ContactezNous"));
const SuiviLivraision = lazy(() => import("../../components/Section/SuiviLivraision"));
const ExelentService = lazy(() => import("../../components/Section/ExelentService"));
const Telecharger = lazy(() => import("../../components/Items/Telecharger"));
const Footer = lazy(() => import("../../components/Section/Footer"));

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 120 });
  }, []);

  return (
    <>
      <Hero>
        <HeroInner data-aos="fade-up">
          <Left>
            <Kicker>{t("ACCEUILE.TRUSTUS_HERO.title.2")}</Kicker>
            <HeroHeading>
              {t("ACCEUILE.TRUSTUS_HERO.title.1")} {t("ACCEUILE.TRUSTUS_HERO.title.2")} — {t("ACCEUILE.TRUSTUS_HERO.title.3")} {t("ACCEUILE.TRUSTUS_HERO.title.4")}
            </HeroHeading>
            <HeroSub>{t("ACCEUILE.TRUSTUS_HERO.desc")}</HeroSub>
            <Actions>
              <Link to="/estimation"><Button hasBackground>{t("ABOUT.Apropos.btn-obten")}</Button></Link>
              <Link to="/Sidentifierpartenaire"><Button hasborder="true">{t("NAVBAR.DEVENIR")}</Button></Link>
            </Actions>
            <Stats>
              <Stat>{t("ACCEUILE.Delai.title")}</Stat><Dot />
              <Stat>{t("ACCEUILE.Coût.title")}</Stat><Dot />
              <Stat>{t("ACCEUILE.PRESTATION-SERVICE-2.title2")}</Stat>
            </Stats>
          </Left>
          <Right>
            <CardFloat delay={80} data-aos="fade-up">
              <CardTitle>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card2.title")}</CardTitle>
              <CardDesc>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card2.desc")}</CardDesc>
            </CardFloat>
            <CardFloat delay={160} data-aos="fade-up">
              <CardTitle>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card3.title")}</CardTitle>
              <CardDesc>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card3.desc")}</CardDesc>
            </CardFloat>
            <CardFloat delay={240} data-aos="fade-up">
              <CardTitle>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card4.title")}</CardTitle>
              <CardDesc>{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card4.desc")}</CardDesc>
            </CardFloat>
          </Right>
        </HeroInner>
      </Hero>

      <Trusted>
        <TrustedInner data-aos="fade-up">
          <TrustedText>{t("ACCEUILE.TRUSTUS.title2")}</TrustedText>
          <LogoRow>
            <LogoItem><img src={decathlon} alt="Decathlon" /></LogoItem>
            <LogoItem><img src={carrefour} alt="Carrefour" /></LogoItem>
            <LogoItem><img src={geant} alt="Géant" /></LogoItem>
          </LogoRow>
        </TrustedInner>
      </Trusted>

      <FeatureStrip data-aos="fade-up">
        <Feature><DotLarge />{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card1.title")}</Feature>
        <Feature><DotLarge />{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card2.title")}</Feature>
        <Feature><DotLarge />{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card3.title")}</Feature>
        <Feature><DotLarge />{t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card4.title")}</Feature>
      </FeatureStrip>

      <HowItWorks data-aos="fade-up">
        <HowHead>{t("ACCEUILE.ÉTAPES.title2")}</HowHead>
        <Steps>
          <Step>
            <StepNo>01</StepNo>
            <StepTitle>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap1.title")}</StepTitle>
            <StepDesc>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap1.desc")}</StepDesc>
          </Step>
          <Step>
            <StepNo>02</StepNo>
            <StepTitle>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap2.title")}</StepTitle>
            <StepDesc>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap2.desc")}</StepDesc>
          </Step>
          <Step>
            <StepNo>03</StepNo>
            <StepTitle>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap3.title")}</StepTitle>
            <StepDesc>{t("SERVICES-Tawsilet.ÉTAPES-FACILES.etap3.desc")}</StepDesc>
          </Step>
        </Steps>
      </HowItWorks>

      <Container_Home>
        <div data-aos="fade-up">
          <ContentWhiteBox>
            <HomeAbout />
          </ContentWhiteBox>
        </div>
        <div data-aos="fade-up"><SuiviLivraision /></div>
        <div data-aos="fade-up"><ExelentService /></div>
        <div data-aos="fade-up"><Telecharger /></div>
        <div data-aos="fade-up"><ContactezNous /></div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 24px 36px;
  border-bottom: 1px solid #f3f3f3;
  background: radial-gradient(1000px 520px at 85% -10%, #EEF2F7 0%, rgba(238,242,247,0) 60%),
              linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
  background-repeat: no-repeat;
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

const Trusted = styled.section`
  background: #fff;
`;

const TrustedInner = styled.div`
  max-width: 1140px; margin: 0 auto; padding: 18px 16px 8px;
`;

const TrustedText = styled.div`
  color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px;
`;

const LogoRow = styled.div`
  display: grid; grid-template-columns: repeat(6, minmax(80px, 1fr)); gap: 16px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  img { width: 100%; height: 28px; object-fit: contain; filter: grayscale(100%); opacity: 0.7; }
`;

const LogoItem = styled.div` display: flex; align-items: center; justify-content: start; `;

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

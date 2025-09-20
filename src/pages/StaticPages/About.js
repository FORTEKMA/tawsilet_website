import styled, { keyframes } from "styled-components";
import Company from "../../components/Section/Company";
import Footer from "../../components/Section/Footer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../../components/Items/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => { AOS.init({ duration: 700, once: true, offset: 120 }); }, []);

  return (
    <>
      <Hero>
        <HeroInner data-aos="fade-up">
          <HeroTitle>{t("ABOUT.Apropos.title2")}</HeroTitle>
          <HeroDesc>{t("ABOUT.Apropos.desc")}</HeroDesc>
          <Button hasBackground onClick={() => navigate("/")}>{t("ABOUT.Apropos.btn-obten")}</Button>
        </HeroInner>
      </Hero>

      <CompanySection>
        <div data-aos="fade-up"><Company /></div>
      </CompanySection>
      <Footer />
    </>
  );
};

export default About;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.section`
  width: 100%;
  padding: 36px 16px 36px;
  background: radial-gradient(1000px 520px at 85% -10%, #EEF2F7 0%, rgba(238,242,247,0) 60%),
              linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroInner = styled.div`
  max-width: 1140px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeUp} 420ms ease both;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 44px;
  font-weight: 900;
  color: #111;
  letter-spacing: -0.02em;
  @media (max-width: 744px) { font-size: 32px; }
`;

const HeroDesc = styled.p`
  color: #555;
  font-size: 16px;
  max-width: 820px;
  margin: 0 auto 6px;
`;

const CompanySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 24px 0;
`;

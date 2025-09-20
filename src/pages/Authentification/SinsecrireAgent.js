import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import FormInputAgent from "../../components/Items/FormInputAgent";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const SinsecrireAgent = ({ setLoading }) => {
  const { t } = useTranslation();
  useEffect(() => { AOS.init({ duration: 700, once: true, offset: 120 }); }, []);

  return (
    <Wrap>
      <Hero>
        <HeroInner data-aos="fade-up">
          <HeroTitle>{t("SINSCRIREpartenaire.FormInput.organisre")}</HeroTitle>
          <HeroDesc>{t("ABOUT.SERVICES-Tawsilet.Nos-Service.desc")}</HeroDesc>
        </HeroInner>
      </Hero>

      <FormWrap data-aos="fade-up">
        <FormInputAgent setLoading={setLoading} />
      </FormWrap>
    </Wrap>
  );
};

export default SinsecrireAgent;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.div`
  background: #f7f7f7;
  min-height: 100vh;
`;

const Hero = styled.section`
  width: 100%;
  padding: 36px 16px 24px;
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
  gap: 8px;
  animation: ${fadeUp} 420ms ease both;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  font-weight: 900;
  color: #111;
  letter-spacing: -0.02em;
  @media (max-width: 744px) { font-size: 28px; }
`;

const HeroDesc = styled.p`
  color: #555;
  font-size: 16px;
  max-width: 820px;
  margin: 0 auto 6px;
`;

const FormWrap = styled.div`
  max-width: 1140px; margin: 16px auto; padding: 16px;
`;

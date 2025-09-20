import styled, { keyframes } from "styled-components";
import Inpuut from "../../components/Items/Inpuut";
import Footer from "../../components/Section/Footer";
import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../../components/Items/Button";
import AOS from "aos";
import "aos/dist/aos.css";

const TrrustUs = lazy(() => import("../../components/Section/TrrustUs"));

const Contact = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Hero>
        <HeroInner data-aos="fade-up">
          <HeroTitle>{t("Sheelni-CONTACT.title2")}</HeroTitle>
          <HeroDesc>{t("Sheelni-CONTACT.desc")}</HeroDesc>
          <Button hasBackground onClick={() => navigate("/")}>{t("Sheelni-CONTACT.btn-obten")}</Button>
        </HeroInner>
      </Hero>

      <ContactForm dir="auto" data-aos="fade-up">
        <section>
          <DIV style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <Titlle> {t("Sheelni-CONTACT.ContactForm.title2")} </Titlle>
          </DIV>
          <TI>{t("Sheelni-CONTACT.ContactForm.title1")}</TI>
          <PA>{t("Sheelni-CONTACT.ContactForm.desc")}</PA>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 5 }}>
            <NU>{t("Sheelni-CONTACT.ContactForm.textAresse")}</NU>
            <NU>{t("Sheelni-CONTACT.ContactForm.textAress")}</NU>
          </div>
          <DIVE dir="auto" isRtl={i18n.language.startsWith("ar")}>
            <Te>{t("Sheelni-CONTACT.ContactForm.email")}</Te>
            <Te>{t("Sheelni-CONTACT.ContactForm.Adresse")}</Te>
          </DIVE>
        </section>
        <Section>
          <SEND>
            <TIR>{t("Sheelni-CONTACT.ContactForm.btnSend")} </TIR>
          </SEND>
          <Inpuut />
          <div style={{ marginTop: 50, marginLeft: 5, marginBottom: 90 }}>
            <Button hasBackground>{t("Sheelni-CONTACT.ContactForm.placeholder")}</Button>
          </div>
        </Section>
      </ContactForm>
      <Footer />
    </>
  );
};

export default Contact;

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

export const Section = styled.section`
  padding-left: 30px;
  padding-right: 30px;
  border: 1px solid #ececec;
  border-radius: 10px;
  width: 430px;
  height: 500px;
  background: #fff;
  @media (max-width: 1050px) {
    width: 330px;
    height: auto;
    margin: auto;
    height: 450px;
  }
`;

export const Titlle = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;

export const TI = styled.h2`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 155.56%;
  color: #111;
  @media (max-width: 760px) {
    font-size: 24px;
  }
`;

export const PA = styled.h1`
  margin-top: 10px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color:#333;
`;

export const Te = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #111;
`;

export const NU = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 155.56%;
  color: #111;
`;

export const SEND = styled.div`
  margin-bottom: 35px;
  display: flex;
  gap: 20px;
  margin-top: 22px;
  @media (max-width: 760px) {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
  }
`;

export const DIV = styled.div``;

export const DIVE = styled.div`
  margin-top: 20px;
  direction: ltr;
  text-align: ${({ isRtl }) => (isRtl ? "right" : "left")};
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContactForm = styled.section`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  justify-content: space-between;
  margin-top: 20px;
  padding: 30px 30px;
  margin-bottom: 150px;
  background-color: #fff;
  border-radius: 15px;
  section:first-child { width: 45%; }
  @media (max-width: 760px) {
    padding: 30px 20px;
    width: 100%;
    margin-bottom: 0px;
    gap: 50px;
    section:first-child { width: 100%; }
  }
`;

export const TIR = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 155.56%;
  margin-bottom: 10px;
  color: #111;
`;

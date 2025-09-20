import styled from "styled-components";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import AboutImage from "../../assets/images/ad53738b0cf88b40a1ba0fd6035211c55ab73a92.jpg";
import CostIcon from "../../assets/icons/Weight.svg";
import FastIcon from "../../assets/icons/Delivery van.svg";

const HomeAbout = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <SectionWrapper>
      <MainContent>
        <ImageBlock data-aos="zoom-in" data-aos-delay={100}>
          <ImageContainer>
            <StyledImg src={AboutImage} alt="about" />
            <Overlay>
              <OverlayTitle>{t("ACCEUILE.APROPOSdeNous")}</OverlayTitle>
              <OverlayDesc>{t("ACCEUILE.EFFICACITE")}</OverlayDesc>
              <OverlayTeam dangerouslySetInnerHTML={{ __html: t("ACCEUILE.teamTagline") }}></OverlayTeam>
            </Overlay>
          </ImageContainer>
        </ImageBlock>
        <TextBlock data-aos="fade-left" data-aos-delay={200}>
          <AboutLabel>{t("ACCEUILE.APROPOSdeNous")}</AboutLabel>
          <AboutHeading>{t("ACCEUILE.EFFICACITE")}</AboutHeading>
          <AboutDesc>{t("ACCEUILE.descrip")}</AboutDesc>
          {/* <LearnMoreBtn>{t("ACCEUILE.btnSavoir") || "Learn More"}</LearnMoreBtn> */}
        </TextBlock>
      </MainContent>
      {/* <CardsRow>
        <InfoCard data-aos="zoom-in">
          <IconWrap>
            <img src={CostIcon} alt="Affordable Cost" />
          </IconWrap>
          <CardContent>
            <CardTitle>{t("ACCEUILE.Coût.title")}</CardTitle>
            <CardDesc>{t("ACCEUILE.Coût.desc")}</CardDesc>
          </CardContent>
        </InfoCard>
        <InfoCard data-aos="zoom-in">
          <IconWrap>
            <img src={FastIcon} alt="Fast Service" />
          </IconWrap>
          <CardContent>
            <CardTitle>{t("ACCEUILE.Delai.title")}</CardTitle>
            <CardDesc>{t("ACCEUILE.Delai.desc")}</CardDesc>
          </CardContent>
        </InfoCard>
      </CardsRow> */}

      {/* How We Work Section */}
      <HowWeWorkSection>
        <HowWeWorkLabel data-aos="fade-up">{t('HOWWEWORK.STEPS_LABEL')}</HowWeWorkLabel>
        <HowWeWorkTitle data-aos="fade-up" data-aos-delay="100">{t('HOWWEWORK.TITLE')}</HowWeWorkTitle>
        <HowWeWorkSubtitle data-aos="fade-up" data-aos-delay="200">
          {t('HOWWEWORK.SUBTITLE')}
        </HowWeWorkSubtitle>
        <StepsRow>
          <StepCardAos data-aos="zoom-in" data-aos-delay="300">
            <StepCircle>01</StepCircle>
            <StepTitle>{t('HOWWEWORK.STEP1.TITLE')}</StepTitle>
            <StepDesc>{t('HOWWEWORK.STEP1.DESC')}</StepDesc>
          </StepCardAos>
          <StepCardAos data-aos="zoom-in" data-aos-delay="400">
            <StepCircle>02</StepCircle>
            <StepTitle>{t('HOWWEWORK.STEP2.TITLE')}</StepTitle>
            <StepDesc>{t('HOWWEWORK.STEP2.DESC')}</StepDesc>
          </StepCardAos>
          <StepCardAos data-aos="zoom-in" data-aos-delay="500">
            <StepCircle>03</StepCircle>
            <StepTitle>{t('HOWWEWORK.STEP3.TITLE')}</StepTitle>
            <StepDesc>{t('HOWWEWORK.STEP3.DESC')}</StepDesc>
          </StepCardAos>
        </StepsRow>
        <HowWeWorkFooter data-aos="fade-up" data-aos-delay="600">
          {t('HOWWEWORK.FOOTER.TEXT')} <LearnMoreLink href="#">{t('HOWWEWORK.FOOTER.LINK')}</LearnMoreLink>
        </HowWeWorkFooter>
      </HowWeWorkSection>
    </SectionWrapper>
  );
};

export default HomeAbout;

const SectionWrapper = styled.section`
  width: 100%;
  background: #FFFFFF;
  padding: 48px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  width: 90%;
  max-width: 1200px;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 340px;
  height: 270px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  background: #222;
  @media (max-width: 600px) {
    width: 95vw;
    height: 200px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(24, 24, 24, 0.7);
  color: #111;
  padding: 18px 20px 12px 20px;
  border-radius: 0 0 20px 20px;
`;

const OverlayTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #111;
`;
const OverlayDesc = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 2px;
  color: #111;
`;
const OverlayTeam = styled.div`
  font-size: 0.9rem;
  margin-top: 8px;
  color: #555;
`;

const TextBlock = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
  color: #111;
  @media (max-width: 900px) {
    width: 100%;
    align-items: flex-start;
  }
`;
const AboutLabel = styled.div`
  color: #111;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;
const AboutHeading = styled.h2`
  font-size: 2.1rem;
  font-weight: 800;
  margin: 0;
  color: #111;
`;
const AboutDesc = styled.p`
  font-size: 1.08rem;
  color: #555;
  line-height: 1.7;
  margin: 0 0 12px 0;
`;
const LearnMoreBtn = styled.button`
  background: #ffe082;
  color: #222;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1rem;
  margin-top: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
  &:hover {
    background: #ffd54f;
  }
`;

const CardsRow = styled.div`
  display: flex;
  width: 90%;
  max-width: 900px;
  justify-content: center;
  gap: 32px;
  margin-top: 32px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 18px;
    width: 98vw;
    align-items: center;
  }
`;
const InfoCard = styled.div`
  background: #ffe082;
  color: #222;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px 28px;
  min-width: 260px;
  max-width: 350px;
  flex: 1;
  @media (max-width: 700px) {
    width: 95vw;
    min-width: unset;
    max-width: unset;
    padding: 18px 12px;
  }
`;
const IconWrap = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2px;
`;
const CardDesc = styled.div`
  font-size: 0.98rem;
  color: #444;
`;

// Add styled-components for How We Work section
const HowWeWorkSection = styled.section`
  width: 100%;
  background: transparent;
  margin-top: 64px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HowWeWorkLabel = styled.div`
  color: #e6c14b;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const HowWeWorkTitle = styled.h2`
  color: #111;
  font-size: 2.7rem;
  font-weight: 800;
  margin: 0 0 10px 0;
  text-align: center;
`;
const HowWeWorkSubtitle = styled.div`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 40px;
  text-align: center;
`;
const StepsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 32px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;
const StepCardAos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  @media (max-width: 400px) {
    width: 95vw;
  }
`;
const StepCircle = styled.div`
  width: 100px;
  height: 100px;
  background: #111;
  color: #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.3rem;
  font-weight: 800;
  margin-bottom: 24px;
`;
const StepTitle = styled.div`
  color: #111;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;
const StepDesc = styled.div`
  color: #555;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 10px;
`;
const HowWeWorkFooter = styled.div`
  color: #555;
  font-size: 1rem;
  margin-top: 18px;
  text-align: center;
`;
const LearnMoreLink = styled.a`
  color: #e6c14b;
  font-weight: 700;
  text-decoration: none;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

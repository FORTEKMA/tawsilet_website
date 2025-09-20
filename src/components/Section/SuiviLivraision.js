import styled from "styled-components";
import React, { useEffect } from "react";
import G8Img from "../../assets/images/g8.png";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTelegramPlane } from "react-icons/fa";

const SuiviLivraision = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { t } = useTranslation();

  return (
    <SectionWrapper>
      <ImageBlock data-aos="fade-right" data-aos-delay={400}>
        <StyledImg src={G8Img} alt="Service Illustration" />
      </ImageBlock>
      <TextBlock data-aos="zoom-in-up" data-aos-delay={200}>
        <Label>{t('SUIVI.SERVICES_LABEL')}</Label>
        <Heading>{t('SUIVI.HEADING')}</Heading>
        <Description>
          {t('SUIVI.DESCRIPTION')}
        </Description>
        {/* <LearnMoreBtn>
          {t('SUIVI.LEARN_MORE')} <FaTelegramPlane style={{ marginLeft: 8, fontSize: 18 }} />
        </LearnMoreBtn> */}
      </TextBlock>
    </SectionWrapper>
  );
};

export default SuiviLivraision;

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 480px;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border-radius: 32px;
  padding: 0 5vw;
  gap: 2vw;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 2vw;
    min-height: unset;
  }
`;

const ImageBlock = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 32px;
  }
`;

const StyledImg = styled.img`
  max-width: 380px;
  width: 100%;
  height: auto;
  @media (max-width: 900px) {
    max-width: 260px;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  color: #111;
  @media (max-width: 900px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const Label = styled.div`
  color: #111;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Heading = styled.h2`
  color: #111;
  font-size: 2.7rem;
  font-weight: 800;
  margin: 0 0 18px 0;
  line-height: 1.1;
  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1.08rem;
  line-height: 1.7;
  margin: 0 0 24px 0;
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
  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover {
    background: #ffd54f;
  }
`;

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
 
import { useTranslation } from "react-i18next";
import googleIcon from "../../assets/images/google.png";
import appleIcon from "../../assets/images/apple.png";
import logoapp from "../../assets/images/logoapp.png";
import driverLogo from "../../assets/images/driverLogo.png";

// Device detection utility
const detectDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  return 'desktop';
};

// App store URLs
const APP_STORE_URLS = {
  user: {
    android: "https://play.google.com/store/apps/details?id=com.fortekma.tawsilet",
    ios: "https://apps.apple.com/us/app/tawsilet/id6745802311",
    desktop: "https://play.google.com/store/apps/details?id=com.fortekma.tawsilet"
  },
  driver: {
    android: "https://play.google.com/store/apps/details?id=com.fortekma.tawsiletDriver&pli=1",
    ios: "https://apps.apple.com/us/app/tawsilet-driver/id6745764731",
    desktop: "https://play.google.com/store/apps/details?id=com.fortekma.tawsiletDriver&pli=1"
  }
};

const Telecharger = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const { t, i18n } = useTranslation();

  const handleDownloadClick = (appType) => {
    const device = detectDevice();
    const url = APP_STORE_URLS[appType][device];
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleJoinNetwork = () => {
    navigate('/Sidentifierpartenaire');
  };

  return (
    <Container>
      {/* User App Section */}
      <Section id="download-user">
        <BackgroundGradient />
        <Content data-aos="fade-up" data-aos-delay={200}>
          <ContentService dir="auto">
            {/* <Badge>{t('DOWNLOAD.USER_LABEL')}</Badge> */}
            <MainHeading>{t('DOWNLOAD.USER_HEADING')}</MainHeading>
            <Description>
              {t('DOWNLOAD.USER_DESCRIPTION')}
            </Description>
            
            <DownloadContainer>
              <StoreButton 
                href="https://play.google.com/store/apps/details?id=com.fortekma.tawsilet" 
                target="_blank" 
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay={400}
              >
                <StoreIcon src={googleIcon} alt={t('DOWNLOAD.GOOGLE_PLAY_ALT')} />
              </StoreButton>
              <StoreButton 
                href="https://apps.apple.com/us/app/tawsilet/id6745802311" 
                target="_blank" 
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay={500}
              >
                <StoreIcon src={appleIcon} alt={t('DOWNLOAD.APP_STORE_ALT')} />
              </StoreButton>
            </DownloadContainer>
          </ContentService>
          <ImageContainer data-aos="fade-left" data-aos-delay={300}>
            <AppImage src={logoapp} alt={t('DOWNLOAD.USER_APP_ALT')} />
            <FloatingCard 
              onClick={() => handleDownloadClick('user')}
              clickable
            >
              <CardIcon>📱</CardIcon>
              <CardText>{t('DOWNLOAD.DOWNLOAD_NOW')}</CardText>
            </FloatingCard>
          </ImageContainer>
        </Content>
      </Section>

      {/* Driver App Section */}
      <Section id="download-driver">
        <BackgroundGradient />
        <Content data-aos="fade-up" data-aos-delay={200}>
          <ImageContainer data-aos="fade-right" data-aos-delay={300}>
            <AppImage src={driverLogo} alt={t('DOWNLOAD.DRIVER_APP_ALT')} />
            <FloatingCard 
              onClick={handleJoinNetwork}
              clickable
            >
              <CardIcon>🚗</CardIcon>
              <CardText>{t('DOWNLOAD.JOIN_NETWORK')}</CardText>
            </FloatingCard>
          </ImageContainer>
          <ContentService dir="auto">
            {/* <Badge>{t('DOWNLOAD.DRIVER_LABEL')}</Badge> */}
            <MainHeading>{t('DOWNLOAD.DRIVER_HEADING')}</MainHeading>
            <Description>
              {t('DOWNLOAD.DRIVER_DESCRIPTION')}
            </Description>
           
            <DownloadContainer>
              <StoreButton 
                href="https://play.google.com/store/apps/details?id=com.fortekma.tawsiletDriver&pli=1" 
                target="_blank" 
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay={400}
              >
                <StoreIcon src={googleIcon} alt={t('DOWNLOAD.GOOGLE_PLAY_ALT')} />
              </StoreButton>
              <StoreButton 
                href="https://apps.apple.com/us/app/tawsilet-driver/id6745764731" 
                target="_blank" 
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay={500}
              >
                <StoreIcon src={appleIcon} alt={t('DOWNLOAD.APP_STORE_ALT')} />
              </StoreButton>
            </DownloadContainer>
          </ContentService>
        </Content>
      </Section>
    </Container>
  );
};

export default Telecharger;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0a0c12 0%, #1a1d2a 50%, #0a0c12 100%);
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 209, 102, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255, 209, 102, 0.05) 0%, transparent 50%);
  }
`;

const Section = styled.section`
  position: relative;
  background: #0a0c12;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  width: 100%;
  gap: 2rem;
  
  @media (max-width: 1050px) {
    order: 2;
    max-width: 100%;
  }
`;

const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #ffd166 0%, #ffb347 100%);
  color: #0a0c12;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1.5px;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  width: fit-content;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(255, 209, 102, 0.3);
  
  @media (max-width: 1050px) {
    align-self: center;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  color: #fff;
  line-height: 1.1;
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
  margin: 0;
  line-height: 1.6;
  max-width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const FeatureItem = styled.div`
  font-size: 1rem;
  color: #d0d0d0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 1050px) {
    justify-content: center;
  }
`;

const DownloadContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 209, 102, 0.3);
    border-color: rgba(255, 209, 102, 0.5);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StoreIcon = styled.img`
  width: 120px;
  height: 40px;
  object-fit: contain;
  
  @media (max-width: 480px) {
    width: 100px;
    height: 35px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 1050px) {
    order: 1;
    max-width: 400px;
  }
`;

const AppImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: linear-gradient(135deg, #ffd166 0%, #ffb347 100%);
  color: #0a0c12;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(255, 209, 102, 0.4);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: float 3s ease-in-out infinite;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  
  ${props => props.clickable && `
    &:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 209, 102, 0.6);
    }
    
    &:active {
      transform: translateY(-2px) scale(1.02);
    }
  `}
  
  @media (max-width: 768px) {
    bottom: -15px;
    right: -15px;
    padding: 0.8rem 1.2rem;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const CardIcon = styled.span`
  font-size: 1.2rem;
`;

const CardText = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

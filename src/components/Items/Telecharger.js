import styled from "styled-components";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import google from "../../assets/icons/appstoree.svg";
import video from "../../assets//images/video.png";
import app from "../../assets/icons/playstore.svg";
import LightTypo from "../../constants/LightTypo";
import appvideo from "../../assets/videos/appvideo.mp4";
import appvideowebm from "../../assets/videos/appvideo.webm";
import mute from "../../assets/icons/mute.png";
import unmute from "../../assets/icons/unmute.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/images/google.png";
import appleIcon from "../../assets/images/apple.png";
import logoapp from "../../assets/images/logoapp.png";

const Telecharger = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  // Remove all video/mute/isPlaying related state and effects

  const { t, i18n } = useTranslation();

  // Remove toggleMute function

  return (
    <Section id="download">
      <Content data-aos="zoom-in" data-aos-delay={300}>
        <ContentService dir="auto">
          <YellowLabel>{t('DOWNLOAD.LABEL')}</YellowLabel>
          <MainHeading>{t('DOWNLOAD.HEADING')}</MainHeading>
          <Description>
            {t('DOWNLOAD.DESCRIPTION')}
          </Description>
          <Download>
            <StoreButton href="https://play.google.com/store/apps/details?id=com.fortekma.tawsiletDriver&pli=1" target="_blank" rel="noopener noreferrer">
              <StoreIcon src={googleIcon} alt="Google Play" />
              
            </StoreButton>
            <StoreButton href="https://apps.apple.com/us/app/tawsilet-driver/id6745764731" target="_blank" rel="noopener noreferrer">
              <StoreIcon src={appleIcon} alt="App Store" />
              
            </StoreButton>
          </Download>
        </ContentService>
        <ImgService>
          <img src={logoapp} alt="App Logo" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
        </ImgService>
      </Content>
    </Section>
  );
};

export default Telecharger;

const Icons = styled.img`
  cursor: pointer;
  width: 8vw;
  min-width: 150px;
  margin: 20px;
  margin-top: 2vw;
  /* padding: 16px; */
  @media (max-width: 1050px) {
    width: 140px;
    min-width: 100px;
    padding: 10px;
    margin-bottom: 20px;
    margin: 0px;
    margin-top: 15px;
  }
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  /* padding: 5rem 0rem 5rem; */

  justify-content: center;
  gap: 5%;
  align-items: center;

  @media (max-width: 1050px) {
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;
export const Hr = styled.hr`
  width: 80%;
  align-self: center;
  justify-content: center;
  display: flex;

  align-items: center;
  margin-inline: auto;
`;

const Download = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  flex-direction: row;
  @media (max-width: 1050px) {
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 20px;
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 40%;
  height: 70%;
  justify-content: space-around;
  border-radius: 32px;
  @media (max-width: 1050px) {
    padding: 2.75rem 1.75rem 0rem 1.75rem;
    width: 100%;

    align-self: center;
    text-align: justify;
  }
`;
const ImgService = styled.div`
  display: flex;
  flex-direction: column;
  height: 38vw;
  overflow: hidden;
  width: 35vw;
  gap: 8.125rem;
  border-radius: 32px;
  text-align: "center";
  position: relative;
  // border-radius: 17px !important;
  border: none;

  @media (max-width: 1050px) {
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
    padding: 0 5%;
    overflow: visible;
    // border: 1px solid red;
  }
   video {
    width: 35.1vw;
    height: 140%;
    display: block;
    right: -1px;
    outline: 0px;
     

    @media (max-width: 1050px) {
      width: 100%;
      height: 100%;
      // border: none;
      // border:1px solid red;
  border-radius: 16px;

    }
  }
    
  img.mute {
    position: absolute;
    height: 20px;
    width: 20px;
    bottom: 20px;
    right: 20px;
    @media (max-width: 1050px) {
      bottom: 16px;
      right: calc(5% + 16px);
      width: 16px;
      height:16px;
      z-index: 9999999999;
    }
  } 

  img{
    width: 35vw;
    height: 140%;
    display: block;

    @media (max-width: 1050px) {
      width: 100%;
    }
  }
`;

const Section = styled.section`
  background: #0a0c12;
  color: #fff;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
const YellowLabel = styled.div`
  color: #ffd166;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
`;
const MainHeading = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 1.2rem 0;
  color: #fff;
`;
const Description = styled.p`
  font-size: 1.1rem;
  color: #d3d3d3;
  margin-bottom: 2.5rem;
  max-width: 420px;
`;
const StoreButton = styled.a`
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 0.7rem 1.2rem;
  text-decoration: none;
  margin-right: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s;
  cursor: pointer;
  
  color: #181a20;
 
`;
const StoreIcon = styled.img`
  width: 110px;
  height: 38px;
  margin-right: 0.9rem;
`;
const StoreText = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`;
const Small = styled.span`
  font-size: 0.8rem;
  color: #bdbdbd;
`;
const Bold = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
`;

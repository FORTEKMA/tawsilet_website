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

const Telecharger = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [muted, setMuted] = useState(true); // Start muted by default
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoEl = document.getElementById("myVideo");
    if (!videoEl) return;

    // Set initial attributes
    videoEl.setAttribute("playsInline", "");
    videoEl.setAttribute("webkit-playsinline", ""); // For iOS
    videoEl.muted = true; // Start muted to allow autoplay

    let hasUserInteracted = false;
    let observer;

    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        hasUserInteracted = true;
        // Try to unmute after user interaction
        videoEl.muted = false;
        setMuted(false);
        
        // Remove listeners after first interaction
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("scroll", handleUserInteraction);
        window.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    // Add interaction listeners
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);

    // Initial muted autoplay attempt
    const playPromise = videoEl.play().catch(err => {
      console.warn("Initial muted autoplay failed:", err);
    });

    // Intersection Observer setup
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible - try to play
            videoEl.play()
              .then(() => {
                setIsPlaying(true);
                // If we have user interaction, try unmuting
                if (hasUserInteracted) {
                  videoEl.muted = false;
                  setMuted(false);
                }
              })
              .catch(err => {
                console.warn("Playback failed:", err);
                setIsPlaying(false);
              });
          } else {
            // Video is not visible - pause
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoEl);

    // Cleanup
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      if (videoEl) {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    };
  }, []);

  const { t, i18n } = useTranslation();

  const toggleMute = () => {
    const videoEl = document.getElementById("myVideo");
    if (videoEl) {
      videoEl.muted = !videoEl.muted;
      setMuted(videoEl.muted);
    }
  };

  return (
    <section id="download">
      <Content data-aos="zoom-in" data-aos-delay={300}>
        <ImgService>
          <video
            id="myVideo"
            autoPlay
            loop
            muted={muted}
            playsInline
            webkit-playsinline="true"
          >
            <source type="video/webm" src={appvideowebm} />
            <source type="video/mp4" src={appvideo} />
            <p>Your browser does not support the video tag.</p>
          </video>
          <img 
            className="mute" 
            src={muted ? mute : unmute} 
            alt={muted ? "unmute" : "mute"} 
            onClick={toggleMute}
          />
        </ImgService>
        <ContentService dir="auto">
          <LightTypo
            headingup={t("ACCEUILE.TÉLÉCHARGER.title2")}
            descriptioneee={t("ACCEUILE.TÉLÉCHARGER.desc")}
          />
          <Download>
            <Link to="">
              <Icons src={google} alt="playStore:sheelni" />
            </Link>
            <Link to="">
              <Icons src={app} alt="appStore:sheelni"/>
            </Link>
          </Download>
        </ContentService>
      </Content>
    </section>
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

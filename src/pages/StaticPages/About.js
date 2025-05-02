import styled from "styled-components";
// import * as style from "../../constants/StyleSheets";
import Company from "../../components/Section/Company";
// import Arrow from "./../../assets/images/arrowdown.png";
import about from "../../assets/images/aboutehero.png";
// import AgentList from "../../components/Section/AgentList";
// import back from "../../assets/images/background.png";
// import replace from "../../assets/images/Replace with your image.png";
// import Demagnegment from "../../components/Items/Demagnegment";
// import Call from "../../components/Items/Call";
import Footer from "../../components/Section/Footer";
import Teams from "../../components/Section/Teams";
// import Buttonobtenez from "../../components/Items/buttonobtenez";
import AOS from "aos";
// import { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
export const Spacing = styled.div``;
// import appvideo from "../../assets/videos/apropos.mp4";
// import appvideowebm from "../../assets/videos/apropos.webm";
import JoinSheelni from "../../components/Section/JoinSheelni";
// import MarqueeCard from "../../components/Items/MarqueeCard";
// import Marquee from "../../components/Items/Marquee";
import Bulletin from "../../components/Section/Bulletin";
import MarqueAbout from "../../components/Section/MarqueAbout";
import { useNavigate } from "react-router";
// import { Helmet } from "react-helmet-async";

const About = () => {
  // useLayoutEffect(() => {
  //   const video = document.getElementById("myVideo");
  //   video.setAttribute("playsinline", ""); // Adding playsinline attribute
  //   video.muted = true; // Muting the video
  //   video.play(); // Programmatic play to prevent popup

  //   // Add event listeners to unmute the video if user interacts with it
  //   video.addEventListener("click", () => {
  //     video.muted = false;
  //   });

  //   video.addEventListener("play", () => {
  //     video.muted = false;
  //   });
  // }, []);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <CompanySection>
        <Sect>
          {/* <video
          id="myVideo"
          alt="app video"
          autoPlay
          loop
          muted
          playsinline
          style={{ width: "100%", height: "auto" }}
        >
          {" "}
          <source type="video/webm" src={appvideowebm} />
          <source type="video/mp4" src={appvideo} />
          <p>Your browser does not support the video tag.</p>
        </video> */}
          <img
            srcSet={`
            ${require("../../assets/images/aboutehero-400w.webp")} 400w,
            ${require("../../assets/images/aboutehero-600w.webp")} 600w,
            ${require("../../assets/images/aboutehero-800w.webp")} 800w,
            ${require("../../assets/images/aboutehero-1000w.webp")} 1000w,
            ${require("../../assets/images/aboutehero-1200w.webp")} 1200w
          `}
            sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
            src={about}
            alt="about demenagement"
            // width="1440"
            // height="944"
            loading="lazy"
          />
          {/* <img src={about} alt="about" loading="lazy" /> */}
          <ContactHero style={{ position: "absolute" }}>
            <Title> {t("ABOUT.Apropos.title1")} </Title>

            <SideTitle>{t("ABOUT.Apropos.title2")}</SideTitle>

            <LastTitle>{t("ABOUT.Apropos.desc")}</LastTitle>
            <BUT onClick={() => navigate("/")}>
              {t("Sheelni-CONTACT.btn-obten")}
            </BUT>
          </ContactHero>{" "}
          {/* <div className="opacity-background" style={{ position: "absolute" }}>
          <div className="inner_content_hero_about">
            {" "}
            <Title data-aos="zoom-down" data-aos-delay={200}>
              {t("ABOUT.Apropos.title1")}
            </Title>
            <SideTitle data-aos="zoom-down" data-aos-delay={400}>
              {t("ABOUT.Apropos.title2")}
            </SideTitle>
            <LastTitle data-aos="zoom-down" data-aos-delay={600}>
              {t("ABOUT.Apropos.desc")}
            </LastTitle>
            <div
              className="about__action_"
              data-aos="zoom-down"
              data-aos-delay={800}
            >
              {" "}
              {/* //               <Buttonobtenez icon={Arrow} Textbody= {t("ABOUT.Apropos.btn-obten")} />
//               <Call className="buttonobtenez" /> */}
          {/* </div>
          </div>
        </div>  */}
        </Sect>

        <Company />
        {/* <Marquee> */}
        <MarqueAbout />
        {/* </Marquee> */}
        <Teams />
        <JoinSheelni />

        <Bulletin />
      </CompanySection>
      {/* <AgentList /> */}{" "}
      {/* <Sec>
        <img className="background-image" src={replace} alt="replace" />
        <Demagnegment />
      </Sec> */}
      <Footer />
    </>
  );
};

export default About;
const CompanySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: 744px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }
`;

export const BUT = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: white;
  font-size: 15px;
  text-align: center;

  cursor: pointer;

  background-color: #f37a1d;
  box-shadow: 2px 2px 0px 0px #18365a;
  /* margin-right:45%; */
  @media (max-width: 1050px) {
    width: 200px;
    font-weight: 900;
    height: 55px;
    /* margin-right:0rem; */
  }
`;
const ContactHero = styled.div`
  top: 0;
  height: calc(100vh - 80px);
  width: 100%;
  background-color: rgba(24, 54, 90, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
// export const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   text-align: center;

//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 30px;
//   letter-spacing: 0.16px;
//   color: ${(props) => props.theme.PRIMARY_COLOR};
// `;
export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: white;
`;
export const SideTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: white;
  @media (max-width: 760px) {
    font-size: 28px;
  }
`;
// export const SideTitle = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-weight: 900;
//   font-size: 60px;
//   font-style: normal;
//   text-align: center;
//   color: white;
//   @media (max-width: 744px) {
//     font-size: 28px;
//   }
// `;
// export const LastTitle = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-weight: 300;
//   font-size: 1rem;
//   color: white;
//   width: 55%;
//   text-align: center;
//   line-height: 30px;

//   @media (max-width: 744px) {
//     font-size: 14px;
//     width: 80%;
//     line-height: 24px;
//   }
// `;
export const LastTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: white;
  width: 50%;
  text-align: center;
  line-height: 30px;

  @media (max-width: 760px) {
    font-size: 14px;
    width: 90%;
    line-height: 30px;
  }
`;
const Sect = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    height: calc(100vh - 80px);
    object-fit: cover;
  }
  @media (max-width: 744px) {
    img {
      object-fit: cover;
      object-position: right;
      width: 130%;
    }
  }
`;
// const Sect = styled.div`
//   position: relative;
//   width: 100%;
//   height: calc(100vh - 90px);
//   overflow: hidden;

//   img {
//     height: 100%;
//     width: 100%;
//     object-fit: cover;
//   }
//   .about__action_ {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 1.3rem;
//   }
//   .opacity-background {
//     top: 0;
//     height: 100%;
//     width: 100%;
//     background-color: rgba(37, 36, 58, 0.5);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//   }
//   .buttonobtenez {
//     img {
//       width: 20px !important;
//     }
//   }
//   .inner_content_hero_about {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 1.5rem;
//     width: 70%;
//   }
//   @media (max-width: 1050px) {
//     height: 40vh;
//     video {
//       width: 168vw !important;
//     }
//     .inner_content_hero_about {
//       width: 95%;
//       gap: 1.1rem;
//     }
//   }
// `;

const AboutHero = styled.div`
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(37, 36, 58, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 90px;
  gap: 20px;
`;

const Sec = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
  margin-top: 50px;
  .background-image {
    object-fit: cover;
    width: 100%;
    height: 93vh;
    @media (max-width: 744px) {
      height: 100vh;
    }
  }
  img {
    margin-bottom: 80px;
  }
  div {
    bottom: 2px;
    left: 0px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.BACKGROUND_COLOR};
    @media (max-width: 744px) {
      width: 300px;
      height: 480px;
    }
  }
`;
export const Image = styled.img`
  /* width: 100%; */
  /* width: 100vw;
 height: 100vh;
 background-image: url('../../assets/images/Replace with your image.png');
 background: rgba(37, 36, 58, 0.7); */
`;

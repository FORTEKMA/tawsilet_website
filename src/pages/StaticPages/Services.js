// ======================================== Mariem

// import Oval from "./../../assets/images/Oval.png";

import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import back from "../../assets/images/background (3).png";
// import Arrow from "./../../assets/icons/arrowdown.svg";
import AboutServices from "../../components/Section/AboutServices";
import service from "../../assets/images/service-cover.png";
import PreServices from "../../components/Section/PreService";
// import SuiviLivraision from "../../components/Section/SuiviLivraision";
// import One from "../../assets/icons/one.svg";
// import Two from "../../assets/icons/two.svg";
// import Three from "../../assets/icons/three.svg";
// import Four from "../../assets/icons/four.svg";
// import step from "../../assets/icons/Group 7856.png";
// import stept from "../../assets/icons/02.png";
// import Buttonobtenez from "../../components/Items/buttonobtenez";
// import Call from "../../components/Items/Call";
import Footer from "../../components/Section/Footer";
import AOS from "aos";

import LightTypo from "../../constants/LightTypo";

// import Side from "../../assets/images/pic.png";
// import Buttondetails from "../../components/Items/buttondetails";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// import { Details, Info } from "../../components/Section/HomeAbout";
// import appvideo from "../../assets/videos/services.mp4";
// import appvideowebm from "../../assets/videos/services.webm";
import SuiviLivraision from "../../components/Section/SuiviLivraision";
import ExelentService from "../../components/Section/ExelentService";
import { useNavigate } from "react-router";
// import Bulletin from "../../components/Section/Bulletin";
// import { Helmet } from "react-helmet-async";
const Services = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //   });
  // }, []);

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
  const navigate= useNavigate()

  return (
    <>
    <Container_Home>
      {/* <Helmet>
        <title>Services</title>
        <meta
          name="description"
          content="Découvrez nos services exceptionnels chez Sheelni en France, offrant des solutions logistiques sur mesure et performantes pour répondre à vos besoins spécifiques. Explorez notre gamme complète de services de transport exceptionnel pour une logistique fiable et efficace."
        />
        <link rel="canonical" href="https://Sheelni.fr/services" />
      </Helmet> */}




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
          <source type="video/webm" src={appvideowebm} />
          <source type="video/mp4" src={appvideo} />
          <p>Your browser does not support the video tag.</p>
        </video> */}
        
        {/* <img src={service} alt="contact" loading="lazy"/> */}
         <img
                    srcSet={`
                    ${require("../../assets/images/service-cover-400w.webp")} 400w,
                    ${require("../../assets/images/service-cover-600w.webp")} 600w,
                    ${require("../../assets/images/service-cover-800w.webp")} 800w,
                    ${require("../../assets/images/service-cover-1000w.webp")} 1000w,
                    ${require("../../assets/images/service-cover-1200w.webp")} 1200w
                  `}
                    sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
                    src={service}
                    alt="about demenagement"
                    // width="1440"
                    // height="944"
                    loading="lazy"
                  />
       
        <ContactHero style={{ position: "absolute" }}>

        <Title> {t("ABOUT.SERVICES-Sheelni.Nos-Service.title1")} </Title>
          
          <SideTitle>{t("ABOUT.SERVICES-Sheelni.Nos-Service.title2")}</SideTitle>
        
          <LastTitle>{t("ABOUT.SERVICES-Sheelni.Nos-Service.desc")}</LastTitle> 
           <BUT onClick={()=>navigate("/")}>
          {t("Sheelni-CONTACT.btn-obten")}
      </BUT>
          {/* <div className="flextitel"> */}



          {/* <Title data-aos="zoom-down" data-aos-delay={200}>
            {t("ABOUT.SERVICES-Sheelni.Nos-Service.title1")}
          </Title>
          <SideTitle data-aos="zoom-down" data-aos-delay={400}>
            {t("ABOUT.SERVICES-Sheelni.Nos-Service.title2")}
          </SideTitle>
          <LastTitle data-aos="zoom-down" data-aos-delay={600}>
            {t("ABOUT.SERVICES-Sheelni.Nos-Service.desc")}
          </LastTitle> */}




          {/* </div> */}
          <Div data-aos="fade-up" data-aos-delay={800}>
            {/* //             <Buttonobtenez icon={Arrow} Textbody= {t("ABOUT.SERVICES-Sheelni.Nos-Service.btn-obten")} />
//             <Call className="buttonobtenez" /> */}
          </Div>
        </ContactHero>
      </Sect>
      {/* <div style={{marginBottom:"150px"}}></div> */}
      <AboutServices />

      {/* <GridContainer>
        <ContentService data-aos="fade-in">
          <Heading> {t("ABOUT.SERVICES-Sheelni.ÉTAPES-FACILES.title1")}</Heading>
        </ContentService>
        <HeadingUpService data-aos="fade-in">
          {t("ABOUT.SERVICES-Sheelni.ÉTAPES-FACILES.title2")}
        </HeadingUpService>
        <DescriptionService data-aos="fade-in">
          {t("ABOUT.SERVICES-Sheelni.ÉTAPES-FACILES.desc")}
        </DescriptionService>
        <Step dir="auto">
          <StepCard
            data-aos="fade-left"
            data-aos-easing="ease-out-back"
            data-aos-delay={200}
          >
            <Steps src={step} />
            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap4.title")}</H1>
            <PAR>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap4.desc")}</PAR>
          </StepCard>
          <StepCard
            data-aos="fade-left"
            data-aos-easing="ease-out-back"
            data-aos-delay={400}
          >
            <Steps src={stept} />
            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap2.title")}</H1>
            <PAR> {t("ACCEUILE.ÉTAPES.QuatreEtaps.etap2.desc")}</PAR>
          </StepCard>
          <StepCard
            data-aos="fade-left"
            data-aos-easing="ease-out-back"
            data-aos-delay={600}
          >
            <Steps src={Three} />
            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap3.title")}</H1>
            <PAR>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap3.desc")}</PAR>
          </StepCard>
          {/* <StepCard
            data-aos="fade-left"
            data-aos-easing="ease-out-back"
            data-aos-delay={800}
          >
            <Steps src={Four} />
            <H1>{t("ABOUT.SERVICES-Sheelni.ÉTAPES-FACILES.etap4.title")}</H1>
            <PAR>{t("ABOUT.SERVICES-Sheelni.ÉTAPES-FACILES.etap4.desc")}</PAR>
          </StepCard> */}
        {/* </Step> */}
        {/* <Details data-aos="zoom-in" data-aos-delay={800}>
          <Info> {t("ACCEUILE.ÉTAPES.QuatreEtaps.commentaire1")}</Info>
          <p>{t("ACCEUILE.ÉTAPES.QuatreEtaps.commentaire2")}</p>
        </Details> */}

        {/* // <ContentServiceContainer dir="auto">
        //   {" "}
        //   <ContentService data-aos="zoom-in-up" data-aos-delay={200}>
        //     <LightTypo */}
        {/* //       heading={t("ABOUT.SERVICES-Sheelni.SERVICE.title1")}
        //       headingup={t("ABOUT.SERVICES-Sheelni.SERVICE.title2")}
        //       description={t("ABOUT.SERVICES-Sheelni.SERVICE.desc1")}
        //     />
        //   </ContentService>{" "}
        //   <ImgService data-aos="fade-right" data-aos-delay={400}>
        //     <img
        //       sizes="(max-width: 1400px) 100vw, 1400px"
        //       srcSet={`
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_200.png 200w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_392.png 392w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_532.png 532w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_653.png 653w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_767.png 767w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_866.png 866w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_956.png 956w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1022.png 1022w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1114.png 1114w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1173.png 1173w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1232.png 1232w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1313.png 1313w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1364.png 1364w,
        //     assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1400.png 1400w
        //   `}
        //       src="assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1400.png"
        //       alt="LivraisonPic"
        //     />
        //     {/* <img src={Side} alt="services" /> */}
    {/*    </ImgService>     
         </ContentServiceContainer>
         <PreServices />
       </GridContainer> */} 
        <SuiviLivraision />
        <ExelentService />
        {/* <Bulletin/> */}
        </Container_Home>
      <Footer />
  </>
  );
};

export default Services;

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
const ContentServiceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border-radius: 32px;
  padding-top: 78.45px;
  padding-bottom: 78.45px;
  @media (max-width: 744px) {
    display: none;
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 0px;
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
 
  background-color: #F37A1D;
  box-shadow: 2px 2px 0px 0px #18365A;
/* margin-right:45%; */
  @media (max-width: 1050px) {
    width: 200px;
    font-weight: 900;
    height: 55px;
    /* margin-right:0rem; */
  }
`;
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
export const Titlle = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.SECONDARY_COLOR};
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
export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: white;
`;
const ImgService = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  border-radius: 32px;
  img {
    max-width: 500px;
    width: 100%;
    @media (max-width: 744px) {
      width: 300px;
      height: 300px;
      margin-bottom: 40px;
      object-fit: "contain";
    }
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
  border-radius: 32px;

  padding-bottom: 78.45px;
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
`;
export const HeadingUp = styled.div`
  font-weight: 900;
  font-size: 45px;
  align-items: center;
  justify-content: center;
  color: #020111;
  padding-top: 12px;
  color: #ffffff;
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
      /* object-position: left; */
      width: 210%;
    }
  }
`;
// const Sect = styled.div`

//   position: relative;
//   width: 100%;

//   img {
//     width: 100%;
//     height: calc(100vh - 80px);
//     object-fit: cover;
//   }
//   @media (max-width: 744px) {
//     img {
//       object-fit: cover;
//       object-position: right;
//       width: 150%;
//     }
//   }



//   .opacity-background {
//     top: 0;
//     height: 100%;
//     width: 100%;
//     background-color: rgba(24, 54, 90, 0.4);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     line-height: 70px;
//   }
//   /* .flextitel{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 20px;
//   } */
//   .buttonobtenez {
//     img {
//       width: 20px !important;
//     }
//   }
//   @media (max-width: 1050px) {
//     height: 40vh !important;
//     video {
//       width: 168vw !important;
//     }
//     .opacity-background {
//       line-height: 50px;
//     }
//   }
// `;
const ContactHero = styled.div`
  top: 0;
  height: calc(100vh - 80px);
  width: 100%;
  background-color:  rgba(24, 54, 90, 0.4);
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const Sec = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
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
  }
`;
export const Image = styled.img``;
export const Button404 = styled.button`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 16px;
  color: #020111;
  background-color: #F37A1D;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  width: 360px;
  height: 55.14px;
  margin-top: 40px;
  .icon-arrow {
    width: 20px;
    height: 20px;
  }
`;
const Div = styled.div`
  @media (max-width: 744px) {
    /* display: none; */
  }
`;
export const Fram = styled.img``;
export const YU = styled.h1`
  padding-top: 30px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #F37A1D;
`;
export const JU = styled.img`
  width: 20px;
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  padding-left: 40px;
  border-radius: 32px;
  /* border: 1px solid black; */
`;

const Heading = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 20px;
  line-height: 155.56%;
  padding-top: 16px;
  color: white;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 13px;
    align-self: start;
    margin-bottom: 10px;
  }
`;
const HeadingUpService = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  padding-top: 12px;
  color: white;
  @media (max-width: 744px) {
    text-align: center;
    font-size: 1.25rem;
    width: 100%;
    padding-top: 0;
  }
`;
const DescriptionService = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 16px;
  color: white;
  line-height: 30px;
  padding-top: 20px;
  width: 42%;
  text-align: center;
  padding-bottom: 50px;
  @media (max-width: 744px) {
    font-size: 12px;
    width: 80%;
    line-height: 1.875rem;
  }
`;

// export const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-size: 15px;
//   font-weight: 500;
//   color: ${(props) => props.theme.PRIMARY_COLOR};
// `;
// export const SideTitle = styled.h1`
//   font-family: "Inter", sans-serif;
//   /* margin-top: 10px; */
//   font-weight: 1000;
//   font-size: 50px;
//   color: white;
//   text-align: center;
//   /* margin-bottom: 30px; */
//   @media (max-width: 744px) {
//     font-size: 28px;
//   }
// `;

// export const LastTitle = styled.h1`
//   font-family: "Inter", sans-serif;
//   /* margin-top: 10px; */
//   font-weight: 400;
//   font-size: 20px;
//   color: white;
//   width: 55%;
//   text-align: center;
//   line-height: 50px;
//   margin-bottom: 40px;
//   @media (max-width: 744px) {
//     font-size: 14px;
//     width: 70%;
//     line-height: 24px;
//     margin-bottom: 30px;
//   }
// `;
export const Spacing = styled.div``;
export const PAR = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #aaaaaa;
  @media (max-width: 744px) {
    font-size: 10px;
    line-height: 20px;
    width: 80%;
  }
`;
export const Step = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 40px;
  gap: 44px;
  margin-bottom: 60px;
  /* margin-top: 40px; */
  @media (max-width: 744px) {
    gap: 30px;
    padding: 5px;
  }
`;
const H1 = styled.h1`
  @media (max-width: 744px) {
    font-size: 10px;
  }
`;
const StepCard = styled.div`
  width: 20%;
  max-width: 300px;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  @media (max-width: 744px) {
    width: 50%;
    gap: 20px;
  }
`;

export const Steps = styled.img`
  width: 90px;
  height: 90px;
  @media (max-width: 744px) {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }
`;

const Bloc4 = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

const Box = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18%;
  text-align: center;
`;

const BoxNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  span {
    position: absolute;

    font-size: 35px;
    font-weight: 900;
    font-size: 42px;
  }
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  line-height: 30px;
  padding-top: 16px;

  align-items: center;
  justify-content: center;
`;
export const DIV = styled.div`
  font-weight: 400;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: none;
  gap: 10px;
  @media (max-width: 744px) {
    display: flex;
    font-size: 11px;
    padding-bottom: 40px;
  }
`;
export const PI = styled.p`
  color: var(--body-text-1, #aaa);
`;

const Btn = styled.div`
  padding-top: 10px;

  padding-bottom: 90px;
  @media (max-width: 744px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0px;
    padding-bottom: 40px;
  }
`;

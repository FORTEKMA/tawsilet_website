 
import { useEffect, lazy, useRef } from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets"; 
import AboutServices from "../../components/Section/AboutServices";
import service from "../../assets/images/service-cover.png";
import PreServices from "../../components/Section/PreService";
const ContentWhiteBox = lazy(() =>
  import("../../components/Section/ContentWhiteBox")
);
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));

import Footer from "../../components/Section/Footer";
 
 


import { useTranslation } from "react-i18next"; 
import SuiviLivraision from "../../components/Section/SuiviLivraision";
import ExelentService from "../../components/Section/ExelentService";
import { useNavigate } from "react-router"; 
const Services = () => {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Container_Home>
       

        <Sect>
        
           
           <img
                      
                      sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
                      src={service}
                      alt="about demenagement"
                      // width="1440"
                      // height="944"
                      loading="lazy"
                    />
         
          <ContactHero style={{ position: "absolute" }}>
         
            <SideTitle>{t("ABOUT.SERVICES-Tawsilet.Nos-Service.title2")}</SideTitle>
            <LastTitle>{t("ABOUT.SERVICES-Tawsilet.Nos-Service.desc")}</LastTitle>
            <BUT onClick={() => navigate("/")}>{t("Tawsilet-CONTACT.btn-obten")}</BUT>
            <Div data-aos="fade-up" data-aos-delay={800}></Div>
          </ContactHero>
        </Sect>
      
        <ContentWhiteBox>
          
          <HomeAbout />
        </ContentWhiteBox>


      
          <SuiviLivraision />
          <ExelentService />
     
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
  const BUT = styled.button`
    margin-top: 20px;
    width: 200px;
    height: 45px;
    border-radius: 7px;
    border: 1px solid #18365a;
    color: white;
    font-size: 15px;
    text-align: center;
    
    cursor: pointer;
   
    background-color: #d8b56c;
    box-shadow: 2px 2px 0px 0px #18365A;
  /* margin-right:45%; */
    @media (max-width: 1050px) {
      width: 200px;
      font-weight: 900;
      height: 55px;
      /* margin-right:0rem; */
    }
  `;
  const LastTitle = styled.h2`
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
  const SideTitle = styled.h1`
    font-family: "Inter", sans-serif;
        text-align: center;

    font-weight: 600;
    font-size: 50px;
    color: white;
    @media (max-width: 760px) {
      font-size: 28px;
    }
  `;
  const Title = styled.h1`
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
  const Image = styled.img``;
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
    color: #d8b56c;
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

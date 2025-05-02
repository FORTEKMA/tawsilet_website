import styled from "styled-components";
// import { Button } from "../Items/Button";
// import AboutImage from "../../assets/images/homesideone.png";
import CoutIcon from "../../assets/icons/Weight.svg";
// import dots from "../../assets/icons/Container (1).svg";
import DelaiIcon from "../../assets/icons/Delivery van.svg";
// import Send from "../../assets/icons/det.svg";
import DarkTypo from "../../constants/DarkTypo";
// import Oval from "./../../assets/images/Oval.png";
// import * as style from "../../constants/StyleSheets";
// import Buttondetails from "../Items/buttondetails";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import One from "../../assets/icons/onee.svg";
import Two from "../../assets/icons/twoo.svg";
import three from "../../assets/icons/threee.svg";
// import four from "../../assets/icons/four.svg";
// import i18n from "../../../src/i18n";
import { useTranslation } from "react-i18next";
import ImageSlider from "../Items/ImageSlider";
const HomeAbout = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <AboutSection>
      {/* ------------------------------------------------------------------- */}
      <Content data-aos="zoom-in" data-aos-delay={100}>
        {" "}
        <ImgService>
          {/* <img
            sizes="(max-width: 1400px) 100vw, 1400px" 
      //       srcSet={`
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_200.png 200w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_381.png 381w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_514.png 514w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_627.png 627w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_737.png 737w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_826.png 826w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_903.png 903w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_980.png 980w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1046.png 1046w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1118.png 1118w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1177.png 1177w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1247.png 1247w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1313.png 1313w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1374.png 1374w,
      //   assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1400.png 1400w
      // `}
          //   src="assets/images/homeabout-34b2cb83e13b55132905_h1vsdm_c_scale-w_1400.png"
          //   alt=""
          // />*/}

          {/* <img src={AboutImage} alt="about image" /> */}
          <ImageSlider />
        </ImgService>
        <ContentService dir="auto">
          <DarkTypo
            heading={t("ACCEUILE.APROPOSdeNous")}
            headingup={t("ACCEUILE.EFFICACITE")}
            description={t("ACCEUILE.descrip")}
          />{" "}
          {/*   <Btn  >
            <Buttondetails icon={Send} Textbody={t('ACCEUILE.btnSavoir')} />
          </Btn> */}
        </ContentService>{" "}
      </Content>
      {/* ------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------- */}
      <Bloc2 dir="auto">
        <Badge data-aos="zoom-in">
          <img src={CoutIcon} alt="Cout " className="img" />

          <Boxone>
            <Title>{t("ACCEUILE.Coût.title")}</Title>
            <Description_Box>{t("ACCEUILE.Coût.desc")}</Description_Box>
          </Boxone>
        </Badge>
        <Vr />
        <Badge data-aos="zoom-in">
          <img src={DelaiIcon} alt="Cout " className="img" />

          <Boxone>
            <Title>{t("ACCEUILE.Delai.title")}</Title>
            <Description_Box>{t("ACCEUILE.Delai.desc")}</Description_Box>
          </Boxone>
        </Badge>
      </Bloc2>
      {/* ------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------- */}{" "}
      <Middle>
        <Heading data-aos="zoom-in">{t("ACCEUILE.ÉTAPES.title1")}</Heading>
        <HeadingUp data-aos="zoom-in">{t("ACCEUILE.ÉTAPES.title2")}</HeadingUp>
        <Description data-aos="zoom-in">
          {t("ACCEUILE.ÉTAPES.desc")}
        </Description>

        <SECTION dir="auto">
          <StepCard data-aos="fade-left" data-aos-delay={200}>
            <Steps src={One} alt="one" />

            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap4.title")}</H1>

            <Step_decription>
              {t("ACCEUILE.ÉTAPES.QuatreEtaps.etap4.desc")}
            </Step_decription>
          </StepCard>
          <StepCard data-aos="fade-left" data-aos-delay={400}>
            <Steps src={Two} alt="two" />

            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap2.title")}</H1>
            <Step_decription>
              {t("ACCEUILE.ÉTAPES.QuatreEtaps.etap2.desc")}
            </Step_decription>
          </StepCard>
          {/* <Dots src={dots} alt="dots " className="img" />  */}
          <StepCard data-aos="fade-left" data-aos-delay={600}>
            <Steps src={three} alt="three" />

            <H1>{t("ACCEUILE.ÉTAPES.QuatreEtaps.etap3.title")}</H1>
            <Step_decription>
              {t("ACCEUILE.ÉTAPES.QuatreEtaps.etap3.desc")}
            </Step_decription>
          </StepCard>

          {/* <StepCard data-aos="fade-left" data-aos-delay={800}>
            <Steps src={four} />
            
            <Step_decription>
            {t("ACCEUILE.ÉTAPES.QuatreEtaps.etap4.desc")}
            </Step_decription>
          </StepCard> */}
        </SECTION>

        {/* <Details data-aos="zoom-in" data-aos-delay={800}>
          <Info> {t("ACCEUILE.ÉTAPES.QuatreEtaps.commentaire1")}</Info>
          <p>{t("ACCEUILE.ÉTAPES.QuatreEtaps.commentaire2")}</p>
        </Details> */}
      </Middle>
      {/* ------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------- */}
      {/* ------------------------------------------------------------------- */}
    </AboutSection>
  );
};

export default HomeAbout;

export const Step_decription = styled.p`
  font-family: "Inter", sans-serif;

  font-weight: 400;

  line-height: 1.875rem;
  letter-spacing: 0.01rem;
  text-align: center;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 1);
  @media (max-width: 744px) {
    font-size: 1rem;
    line-height: 1.6rem;
    width: 250px;
  }
`;

const H1 = styled.h1`
  font-size: 1.25rem;
  @media (max-width: 744px) {
    font-size: 15px;
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
    width: 100%;

    padding-top: 1rem;
  }
`;
export const Details = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  gap: 0.56rem;

  @media (max-width: 744px) {
  }
`;
export const Info = styled.p`
  color: var(--body-text-1, rgba(255, 255, 255, 1));
`;

export const Steps = styled.img`
  width: 90px;
  height: 90px;

  @media (max-width: 744px) {
    width: 75px;
    height: 75px;
  }
`;
export const SECTION = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6rem;

  @media (max-width: 744px) {
    gap: 4rem;
  }
`;
const AboutSection = styled.div`
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
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  /* padding-top: 5rem; */
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  position: "absolute";
  text-align: "center";

  @media (max-width: 1000px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
`;
const ImgService = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  height: auto;
  border-radius: 32px;
  /* img {
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
  }
  @media (max-width: 744px) {
    img {
      margin-top: 50px;
      width: 85vw;
    }
  } */
  @media (max-width: 744px) {
    width: 90%;
    /* justify-content: flex-start; */
  }
`;
const Btn = styled.div`
  width: 40%;
  @media (max-width: 744px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0px;
    padding-bottom: 40px;
    width: 100%;
  }
`;
const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  gap: 2rem;

  border-radius: 32px;
  @media (max-width: 1000px) {
    width: 80%;

    text-align: center;
  }
`;

const Bloc2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  padding-bottom: 5rem;
  @media (max-width: 894px) {
    flex-direction: column;
    gap: 4rem;
    padding-bottom: 0rem;
  }
  @media (max-width: 744px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const Badge = styled.section`
  width: 33%;
  max-width: 500px;
  min-width: 350px;
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 744px) {
    display: block;
    width: 90%;
    box-shadow: 0px 0px 28.46px 0px #00000014;
    padding: 30px;

    height: 190px;

    border-left: 3px solid #fd5523;
  }
  .img {
    width: 45px;
    height: auto;
    object-fit: contain;
    @media (max-width: 744px) {
      padding-right: 10px;
      width: 6cap !important;
      object-fit: contain;
      border-right: 1px solid #e4e4e4;
    }
  }
`;
const Boxone = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    /* padding-inline: 30px; */
  }
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  padding-top: 16px;
  color: rgba(6, 46, 57, 1);

  display: flex;
  @media (max-width: 744px) {
    font-size: 18px;
    justify-content: start;
    display: flex;
    align-self: center;
    margin-top: -54px;
    padding-left: 10px;
  }
`;
export const Description_Box = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: rgba(86, 89, 105, 1);
  line-height: 30px;

  @media (max-width: 744px) {
    /* text-align: center; */
    font-size: 1rem;
    line-height: 1.875rem;
    margin-top: 30px;
  }
`;
const Vr = styled.div`
  border-right: 1px solid #aaaaaa;
  height: 100px;
  @media (max-width: 894px) {
    border: 1px solid #aaa;
    height: 1px;
    width: 140px;

    justify-content: center;
    display: flex;
    align-self: center;
  }
  @media (max-width: 744px) {
    /* border: 1px solid #aaa;
    height: 1px;
    width: 140px;

    justify-content: center;
    display: flex;
    align-self: center; */
    display: none;
  }
`;
const Ver = styled.div`
  visibility: hidden;

  @media (max-width: 744px) {
    visibility: visible;
    border-right: 1px solid #aaa;
    height: 60px;
    width: 40px;
    margin-left: -20px;

    display: flex;

    /* display: none */
  }
`;
const Dots = styled.img`
  @media (max-width: 744px) {
    background-color: red;
    display: flex;
    width: 132px;
    height: Hug (174px) px;
    top: 432px;
    left: 533px;
    gap: 0px;
    opacity: 20px;

    /* display: none */
  }
`;
const DIV = styled.div`
  visibility: hidden;

  @media (max-width: 744px) {
    visibility: visible;

    display: flex;

    /* display: none */
  }
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3.19rem;
  padding-bottom: 3.19rem;
  background-color: rgba(24, 54, 90, 1);
  gap: 1rem;
  border-radius: 20px;

  @media (max-width: 744px) {
    padding-left: 5px;
    padding-right: 5px;
    //  padding-top: 0rem;
    width: 100vw;
    border-radius: 0px;
  }
`;

export const HeadingUp = styled.div`
  font-weight: 900;
  font-size: 45px;

  color: #ffffff;

  @media (max-width: 744px) {
    font-size: 20px;
    text-align: center;
  }
`;
export const Heading = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 155.56%;

  color: #ffffff;
  padding-left: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  @media (max-width: 744px) {
    font-size: 14px;
  }
`;

export const Description = styled.div`
  font-weight: 300;
  font-size: 16px;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;

  width: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 744px) {
    text-align: center;
    line-height: 1.875rem;
    width: 100%;
  }
`;

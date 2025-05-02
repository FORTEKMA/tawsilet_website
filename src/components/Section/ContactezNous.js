import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import Send from "../../assets/icons/det.svg";
import LittleMap from "./LittleMap";
import map from "../../assets/images/Mapsicle Map.png";
import LightTypo from "../../constants/LightTypo";
// import Buttondetails from "../Items/buttondetails";
import phone from "../../assets/icons/mobile.svg";
import message from "../../assets/icons/emaiil.svg";
import loca from "../../assets/icons/addresss.svg";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const ContactezNous = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const { t, i18n } = useTranslation();

  return (
    <>
      <Content data-aos="zoom-in" data-aos-delay={300} dir="auto">
        <ContentService>
          <LightTypo
            heading={t("ACCEUILE.CONTACT.title1")}
            headingup={t("ACCEUILE.CONTACT.title2")}
            description={t("ACCEUILE.CONTACT.desc")}
          />
          <br></br>
          <Lineone dir="auto" isRtl={i18n.language.startsWith("ar")}>
            <img src={phone} className="icon-cercle" alt="phone" />
            <Description>{t("ACCEUILE.CONTACT.Adresse.addresses")}</Description>
          </Lineone>
          <Lineone dir="auto" isRtl={i18n.language.startsWith("ar")}>
            <img src={loca} className="icon-cercle" alt="local" />
            <Description >
              
              +216 36 848 020
            </Description>
          </Lineone>
          <Lineone >
            <img src={message} className="icon-cercle" alt="message" />
            <Description >
              contact@sheelni.com
            </Description>
          </Lineone>
        </ContentService>
        <ImgService data-aos="zoom-in">
          {/* <img src={map} alt="map" /> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.1234567890123!2d10.2755011!3d36.8447062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4b8f277e71fd%3A0x1ee2bbf8f07df9ef!2sR%C3%A9sidence%20Yasmine%20du%20Lac!5e0!3m2!1sen!2stn!4v1727108333020!5m2!1sen!2stn"
            width="400px"
            height="400px"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </ImgService>
      </Content>
    </>
  );
};
export default ContactezNous;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 744px) {
    flex-direction: column;
    gap: 30px;
  }
`;
const Lineone = styled.div`
  display: flex;

  direction: ltr;

  text-align: ${({ isRtl }) => (isRtl ? "right" : "left")};
  flex-direction: row;
  @media (max-width: 744px) {
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  border-radius: 32px;
  @media (max-width: 744px) {
    width: 80%;
  }
  .icon-cercle {
    width: 40px;
    /* margin: 10px; */
    object-fit: contain;
  }
`;
const ImgService = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 32px;

  @media (max-width: 744px) {
    flex-direction: column-reverse;
    width: 60%;
    /* display: none; */
    height: 100%;
    justify-content: start;
    text-align: start;
    iframe {
      width: 290px;
      height: 290px;
      margin-left: -30px;
    }
  }
`;
const Description = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 1rem;


  color: rgba(24, 54, 90, 1);
  line-height: 30px;
  padding: 10px;
  @media (max-width: 744px) {
    line-height: 10px;
    font-size: 0.6875rem;
  }
`;

import styled from "styled-components";
import React, { useEffect } from "react";
// import * as style from "../../constants/StyleSheets";

import Side from "../../assets/images/homesidetwo.png";
// import Buttondetails from "../Items/buttondetails";

// import Send from "../../assets/icons/det.svg";
import LightTypo from "../../constants/LightTypo";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
const SuiviLivraision = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const { t, i18n } = useTranslation();
  return (
    <Content dir="auto">
      {" "}
      <ImgService data-aos="fade-right" data-aos-delay={400}>
        {/* <img
          sizes="(max-width: 1400px) 100vw, 1400px"
          srcSet={`
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_200.png 200w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_392.png 392w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_532.png 532w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_653.png 653w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_767.png 767w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_866.png 866w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_956.png 956w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1022.png 1022w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1114.png 1114w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1173.png 1173w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1232.png 1232w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1313.png 1313w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1364.png 1364w,
            assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1400.png 1400w
          `}
          src="assets/images/pic-f60f329ef5cfb67be2c6_mdhnmo_c_scale-w_1400.png"
          alt="LivraisonPic"
        /> */}
        <img src={Side} alt="Livraison" />
      </ImgService>
      <ContentService data-aos="zoom-in-up" data-aos-delay={200}>
        <LightTypo
          heading={t("ACCEUILE.PRESTATION-SERVICE-1.title1")}
          headingup={t("ACCEUILE.PRESTATION-SERVICE-1.title2")}
          description={t("ACCEUILE.PRESTATION-SERVICE-1.desc")}
        />
        
      </ContentService>{" "}
      
    </Content>
  );
};

export default SuiviLivraision;
const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 32px;
  padding: 0% 8%;
  gap: 2%;
  @media (max-width: 744px) {
    flex-direction: column;
    padding: 0;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;
const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;

  border-radius: 32px;
  @media (max-width: 744px) {
    width: 80%;

    text-align: justify;
  }
`;
const Btn = styled.div`
  width: 40%;
  @media (max-width: 744px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 0px;
    padding-bottom: 40px;
  }
`;

const ImgService = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  /* background-color: red; */
  border-radius: 32px;
  img {
    max-width: 500px;
    width: 100%;
    @media (max-width: 744px) {
      width: 300px;
      height: 300px;
      margin-bottom: 40px;
    }
  }
`;

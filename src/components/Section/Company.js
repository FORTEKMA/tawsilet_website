import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import React from "react";
import Side from "../../assets/images/serious-mature-asian-woman-showing-place-sofa-movers-living-room-while-moving-new-house.png";
import { useTranslation } from "react-i18next";
import LightTypo from "../../constants/LightTypo";
import AOS from "aos";
import "aos/dist/aos.css";
const Company = () => {
  const { t, i18n } = useTranslation();
  return (
    // <Container dir="auto">
    //   <Comp>
    //     <Image>
    //     <IMG src={Side} alt="side"></IMG></Image>
    //     <div className="paragraphe-service">
    //       <Hedear> {t("ABOUT.NOTRE-COMPARE.title1")}</Hedear>
    //       <Title>{t("ABOUT.NOTRE-COMPARE.title2")}</Title>

    //       <Descrip>{t("ABOUT.NOTRE-COMPARE.desc")}</Descrip>
    //     </div>
    //   </Comp>
    // </Container>
   
    <Content dir="auto">
    {" "}
    <ImgService data-aos="fade-right" data-aos-delay={400}>
      
      <img src={Side} alt="Livraison" />
    </ImgService>
    <ContentService data-aos="zoom-in-up" data-aos-delay={200}>
      <LightTypo
        heading={t("ABOUT.NOTRE-COMPARE.title1")}
        headingup={t("ABOUT.NOTRE-COMPARE.title2")}
        description={t("ABOUT.NOTRE-COMPARE.desc")}
      />
      
    </ContentService>{" "}
    
  </Content>
 
  );
};

export default Company;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 32px;
  padding: 0% 8%;
  gap: 2%;
  @media (max-width: 1000px) {
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
  @media (max-width: 1000px) {
    width: 80%;
margin-top:2rem;
    text-align: justify;
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
      width: 500px;
      height: 300px;
      margin-bottom: 40px;
    }
  }
`;
// export const Image = styled.div`
//   width: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 30px;
//   @media (max-width: 744px) {
//     width: 100%;
//   }
// `;
// export const IMG = styled.img`
//   width: 400px;
//   @media (max-width: 744px) {
//     width: 300px;
//   }
// `;
// export const Comp = styled.section`
//   width: 100%;
//   display: flex;
//   gap: 1%;
//   align-items: flex-start;
//   @media (max-width: 744px) {
//     display: flex;
//     flex-direction: column-reverse;
//   }
//   .paragraphe-service {
//     display: flex;
//     flex-direction: column;
//     padding: 50px 50px 50px 0px;
//     gap: 20px;
//     height: 100%;
//     width: 50%;
//     align-self: flex-start;
//     @media (max-width: 360px) and (min-width: 200px) {
//       padding: 30px 10px;
//       text-align: center;
//     }
//     @media (max-width: 730px) and (min-width: 360px) {
//       padding: 30px 10px;
//       text-align: center;
//     }
//   }
// `;
// export const Container = styled.section`
//   background-color: white;
//   width: 96%;
//   /* height:100%;  */
//   border-radius: 32px;

//   text-align: "center";
//   margin-left: 20px;
//   padding: 20px;
//   @media (max-width: 744px) {
//     margin: 0 auto;
//     padding: 10px;
//   }
// `;

// export const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-weight: 800;
//   font-style: normal;
//   width: 100%;
//   /* margin-top: 40px; */

//   font-size: 30px;
//   color: #020111;
//   text-align: auto;
//   @media (max-width: 744px) {
//     font-size: 20px;
//     font-weight: 900;
//     text-align: center;
//     line-height: 30px;
//     margin-top: 0;
//   }
// `;

// export const Hedear = styled.p`
//   /* margin-top: 80px; */
//   font-family: "Inter", sans-serif;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 16px;
//   line-height: 30px;
//   text-align: justify;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: #020111;

//   @media (max-width: 744px) {
//     margin-top: 0;
//     font-size: 16px;
//     justify-content: center;
//     display: flex;
//   }
// `;

// export const Descrip = styled.p`
//   margin-top: 40px;
//   font-family: "Inter", sans-serif;
//   font-style: normal;
//   font-weight: 300;
//   font-size: 1rem;
//   line-height: 30px;
//   letter-spacing: 0.01em;
//   text-align: justify;
//   color: #666666;
//   width: 100%;

//   @media (max-width: 744px) {
//     font-size: 14px;
//     text-align: justify;

//     width: 100%;
//     line-height: 25px;
//     margin-top: 0;
//   }
// `;


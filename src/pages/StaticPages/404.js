import Arrow from "./../../assets/icons/arrowdown.svg";
import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Buttonobtenez from "../../components/Items/buttonobtenez";
import LightTypo from "../../constants/LightTypo";
import error from "./../../assets/images/404.svg"
import Footer from "../../components/Section/Footer";
// import { Helmet } from "react-helmet-async";
// import DefaultHelmet from "./DefaultHelmet";
 import { useTranslation } from "react-i18next";
 
 const NotFound = () => {
  const { t, i18n } = useTranslation();
  return (
  <>
 


  <Content>
     
    {/* <DefaultHelmet /> */}
    <ContentService>
    <Heading>
      <p>404</p>
      </Heading>
      <LightTypo
           headingup={t("NotFound.title")}
        description={t("NotFound.description")}
      />
      <BUT>
      {t("NotFound.button")}
      </BUT>
    </ContentService>
    <IMAGE>
    <img src={error} alt="erro"></img>
    </IMAGE>
  </Content>
  <Footer/>
</>)
};

export default NotFound;

export const BUT = styled.button`
margin-top: 20px;
  width: 250px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: white;
  font-size: 15px;
  text-align: center;
  
  cursor: pointer;
 
  background-color: #d8b56c;
  box-shadow: 2px 2px 0px 0px #18365A;
margin-right:45%;
  @media (max-width: 1050px) {
    width: 250px;
    font-weight: 900;
    height: 55px;
    margin-right:0rem;
  }
`;
export const Heading = styled.div`
/* margin-right: 490px; */
margin-right: 30rem;
@media (max-width: 806px) {
  display: none;
  }
  p{  
   
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 16px;
  padding-top: 16px;
  color: #d8b56c;
 }
`;
const Content = styled.section`
  display: flex;
flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0c0c0c;
  text-align: center;
  padding-left: 100px;
  padding-right: 100px;
  width: 100vw;
  margin-left: 30px;
 
  height: 100vh;
  @media (min-width: 745px) and (max-width: 941px) {
  
  }
  @media (max-width: 806px) {
   flex-direction: column;
   padding: 30px;
   margin-top: 50px;
   margin-left: 0px;
   margin-bottom: 100px;
   gap:50px
  }
`;

const ContentService = styled.div`
margin-top: 50px;

  display: flex;

  flex-direction: column;
  justify-content: center;
  border-radius: 32px;
  text-align: start;
  align-items: center;
  width: 50%;
  @media (max-width: 806px) {
    margin-top: 100px;
    width:90%;
    text-align: center;
  }
`;
const IMAGE = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 50%;
  img{
    width:400px;
    height: 400px;
    @media (min-width: 806px) and (max-width: 941px) {
      width:240px;
      height: 240px;
  }
  @media (min-width: 360px) and (max-width: 807px) {
    margin-bottom:100px;
      width:320px;
      height: 320px;
  }
  }
`;


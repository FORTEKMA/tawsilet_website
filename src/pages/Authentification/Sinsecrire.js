import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";

import logo from "../../assets/icons/logoo.svg";
// import { Button, TextField } from "@mui/material";
// import StyledInput from "../../components/Section/StyledInput";
// import Inpuut from "../../components/Items/Inpuut";
import FormInput from "../../components/Items/FormInput";
import { Link, useNavigate } from "react-router-dom";
import homeIcon from "../../assets/icons/homeicon.svg";

// import { useForm } from "react-hook-form";

// import faaceb from "../../assets/icons/facebookAuth.svg";
// import gooogle from "../../assets/icons/googleAuth.svg";
// import aapple from "../../assets/icons/appleAuth.svg";
// import faceb from "../../assets/icons/facebookAuth.svg";
// import google from "../../assets/icons/googleAuth.svg";
// import apple from "../../assets/icons/appleAuth.svg";
// import log from "../../assets/icons/Component 43 (1).png";
import { useTranslation } from "react-i18next";
import StyledImage from "../../components/Items/StyledImage";
import BlueSide from "../../components/Items/BlueSide";
import { useMediaQuery } from "react-responsive";
// import { Helmet } from "react-helmet-async";
const Sinsecrire = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const isResponsive = useMediaQuery({ maxWidth: 1150 });

  const navigate = useNavigate();
  return (
    <>
   
      <Card dir="auto" right={i18n.language === "ar-AR"}>
        {/* <HomeIcon src={homeIcon} onClick={() => navigate("/")} alt="home" /> */}

        <White>
          {/* <StyledLink to={"/"}>
          <LO src={log}></LO>
        </StyledLink>
        <Link to={"/"}>
          <IMG src={logo}></IMG>
        </Link> */}

          <LogoSection>
          
            <Link to="/">
              <StyledImage />
            </Link>
            <p onClick={() => navigate("/")}>x</p>
            {/* </div> */}
          </LogoSection>

          <UpperSection>
            <h1>{t("SINSCRIRE.Inscrire")} </h1>
          </UpperSection>
          {/* <H1>{t("SINSCRIRE.Inscrire")} </H1> */}

          <FormInput setLoading={setLoading} />
          {/* <PX>
          <LineWaz /> {t("SINSCRIRE.px")} <LineWaz />{" "}
        </PX> */}
          {/* <Foote>
          <IM src={google} />
          <IM src={faceb} />
          <IM src={apple} />
        </Foote>

        <Foote>
          <IMA src={gooogle} />
          <IMA src={faaceb} />
          <IMA src={aapple} />
        </Foote> */}
        </White>

        {/* <Blue>
          <Titlee>{t("SINSCRIRE.Titlee")}</Titlee>
          <Para>{t("SINSCRIRE.para")}</Para>
          <Link to="/SidentifierClient">
            <Sidentifbut>{t("SINSCRIRE.sidentifier")}</Sidentifbut>
          </Link>
        </Blue> */}
        {!isResponsive && <BlueSide />}
      </Card>
    </>
  );
};

export default Sinsecrire;

const HomeIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 50px;
  width: 35px;
  cursor: pointer;
  @media (max-width: 1050px) {
    display: none;
  }
`;

export const PX = styled.p`
  display: none;
  @media (max-width: 1050px) {
    color: white;
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    font-size: 15px;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const LineWaz = styled.div`
  width: 10%;
  border: 1px solid white;
`;

export const IMA = styled.img`
  display: none;
  @media (max-width: 1050px) {
    display: block;
    width: 100px;
  }
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  align-self: flex-end;
  margin-right: 10px;
  border-radius: 20px;
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   top: 10px;
  // }
`;

export const UpperSection = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  h1 {
    color: #07122f;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.72px;
    margin-top: 30px;
  }
  @media (max-width: 1050px) {
    margin-bottom: 5vh;
    margin-top: -10px;
    h1 {
      font-size: 24px;
    }
  }
  @media (max-width: 1050px) {
    h1 {
      font-size: 24px;
      color: white;
    }
  }
`;

export const LogoSection = styled.div`
  width: 90%;
  position: absolute;
  top: 40px;
  left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;
  .logo_partner_wrapper {
    cursor: pointer;
    position: absolute;
    top: 20px;
    left: 20px;
    @media (max-width: 1050px) {
      left: 0px;
      top: unset;
    }
  }
  @media (max-width: 1050px) {
    position: absolute;
    left: 0px;
    top: 0px;
    margin: 30px 15px;
    img {
      filter: brightness(0) saturate(100%) invert(63%) sepia(60%)
        saturate(4043%) hue-rotate(349deg) brightness(98%) contrast(94%);
    }
    p {
      display: block !important;
      color: white;
      font-size: 32px;
      padding: 4px;
    }
  }
  p {
    display: none;
    cursor: pointer;
  }
  img {
    cursor: pointer;
  }
`;

export const LO = styled.img`
  /* display: none; */

  @media (max-width: 1050px) {
    display: block;
    align-self: flex-end;
    margin-right: 10px;
    border-radius: 20px;
    width: 40px;
    height: 40px;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   display: block;
  //   margin-top: 50%;
  //   align-self: flex-end;
  //   margin-right: 10px;
  //   border-radius: 20px;
  //   width: 40px;
  //   height: 40px;
  // }
`;
export const Sidentifbut = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: #18365a;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  @media (max-width: 1050px) {
    width: 250px;
    font-weight: 900;
    height: 55px;
  }
`;
export const Buttonn = styled.button`
  width: 70%;

  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 10px;
  @media (max-width: 1050px) {
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 340px;
    margin-bottom: 16px;
  }
`;
export const Card = styled.section`
  background-color: #18365a;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  @media (max-width: 1050px) {
    flex-direction: column;
    background-color: #18365a;
    height: unset;
    gap: 20px;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   min-height: fit-content;
  // }
`;

export const White = styled.section`
  width: 50%;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 1050px) {
    background-color: #18365a;
    color: white;
    width: 100%;
    height: fit-content;
    min-height: 100vh;
    padding-top: 30px;
    gap: 10px;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   overflow: scroll;
  //   top: 0px;
  //   height: fit-content;
  // }
`;

export const Blue = styled.section`
  width: 50%;
  height: 100%;
  background-color: #18365a;
  /* border-radius: 24px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px;
  padding: 20px;
  @media (max-width: 1050px) {
    width: 100%;
    padding-inline: 10px;
    height: inherit;
    gap: 16px;
    margin-top: 0px;
    padding: 0px;
    padding-bottom: 100px;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   overflow: scroll;
  //   top: 850px;
  //   height: fit-content;
  //   padding-bottom: 5%;
  // }
`;
export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  margin-right: 268px;
  margin-bottom: 20px;
  margin-top: -20px;
  @media (max-width: 1050px) {
    color: white;
    align-self: start;
    margin-left: 30px;
  }
`;
export const PA = styled.p`
  font-family: "Inter", sans-serif;
  color: #8d93a1;
  text-align: center;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 1050px) {
    color: white;
    width: 100%;
    margin-bottom: 10px;
  }
`;
export const H1 = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #07122f;
  margin-bottom: 20px;
  @media (max-width: 1050px) {
    color: white;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 1px;
  }
`;

export const IMG = styled.img`
  align-self: flex-start;
  width: 110px;
  height: 23px;
  position: absolute;
  top: 20px;
  left: 20px;
  @media (max-width: 1050px) {
    display: none;
  }
`;
export const Inputs = styled.section`
  margin: 40px;
`;

export const Foote = styled.section`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @media (max-width: 1050px) {
    gap: 10px;
    margin: 0px;
  }
`;
export const IM = styled.img`
  width: 30%;

  @media (max-width: 1050px) {
    display: none;
  }
`;
export const Titlee = styled.h1`
  color: #fff;
  font-size: 32px;
  /* margin-top: 120px; */
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.64px;
  font-family: "Inter", sans-serif;
  @media (max-width: 1050px) {
    margin-top: 0px;
    font-size: 24px;
    text-align: center;
  }
`;

export const Para = styled.p`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 300;
  line-height: 200%;
  letter-spacing: 0.32px;
  width: 400px;
  margin-bottom: 30px;
  @media (max-width: 1050px) {
    font-size: 12px;
    padding: 4px 20px;
    margin-bottom: 8px;
  }
`;

export const INP = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
  outline: none;
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  transition: border-color 0.3s;
`;

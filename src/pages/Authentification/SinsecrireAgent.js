import React from "react";
import styled from "styled-components";
 
 
import FormInputAgent from "../../components/Items/FormInputAgent";
import { Link, useNavigate } from "react-router-dom";
 
import { useTranslation } from "react-i18next";
 import { useMediaQuery } from "react-responsive";
 const SinsecrireAgent = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <Container>
    
      <h1
        className="top-title"
        style={{
          width: "500px",
          textAlign: "center",
          fontSize: "24px",
          marginTop: "120px",
          color:"#0c0c0c"
        }}
      >
        {t("SINSCRIREpartenaire.FormInput.organisre")}
      </h1>
      <FormInputAgent setLoading={setLoading} />
    </Container>
  );
};

export default SinsecrireAgent;

export const BlueContainer = styled.div`
  width: 50%;
  @media (max-width: 1050px) {
    margin-top: -30px;
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
export const UpperSection = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  h1 {
    color: #07122f;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.72px;
  }
  @media (max-width: 1050px) {
    margin-bottom: 8vh;
    margin-top: 40px;
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
export const Div = styled.div`
  display: flex;
  width: 438px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const PX = styled.p`
  display: none;
  @media (max-width: 1050px) {
    color: white;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: row;
  }
`;

const LineWaz = styled.div`
  width: 8%;
  border: 1px solid white;
`;

export const IMA = styled.img`
  display: none;
  width: 80%;
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
`;
export const LO = styled.img`
  display: none;

  @media (max-width: 1050px) {
    display: block;

    align-self: flex-end;
    margin-right: 10px;
    border-radius: 20px;
    width: 40px;
    height: 40px;
  }
`;
export const Sidentifbut = styled.button`
  cursor: pointer;
  width: 150px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: #18365a;
  font-size: 16px;
  background-color: white;

  @media (max-width: 1050px) {
    width: 250px;
    font-weight: 900;
    height: 55px;
  }
`;
export const Buttonn = styled.button`
  width: 70%;
  cursor: pointer;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #d8b56c;
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
  background-color: #f7f7f7;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export const White = styled.section`
  width: 100%;
  min-height: 100vh;
  padding-top: 50px;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  /* gap: 1.7rem; */
  @media (max-width: 1050px) {
    background-color: #18365a;
    color: white;
    width: 100%;
    height: unset;
    padding-top: 0px;
    gap: 10px;
    /* padding-bottom: 100px; */
    .top-title {
      margin-top: 100px;
    }
  }
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
    /* padding-inline: 10px; */
    height: unset;
    gap: 20px;
    margin: 30px;
    margin-top: 0px;
    padding: 0px 10px 100px;
  }
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

  @media (max-width: 1050px) {
    display: none;
  }
`;
export const Inputs = styled.section`
  margin: 40px;
`;

export const Foote = styled.section`
  margin: 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 37px;
  @media (max-width: 1050px) {
    gap: 10px;
    margin: 0px;
  }
`;
export const IM = styled.img`
  width: 120px;
  @media (max-width: 1050px) {
    display: none;
  }
`;
export const Titlee = styled.h1`
  color: #fff;
  font-size: 32px;

  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.64px;
  font-family: "Inter", sans-serif;
  @media (max-width: 1050px) {
    margin-top: 0px;
    font-size: 22px;
  }
`;

export const Para = styled.p`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  line-height: 200%;
  letter-spacing: 0.32px;
  width: 400px;
  margin-bottom: 30px;
  @media (max-width: 1050px) {
    width: 350px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

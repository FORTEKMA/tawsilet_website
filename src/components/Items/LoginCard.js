import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import user from "../../assets/icons/user.png";
import { Button } from "@mui/material";
import vector from "../../assets/icons/Vector.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginCard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LoginHeader right={i18n.language === "ar-AR"}>
        <h1 right={true} className="left-header">
          {t("LoginCard.LoginHeader.connecter")}{" "}
          {t("LoginCard.LoginHeader.comptermination")}
        </h1>{" "}
      </LoginHeader>
      <LoginInputsWrapper>
        <LoginSection>
          <div className="auth__icon">
            <img src={user} alt="user avatar" />
          </div>
          <h3>{t("LoginCard.LoginSection.client")}</h3>
          <h3>{t("LoginCard.RegisterSection.entreprise")}</h3>
          <BlueBtn onClick={() => navigate("/SidentifierClient")}>
            {t("LoginCard.LoginSection.Connexion")}
          </BlueBtn>
          <p> {t("LoginCard.LoginSection.devenir-client")}</p>
          <WhiteBtn onClick={() => navigate("/SinsecrireClient")}>
            {t("LoginCard.LoginSection.SINSCRIRE")}
          </WhiteBtn>
        </LoginSection>
        {/* <RegisterSection>
          {" "}
          <div className="auth__icon">
            <img src={vector} alt="" />
          </div>
          
          <WhiteBtn onClick={() => navigate("/SidentifierAgent")}>
          {t("LoginCard.RegisterSection.Connexion")}
          </WhiteBtn>
          <p>{t("LoginCard.RegisterSection.devenir-entreprise")}</p>
          <BlueBtn onClick={() => navigate("/SinsecrireAgent")}>
          {t("LoginCard.RegisterSection.SINSCRIRE")}
          </BlueBtn>
        </RegisterSection> */}
      </LoginInputsWrapper>
    </Wrapper>
  );
};

export default LoginCard;
export const Wrapper = styled.div`
  width: 100%;
  height: 65vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LoginHeader = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .left-header {
    width: 50%;
    background-color: transparent;
    color: #18365a;
    text-align: ${(props) => (props.right ? "left" : "right")};
    padding: 1%;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 54px */
    letter-spacing: 0.72px;
  }
  .right-header {
    width: 50%;
    background-color: transparent;
    color: white;
    padding: 1%;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 54px */
    letter-spacing: 0.72px;
  }
`;
export const LoginInputsWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  overflow: hidden;
  .auth__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const LoginSection = styled.div`
  width: 50%;
  height: 100%;
  background-color: White;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4%;
`;
export const RegisterSection = styled.div`
  width: 50%;
  height: 100%;
  background-color: #18365a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 4%;
`;
export const WhiteBtn = styled.button`
  border: 1px solid#18365a;
  outline: none;
  border-radius: 12px;
  background-color: white;
  padding: 12px 51.92px 12px 53.08px;
  color: #18365a;
  width: 60%;
  cursor: pointer;
  text-transform: uppercase;
  &:active {
    transform: scale(0.9);
  }
`;
export const BlueBtn = styled.button`
  text-transform: uppercase;
  border: 1px white solid;
  outline: none;
  border-radius: 12px;
  background-color: #18365a;
  padding: 12px 51.92px 12px 53.08px;
  color: white;
  width: 60%;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

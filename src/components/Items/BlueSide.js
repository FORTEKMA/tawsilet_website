import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlueSide = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1050);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Blue>
      <Titlee>{!isMobile && t("SINSCRIRE.Titlee")}</Titlee>
      <FlexContainer>
        {isMobile && (
          <LinkStyled to="/SidentifierClient">
            {t("SINSCRIRE.sidentifier")}
          </LinkStyled>
        )}
        <Para>{isMobile ? t("SINSCRIRE.paragf") : t("SINSCRIRE.para")}</Para>
      </FlexContainer>
      {!isMobile && (
        <Link to="/SidentifierClient">
          <Sidentifbut>{t("SINSCRIRE.sidentifier")}</Sidentifbut>
        </Link>
      )}
    </Blue>
  );
};

export default BlueSide;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1050px) {
    flex-direction: row;
    width: 340px;
    gap: -10px;
  }
`;

export const LinkStyled = styled(Link)`
  @media (max-width: 1050px) {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    margin-left: 12px;
    color: #18365a;
    background-color: white;
    padding: 12px 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    border-radius: 6px;
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
    /* padding: 4px 20px; */
    margin-bottom: 3px;
    width: 100%;
    line-height: 1.4em;
  }
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
    border: none;
    color: #f37a1d;
    font-size: 16px;
    background-color: transparent;
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

export const Blue = styled.section`
  /* width: 50%; */
  height: 100%;
  background-color: #18365a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px;
  margin-left: 100px;
  padding: 20px;
  @media (max-width: 1050px) {
    width: 100%;
    padding-inline: 10px;
    height: inherit;
    margin-top: 0px;
    padding: 0px;
    margin: 0px;
    justify-content: flex-start;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   overflow: scroll;
  //   top: 850px;
  //   height: fit-content;
  //   padding-bottom: 5%;
  // }
`;

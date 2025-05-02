import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";

// import logo from "../../assets/icons/Group.png";
import { Butto, Button } from "@mui/material";
import faceb from "../../assets/icons/facebookAuth.svg";
import google from "../../assets/icons/googleAuth.svg";
import apple from "../../assets/icons/appleAuth.svg";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.service";
import faaceb from "../../assets/icons/facebookAuth.svg";
import gooogle from "../../assets/icons/googleAuth.svg";
import aapple from "../../assets/icons/appleAuth.svg";
import log from "../../assets/icons/Component 43 (1).png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice/userSlice";
import Loader from "../../components/Items/Loader";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { useTranslation } from "react-i18next";

const Sindentifier = ({ setLoading, ping, setPing }) => {
  const { t, i18n } = useTranslation();

  const auth = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.user.isLoading);
  const actionStatus = useSelector((state) => state.user.status);
  // console.log(actionStatus);
  const [status, setStatus] = useState(null);
  const [isLoading, setisLoading] = useState(loadingStatus);
  const handleLogin = async (data) => {
    try {
      await dispatch(loginUser(data)).then(setStatus(actionStatus));

      if (auth) {
        window.location.replace("/clientprofile/details"); // Replace the login path with the new URL
      } else {
        return false;
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  useEffect(() => {
    setisLoading(loadingStatus);
    if (auth) {
      window.location.replace("/clientprofile/details");
    }
  }, [loadingStatus, dispatch, status]);

  return isLoading ? (
    <Loader />
  ) : (
    <Card dir="auto" right={i18n.language === "ar-AR"}>
      <White
        onSubmit={handleSubmit((data) => {
          // console.log(data);
          handleLogin(data);
        })}
      >
        <Link to={"/"}>
          <LO src={log} alt="logosheelni"></LO>
        </Link>
        <Link to={"/"}>
     
        </Link>

        <H1>{t("SIDENTIFIER.Identifier")} </H1>

        <Container>
          <Input
            type="text"
            placeholder={t("SIDENTIFIER.FormInput.email")}
            {...register("identifier", {
              required: t("SIDENTIFIER.validation.email"),
            })}
          />
          {errors.identifier && (
            <ErrorMessage>{errors.identifier.message}</ErrorMessage>
          )}
          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SIDENTIFIER.FormInput.email")}</Label>
          ) : (
            <Label right={false}>{t("SIDENTIFIER.FormInput.email")}</Label>
          )}
        </Container>
        <Container>
          <Input
            type="password"
            placeholder={t("SIDENTIFIER.FormInput.pswd")}
            {...register("password", {
              required: t("SIDENTIFIER.validation.pswd"),
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SIDENTIFIER.FormInput.pswd")}</Label>
          ) : (
            <Label right={false}>{t("SIDENTIFIER.FormInput.pswd")}</Label>
          )}
          {status === "fail" && (
            <ErrorMessage>{t("SIDENTIFIER.FormInput.errmsg")}</ErrorMessage>
          )}
        </Container>

        <Pi>{t("SIDENTIFIER.FormInput.confpswd")}</Pi>
        <Buttonn type="submit" onClick={(e) => e.preventDefault()}>
          {" "}
          {t("SIDENTIFIER.CONNEXION")}{" "}
        </Buttonn>
        <PA>
          <LineWaz />
          {t("SIDENTIFIER.HR")} <LineWaz />
        </PA>
        <Foote>
          <IM src={google} />
          <IM src={faceb} />
          <IM src={apple} />
        </Foote>

        <Foote>
          <IMA src={gooogle} />
          <IMA src={faaceb} />
          <IMA src={aapple} />
        </Foote>
      </White>

      <Blue>
        <Titlee>{t("SIDENTIFIER.Titlee")}</Titlee>
        <Para>{t("SIDENTIFIER.para")}</Para>
        <Link to="/Sidentifierpartenaire">
          <Sidentifbut>{t("SIDENTIFIER.sidentifier")}</Sidentifbut>
        </Link>
      </Blue>
    </Card>
  );
};

export default Sindentifier;

export const LO = styled.img`
  display: none;

  @media (max-width: 744px) {
    display: block;

    align-self: flex-end;
    margin-right: 10px;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    margin-left: 263px;
  }
`;
export const Sidentifbut = styled.button`
  width: 200px;
  height: 45px;
  border-radius: 0px;
  border: 1px solid #18365a;
  color: #18365a;
  font-size: 16px;
  background-color: white;

  @media (max-width: 744px) {
    width: 250px;
    font-weight: 900;
    height: 55px;
  }
`;
export const HR = styled.p`
  @media (max-width: 744px) {
    display: none;
  }
`;
export const Buttonn = styled.button`
  width: 70%;
  font-weight: 700px;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 10px;
  @media (max-width: 744px) {
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 300px;
    margin-bottom: 16px;
  }
`;
export const Card = styled.section`
  background-color: #18365a;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 744px) {
    flex-direction: column;
    background-color: #18365a;
    height: inherit;
    gap: 50px;
    /* padding-bottom: 100px; */
  }
`;

export const White = styled.form`
  width: 50%;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: start;
  @media (max-width: 744px) {
    background-color: #18365a;
    color: white;
    width: 100%;
    height: inherit;
    padding-top: 30px;
    gap: 10px;
  }
`;

export const Blue = styled.section`
  width: 50%;
  height: 100%;
  background-color: #18365a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: start;
  /* padding-bottom: 10%; */
  @media (max-width: 744px) {
    width: 100%;
    padding-inline: 10px;
    height: unset;
    gap: 20px;
    padding-bottom: 100px;
  }
`;
export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 744px) {
    color: white;
    align-self: start;
    margin-left: 30px;
  }
`;
export const PA = styled.p`
  color: var(--dark-main-color, #020111);
  text-align: center;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 744px) {
    color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const LineWaz = styled.div`
  width: 8%;
  border: 1px solid white;
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
  @media (max-width: 744px) {
    color: white;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 1px;
  }
`;

export const IMG = styled.img`
  align-self: start;
  width: 110px;
  height: 23px;
  position: absolute;
  top: 20px;
  left: 20px;
  @media (max-width: 744px) {
    display: none;
  }
`;
export const Inputs = styled.section`
  margin: 40px;
`;

export const Foote = styled.section`
  margin: 20px;
  display: flex;
  justify-content: center;
  gap: 37px;
  @media (max-width: 744px) {
    gap: 10px;
    margin: 0px;
  }
`;
export const IM = styled.img`
  width: 120px;
  @media (max-width: 744px) {
    display: none;
  }
`;
export const IMA = styled.img`
  display: none;
  @media (max-width: 744px) {
    display: block;
    width: 100px;
  }
`;
export const Titlee = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.64px;
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
  @media (max-width: 744px) {
    font-size: 26px;
    text-align: center;
    margin-bottom: 0px;
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
  @media (max-width: 744px) {
  }
`;
const Container = styled.div`
  width: 70%;
  position: relative;
  margin-bottom: 20px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  @media (max-width: 744px) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #000;
  border-top: 2px solid #000;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    @media (max-width: 744px) {
      color: #18365a;
    }
  }
  @media (max-width: 744px) {
    width: 90vw;
    color: white;
    border-color: white;
    height: 60px;
    padding: 0px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  /* left: 10px; */
  left: ${(props) => (props.right ? "none" : "10px")}!important;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition:
    transform 0.3s,
    color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 744px) {
    color: white;
    background-color: #18365a;
  }
`;

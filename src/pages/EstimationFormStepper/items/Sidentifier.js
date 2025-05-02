import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import * as style from "../../../constants/StyleSheets";

// import logo from "../../../assets/icons/Group.png";
// import { Butto, Button } from "@mui/material";
// import faceb from "../../../assets/icons/Group 17.png";
// import google from "../../../assets/icons/Group 16.png";
// import apple from "../../../assets/icons/Group 18.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import AuthService from "../../../services/auth.service";
// import faaceb from "../../../assets/icons/facebookAuth.svg";
// import gooogle from "../../../assets/icons/googleAuth.svg";
// import aapple from "../../../assets/icons/appleAuth.svg";
// import log from "../../../assets/icons/Component 43 (1).png";
import { useDispatch, useSelector } from "react-redux";

import {
  getCurrentUserEstimation,
  loginUserEstimation,
} from "../../../redux/userSlice/userSlice";

// import { loginUserStepper } from "../../../redux/userSlice/userSlice";

import Loader from "../../../components/Items/Loader";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = ({ setAuthenticationShow, setStep }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);

  // useEffect(() => {
  //   setCommand({
  //     ...command,
  //     data: {
  //       ...command.data,
  //       totalPrice: totalPrice,
  //     },
  //   });
  // }, []);

  const navigate = useNavigate();
  // const loadingStatus = useSelector((state) => state.user.isLoading);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isLoading, setisLoading] = useState(loadingStatus);
  const auth = localStorage.getItem("token");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const myPromise = (data) =>
    Promise.resolve(dispatch(loginUserEstimation(data)));

  const handleLogin = async (data) => {
    try {
      setisLoading(loadingStatus);
      const response = await myPromise(data);
      // console.log(response);
      if (response.payload) {
        setAuthenticationShow(false);
        dispatch(getCurrentUserEstimation());
        setStep(5);
      } else {
        console.log("errrrrrr");
      }
      // setAuthenticationShow(false);
      // dispatch(getCurrentUserEstimation());
      // setStep(5);

      //   .then(() => {
      //     setAuthenticationShow(false);
      //     dispatch(getCurrentUserEstimation());
      //     setStep(5);
      //   });
      //   // if (auth) {
      //   //   setAuthenticationShow(false);
      //   //   setStep(4);
      //   // } else {
      //   //   return false;
      // }
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   if (auth) {
  //     window.location.replace("/");
  //   }
  // }, [loadingStatus, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Card dir="auto" right={i18n.language === "ar-AR"}>
      <White
        onSubmit={handleSubmit((data) => {
          handleLogin({
            ...data,
            identifier: data.identifier.trim().toLowerCase(),
          });
        })}
      >
        <Container>
          <Input
            type="text"
            placeholder={t("SIDENTIFIER.FormInput.email")}
            {...register("identifier", {
              required: t("SIDENTIFIER.validation.email"),
            })}
            errorBorder={errors.identifier}
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
        <Container isRtl={i18n.language.startsWith("ar")}>
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder={t("SIDENTIFIER.FormInput.pswd")}
            {...register("password", {
              required: t("SIDENTIFIER.validation.pswd"),
            })}
          />
          {passwordVisible ? (
            <IconContainer
              onClick={() => setPasswordVisible(false)}
              isRtl={i18n.language.startsWith("ar")}
            >
              <AiOutlineEyeInvisible />
            </IconContainer>
          ) : (
            <IconContainer
              onClick={() => setPasswordVisible(true)}
              isRtl={i18n.language.startsWith("ar")}
            >
              <AiOutlineEye />
            </IconContainer>
          )}
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SIDENTIFIER.FormInput.pswd")}</Label>
          ) : (
            <Label right={false}>{t("SIDENTIFIER.FormInput.pswd")}</Label>
          )}
        </Container>

        <Pi
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/ClientProfile/forgetpassword")}
        >
          {t("SIDENTIFIER.FormInput.confpswd")}
        </Pi>
        <Buttonn type="submit" onSubmit={(e) => e.preventDefault()}>
          {t("SIDENTIFIER.CONNEXION")}
        </Buttonn>

        {/* ============================================================ */}
        {/* <div>
           <Buttonn
            onClick={() =>
              handleLogin({
                identifier: "talelbenbelgacem12@gmail.com",
                password: "123456789A",
              })
            }
          >
            {t("SIDENTIFIER.CONNEXION")}
          </Buttonn> 
        </div> */}
        {/* <PA> {t("SIDENTIFIER.HR")}</PA>
        <Foote style={{ margin: 20 }}>
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
    </Card>
  );
};

export default SignIn;

const IconContainer = styled.div`
  position: absolute;

  top: 16px;
  /* transform: translateY(-50%); */
  cursor: pointer;
  color: black;
  @media (max-width: 1050px) {
    /* color: white; */
    right: 0px; /* Adjust as needed */
    top: 0px;
    padding: 13px 12px;
  }
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
    margin-left: 263px;
  }
  @media (max-width: 1050px) and (orientation: landscape) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
export const Sidentifbut = styled.button`
  width: 200px;
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
export const HR = styled.p`
  @media (max-width: 1050px) {
    display: none;
  }
`;
export const Buttonn = styled.button`
  cursor: pointer;
  width: 70%;
  font-weight: 700px;
  height: 45px;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d !important;
  margin-top: 10px;
  @media (max-width: 1050px) {
    /* color: #18365a; */
    /* background-color: white; */
    border: none;
    height: 50px;
    width: 300px;
    margin-bottom: 16px;
  }
`;
export const Card = styled.section`
  /* background-color: #18365a; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    flex-direction: column;
    background-color: #18365a;
    /* height: 150vh; */
  }
`;

export const White = styled.form`
  /* width: 50%; */
  height: 100%;
  width: 90%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: start;
  @media (max-width: 1050px) {
    /* background-color: #18365a; */
    color: white;
    width: 100%;
    height: inherit;
    /* padding-top: 30px; */
    gap: 10px;
  }
  @media (max-width: 1050px) and (orientation: landscape) {
    /* position: absolute; */
    overflow: scroll;
    top: 0px;
    height: fit-content;
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
  @media (max-width: 1050px) {
    width: 100%;
    padding-inline: 10px;
    height: inherit;
    gap: 20px;
  }
  @media (max-width: 1050px) and (orientation: landscape) {
    position: absolute;
    overflow: scroll;
    top: 650px;
    height: fit-content;
    padding-bottom: 5%;
  }
`;
export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 1050px) {
    /* color: white; */
    /* align-self: start; */
    /* margin-left: 30px; */
  }
`;
export const PA = styled.p`
  color: var(--dark-main-color, #020111);
  text-align: center;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  margin-top: 10px;
  @media (max-width: 1050px) {
    /* color: white; */
    width: 100%;
    margin-top: 0px;
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
  align-self: start;
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
  /* margin: 20px; */
  display: flex;
  justify-content: center;
  gap: 15px;
  @media (max-width: 1050px) {
    gap: 10px;
    margin: 0px !important;
  }
`;
export const IM = styled.img`
  width: 100px;
  @media (max-width: 1050px) {
    display: none;
  }
`;
export const IMA = styled.img`
  display: none;
  @media (max-width: 1050px) {
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
  @media (max-width: 1050px) {
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
  @media (max-width: 1050px) {
  }
`;
const Container = styled.div`
  width: 90%;
  direction: ltr;
  position: relative;
  margin-bottom: 20px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  /* height: 50px; */
  padding: 10px;
  font-size: 16px;
  border: 2px solid #000;
  border-top: 2px solid #000;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    color: rgba(192, 199, 206, 1);
    font-size: 12px;
  }
  @media (max-width: 1050px) {
    width: 100%;
    color: black;
    border-color: black;
    /* height: 60px; */
    /* padding: 0px; */
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: ${(props) => (props.right ? "none" : "10px")};
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 1050px) {
    color: #18365a;
    background-color: white;
  }
`;

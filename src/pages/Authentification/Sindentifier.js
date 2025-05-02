import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import * as style from "../../constants/StyleSheets";

import logo from "../../assets/icons/logoo.svg";
// import { Butto, Button } from "@mui/material";
// import faceb from "../../assets/icons/Group 17.png";
// import google from "../../assets/icons/Group 16.png";
// import apple from "../../assets/icons/Group 18.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import AuthService from "../../services/auth.service";
// import faaceb from "../../assets/icons/facebookAuth.svg";
// import gooogle from "../../assets/icons/googleAuth.svg";
// import aapple from "../../assets/icons/appleAuth.svg";
// import log from "../../assets/icons/Component 43 (1).png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice/userSlice";
// import Loader from "../../components/Items/Loader";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { useTranslation } from "react-i18next";
import homeIcon from "../../assets/icons/homeicon.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Helmet } from "react-helmet-async";

const Sindentifier = ({ setLoading, ping, setPing }) => {
  const location = useLocation();

  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state?.user?.isLoading);
  // const [isLoading, setisLoading] = useState(loadingStatus);
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(
      "beforeLogin",
      location.state?.from?.pathname || "/"
    );
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoading(loadingStatus);
      // const response = await
      dispatch(loginUser(data));
      // if (auth) {
      //   window.location.href = "/";
      // } else {
      //   return false;
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

  //  isLoading ? (
  //   <Loader />
  // ) : (
  const [pwd, setPwd] = useState("");
  return (
    <>
    
      <Card dir="auto" right={i18n.language === "ar-AR"}>
        {/* <HomeIcon src={homeIcon} onClick={() => navigate("/")} /> */}

        <White
          onSubmit={handleSubmit((data) => {
            handleLogin({
              ...data,
              identifier: data.identifier.trim().toLowerCase(),
            });
          })}
        >
          {/* <Link to={"/"}>
          <LO src={log}></LO>
        </Link>
        <Link to={"/"}>
          <IMG src={logo}></IMG>
        </Link> */}
          <LogoSection>
            {/* <div className="logo_partner_wrapper"> */}
            <img src={logo} alt="logosheelni" onClick={() => navigate("/")} />
            <p onClick={() => navigate("/")}>x</p>
            {/* </div> */}
          </LogoSection>

          <UpperSection>
            <h1>{t("SIDENTIFIER.Identifier")}</h1>
          </UpperSection>

          {/* <H1>{t("SIDENTIFIER.Identifier")} </H1> */}

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
          <Container>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder={t("SIDENTIFIER.FormInput.pswd")}
              {...register("password", {
                onChange: () => {
                  setPwd(getValues("password"));
                },
                required: t("SIDENTIFIER.validation.pswd"),
              })}
            />

            {passwordVisible ? (
              <IconContainer onClick={() => setPasswordVisible(false)}>
                <AiOutlineEyeInvisible />
              </IconContainer>
            ) : (
              <IconContainer onClick={() => setPasswordVisible(true)}>
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
          <Buttonn
            disabled={pwd.length < 8}
            type="submit"
            onSubmit={(e) => e.preventDefault()}
          >
            {" "}
            {t("SIDENTIFIER.CONNEXION")}{" "}
          </Buttonn>
          {/* <PA>
          {" "}
          <LineWaz />
          {t("SIDENTIFIER.HR")} <LineWaz />
        </PA> */}
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

        <Blue>
          <Titlee>{t("SIDENTIFIER.Titlee")}</Titlee>
          <Para>{t("SIDENTIFIER.para")}</Para>
          <Link to="/SinsecrireClient">
            <Sidentifbut>{t("SIDENTIFIER.sidentifier")}</Sidentifbut>
          </Link>
        </Blue>
      </Card>
    </>
  );
  // );
};

export default Sindentifier;

const IconContainer = styled.div`
  position: absolute;
  right: 10px; /* Adjust as needed */
  top: 16px;
  /* transform: translateY(-50%); */
  cursor: pointer;
  color: black;
  @media (max-width: 1050px) {
    color: white;
    top: 20px;
  }
`;

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

const LineWaz = styled.div`
  width: 8%;
  border: 1px solid white;
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
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   top: 10px;
  //   right: 10px;
  // }
`;
export const Sidentifbut = styled.button`
  width: 150px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid white;
  color: #18365A;
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
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  width: 70%;
  font-weight: 700px;
  height: 45px;
  border-radius: 7px;
  color: ${(props) => (props?.disabled ? "rgba(120,120,120,8)" : "white")};
  font-size: 16px;
  background-color: ${(props) =>
    props?.disabled ? "#f2c09a" : "#F37A1D"};
  margin-top: 10px;
  @media (max-width: 1050px) {
    color: ${(props) => (props?.disabled ? "rgba(120,120,120,8)" : "white")};
    background-color: ${(props) =>
      props?.disabled ? "#f2c09a" : "#F37A1D"};
    border: none;
    width: 100%;
    /* font-weight: 400; */
    height: 60px;
    width: 260px;
    margin-bottom: 16px;
  }
`;
export const Card = styled.section`
  background-color: #18365A;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    flex-direction: column;
    background-color: #18365A;
    gap: 50px;
    padding-bottom: 50px;
    height: fit-content;
    min-height: 100vh;
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
  @media (max-width: 1050px) {
    background-color: #18365A;
    color: white;
    width: 100%;
    height: inherit;
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
  background-color: #18365A;
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
    gap: 10px;
    padding-bottom: 60px;
  }
  // @media (max-width: 1050px) and (orientation: landscape) {
  //   position: absolute;
  //   overflow: scroll;
  //   top: 650px;
  //   height: fit-content;
  //   padding-bottom: 5%;
  // }
`;
export const Pi = styled.p`
  cursor: pointer;
  color: var(--dark-main-color, #020111);
  font-size: 14px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  text-align: right;
  
  @media (max-width: 1050px) {
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
  @media (max-width: 1050px) {
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
  margin: 20px;
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
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.64px;
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
  @media (max-width: 1050px) {
    font-size: 24px;
    text-align: center;
    margin-bottom: 0px;
  }
`;

export const Para = styled.p`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 200%;
  letter-spacing: 0.32px;
  width: 400px;
  margin-bottom: 30px;
  @media (max-width: 1050px) {
    font-size: 14px;
    padding: 4px 20px;
    margin-bottom: 0;
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
  @media (max-width: 1050px) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px !important;
  font-size: 16px;
  border: 1px solid #07122F;
  border-top: 1px solid #07122F;
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    font-weight: 100;
    font-size:14px;
    color: rgb(215 215 215);
    @media (max-width: 1050px) {
      color: #18365A;
    }
  }
  @media (max-width: 1050px) {
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
  left: ${(props) => (props.right ? "none" : "10px")};
  /* left:10px; */
  font-size: 16px;
  color: #999;
  
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 1050px) {
    color: white;
    background-color: #18365A;
  }
`;

export const UpperSection = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  h1 {
    color: #07122F;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;
    letter-spacing: 0.72px;
  }
  @media (max-width: 1050px) {
    margin-top: 10vh;
   
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
    filter: brightness(0) saturate(100%) invert(63%) sepia(60%) saturate(4043%) hue-rotate(349deg) brightness(98%) contrast(94%);
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

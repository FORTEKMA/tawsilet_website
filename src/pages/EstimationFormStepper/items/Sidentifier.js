import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getCurrentUserEstimation,
  loginUserEstimation,
} from "../../../redux/userSlice/userSlice";
import Loader from "../../../components/Items/Loader";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = ({ setStep }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isLoading, setisLoading] = useState(loadingStatus);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const myPromise = (data) =>
    Promise.resolve(dispatch(loginUserEstimation(data)));

  const handleLogin = async (data) => {
    try {
      setisLoading(loadingStatus);
      const response = await myPromise(data);
     
      if (response.payload) {
        dispatch(getCurrentUserEstimation());
        setStep(response.payload);
      } else {
        console.log("errrrrrr");
      }
   
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <Container isRtl={i18n.language.startsWith("ar")}>
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
      </White>
    </Card>
  );
};

export default SignIn;

const IconContainer = styled.div`
  position: absolute;
  top: 15px;
  cursor: pointer;
  color: black;
  right: ${props => props.isRtl ? 'auto' : '15px'};
  left: ${props => props.isRtl ? '15px' : 'auto'};
  @media (max-width: 1050px) {
    right: ${props => props.isRtl ? 'auto' : '0px'};
    left: ${props => props.isRtl ? '0px' : 'auto'};
    top: 0px;
    padding: 13px 12px;
  }
`;

export const Buttonn = styled.button`
  background: #0c0c0c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 18px;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: #222;
  }
`;

export const Card = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1050px) {
    flex-direction: column;
    background-color: #18365a;
  }
`;

export const White = styled.form`
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
    color: white;
    width: 100%;
    height: inherit;
    gap: 10px;
  }
  @media (max-width: 1050px) and (orientation: landscape) {
    overflow: scroll;
    top: 0px;
    height: fit-content;
  }
`;

export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
`;

const Container = styled.div`
  width: 90%;
  direction: ${props => props.isRtl ? 'rtl' : 'ltr'};
  position: relative;
  margin-bottom: 20px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
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

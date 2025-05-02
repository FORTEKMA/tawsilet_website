import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";

import AuthService from "../../../services/auth.service";
import { red } from "@mui/material/colors";
// import ErrorMessage from "../Form/ErrorMessage";
import { useLocation } from "react-router";
import {
  getCurrentUserEstimation,
  registerUserEstimation,
} from "../../../redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import Loader from "../../../components/Items/Loader";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-phone-input-2/lib/style.css";

import PhoneInput from "react-phone-input-2";

const SignUp = ({ setAuthenticationShow, setStep }) => {
  const { t, i18n } = useTranslation();
  const command = useSelector((store) => store?.newCommand?.command);
  const auth = localStorage.getItem("token");
  const [accept, setAccept] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setCommand({
  //     ...command,
  //     data: {
  //       ...command.data,
  //       totalPrice: totalPrice,
  //     },
  //   });
  // }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);

  const loadingStatus = useSelector((state) => state.user.isLoading);
  const [isLoading, setisLoading] = useState(loadingStatus);

  // useEffect(() => {
  //   if (auth) {
  //     window.location.replace("/clientprofile/details");
  //   }
  // }, [dispatch]);
  // const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const myPromise = (data) =>
    Promise.resolve(dispatch(registerUserEstimation(data)));
  return isLoading ? (
    <Loader />
  ) : (
    <Formulaire
      dir="auto"
      right={i18n.language === "ar-AR"}
      onSubmit={handleSubmit((data) => {
        setisLoading(true);
        myPromise({
          username: data.email.toLowerCase().trim(),
          email: data.email,
          phoneNumber: data.phoneNumber,
          user_role: "client",
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        })
          .then((user) => {
            setisLoading(false);
            setAuthenticationShow(false);
            dispatch(getCurrentUserEstimation());
            if (command?.totalPrice) {
              setStep(5);
            }
            // window.location.replace("/clientProfile/details");
          })
          .catch((error) => {
            setisLoading(false);
            console.log(error);
            alert(error?.response?.data?.error?.message);
          });

        // AuthService.register({
        //   username: data.email,
        //   email: data.email,
        //   phoneNumber: data.phoneNumber,
        //   user_role: "client",
        //   password: data.password,
        //   accountOverview: [
        //     {
        //       __component: "section.client",

        //       firstName: data.firstName,
        //       lastName: data.lastName,
        //     },
        //   ],
        // })
      })}
    >
      <DISP>
        {/* <div> */}
        <Container>
          <In
            errorBorder={errors.firstName}
            {...register("firstName", {
              required: t("SINSCRIRE.validation.Prénom"),
            })}
            type="text"
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder={t("SINSCRIRE.FormInput.Prénom")}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SINSCRIRE.FormInput.Prénom")}</Label>
          ) : (
            <Label right={false}>{t("SINSCRIRE.FormInput.Prénom")}</Label>
          )}
        </Container>
        {/* <span
            style={{ color: "red", zIndex: 9999999999999999999, marginTop: -8 }}
          >
            <ErrorMessage errors={errors} name="firstName" />
          </span>
        </div> */}
        <Container>
          <In
            {...register("lastName", {
              required: t("SINSCRIRE.validation.nom"),
            })}
            type="text"
            // value={inputValue}
            // onChange={handleInputChange}
            errorBorder={errors.lastName}
            placeholder={t("SINSCRIRE.FormInput.nom")}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SINSCRIRE.FormInput.nom")}</Label>
          ) : (
            <Label right={false}>{t("SINSCRIRE.FormInput.nom")}</Label>
          )}
        </Container>
      </DISP>
      <Container
        phoneborder={errors.phoneNumber}
        isRtl={i18n.language.startsWith("ar")}
      >
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true, minLength: 7, message: "ffffffffff" }}
          render={({ field: { onChange } }) => (
            <PhoneInput
              enableSearch={true}
              preferredCountries={["tn", "ae", "fr"]}
              excludeCountries={["il"]}
              defaultMask={".. ... ..."}
              placeholder="Numéro de téléphone"
              inputRef={register}
              inputStyle={{
                width: "100%",
                height: "45px",
                textAlign: "left",

                direction: "ltr",
                fontSize: "16px",
                // paddingLeft: "60px",
                borderRadius: "8px",
                borderWidth: errors.phoneNumber ? "1px" : "2px",
                borderColor: errors.phoneNumber ? "red" : "black",
                backgroundColor: "transparent",
                color: "gray",
              }}
              dropdownStyle={{ color: "black" }}
              inputProps={{
                name: "phoneNumber",
                required: true,
                message: "test",
                // autoFocus: true,
              }}
              id="phoneNumber"
              specialLabel=""
              name="phoneNumber"
              autoComplete="phoneNumber"
              onChange={(value) => onChange(value)}
              error={!!errors.phoneNumber}
              helperText={
                errors.phoneNumber && "Un numéro valide est obligatoire"
              }
              country="tn"
              // regions={"europe"}
              // disableCountryCode={true}
              countryCodeEditable={false}
              enableAreaCodes={true}
              // enableAreaCodeStretch={false}
            />
          )}
        />
        {/* <Input
          type="text"
          {...register("phoneNumber", {
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,

              message: t("SINSCRIRE.validation.testPhone"),
            },

            required: t("SINSCRIRE.validation.phone"),
          })}
          errorBorder={errors.phoneNumber}
          // value={inputValue}
          // onChange={handleInputChange}
          placeholder="+33 "
        /> */}
        {errors.phoneNumber && (
          <ErrorMessage>Numéro de téléphone invalide</ErrorMessage>
        )}
        {i18n.language === "ar-AR" ? (
          <Label right={true}>{t("SINSCRIRE.FormInput.phone")}</Label>
        ) : (
          <Label right={false}>{t("SINSCRIRE.FormInput.phone")}</Label>
        )}
      </Container>

      <Container>
        <Input
          errorBorder={errors.email}
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: t("SINSCRIRE.validation.testemail"),
            },

            required: t("SINSCRIRE.validation.email"),
          })}
          type="text"
          placeholder="example@email.com "
          id="adr"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        {i18n.language === "ar-AR" ? (
          <Label right={true}>{t("SINSCRIRE.FormInput.email")}</Label>
        ) : (
          <Label right={false}>{t("SINSCRIRE.FormInput.email")}</Label>
        )}
      </Container>

      <DISPA>
        <Container>
          <Input
            type={passwordVisible ? "text" : "password"}
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/,
                message:
                  "Mot de passe invalide. Longueur minimale de 8 caractères requise, avec au moins une lettre et un chiffre.",
              },

              required: t("SINSCRIRE.validation.pswd"),
            })}
            errorBorder={errors.password}
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder={t("SINSCRIRE.FormInput.pswd")}
            id="mdp"
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
            <Label right={true}>{t("SINSCRIRE.FormInput.pswd")}</Label>
          ) : (
            <Label right={false}>{t("SINSCRIRE.FormInput.pswd")}</Label>
          )}
        </Container>
        <Container>
          <Input
            type={validatePasswordVisible ? "text" : "password"}
            {...register(
              "confirm_password",
              {
                validate: (value) => {
                  const { password } = getValues();

                  return (
                    password === value || t("SINSCRIRE.validation.confpswd")
                  );
                },
              }
              //  {
              //   required: password === confirm_password ? "test" : "required",
              // }
            )}
            errorBorder={errors.confirm_password}
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder={t("SINSCRIRE.FormInput.confpswd")}
            id="mdp"
          />
          {validatePasswordVisible ? (
            <IconContainer onClick={() => setValidatePasswordVisible(false)}>
              <AiOutlineEyeInvisible />
            </IconContainer>
          ) : (
            <IconContainer onClick={() => setValidatePasswordVisible(true)}>
              <AiOutlineEye />
            </IconContainer>
          )}
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
          {i18n.language === "ar-AR" ? (
            <Label right={true}>{t("SINSCRIRE.FormInput.confpswd")}</Label>
          ) : (
            <Label right={false}>{t("SINSCRIRE.FormInput.confpswd")}</Label>
          )}
        </Container>
      </DISPA>
      {/* <DISPO>
        <Container>
          <Input
            type="text"
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder="Mot de passe "
            id="mdp"
          />

          <Label>Mot de passe</Label>
        </Container>
        <Container>
          <Input
            type="text"
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder="Confirmez le mot de passe "
            id="mdp"
          />

          <Label>Confirmez le mot</Label>
        </Container>
      </DISPO> */}
      <DISP isRtl={i18n.language.startsWith("ar")}>
        <Checkbox
          style={checkboxStyle}
          type="checkbox"
          onChange={(e) => setAccept(e.value.checked)}
          {...register("terms", {
            required: t("SINSCRIRE.FormInput.accepter"),
          })}
          errorBorder={errors.terms}
        />

        <Pi>
          {" "}
          {t("SINSCRIRE.FormInput.accepter")}{" "}
          <a href="/Politiques" target="_blank">
            {t("SINSCRIRE.FormInput.terms")}
          </a>{" "}
          {t("SINSCRIRE.FormInput.et")}{" "}
          <a href="/Conditions" target="_blank">
            {t("SINSCRIRE.FormInput.conditions")}
          </a>
        </Pi>
      </DISP>
      {errors.terms && <ErrorMessage>{errors.terms.message}</ErrorMessage>}
      <Buttonn type="submit" onSubmit={(e) => e.preventDefault()}>
        {" "}
        {t("SINSCRIRE.FormInput.Inscrire")}{" "}
      </Buttonn>
    </Formulaire>
  );
};

export default SignUp;

const checkboxStyle = {
  width: "20px",
  height: "20px",
};

const Formulaire = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: 0 auto; */
  padding: 0 10px;
  width: 100%;
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

export const Buttonn = styled.button`
  width: 70%;
  align-self: center;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 20px;
  @media (max-width: 1050px) {
    /* color: #18365a;
    background-color: white; */
    border: none;
    height: 50px;
    width: 100%;
    /* max-width: 200px; */
    margin-bottom: 16px;
  }
`;

const Checkbox = styled.input`
  @media (max-width: 1050px) {
    background-color: #18365a;
  }
`;
export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  margin-left: 10px;
  @media (max-width: 1050px) {
    /* color: white; */
    font-size: 12px;
  }
  a {
    @media (max-width: 1050px) {
      color: #f37a1d;
      text-decoration: none;
      font-weight: 600;
    }
  }
`;
export const DISPA = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  @media (max-width: 1050px) {
    /* display: none; */
    gap: 0;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
export const DISPO = styled.section`
  display: none;
  @media (max-width: 1050px) {
    display: block;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 14px;
  justify-content: center;
  align-items: flex-start;
  direction: ltr;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1050px) {
    /* width: 93%; */
  }
  .react-tel-input {
    height: 45px;
    width: 100%;
    @media (max-width: 1050px) {
      height: 40px;
      border-color: white;
    }
  }
  .flag-dropdown {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: transparent !important;
    border: none !important;
    padding-left: 10px;
    z-index: 99999;
  }
  .selected-flag {
    background-color: transparent !important;
  }
  .country-list {
    margin: 0 !important;
    /* width: 100%; */
    left: 0;
    right: 0 !important;
  }
  .react-tel-input .form-control {
    padding-left: 40px;
    width: 100%;
    height: 100%;
    border-width: ${(props) => (props.phoneborder ? "1px" : "2px")};
    border-color: ${(props) => (props.phoneborder ? "red" : "black")};
    &::placeholder {
      color: rgba(192, 199, 206, 1);
      font-size: 12px;
    }
    @media (max-width: 1050px) {
      height: 100% !important;
      /* color: red !important; */
      border-color: ${(props) => (props.phoneborder ? "red" : "white")};
      border-width: ${(props) => (props.phoneborder ? "1px" : "2px")};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  /* height: 50px; */
  padding: 10px;
  font-size: 16px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "2px solid #000"};
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    font-size: 12px;
    color: rgba(192, 199, 206, 1);
  }
  @media (max-width: 1050px) {
    border-color: ${(props) =>
      props.errorBorder ? "red" : "black"} !important;
    /* width: 93%; */
    /* color: white; */
    /* border-color: white; */
    /* height: 60px; */
    padding: 10px;
  }

  &,
  #mdp {
    padding-right: 15%;
    overflow: hidden;
    @media (max-width: 1050px) {
      padding-right: 20%;
    }
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: ${(props) => (props.right ? "none" : "10px")};

  font-size: 14px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 1050px) {
    /* color: white; */
    /* background-color: #18365a; */
  }
`;
const Labell = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
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
    background-color: #18365a;
    top: 10px;
    left: 12px;
  }
`;
export const DISP = styled.section`
  display: flex;
  flex-direction: ${(props) => (props.isRtl ? "row-reverse" : "row")};
  align-items: flex-start;
  flex-wrap: wrap;
  /* gap: 16px; */
  width: 100%;
  @media (max-width: 1050px) {
    /* width: 93%; */
  }
`;
const In = styled.input`
  width: 100%;
  /* height: 50px; */
  font-size: 16px;
  padding: 10px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "2px solid #000"};
  border-top: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "2px solid #000"};
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    color: rgba(192, 199, 206, 1);
    font-size: 12px;
  }
  @media (max-width: 1050px) {
    width: 100%;
    border-color: ${(props) =>
      props.errorBorder ? "red" : "black"} !important;
    /* color: white; */
    /* border-color: white; */
    /* height: 60px; */
  }
`;
const Prénom = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 1050px) {
    /* color: white;
    background-color: #18365a; */
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 10px; /* Adjust as needed */
  top: 16px;
  /* transform: translateY(-50%); */
  cursor: pointer;
  color: black;
  @media (max-width: 1050px) {
    /* color: white; */
    top: 0px;
    right: 0px;
    padding: 12px 12px;
  }
`;

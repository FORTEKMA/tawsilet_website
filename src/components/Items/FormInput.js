import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";

import AuthService from "../../services/auth.service";
import { red } from "@mui/material/colors";
import ErrorMessage from "../Form/ErrorMessage";
import { useLocation, useNavigate } from "react-router";
import { registerUser } from "../../redux/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormInput = ({ setStep, setLoading }) => {
  const { t, i18n } = useTranslation();
  const auth = localStorage.getItem("token");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);

  const navigate=useNavigate()
  const [accept, setAccept] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth) {
      window.location.replace("/clientprofile/details");
    }
  }, [dispatch]);
  // const [inputValue, setInputValue] = useState("");
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const myPromise = (data) => Promise.resolve(dispatch(registerUser(data)));
  return (
    <Formulaire
      dir="auto"
      right={i18n.language === "ar-AR"}
      onSubmit={handleSubmit((data) => {
        setLoading(true);
        myPromise({
          username: data.email.toLowerCase().trim(),
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          user_role: "client",
          firstName: data.firstName,
          lastName: data.lastName,
        })
          .then((user) => {
            setLoading(false);
            // window.location.replace("/clientProfile/details");
          })
          .catch((error) => {
            setLoading(false), alert(error.response.data.error.message);
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
      <Container phoneborder={errors.phoneNumber}>
        {/* <Input
          dir="auto"
          type="text"
          {...register("phoneNumber", {
            pattern: {
              value:
                /^(?:(?:\+|00)33[\s-]*\d{1,2}[\s-]*)?(?:(?:(?:\d{2}[\s-]*){4}\d{2})|(?:(?:\d{2}[\s-]*){3}\d{2}[\s-]*\d{2}))$/,
              message: t("SINSCRIRE.validation.testPhone"),
            },

            required: t("SINSCRIRE.validation.phone"),
          })}
          errorBorder={errors.phoneNumber}
          // value={inputValue}
          // onChange={handleInputChange}
          placeholder="+33 -- -- -- --"
        /> */}
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true, minLength: 7, message: "ffffffffff" }}
          render={({ field: { onChange } }) => (
            <PhoneInput
              enableSearch={true}
              preferredCountries={['tn', 'ae','fr']}
              excludeCountries={['il']}
              defaultMask={'.. ... ...'}
              placeholder="Numéro de téléphone"
              inputRef={register}
              inputStyle={{
                width: "100%",
                height: 45,
                textAlign: "left",
                direction: "ltr",
                fontSize: "16px",
                paddingLeft: "60px",
                borderRadius: "4px",
                borderWidth: errors.phoneNumber ? "1px" : "1px",
                borderColor: errors.phoneNumber ? "red" : "#07122F",
                backgroundColor: "transparent",
                color: "gray",
              }}
              dropdownStyle={{ color: "#07122F" }}
              inputProps={{
                name: "phoneNumber",
                required: true,
                message: "test",
                // autoFocus: true,
              }}
              id="phoneNumber"
              specialLabel="Telephone"
              name="phoneNumber"
              autoComplete="phoneNumber"
              onChange={(value) => onChange(value)}
              error={!!errors.phoneNumber}
              helperText={
                errors.phoneNumber && "Un numéro valide est obligatoire"
              }
              country="tn"
              // regions={"europe"}S
              // disableCountryCode={true}
              countryCodeEditable={false}
              enableAreaCodes={true}
              // enableAreaCodeStretch={false}
            />
          )}
        />
        {errors.phoneNumber && (
          <ErrorMessage>
            {" "}
            {t("SINSCRIRE.validation.testPhone")}
            {/* {errors.phoneNumber.message} */}
          </ErrorMessage>
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
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
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

         <Label right={true}>Mot de passe</Label>
        </Container>
        <Container>
          <Input
            type="text"
            // value={inputValue}
            // onChange={handleInputChange}
            placeholder="Confirmez le mot de passe "
            id="mdp"
          />

         <Label right={true}>Confirmez le mot</Label>
        </Container>
      </DISPO> */}
      <DISP style={{ gap: 16 }}>
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
      <div style={{display:"flex", gap:8, width:"100%"}}>
      <Buttonn type="submit" onSubmit={(e) => e.preventDefault()}>
        {" "}
        {t("SINSCRIRE.FormInput.Inscrire")}{" "}
      </Buttonn>
      <Buttonb onClick={()=> navigate("/SidentifierClient")}>
        {t("SIDENTIFIER.CONNEXION")}
      </Buttonb>
      </div>
    </Formulaire>
  );
};

export default FormInput;

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
  padding: 20px;
  width: 90%;
  @media (max-width: 1050px) {
    width: 100%;
  }
`;

export const Buttonn = styled.button`
  width: 100%;
  align-self: center;
  height: 45px;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  background-color: #d8b56c;
  margin-top: 20px;
  @media (max-width: 1050px) {
    color: white;
    background-color: #d8b56c;
    border: none;
    height: 60px;
    width: 100%;
    margin-bottom: 16px;
    margin-top: 30px;
  }
`;

export const Buttonb = styled.button`
  width: 100%;
  align-self: center;
  height: 45px;
  border-radius: 7px;
  color: white;
  font-size: 16px;
  background-color: #d8b56c;
  margin-top: 20px;
  @media (max-width: 1050px) {
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 40%;
    margin-bottom: 16px;
    margin-top: 30px;
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
  @media (max-width: 1050px) {
    color: white;
  }
  a {
    color: #d8b56c;
    text-decoration: none;
  }
`;

export const DISPA = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  @media (max-width: 1050px) {
    /* display: none; */
    gap: 0px;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 1050px) {
    /* width: 93%; */
  }

  /* .react-tel-input {
    height: 45px;
    @media (max-width: 1050px) {
      height: 60px;
    }
  }
  .flag-dropdown {
    background-color: transparent !important;
    border: none !important;
  }
  .form-control {
    height: 100%;
    border-width: 1px;
    border-width: ${(props) => (props.phoneborder ? "1px" : "2px")};
    border-color: ${(props) => (props.phoneborder ? "#ff6961" : "black")};
    @media (max-width: 1050px) {
      height: 100% !important;
      color: white !important;
      border-color: ${(props) => (props.phoneborder ? "red" : "white")};
      border-width: ${(props) => (props.phoneborder ? "1px" : "1px")};
    }
  } */

  .react-tel-input {
    height: 45px;
    direction:ltr;
    @media (max-width: 1050px) {
      height: 60px;
      /* border-color: ${(props) => (props.phoneborder ? "red" : "white")}; */
    }
  }
  .flag-dropdown {
    background-color: transparent !important;
    border: none !important;
    padding-left: 10px;
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
    height: 100%;

    border-width: 1px;
    border-width: ${(props) => (props.phoneborder ? "1px" : "2px")};
    border-color: ${(props) => (props.phoneborder ? "#ff6961" : "black")};
    @media (max-width: 1050px) {
      height: 100% !important;
      color: white !important;
      /* Phone input border !!!!!! */
      border-color: ${(props) =>
        props.phoneborder ? "red" : "#FFFF"} !important;
      border-width: ${(props) => (props.phoneborder ? "1px" : "1px")};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #07122F"};
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    font-weight: 100;
    font-size: 14px;
    color: rgb(215 215 215);
    @media (max-width: 1050px) {
      color: #18365a;
    }
  }

  @media (max-width: 1050px) {
    /* width: 93%; */
    color: white;
    border-width: 1px;

    border-color: ${(props) =>
      props.errorBorder ? "red" : "white"} !important;
    height: 60px;
    padding: 10px;
  }

  &,
  #mdp {
    padding-right: 15%;
    overflow: hidden;
    @media (max-width: 1050px) {
      padding-right: 20%;
      border-color: ${(props) =>
        props.errorBorder ? "red" : "white"} !important;
    }
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
    background-color: #18365a;
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
  height: 50px;
  font-size: 16px;
  padding-left: 10px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #07122F"};
  border-top: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #07122F"};
  background-color: transparent;
  border-radius: 4px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    font-weight: 100;
    font-size: 14px;
    color: rgb(215 215 215);
    @media (max-width: 1050px) {
      color: #18365a;
    }
  }

  @media (max-width: 1050px) {
    width: 100%;
    color: white;
    border-width: 1px;
    border-color: ${(props) =>
      props.errorBorder ? "red" : "white"} !important;
    height: 60px;
  }
`;
const Prénom = styled.label`
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
    color: white;
    background-color: #18365a;
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
    color: white;
    top: 20px;
  }
`;

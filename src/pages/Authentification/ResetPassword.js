import styled, { css } from "styled-components";
import * as style from "../../constants/StyleSheets";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { useLocation, useParams } from "react-router";
import { resetPassword } from "../../redux/userSlice/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = ({ setLoading, currentUser }) => {
  let query = useQuery();
  const code = query.get("code");
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);

  const myPromise = (data) => Promise.resolve(dispatch(resetPassword(data)));

  return (
    <div style={{ paddingBottom: 50, paddingTop: 30, backgroundColor:"#18365a"  }}>
      <Content
        right={i18n.language === "ar-AR"}
        onSubmit={handleSubmit((data) => {
          //   setLoading(true);
          myPromise({
            code: code,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
          })
            .then((user) => {
              //   setLoading(false);
              // window.location.replace("/clientProfile/details");
            })
            .catch((error) => {
              // console.log(error);
              //   setLoading(false),
              alert(error?.response?.data?.error?.message);
            });
        })}
      >
        <User style={{ marginBottom: 20, marginTop: 100 }}>Récupération de compte</User>
        {/* <ContentService>
          <Input
            name="currentPassword"
            type="password"
            className="oinput"
            placeholder="Adresse email" //{t("ClientProfile.taperpswd")}
            {...register("currentPassword", {
              required: t("SINSCRIRE.validation.pswd"),
            })}
          />
          {errors?.currentPassword && (
            <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
          )}
        </ContentService> */}
        <Address>
          <Input
            name="password"
            autoComplete="false"
            autoSave="false"
            type={passwordVisible ? "text" : "password"}
            className="oinput"
            placeholder="Mot de passe" //{t("ClientProfile.taperpswd")}
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                message:
                  "Mot de passe invalide. Longueur minimale de 8 caractères requise, avec au moins une lettre et un chiffre.",
              },
              required: t("SINSCRIRE.validation.pswd"),
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
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          )}
        </Address>
        <Address>
          <Input
            name="passwordConfirmation"
            type={validatePasswordVisible ? "text" : "password"}
            autoComplete="false"
            autoSave="false"
            className="oinput"
            placeholder="Confirmer le mot de passe" //{t("ClientProfile.taperpswd")}
            {...register("passwordConfirmation", {
              validate: (value) => {
                const { password } = getValues();
                return password === value || t("SINSCRIRE.validation.confpswd");
              },
            })}
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
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </Address>
        <Button
          hasBackground
          type="submit"
          onSubmit={(e) => e.preventDefault()}
        >
          Suivant
          {/* {t("ClientProfile.MTA")} */}
        </Button>
      </Content>
      {/* </Content> */}
    </div>
  );
};

export default ResetPassword;

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

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
const Content = styled.form`
  display: flex;
  flex-direction: column;
  /* margin-left: 4.38rem; */
  /* margin-left: ${(props) => (props.right === false ? "4.38rem" : "none")};
  margin-right: ${(props) => (props.right === true ? "4.38rem" : "none")}; */
  gap: 1.5rem;

height: 100vh;
  align-items: center;
  justify-content: center;
  @media (max-width: 1151px) {
    width: 100vw;
    margin: 0;
    padding: 16px;
  }
`;

const Address = styled.div`
  position: relative;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  @media (max-width: 1151px) {
    width: 90%;
    /* margin: 0;
    padding: 16px; */
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  border-radius: 32px;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.5rem;
  color: var(--body-text-2, #666);

  font-family: ${style.font.FONT_FAMILY};
  font-size: 16px;

  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;

const User = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);

  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.25rem;
  @media (max-width: 1151px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 400px;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #d8b56c;
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  &:hover {
    background-color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.BACKGROUND_COLOR
        : props.theme.PRIMARY_COLOR};
    color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.PRIMARY_COLOR
        : props.theme.BACKGROUND_COLOR};
  }
  @media (max-width: 1151px) {
    width: 90%;
    padding: 2px;
  }
`;

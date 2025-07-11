import styled, { css } from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useEffect } from "react";
import Profile from "../../../assets/images/mann.png";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { changePassword } from "../../../redux/userSlice/userSlice";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import { useDispatch } from "react-redux";
import ProfileDetails from "./ProfileDetails";
import ProfileDetailsUpdates from "./ProfileDetailsUpdate";

const ProfilePassword = ({ setLoading, currentUser }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const myPromise = (data) => Promise.resolve(dispatch(changePassword(data)));

  return (
    <div style={{ paddingBottom: 50 }}>
      <ProfileDetailsUpdates currentUser={currentUser} />
      <Content
        right={i18n.language === "ar-AR"}
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          myPromise({
            currentPassword: data.currentPassword,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
          })
            .then((user) => {
              setLoading(false);
              // window.location.replace("/clientProfile/details");
            })
            .catch((error) => {
              // console.log(error);
              setLoading(false), alert(error?.response?.data?.error?.message);
            });
        })}
      >
        <User>{t("ClientProfile.pswd")}</User>
        <ContentService>
          <Input
            name="currentPassword"
            type="password"
            className="oinput"
            placeholder={t("ClientProfile.taperpswd")} //"Ancien mot de passe"
            {...register("currentPassword", {
              required: "S'il vous plaît entrez votre Ancien mot de passe.",
            })}
          />
          {errors?.currentPassword && (
            <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
          )}

          <Address>
            <Input
              name="password"
              type="password"
              className="oinput"
              placeholder= {t("ClientProfile.pswd")} //"password"
              {...register("password", {
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                  message:
                    "Mot de passe invalide. Longueur : min. 8 caractères, lettre et chiffre requis.",
                },
                required: t("SINSCRIRE.validation.pswd"),
              })}
            />
            {errors?.password && (
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
            )}
          </Address>
          <Address>
            <Input
              name="passwordConfirmation"
              type="password"
              className="oinput"
              placeholder={t("ClientProfile.taperpswd")} //"Confirmer le mot deffgfsf passe"
              {...register("passwordConfirmation", {
                validate: (value) => {
                  const { password } = getValues();
                  return (
                    password === value || t("SINSCRIRE.validation.confpswd")
                  );
                },
              })}
            />
          </Address>

          {errors?.passwordConfirmation && (
            <ErrorMessage>{errors?.passwordConfirmation?.message}</ErrorMessage>
          )}

          <Address></Address>
        </ContentService>
        <Button
          hasBackground
          type="submit"
          onSubmit={(e) => e.preventDefault()}
        >
          {" "}
          {t("ClientProfile.MTA")}
        </Button>
      </Content>
      {/* </Content> */}
    </div>
  );
};

export default ProfilePassword;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  /* margin-left: 4.38rem; */
  margin-left: ${(props) => (props.right === false ? "4.38rem" : "none")};
  margin-right: ${(props) => (props.right === true ? "4.38rem" : "none")};
  gap: 1.5rem;
  margin-top: 4.38rem;
  @media (max-width: 1151px) {
    width: 100vw;
    margin: 0;
    padding: 16px;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 1rem;
  border-radius: 32px;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 44.75rem;
  height: 2rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.5rem;
  color: var(--body-text-2, #666);

  font-family: ${style.font.FONT_FAMILY};
  font-size: 0.875rem;

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
  width: 44.75rem;
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
    width: 100%;
    padding: 2px;
  }
`;

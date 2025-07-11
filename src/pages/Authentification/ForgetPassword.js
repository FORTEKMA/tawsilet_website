import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { forgetPassword } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";



const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [showEmailUnused, setShowEmailUnused] = useState(false);
  // const [loading, setLoading] = useState(true); // Change initial state to false
  const navigate = useNavigate();

  const handleForgetPassword = async (data) => {
    try {
      const res = await dispatch(forgetPassword(data));
      // console.log(res?.payload?.ok);
      if (res?.payload?.ok) {
        navigate("/ClientProfile/forgetpasswordmsg");
      } else {
        // console.log("first");
        navigate("/ClientProfile/forgetpasswordmsg");
        // setShowEmailUnused(true);
      }
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if (!loading) {
  //   return <h1>OK OK OK OK</h1>;
  // }

  return (
 
    <Section style={{ paddingBottom: 50, height: "100vh" }}>
      <Content
        right={i18n.language === "ar-AR"}
        onSubmit={handleSubmit(handleForgetPassword)}
      >
        <User style={{ marginBottom: 20, marginTop: 20 }}>
          {t("ForgetPassword.title")}
        </User>
        <ContentService>
          <Input
            name="email"
            type="email"
            className="oinput"
            placeholder="Adresse email"
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: t("SINSCRIREpartenaire.validation.testemail"),
              },
              required: t("SINSCRIRE.validation.email"),
            })}
          />
          {errors?.email && (
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          )}
        </ContentService>
        {showEmailUnused ? (
          <SPPAANN>
              {t("ForgetPassword.span")}{" "}
            <Link to="/SinsecrireClient"> {t("ForgetPassword.link")}</Link>
          </SPPAANN>
        ) : null}
        <Button
          onSubmit={(e) => e.preventDefault()}
          hasBackground
          type="submit"
        >
           {t("ForgetPassword.button")}
        </Button>
      </Content>
    </Section>
  );
};

export default ForgetPassword;
// Define a styled component for the form container
const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
 padding-top: 4.38rem; 
  margin-left: ${(props) => (props.right === false ? "4.38rem" : "none")};
  margin-right: ${(props) => (props.right === true ? "4.38rem" : "none")};
  align-items: center;
  justify-content: center;

  @media (max-width: 1151px) {
    width: 100vw;
    margin: 0;
    padding: 16px;
  }
`;
const Section = styled.section`
  
background-color: #18365A !important;
color: #FFFF;
 
`;

// Define a styled component for an input container
const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 32px;

  @media (max-width: 1151px) {
    width: 100%;
  }
`;

// Define a styled component for input fields
const Input = styled.input`
  width: 44.75rem;
  height: 2rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.5rem;
  color: var(--body-text-2, #666);
  font-family: ${(props) => props.theme.FONT_FAMILY};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5rem;

  @media (max-width: 1151px) {
    width: 100%;
  }
`;

// Define a styled component for a user label
const User = styled.div`
  font-family: ${(props) => props.theme.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.25rem;

  @media (max-width: 1151px) {
    font-size: 1rem;
  }
`;

// Define a styled component for a button
const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 44.75rem;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #d8b56c;
  font-family: ${(props) => props.theme.FONT_FAMILY};
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

const SPPAANN = styled.span`
  a {
    color: #d8b56c;
    text-decoration: none;
  }
`;

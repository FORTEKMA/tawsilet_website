import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";


import { useTranslation } from "react-i18next";


const MessagePasswordReset = () => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <h3>
      {t("MessagePasswordReset.title")}
      <br></br>
      {t("MessagePasswordReset.title2")}
      </h3>
      <Link to="/">
        <h2>{t("MessagePasswordReset.description")}</h2>
      </Link>
    </Container>
  );
};

export default MessagePasswordReset;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #18365a;
  color: #FFF;
  justify-content: flex-start;
  justify-items: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 10% 20%;
  line-height: 32px;
  text-align: center;
  @media (max-width: 1050px) {
    padding: 50px 20px;
  }
  a {
    cursor: pointer;
    border: 1px solid #d8b56c;
    border-radius: 12px;
    padding: 10px 20px;
    margin-top: 30px;
    color: #d8b56c;
    text-decoration: none;
    &:hover {
      background-color: #d8b56c;
      color: #18365a;
    }
  }
`;

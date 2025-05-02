import React from "react";
import styled from "styled-components";
import acceptedCommandCover from "../../assets/images/acceptedcommandcover.png";
import { useTranslation } from "react-i18next";
const Accepted = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <TrackingContainer>
        <h1> {t("ClientProfile.Commande.Message.accepted")}</h1>
        <img src={acceptedCommandCover} alt="acceptedCommandCover" />
      </TrackingContainer>
    </div>
  );
};

export default Accepted;
const TrackingContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
  font-size: 1.3vw;
  padding-inline: 16px;
  @media (max-width: 700px) {
    font-size: 12px;
  }
  img {
    width: 20%;
  }
  h1 {
    color: #18365a;
  }
`;

import React from "react";
import styled from "styled-components";
import completedCommandCover from "../../assets/images/completedCommandCover.png";
import warranty from "../../assets/images/warranty.png";
import { useTranslation } from "react-i18next";
const Completed = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <TrackingContainer>
        <h1> {t("ClientProfile.Commande.Message.completed")}</h1>
        <p>{t("ClientProfile.Commande.Message.merci")}</p>
        <div style={{display:"flex", gap:"10", justifyContent:"center", alignItems:"center"}}>
        <img src={completedCommandCover} alt="completedCommandCover" />
        <img src={warranty} alt="completedCommandCover" />
       </div>
      </TrackingContainer>
    </div>
  );
};

export default Completed;
const TrackingContainer = styled.div`
  width: 50%;
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
    color:#f0f0f0;
  }
`;

import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import styled, { css } from "styled-components";
import { Modal } from "react-responsive-modal";
import MainImage from "../../../assets/images/Frame 755.svg";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ open, setOpen }) => {
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <Modal open={open} onClose={onCloseModal} center>
        <Content>
          <img src={MainImage} alt="confirmation" className="modalImg" />
          <p className="modalTitle"> {t("ConfirmationModal.span")}</p>
          <p className="modalP">
          {t("ConfirmationModal.title")}
          <br></br>
          {t("ConfirmationModal.title2")}
           
          </p>
          <button
            className="modalBtn"
            onClick={() => navigate("/ClientProfile/history")}
          >

           {t("ConfirmationModal.button")}
          </button>
        </Content>
      </Modal>
    </Container>
  );
};

export default ConfirmationModal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
  .modalImg {
    width: 5vw;
    margin-top: 4vh;
    @media (max-width: 1150px) {
      width: 20vw;
      margin-top: 4vh;
      margin-bottom: 2vh;
    }
  }
  .modalTitle {
    font-weight: 700;
    font-size: 2rem;
    color: #4a4a4a;
    line-height: 10vh;
    text-align: center;
    @media (max-width: 1150px) {
      font-size: 1.5rem;
      line-height: 5vh;
    }
  }
  .modalP {
    font-size: 1.1rem;
    width: 80%;
    text-align: center;
  }
  .modalBtn {
    width: 12vw;
    height: 6vh;
    border-radius: 10px;
    background-color: #53b483;
    color: white;
    border: none;
    font-weight: 400;
    font-size: 1.2rem;
    margin: 4vh;
    @media (max-width: 1150px) {
      width: 40vw;
      height: 10vh;
    }
  }
  @media (max-width: 1150px) {
    height: 60vh;
  }
`;

const Container = styled.div`
  background-color: red;
  .react-responsive-modal-modal {
    border-radius: 35px !important;
    @media (max-width: 1150px) {
    }
  }
`;

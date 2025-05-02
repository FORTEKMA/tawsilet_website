import React, { useState } from "react";
import LoginCard from "./LoginCard";
import { Button } from "./Button";
import styled from "styled-components";

const Modale = ({ openModal, closeModal, setShow, show }) => {
  return (
    <div style={{ display: "inline" }}>
      {/* <Button onClick={openModal}>Connexion</Button> */}
      {show && (
        <Modalle className="modal">
          <Overlay className="overlay" onClick={closeModal}></Overlay>
          <ModalContent className="modal-content">
            <LoginCard />
          </ModalContent>
        </Modalle>
      )}
    </div>
  );
};

export default Modale;

const Modalle = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  margin-top: 50px;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: transparent;
  backdrop-filter: blur(15px);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: transparent;
  padding: 14px 28px;
  border-radius: 3px;
  width: 65%;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 20px;
  right: 48px;
  padding: 5px 7px;
  font-size: 20px;
  color: white;
  background-color: transparent;
  border: 2px solid "#F37A1D";
  border-radius: 10px;
`;

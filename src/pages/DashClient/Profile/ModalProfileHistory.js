import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../../../components/Items/Alert";
import ProfileHistoryViewDetails from "./ProfileHistoryViewDetails";

export default function ModalProfileHistory({
  showModal,
  setShowModal,
  selectedOrder,
}) {
  //   console.log(selectedOrder);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {/* <ModalButton onClick={toggleModal} className="btn-modal">
        Open
      </ModalButton> */}

      {showModal && (
        <Modale className="modal">
          <Overlay onClick={toggleModal} className="overlay"></Overlay>
          <ModalContent className="modal-content">
            <ProfileHistoryViewDetails
              toggleModal={toggleModal}
              selectedOrder={selectedOrder}
            />
            {/* <Alert /> */}
            {/* <CloseModalButton className="close-modal" onClick={toggleModal}>
              CLOSE
            </CloseModalButton> */}
          </ModalContent>
        </Modale>
      )}
    </>
  );
}

const ActiveModalBody = styled.body`
  overflow-y: hidden;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  display: block;
  margin: 100px auto 0;
  font-size: 18px;
`;

const Modale = styled.div`
  width: 100vw;
  height: 100vh;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  overflow-x: hidden;
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
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1.4;
  background: transparent;
  padding: 14px 28px;
  border-radius: 3px;
  overscroll-behavior: contain;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;

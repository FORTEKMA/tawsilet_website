import React, { useState } from "react";
import Alert from "./Alert";
import styled  from "styled-components";






export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <ModalButton onClick={toggleModal} className="btn-modal">
        Open
      </ModalButton>

      {modal && (
        <Modale className="modal">
          <Overlay onClick={toggleModal} className="overlay"></Overlay>
          <ModalContent className="modal-content">
            <Alert/>
            <CloseModalButton className="close-modal" onClick={toggleModal}>
              CLOSE
            </CloseModalButton>
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
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
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
`;


import React from "react";
import styled from "styled-components";
import MainImage from "../../../assets/images/Layer 1.svg";
import timerImg from "../../../assets/images/timer1.svg";
import location from "../../../assets/images/location.svg";
import location2 from "../../../assets/images/location2.svg";
import box from "../../../assets/images/boxtime.svg";
import layer from "../../../assets/images/layer.svg";

const Step3 = ({ setStep, command }) => {
  const userLoggedIn = localStorage.getItem("token");
  // console.log(userLoggedIn);
  return (
    <Container>
      <img className="mainImg" src={MainImage} />
      <BoxContainer>
        <img className="imgD" src={timerImg} />
        <div className="textBox">
          <p className="title">Emplacement de ramassage sélectionné</p>
          <span className="detais">
            {command.data.departDate} à {command.data.deparTime}
          </span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={location} />
        <div>
          <p className="title">Adresse de ramassage</p>
          <span className="detais">{command.data.pickUpAddress.Address}</span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={location2} />
        <div>
          <p className="title">Adresse de dépôt</p>
          <span className="detais">{command.data.dropOfAddress.Address}</span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={box} />
        <div className="subCont">
          <p className="title">Mes articles</p>
          <span className="detais">
            {command.data.items.map((item) => (
              <span className="detais">
                {" "}
                {item.quant}*{item.item.name}
              </span>
            ))}
          </span>
        </div>
      </BoxContainer>
      <BoxContainer>
        <img className="imgD" src={layer} />
        <div>
          <p className="title">Accès</p>
          <span className="detais">
            {command.data.pickUpAcces.options} ,{" "}
            {command.data.pickUpAcces.floor} étage
          </span>
        </div>
      </BoxContainer>

      <div className="finalBtn">
        <button
          className="nextButton"
          onClick={() => (userLoggedIn ? setStep(5) : setStep(4))}
        >
          Suivant
        </button>
      </div>
    </Container>
  );
};

export default Step3;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .mainImg {
    width: 15vw;
    @media (max-width: 1150px) {
      width: 40vw;
    }
  }
  .finalBtn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    @media (max-width: 1150px) {
      margin: 20px;
      width: 90%;
    }
  }

  .nextButton {
    background: #F37A1D;

    padding: 12px 24px 12px 24px;
    border-radius: 12px;
    border: 1px;
    gap: 8px;
    width: 10vw;
    height: 7vh;
    font-size: 1vw;
    font-weight: 600;

    box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
    @media (max-width: 1150px) {
      width: 60%;
      font-size: 4vw;
    }
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  width: 60%;
  margin-top: 2%;

  align-items: center;
  @media (max-width: 1150px) {
    width: 85%;
  }
  .title {
    font-size: 1.4rem;
    font-weight: 500;
    @media (max-width: 1150px) {
      font-size: 0.8rem;
    }
  }

  .detais {
    font-size: 16px;
    font-weight: 400;
    @media (max-width: 1150px) {
      font-size: 12px;
    }
  }
  .imgD {
    width: 2vw;
    margin-right: 2vw;
    @media (max-width: 1150px) {
      width: 10vw;
      margin-right: 4vw;
    }
  }
`;

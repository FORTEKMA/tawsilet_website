import React from "react";
import styled from "styled-components";
// import PrestationImage from "../../assets/images/prestation.png";
import { Button } from "../Items/Button";

const PrestationService = () => {
  return (
    <PrestationContainer>
      <div>
        <h3>PRESTATION DE SERVICE</h3>
        <h1></h1>
        <p></p>
        <span></span>
        <Button>EN SAVOIR PLUS</Button>
      </div>
      {/* <img src={PrestationImage} alt="prestation" /> */}
    </PrestationContainer>
  );
};

export default PrestationService;

const PrestationContainer = styled.div`
  display: flex;
  gap: 50px;
  width: 97%;
  margin-inline: auto;
  height: 85vh;
  padding: 50px;
  img {
    height: 60vh;
  }
`;

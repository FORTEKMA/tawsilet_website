import React from "react";
import MapHome from "../../../components/Section/MapHome";
import MapStepper from "../../../components/Section/MapStepper";
import { styled } from "styled-components";

const Step1 = ({ setStep, setCommand, command }) => {
  return (
    <StepContainer>
      <MapStepper setStep={setStep} command={command} setCommand={setCommand} />
    </StepContainer>
  );
};

export default Step1;

const StepContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 999;
`;

import React from "react";
import { Stepper as StepperStyled, Step, StepNumber, StepTitle } from "../styles";

const Stepper = ({ steps, currentStep }) => (
  <StepperStyled>
    {steps.map((step, index) => (
      <Step key={index} active={index + 1 === currentStep}>
        <StepNumber active={index + 1 === currentStep}>
          {index + 1}
        </StepNumber>
        <StepTitle active={index + 1 === currentStep}>{step.title}</StepTitle>
      </Step>
    ))}
  </StepperStyled>
);

export default Stepper;
export { Step, StepNumber, StepTitle }; 
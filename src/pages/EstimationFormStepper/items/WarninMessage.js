import React from "react";
import styled from "styled-components";

const WarningMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  align-items: start;
  /* background-color: #f8d7da; */
  /* color: #721c24; */
  padding: 10px;
  border-radius: 5px;
   @media (max-width: 1150px) {
    display: none !important;
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
  /* padding-top: 6px; */
`;

const DescriptionText = styled.p`
  flex: 1;
  font-size: 14px;
  line-height: 1rem;
  color: grey;
  /* &:first-line {
    line-height: 100% !important;
  } */
`;

const WarningMessage = ({ icon, description }) => {
  return (
    <WarningMessageContainer dir="auto">
      <IconContainer>{icon}</IconContainer>
      <DescriptionText>{description}</DescriptionText>
    </WarningMessageContainer>
  );
};

export default WarningMessage;

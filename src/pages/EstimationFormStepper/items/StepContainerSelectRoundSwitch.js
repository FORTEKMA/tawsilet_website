import React from "react";
import styled from "styled-components";

const RoundSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center" : null)};
  @media (max-width: 1050px) {
    width: 100%;
    font-size: 12px;
  }
`;

const Capsule = styled.div`
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#d8b56c" : "#eee")};
  display: inline-block;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    border-top-right-radius: ${(props) => (props.directionLanguage ? null : 0)};
    border-bottom-right-radius: ${(props) =>
      props.directionLanguage ? null : 0};
    border-top-left-radius: ${(props) => (props.directionLanguage ? 0 : null)};
    border-bottom-left-radius: ${(props) =>
      props.directionLanguage ? 0 : null};
    margin-right: ${(props) => (props.directionLanguage ? "-1px" : "unset")};
  }

  &:last-child {
    border-top-left-radius: ${(props) => (props.directionLanguage ? null : 0)};
    border-bottom-left-radius: ${(props) =>
      props.directionLanguage ? null : 0};
    border-top-right-radius: ${(props) => (props.directionLanguage ? 0 : null)};
    border-bottom-right-radius: ${(props) =>
      props.directionLanguage ? 0 : null};
    margin-left: ${(props) => (props.directionLanguage ? "-1px" : "unset")};
  }
  /* @media (max-width: 1050px) {
    width: 100%;
    font-size: 12px;
  } */
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ active }) => (active ? "#FFF" : "#999")};
  padding: 0 4px;
`;

const StepContainerSelectRoundSwitch = ({
  center = false,
  leftValue = "left",
  rightValue = "right",
  leftLabel,
  rightLabel,
  value,
  onChange,
}) => {
  const handleSwitch = () => {
    onChange(value === leftValue ? rightValue : leftValue);
  };

  return (
    <RoundSwitchContainer center={center}>
      <Capsule active={value === leftValue} onClick={handleSwitch}>
        <Label active={value === leftValue}>{leftLabel}</Label>
      </Capsule>
      <Capsule active={value === rightValue} onClick={handleSwitch}>
        <Label active={value === rightValue}>{rightLabel}</Label>
      </Capsule>
    </RoundSwitchContainer>
  );
};

export default StepContainerSelectRoundSwitch;

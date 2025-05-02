import React from "react";
import styled from "styled-components";

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CircleButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ isMinus }) =>
    isMinus ? "#F37A1D" : "#F37A1D"};
  color: black;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const CountText = styled.span`
  font-size: 18px;
  color: #333;
`;

const CountComponent = ({
  placeholder = 0,
  value,
  onIncrement,
  onDecrement,
}) => {
  const handleClick = (isMinus) => {
    if (isMinus) {
      onDecrement();
    } else {
      onIncrement();
    }
  };

  return (
    <CountContainer>
      <CircleButton onClick={() => handleClick(true)} isMinus>
        -
      </CircleButton>
      {value === 0 ? (
        <CountText>{placeholder}</CountText>
      ) : (
        <CountText>{value}</CountText>
      )}
      <CircleButton onClick={() => handleClick(false)}>+</CircleButton>
    </CountContainer>
  );
};

export default CountComponent;

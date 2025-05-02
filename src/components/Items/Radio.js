
import styled, { css } from "styled-components";
const RadioWrapper = styled.label`
  display: inline-block;
  margin-right: 10px;
  font-family: Arial, sans-serif;
  padding-bottom: 20px;
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const RadioControl = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #bbb;
  transition: all 0.3s ease;

  ${RadioInput}:checked + & {
    background-color: transparent;
    border-color:  rgb(255, 212, 0);
  }

  ${RadioInput}:checked + &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
   
   background-color : rgb(255, 212, 0)
  }
`;

const RadioLabel = styled.span`
  margin-left: 5px;
  color: white;

  ${RadioInput}:checked ~ & {
  
    color: rgb(255, 212, 0);
    
    
  }

`;

const Radio = ({ label, value, checked, onChange , selected}) => {
  
  
  return (
    <RadioWrapper>
      <RadioInput
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <RadioControl />
      <RadioLabel selected={selected}>{label}SIM</RadioLabel>
    </RadioWrapper>
  );
};

export default Radio;










  

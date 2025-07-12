import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const Inpuut = () => {
  const {t,i18n} = useTranslation()
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <>
    <div style={{display:"flex", gap:"20px"}}>
      <InputContainer >
        <Innput type="text" placeholder={t("FormPlaceholders.name")} value={inputValue} onChange={handleInputChange}  />
        <Label hasValue={inputValue.length > 0}>{t("FormPlaceholders.name")}</Label>
      </InputContainer>
      <InputContainer>
        <Innput type="text" placeholder={t("FormPlaceholders.phone")} value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("FormPlaceholders.phone")}</Label>
      </InputContainer>
    </div>
      <InputContainer>
        <Input type="text" placeholder={t("FormPlaceholders.email")} value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("FormPlaceholders.email")}</Label>
      </InputContainer>
      <InputContainer>
 
        <Input  type="text" placeholder={t("FormPlaceholders.message")} value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("FormPlaceholders.message")}</Label>
      </InputContainer>
    </>
  );
};

export default Inpuut;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 25px;
`;
const Innput = styled.input`
  width: 170px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  background-color: white;
  color: #333;
  margin-bottom: 10px;
  transition: border-color 0.3s ease-in-out;
  &::placeholder {
    font-size: 14px;
    color: #959EAD;
  }
  @media (min-width: 360px) and (max-width: 1055px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
  &:focus {
    border-color: #d8b56c;
    outline: none;
  }
`;
const Input = styled.input`
  width: 360px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 3px;
  background-color: white;
  color: #333;
  transition: border-color 0.3s ease-in-out;
  &::placeholder {
    font-size: 14px;
    color: #959EAD;
  }
  @media (min-width: 360px) and (max-width: 1055px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
  &:focus {
    border-color: #d8b56c;
    outline: none;
  }
`;
const Label = styled.label`
  text-align: left;
  position: absolute;
  top: ${({ hasValue }) => (hasValue ? "-8px" : "-8px")};
  left: 10px; 
  font-size: 14px;
  color: #5F6269;
  background-color: white;
  padding: 0 4px;
  transition: all 0.3s ease-in-out;
  z-index: 1;
`;

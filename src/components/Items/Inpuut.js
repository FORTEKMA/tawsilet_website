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
        <Innput type="text" placeholder="Your Name" value={inputValue} onChange={handleInputChange}  />
        <Label hasValue={inputValue.length > 0}>{t("Sheelni-CONTACT.ContactForm.nom")}</Label>
      </InputContainer>
      <InputContainer>
        <Innput type="text" placeholder="Your Name" value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("Sheelni-CONTACT.ContactForm.phone")}</Label>
      </InputContainer>
    </div>
      <InputContainer>
        <Input type="text" placeholder="Yourname@mail.com"value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("Sheelni-CONTACT.ContactForm.emaile")}</Label>
      </InputContainer>
      <InputContainer>
 
        <Input  type="text" placeholder="dd/mm/yyyy" value={inputValue} onChange={handleInputChange} />
        <Label hasValue={inputValue.length > 0}>{t("Sheelni-CONTACT.ContactForm.Message")}</Label>
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
  background-color: transparent;
  color: white;
  margin-bottom: 10px;
  transition: border-color 0.3s ease-in-out;
  &::placeholder {
    font-size: 14px;
   color:#959EAD
  }
  @media (min-width: 360px) and (max-width: 1055px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
  &:focus {
    border-color: #F37A1D;
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
  background-color: transparent;
  color: white;

  transition: border-color 0.3s ease-in-out;
  &::placeholder {
    font-size: 14px;
    color:#959EAD
  }
  @media (min-width: 360px) and (max-width: 1055px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
  &:focus {
    border-color: #F37A1D;
    outline: none;
  }
`;
const Label = styled.label`
   text-align:left;
  position: absolute;
  top: ${({ hasValue }) => (hasValue ? "-12px" : "-28px")};
  left: 3px; 
  font-size: ${({ hasValue }) => (hasValue ? "14px" : "14px")};
  color: ${({ hasValue }) => (hasValue ? "#5F6269" : "#5F6269")};
  transition: all 0.3s ease-in-out;
`;

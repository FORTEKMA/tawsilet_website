import styled, { css } from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useEffect, useState } from "react";
import Cardnumber from "../../../assets/icons/cardnumber.svg";
import Agenda from "../../../assets/icons/calendrier.svg";
import Key from "../../../assets/icons/key.svg";
import Visa from "../../../assets/icons/visa.svg";
import America from "../../../assets/icons/amercia.svg";
import Maestro from "../../../assets/icons/maestro.svg";
import PayementMethod from "./PayementMethod";
import { useTranslation } from "react-i18next";
 
const MethodPayement = ({ label, value, checked, onChange, selected }) => {
  const { t, i18n } = useTranslation();

  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Content>
        <Wrapper>
          <RadioWrapper>
            <RadioInput
              type="radio"
              value={value}
              onChange={onChange}
              checked={checked}
            />
            <RadioControl />
          </RadioWrapper>
          <RadioLabel selected={selected}>
            {label}
            <RadioText>  {t("MethodPayement.method.title1")}</RadioText>
            <RadioDescription>
            {t("MethodPayement.method.title2")}
            </RadioDescription>{" "}
          </RadioLabel>
        </Wrapper>
        <Cards_pay_container>
          <Wrapper>
            <RadioWrapper>
              <RadioInput
                type="radio"
                value={value}
                onChange={onChange}
                checked={checked}
              />
              <RadioControl />
            </RadioWrapper>
            <RadioLabel selected={selected}>
              {label}
              <RadioText>{t("MethodPayement.payement.title1")}</RadioText>
              <RadioDescription>
              {t("MethodPayement.payement.title2")}{" "}
              </RadioDescription>{" "}
            </RadioLabel>
          </Wrapper>{" "}
          <Cardspay>
            <img src={Visa} alt="Update" />
            <img src={Maestro} alt="Update" />
            <img src={America} alt="Update" />
          </Cardspay>
        </Cards_pay_container>
        <ContentService>
          <InputContainer>
            <Input
              name="CardNumber"
              type="text"
              className="oinput"
              placeholder="Card number"
            />
            <IconCard src={Cardnumber} alt="Update" />
          </InputContainer>
          <CalenderandKey>
            <InputContainer>
              <InputCalender
                name="calender"
                type="text"
                className="oinput"
                placeholder="MM / YY"
              />
              <UpdateIcon src={Agenda} alt="Update" />
            </InputContainer>
            <InputContainer>
              <InputKey
                name="key"
                type=""
                className="oinput"
                placeholder="CVV"
              />{" "}
              <UpdateIcon src={Key} alt="Update" />
            </InputContainer>
          </CalenderandKey>
        </ContentService>
        <CheckboxContainer>
          <CheckboxInput
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <CheckboxLabel>{t("MethodPayement.span")}</CheckboxLabel>
        </CheckboxContainer>
        <Button hasBackground>{t("MethodPayement.button")}</Button>
      </Content>
      {/* </Content> */}
    </>
  );
};
export default MethodPayement;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  @media (max-width: 1151px) {
    width: 100%;
    padding: 2rem;
  }
`;
const Wrapper = styled.label`
  display: flex;
  flex-direction: row;
  padding-bottom: 2.39rem;
  align-items: center;
  @media (max-width: 1151px) {
    padding: 0.5rem 0;
    align-items: flex-start;
  }
`;
const RadioWrapper = styled.label`
  padding-right: 2.83rem;
  @media (max-width: 1151px) {
    padding-right: 8px;
  }
`;
const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;
const RadioControl = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  width: 25.487px;
  height: 25.487px;
  border-radius: 50%;
  border: 1px solid #6c6c6c;
  transition: all 0.3s ease;

  @media (max-width: 1151px) {
  }

  ${RadioInput}:checked + & {
    background-color: #F37A1D;
  }
  ${RadioInput}:checked + &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
  }
`;
const RadioLabel = styled.span`
  margin-left: 5px;
  color: white;
  ${RadioInput}:checked ~ & {
    color: rgb(255, 212, 0);
  }
`;
const RadioText = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 42.479px;
  letter-spacing: 0.227px;
  @media (max-width: 1151px) {
    line-height: unset;
  }
`;
const RadioDescription = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.655px;
  letter-spacing: 0.708px;
`;
const Cards_pay_container = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1151px) {
    margin-bottom: 20px;
  }
`;
const Cards_pay = styled.div`
  @media (max-width: 1151px) {
    display: none;
  }
`;
const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 32px;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;
const Input = styled.input`
  width: 44.75rem;
  height: 3rem;
  border-radius: 10px;
  border: transparent;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;
const IconCard = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
  padding-right: 1rem;
`;
const CalenderandKey = styled.label`
  display: flex;
  flex-direction: row;
  padding-top: 2.48rem;
  @media (max-width: 1151px) {
    flex-direction: column;
    gap: 2rem;
  }
`;
const InputCalender = styled.input`
  width: 21.3rem;
  height: 3rem;
  border-radius: 10px;
  border: transparent;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;
const InputKey = styled.input`
  width: 21.3rem;
  height: 3rem;
  border-radius: 10px;
  border: transparent;
  margin-left: 2.3rem;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1151px) {
    width: 100%;
    margin: 0;
  }
`;
const UpdateIcon = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 2.48rem;
`;
const CheckboxInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  background-color: white;
  width: 35.4px;
  height: 35.4px;
  /* top: 20px; */
  &:checked {
    background-color: #2196f3;
    border: 2px solid #2196f3;
  }
  &:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 10px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
const CheckboxLabel = styled.label`
  color: var(--white, #fff);
  font-family: ${style.font.FONT_FAMILY};
  font-size: 16px;
  padding-left: 2.83rem;
  font-weight: 500;
  /* line-height: 76.462px; */
  text-decoration-line: underline;
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 44.75rem;
  height: 3rem;
  margin-top: 2.05rem;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #F37A1D;
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  &:hover {
    background-color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.BACKGROUND_COLOR
        : props.theme.PRIMARY_COLOR};
    color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.PRIMARY_COLOR
        : props.theme.BACKGROUND_COLOR};
  }
  @media (max-width: 1151px) {
    width: 100%;
  }
`;

const Cardspay = styled.div`
  @media (max-width: 1151px) {
    display: none;
  }
`;


import React from 'react';
import styled from 'styled-components';
import update from "../../../assets/icons/edit.svg";
import * as style from "../../../constants/StyleSheets";
import card from "../../../assets/icons/Icon3.png";
import caldn from "../../../assets/icons/Icon.png";
import cv from "../../../assets/icons/Icon (2).png";
import fram from "../../../assets/icons/Frame 670 (1).png";
const PayementMethod = () => {
    return (
      <Container>
        <Payement>
          <Div>
            <input type="radio" name="option" id="option1" />

            <Label htmlFor="option1">Payer à la livraison </Label>
            <Pa>Payer en espèces à la livraison</Pa>
          </Div>
          <UpdateIconne src={fram} alt="Update" />
          <input type="radio" name="option" id="option2" />

          <Label htmlFor="option2">Cartes de crédit/débit</Label>
          <Pa>Payez avec votre carte de crédit / débit</Pa>
        </Payement>
        <Section>
          <InputContainer>
            <Inputtt
              name="name"
              type="text"
              className="oinput"
              placeholder="Card number"
            />
            <UpdateIcon src={card} alt="Update" />
          </InputContainer>

          <InputContainer>
            <Input
              name="name"
              type="text"
              className="oinput"
              placeholder="MM / YY"
            />
            <UpdateIconn src={caldn} alt="Update" />
          </InputContainer>
          <InputContainer>
            <Input
              name="name"
              type="text"
              className="oinput"
              placeholder="CVV"
            />
            <UpdateIconn src={cv} alt="Update" />
          </InputContainer>
        </Section>
            <label style={{ textDecoration: "underline", paddingLeft:"30px" , marginRight:"30px" }}>
          <input type="checkbox" style={{marginRight:"30px"}}/>
          J'accepte les conditions générales
        </label>
        <Button hasBackground> Mettre à jour</Button>
      </Container>
    );
};

export default PayementMethod;
const Div = styled.section`

padding: -10px;



`;
const Label = styled.p`
  font-family: "Inter", sans-serif;
  text-align: center;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-top: -20px;
  margin-right: 1020px;
`;
const Pa = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
margin-bottom: 40px;
  text-align: center;
  line-height: 50px;
  margin-right: 1020px;
  word-spacing: 2px;
`;
const Payement = styled.section`
 
`;
const Container = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
  margin: 40px;
  flex-direction: column;
`;
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 60%;
  margin-left: -90px;

`;
const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 34.75rem;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #d8b56c;
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  margin-left: 26px;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
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
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  width: 70%;
`;

const Input = styled.input`
  width: 20.75rem;
  height: 3rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.75rem;
  color: var(--body-text-2, #666);

  font-size: 0.875rem;

  font-weight: 400;
  line-height: 1.5rem;
`;
const Inputtt = styled.input`
  width: 80.75rem;
  height: 3rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.75rem;
  color: var(--body-text-2, #666);

  font-size: 0.875rem;

  font-weight: 400;
  line-height: 1.5rem;
`;

const UpdateIcon = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
  padding-right: 1.37rem;
`;
const UpdateIconn = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
  padding-right: 13.37rem;
`;
const UpdateIconne = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
  padding-right: 53.37rem;
`;
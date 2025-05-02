import styled, { css } from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useEffect, useState } from "react";
import Cardnumber from "../../../assets/icons/cardnumber.svg";
import Agenda from "../../../assets/icons/calendrier.svg";
import Key from "../../../assets/icons/key.svg";
import Visa from "../../../assets/icons/visa.svg";
import America from "../../../assets/icons/amercia.svg";
import Maestro from "../../../assets/icons/maestro.svg";
import MainImage from "../../../assets/images/Content.svg";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../../redux/ordersSlice/OrderSlice";
import ConfirmationModal from "./ConfirmationModal";
// import PayementMethod from "./PayementMethod";
const Step5 = ({ command, setCommand }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [finalOrder, setFinalOrder] = useState(command);

  const finish = (finalOrder) => {
    dispatch(createNewOrder(finalOrder));
    setOpen(true);
  };

  const ordred = (finalOrder) => {
    if (finalOrder?.data?.payType === null) {
      alert("Veillez choisir la methode de paiement");
    } else if (isChecked === false) {
      alert("Veillez accepter les conditions génerales");
    } else {
      finish(finalOrder);
    }
  };
  // console.log("gggggggggggggg", finalOrder);

  const currentUser = useSelector((store) => store.user.currentUser);
  useEffect(() => {
    setFinalOrder({
      data: {
        ...finalOrder.data,
        client_id: currentUser.id,
        paymentStatus: "processing",
      },
    });
  }, []);

  return (
    <Container>
      <img className="mainImg" src={MainImage} alt="main" />

      <Content>
        <Wrapper>
          <RadioInput
            type="radio"
            className="radioBtn on"
            name="pilih"
            onChange={() =>
              setFinalOrder({
                data: {
                  ...finalOrder.data,
                  payType: "Livraison",
                },
              })
            }
          />

          <RadioLabel>
            <RadioText>Payer à la livraison</RadioText>
            <RadioDescription>
              Payer en espèces à la livraison
            </RadioDescription>{" "}
          </RadioLabel>
        </Wrapper>
        <Cards_pay_container>
          <Wrapper>
            <RadioInput
              type="radio"
              className="radioBtn off"
              // checked
              name="pilih"
              onChange={() =>
                setFinalOrder({
                  data: {
                    ...finalOrder.data,
                    payType: "Credit",
                  },
                })
              }
            />

            <RadioLabel>
              <RadioText>Cartes de crédit/débit</RadioText>
              <RadioDescription>
                Payer avec votre carte de crédit/débit{" "}
              </RadioDescription>{" "}
            </RadioLabel>
          </Wrapper>{" "}
          <CardsPay>
            <img src={Visa} alt="Update" />
            <img src={Maestro} alt="Update" />
            <img src={America} alt="Update" />
          </CardsPay>
        </Cards_pay_container>
        {/* <ContentService>
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
        </ContentService> */}

        <CheckboxContainer>
          <CheckboxInput type="checkbox" onChange={handleCheckboxChange} />
          <CheckboxLabel>J'accepte les conditions génerales</CheckboxLabel>
        </CheckboxContainer>
        <Button hasBackground onClick={() => ordred(finalOrder)}>
          Confirmer Votre Demande
        </Button>
        <ConfirmationModal open={open} setOpen={setOpen} />
      </Content>
      {/* </Content> */}
    </Container>
  );
};
export default Step5;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .mainImg {
    width: 10vw;
    @media (max-width: 1150px) {
      width: 30vw;
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  /* margin-left: 4.38rem; */
  .radioBtn:checked {
    background-color: yellow;
  }
  @media (max-width: 1150px) {
    justify-content: flex-start;
    padding: 10px 20px;
  }
`;
const Wrapper = styled.label`
  display: flex;
  width: 20vw;
  justify-content: flex-start;
  flex-direction: row;
  padding-bottom: 2.39rem;
  align-items: center;
  @media (max-width: 1150px) {
    width: 100%;
  }
  .radioBtn.on:checked {
  }
`;
const RadioWrapper = styled.label`
  padding-right: 2.83rem;

  @media (max-width: 1150px) {
    padding-right: 1rem;
  }
`;
const RadioInput = styled.input`
  margin-right: 3vw;
  cursor: pointer;
  @media (max-width: 1150px) {
    margin-right: 6vw;
  }
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
  ${RadioInput}:checked + & {
    background-color: yellow;
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
    // background-color: white;
  }
`;
const RadioLabel = styled.span`
  margin-left: 5px;
  //   color: white;
  ${RadioInput}:checked ~ & {
    color: #F37A1D;
  }
`;
const RadioText = styled.div`
  font-family: ${style.font.FONT_FAMILY};

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 42.479px;
  letter-spacing: 0.227px;
`;
const RadioDescription = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  //   color: var(--white, #fff);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.655px;
  letter-spacing: 0.708px;
`;
const Cards_pay_container = styled.div`
  display: flex;
  flex-direction: row;
`;
const CardsPay = styled.div`
  margin-left: 20px;
  @media (max-width: 1150px) {
    display: none;
  }
`;
const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 32px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const Input = styled.input`
  width: 44.75rem;
  height: 4.07088rem;
  border-radius: 10px;
  border: transparent;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
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
`;
const InputCalender = styled.input`
  box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
  width: 21.3rem;
  height: 4.07088rem;
  border-radius: 10px;
  border: transparent;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
`;
const InputKey = styled.input`
  width: 21.3rem;
  height: 4.07088rem;
  border-radius: 10px;
  border: transparent;
  margin-left: 2.3rem;
  padding-left: 1.75rem;
  color: var(--body-text-2, #666);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
`;
const UpdateIcon = styled.img`
  position: absolute;
  right: 1rem;
  height: 1.5rem;
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  align-items: center;
  @media (max-width: 1150px) {
    padding-top: 0.5rem;
  }
`;
const CheckboxInput = styled.input`
  /* appearance: none; */
  width: 1vw;
  height: 1vw;
  border: 2px solid #ccc;
  border-radius: 4px;
  /* position: relative; */
  cursor: pointer;
  outline: none;
  //   background-color: white;
  /* width: 35.4px;
  height: 35.4px; */
  /* top: 20px; */
  &:checked {
    background-color: #F37A1D;
    border: 2px solid #F37A1D;
  }
  @media (max-width: 1150px) {
    width: 8vw;
    height: 8vw;
  }

  /* &:checked::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 1px;
    width: 10px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  } */
`;
const CheckboxLabel = styled.label`
  //   color: var(--white, #fff);
  font-family: ${style.font.FONT_FAMILY};
  font-size: 1.2rem;
  padding-left: 1.8rem;
  font-weight: 500;
  line-height: 76.462px;
  text-decoration-line: underline;
  @media (max-width: 1150px) {
    font-size: 0.8rem;
  }
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  /* width: 44.75rem; */
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
`;

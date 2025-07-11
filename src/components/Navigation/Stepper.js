import React, { useState } from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import confirmIcon from "../../assets/icons/confirm-icon-white.svg";
import PriceTotal from "../../pages/DashClient/AddCommand/PriceTotal";
import Step1 from "../../pages/DashClient/AddCommand/Step2";

const StepperLayout = ({ children, step }) => {
  return (
    <Stepper>
      {/* Step pagination ---------------------------------------------------------------------------------------------------------*/}

      <StepPagination>
        {children?.map((child, index) => (
          <React.Fragment key={index}>
            {index + 1 < step ? (
              <StepNum isactive={1} key={index}>
                <img width={14} src={confirmIcon} alt="confirm" />
              </StepNum>
            ) : (
              <StepNum isactive={index === step - 1}>{index + 1}</StepNum>
            )}

            {children.length > index + 1 && <VerticalDivider />}
          </React.Fragment>
        ))}
      </StepPagination>

      {/* -------------------------------------------------------------------------------------------------------------- */}

      {/* Step container ------------------------------------------------------------------------------------------------ */}
      <Main>
        {children?.map((child, index) => {
          if (index === step - 1) {
            return <React.Fragment key={index}>{child}</React.Fragment>;
          }
          return null;
        })}
      </Main>
      {/* ------------------------------------------------------------------------------------------------------ ---------------*/}
      {/* total price -----------------------------------------------------------------------------------------------------------Ò */}
      <PriceTotal />
    </Stepper>
  );
};

export default StepperLayout;

export const Stepper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  // flex-direction: column;
  background-color: white;
  color: ${(p) => p.theme.BACKGROUND_COLOR};
  // padding-bottom: ${style.spacing.PADDING_LARGE};
  // padding-inline: calc(${style.spacing.PADDING_LARGE} * 2);
  padding: 5vh 3vw;

  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

export const Main = styled.div`
  width: 100%;
  padding-left: 9vw;

  @media (max-width: 1150px) {
    padding-left: 0;
  }
`;

export const StepperForm = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  // align-items: center;
  gap: 30px;
  /* border: 1px solid red; */
  /* min-height: 100vh; */
  padding-top: calc(${style.spacing.PADDING_LARGE});
  padding-bottom: ${style.spacing.PADDING_LARGE};
  /* padding-inline: calc(${style.spacing.PADDING_LARGE} * 2); */

  .activeCard {
    background-color: #d8b56c;
    height: 9.5vw;
    @media (max-width: 1150px) {
      height: 100%;
    }
  }
  .estimationImg {
    width: 40vw;
    height: 15vh;

    @media (max-width: 1150px) {
      width: 85vw;
    }
  }
  //-----------------------responsive-----------------------

  @media (max-width: 1150px) {
    align-items: center;
  }

  div {
    display: flex;
    /* flex-direction: column; */
    // align-items: center;
  }
  p {
    color: ${(p) => p.theme.SECONDARY_COLOR};
    opacity: 0.7;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
    width: 83%;
  }
  .cardSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media (max-width: 1150px) {
      flex-wrap: wrap;
    }
  }
  .accesContainer {
    width: 81%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1150px) {
      flex-wrap: wrap;
      width: 100%;
    }
  }
  .AccesIn {
    padding: 16px;
    border-radius: 12px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    width: 49%;
    @media (max-width: 1150px) {
      width: 100%;
      margin-bottom: 2vh;
    }
  }
  .finalBtn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .nextButton {
    background: #d8b56c;

    padding: 12px 24px 12px 24px;
    border-radius: 12px;
    border: 1px;
    gap: 8px;
    width: 10vw;
    height: 7vh;
    font-size: 1vw;
    font-weight: 600;

    box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
    @media (max-width: 1150px) {
      width: 60%;
      font-size: 4vw;
    }
  }
`;

export const StepPagination = styled.div`
  padding-top: calc(${style.spacing.PADDING_LARGE} * 3);

  /* padding-top: calc(${style.spacing.PADDING_LARGE}); */
  /* width: 100px; */
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-inline: 80px;
  @media (max-width: 1150px) {
    flex-direction: row;
    height: 150px;
    padding-top: 0;
  }
`;

export const StepNum = styled.h1`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${style.font.FONT_SIZE_LARGE};
  border: 1px solid black;
  border-radius: 50%;
  padding: ${style.spacing.PADDING_SMALL};
  background-color: ${(p) => (p.isactive ? "black" : "white")};
  color: ${(p) => (p.isactive ? "white" : "black")};
  z-index: ${style.zIndex.Z_INDEX_MEDIUM};
`;

export const VerticalDivider = styled.div`
  width: 0px;
  height: 100vh;
  border: 1px solid black;
  margin: -15px;
  @media (max-width: 1150px) {
    width: 100vw;
    height: 0;
  }
`;

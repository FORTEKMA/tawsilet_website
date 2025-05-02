import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import confirmIcon from "../../assets/icons/confirm-icon-white.svg";
// const stepperBackground = lazy(() =>
//   import("../../assets/images/StepperBackground.svg")
// );
import stepperBackground from "../../assets/images/Mapsiclemap.svg";
// import PriceTotal from "../DashClient/AddCommand/PriceTotal";
// import Step1 from "../DashClient/AddCommand/Step2";

const StepperLayout = ({ children, step, setStep }) => {
  return (
    <Stepper>
      {/* <div
        className="layer"
        style={{
          backgroundColor: "rgba(37, 36, 58, 0.3)",
          width: "100%",
          minHeight: "100%",
          position: "absolute",
          top: "80px",
          left: 0,
          padding: " 0px 0px 40px",
        }}
      ></div> */}
      {/* Step pagination ---------------------------------------------------------------------------------------------------------*/}
      {/* <StepPagination>
        {children?.map((child, index) => (
          <PaginationItem key={index} isactive={index < children.length - 1}>
            {index < step && (
              <StepNum
                isactive={index < step}
                onClick={() => setStep(index + 1)}
              >
                {index + 1}
              </StepNum>
            )}{" "}
            {index < children.length - 1 && (
              <HorizentalDivider isactive={index < step - 1} index={index} />
            )}
            {/* // } 
          </PaginationItem>
        ))}
      </StepPagination> */}
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
      {/* <PriceTotal /> */}
    </Stepper>
  );
};

export default StepperLayout;

export const Stepper = styled.div`
  position: absolute;
  top:0px;
  // background-image: url(${stepperBackground});
  // background-position: top;
  // background-size: cover;
  width: max-content;
  // background-color:green;
  display: flex;
  margin-left:8vw;
  justify-content: flex-start;
  align-items: center;
  // min-height: calc(100vh - 80px);
  overflow-x: scroll;
  flex-direction: column;
  /* background-color: white; */
  color: ${(p) => p.theme.BACKGROUND_COLOR};
  // padding-bottom: ${style.spacing.PADDING_LARGE};
  // padding-inline: calc(${style.spacing.PADDING_LARGE} * 2);
  padding: 1vh 1vw;
  &::-webkit-scrollbar {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    // width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // background: rgba(37, 36, 58, 0.3);
    pointer-events: none;
  }

  @media (max-width: 1150px) {
  // z-index:9999999992;
  top: inherit;
  bottom: 0;
  margin:0;
  width: 100vw;
    display: flex;
    flex-direction: column;
    padding: 0;
    height: auto;
    // min-height: calc(100vh - 80px);
  }
  .layer {
    @media (max-width: 1150px) {
      min-height: 105%;
      height: fit-content;
    }
  }
`;

export const Main = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  //  padding-left: 3vw; 
  //  padding-top: 3vh;

  @media (max-width: 1150px) {
  justify-content: center;
   width:100%;
    padding-left: 0;
    padding-bottom: 6px
  }
`;

export const StepperForm = styled.div`
  display: flex;
  // width: 20vw;
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
    background-color: #F37A1D;
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
    background: #F37A1D;

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

const StepPagination = styled.div`
  /* margin: 0 auto; */
  position: relative;
  margin: 20px auto 40px;
  /* height: 100px; */
  width: 35%;
  max-width: 400px;
  /* background-color: rgba(0, 0, 0, 0.4); */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  @media (max-width: 1150px) {
    width: 90%;
    margin-top: 40px;
  }
`;

const PaginationItem = styled.div`
  position: relative;
  width: ${(props) => (props.isactive ? "23%" : "0%")};
  height: 10px;
  display: flex;
  justify-content: center;
`;

const StepNum = styled.h1`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  background-color: ${(p) => (p.isactive ? "#F37A1D" : "white")};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${(p) => (p.isactive ? "black" : "gray")};
  /* border: 2px solid ${(p) => (p.isactive ? "yellow" : "gray")}; */
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;

  img {
    display: ${(p) => (p.isactive ? "block" : "none")};
  }
`;

const HorizentalDivider = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${(p) =>
    p.isactive
      ? "#F37A1D"
      : !(p.index % 2 === 0)
      ? "rgba(200, 200, 200, 1)"
      : "rgba(255, 255, 255, 1)"};

  /* border: 0.5px solid rgba(200, 200, 200, 0.8); */
`;

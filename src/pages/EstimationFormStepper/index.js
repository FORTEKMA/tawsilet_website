import StepperLayout from "./StepperContainer";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { styled } from "styled-components";

const GetEstimate = ({
  handleMouseDown,
  customTransform,
  dragRef,
  setStep,
  step,
  mapRef,
  grandTunisBounds,
  allTunisiaBounds,
  handleGetLocation,
  directionsResponse
}) => {
  return (
    <div
      onMouseDown={handleMouseDown}
      style={{ ...customTransform, ...(step === 5 && { zIndex: 9999999999 }) }}
      ref={dragRef}
    >
      <StepperLayout step={step} setStep={setStep}>
        <Step1
          setStep={setStep}
          mapRef={mapRef}
          grandTunisBounds={grandTunisBounds}
          handleGetLocation={handleGetLocation}
        />
        <Step2
          setStep={setStep}
          allTunisiaBounds={allTunisiaBounds}
          handleGetLocation={handleGetLocation}
          directionsResponse={directionsResponse}
        />
        <Step3 setStep={setStep} />
        <Step4 setStep={setStep} />
        <Step5 setStep={setStep} />
      </StepperLayout>
      {/* <EstimateStep1 /> */}
      {/* <Stepper /> */}
    </div>
  );
};
export default GetEstimate;

export const StepCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  gap: 30px;
  width: 100%;
  @media (max-width: 1150px) {
    // flex-direction: column-reverse;
    height: 100vh;
    overflow: scroll;
    padding-top: 15vh;
    padding-bottom: 20px;
    // flex-wrap: wrap-reverse;
  }
`;

export const StepContainerLayout = styled.div`
  ${(props) => props.pointer && { cursor: "pointer" }}
  position: relative;
  flex-wrap: wrap;
  // width: 45%;
  max-width: 400px;
  min-width: 350px;
  /* height: 500px; */
  /* overflow: hidden; */
  background-color: white;
  /* border: 1px solid rgba(0, 0, 0, 0.4); */
  border-radius: 6px 6px 0px 0px;
  -webkit-box-shadow: 7px 7px 0px 2px
    ${(props) => props.shadowColor || "#F37A1D"};
  -moz-box-shadow: 7px 7px 0px 2px ${(props) => props.shadowColor || "#F37A1D"};
  box-shadow: 7px 7px 0px 2px ${(props) => props.shadowColor || "#F37A1D"};
  transition: height 0.5s ease-in-out; /* Add animation transition */
  @media (max-width: 1150px) {
    cursor: auto;
    width: 90%;
    max-width: 100%;
    -webkit-box-shadow: 4px 4px 0px 1px
      ${(props) => props.shadowColor || "#F37A1D"};
    -moz-box-shadow: 4px 4px 0px 1px
      ${(props) => props.shadowColor || "#F37A1D"};
    box-shadow: 4px 4px 0px 1px ${(props) => props.shadowColor || "#F37A1D"};
  }
`;

export const StepContainerInfor = styled.div`
  background-color: ${(props) => (props?.selectedCard ? "#050b32" : "white")};
  color: ${(props) => (props?.selectedCard ? "#F37A1D" : "gray")};
  position: absolute;
  height: 100%;
  /* background-color: red; */
  width: 100%;
  z-index: 9999999999999;
  border-radius: 20px;
  gap: 20px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1150px) {
    padding: 60px;
  }
  .bigIcon {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 14px;
  }
`;

export const StepContainerHeader = styled.div`
  width: 100%;
  /* background-color: red; */
  height: ${(props) => props.height || "60px"};
  /* background-color: aliceblue; */
  padding: 10px 20px 10px;
  border-radius: 6px 6px 0px 0px;
  background-color: ${(props) => props.background || "white"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: auto;
    height: auto;
    cursor: pointer;
    ${(props) =>
      !props.selected
        ? "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(241deg) brightness(103%) contrast(103%);"
        : "filter: brightness(0) saturate(100%) invert(5%) sepia(2%) saturate(342%) hue-rotate(314deg) brightness(87%) contrast(81%);"}
  }
  .bigIcon {
    width: 40px;
    height: 40px;
    ${(props) =>
      !props.selected &&
      "filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(241deg) brightness(103%) contrast(103%);"}
  }
`;

export const StepContainerHeaderTitle = styled.h2`
  text-transform: uppercase;
  /* color: black; */
  color: ${(props) => (!props.selected ? "white" : "#18365a")};
  /* -webkit-text-shadow: ${(props) =>
    !props.selected ? "none" : "1px 1px 0px #F37A1D"};
  -moz-text-shadow: ${(props) =>
    !props.selected ? "none" : "1px 1px 0px #F37A1D"};
  text-shadow: ${(props) =>
    !props.selected ? "none" : "1px 1px 0px #F37A1D"}; */
  font-size: 20px;
  img {
    padding-right: 20px;
    transform: ${(props) =>
      props.directionflesh ? "scaleX(-1)" : "scaleX(1)"};
    -webkit-filter: drop-shadow(-1px 1px 0px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(-1px 1px 0px rgba(0, 0, 0, 0.7));
  }
  span {
    font-size: 16px;
  }
  h1 {
    font-size: 38px;
    position: relative;
    top: 0;
    rotation: rotate 180deg;
  }
  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .down-flesh {
    padding: 4px;
    width: 20px;
    transform: rotate(90deg);
    transition: transform 0.3s ease; 
  }
  .up-flesh {
    padding: 4px;
    width: 20px;
    transform: rotate(270deg);
    transition: transform 0.3s ease; 
  }
`;

export const StepContainerBody = styled.div`
  /* background-color: blue; */
  // min-height:60px;
    transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "16px"};
  padding: 10px 20px 20px;
  .depart-date {
    text-align: center;
    font-size: 14px;
    color: gray;
  }
  .card-body-title {
    color: ${(props) => (props.selected ? "black" : "gray")};
  }
`;

export const StepContainerBodyModal = styled.div``;

export const StepContainerNext = styled.div``;
export const StepContainerButtonRight = styled.button`
  cursor: pointer;
  padding: 12px 24px;
  z-index: 99;
  color: ${(props) => (props.selectedCard ? "black" : "white")};
  background-color: ${(props) =>
    props.selectedCard ? "#F37A1D" : "rgba(200,200,200)"};
  border-radius: 12px;
  -webkit-box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  -moz-box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  /* width: fit-content; */
  border: none;
  align-self: flex-end;
  /* flex-basis: 200px; */
  /* align-content: flex-end;
  justify-self: flex-end; */
  /* margin-left: 200px;*/

  margin: 10px;
  /* align-self: flex-end; */
  @media (max-width: 1150px) {
    flex-basis: 40%;
    margin-inline: auto;
  }
`;

export const StepContainerButton = styled.button`
  padding: 12px 24px;
  background-color: #f37a1d;
  color: white;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  -moz-box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  box-shadow: 2px 2px 0px 1px rgba(37, 36, 58, 1);
  width: fit-content;
  border: none;
  align-self: flex-end;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 10px;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  background-color: rgba(100, 100, 100, 0.1);
  padding-left: 50px;
  border: transparent;
  font-size: 16px;
  @media (max-width: 744px) {
    height: 40px;
  }
`;

export const InputItem = styled.div`
  position: relative;
`;

export const InputIcon = styled.img`
  width: auto;
  height: 40%;
  position: absolute;
  transform: translate(100%, 70%);
`;

// Styled icon component
export const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const AccesBlocConatiner = styled.div`
  display: flex;
  color: #18365a;
  font-size: 15px;
  align-items: center;
  flex-direction: ${(props) =>
    props.directionLanguage ? "row-reverse" : "row"};

  justify-content: space-between;
  @media (max-width: 1150px) {
    // flex-direction: ${(props) => props.direction || "row"};
    flex-direction: row;
    width: 100%;
    /* justify-content: center; */
    align-items: flex-start;
    gap: ${(props) => (props.direction ? "20px" : 0)};
    /* background-color: red; */
    h2 {
      display: none !important;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 10px;
  transform: scale(1.2);
  .btn {
    cursor: pointer;
    color: black;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    -webkit-box-shadow: 1px 1px 0px 1px
      ${(props) => props.shadowColor || "rgba(0, 0, 0, 1)"};
    -moz-box-shadow: 1px 1px 0px 1px
      ${(props) => props.shadowColor || "rgba(0, 0, 0, 1)"};
    box-shadow: 1px 1px 0px 1px
      ${(props) => props.shadowColor || "rgba(0, 0, 0, 1)"};
  }
  .white-btn {
    background-color: white;
  }
  .orange-btn {
    background-color: #f37a1d;
  }
`;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// async function calculateRoute({ originRef, destiantionRef }) {
//   if (originRef === "" || destiantionRef === "") {
//     return;
//   }
//   // eslint-disable-next-line no-undef
//   const directionsService = new google.maps.DirectionsService();
//   Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
//   // let originPositionAddress = originPosition
//   //   ? Geocode.fromLatLng(originPosition.lat, originPosition.lng)
//   //   : null;

//   // Geocode.fromLatLng(destinationPosition.lat, destinationPosition.lng).then(
//   //   (response) =>
//   //     setDestinationPositionAddress(response.results[0].formatted_address)
//   // );
//   // console.log(originRef, "++++++", destiantionRef);
//   // console.log(destinationPositionAddress);

//   const results = await directionsService.route({
//     origin: originRef, //|| originPosition,
//     destination: destiantionRef, // || destinationPosition ,
//     // eslint-disable-next-line no-undef
//     travelMode: google.maps.TravelMode.DRIVING,
//   });
//   // console.log(results);
//   setCommand({
//     ...command,
//     data: {
//       ...command?.data,
//       distance: results.routes[0].legs[0].distance.value,
//       duration: results.routes[0].legs[0].duration.text,
//       pickUpAddress: {
//         ...command?.data?.pickUpAddress,
//         coordonne: {
//           lat: results.routes[0].legs[0].start_location.lat(),
//           lng: results.routes[0].legs[0].start_location.lng(),
//         },
//       },
//       dropOfAddress: {
//         ...command?.data?.dropOfAddress,
//         coordonne: {
//           lat: results.routes[0].legs[0].end_location.lat(),
//           lng: results.routes[0].legs[0].end_location.lng(),
//         },
//       },
//     },
//   });
//   setDirectionsResponse(results);
//   setDistance(results.routes[0].legs[0].distance.value);
//   setDuration(results.routes[0].legs[0].duration.text);

//   setOriginPosition({
//     lat: results.routes[0].legs[0].start_location.lat(),
//     lng: results.routes[0].legs[0].start_location.lng(),
//   });

//   setDestinationPosition({
//     lat: results.routes[0].legs[0].end_location.lat(),
//     lng: results.routes[0].legs[0].end_location.lng(),
//   });

//   // results.routes[0].legs[0].end_location.lat();        end location lat
//   // results.routes[0].legs[0].end_location.lng();        end location lng

//   // results.routes[0].legs[0].start_location.lat();         start location lat
//   // results.routes[0].legs[0].start_location.lng();          start location lng

//   // results.request.destination.query;
//   // results.request.origin.query;
//   // console.log(originPosition, destinationPosition);
// }

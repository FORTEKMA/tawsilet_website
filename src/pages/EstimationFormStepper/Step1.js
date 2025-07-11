import React, { useEffect, useRef, useState, lazy } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { styled } from "styled-components";
import {
  InputIcon,
  InputItem,
  StepContainerBody,
  StepContainerButton,
  StepContainerHeader,
  StepContainerHeaderTitle,
  StepContainerLayout,
  StyledIcon,
} from ".";
import iconMarker from "../../assets/icons/current-location.svg";
import markerStep from "../../assets/icons/markerStep.svg";
import downFlesh from "../../assets/icons/fleshrightblue.svg";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updatePickUpAddress } from "../../redux/newCommand/newCommandSlice";
import { useMediaQuery } from "react-responsive";

const Step1 = ({ setStep, mapRef, grandTunisBounds, handleGetLocation }) => {
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);
  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const isResponsive = useMediaQuery({ maxWidth: 1150 });
  const originRef = useRef();
  const autocompleteRef = useRef(null);
  const [t] = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextStep = () => {
    const { pickUpAddress } = command;
    if (pickUpAddress?.Address) {
      mapRef.current.setZoom(8);
      mapRef.current.panTo({ lat: 35.600253, lng: 9.18617 });
      setStep(2);
    } else {
      alert(t("Step1.remplir"));
    }
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      dispatch(
        updatePickUpAddress({
          Address: place.formatted_address,
          coordonne: { latitude: lat, longitude: lng },
        })
      );
    }
  };

  const handleAddressChange = (e) => {
    dispatch(
      updatePickUpAddress({ ...command.pickUpAddress, Address: e.target.value })
    );
  };

  return (
    <StepContainerLayout>
      <StepContainerHeader dir="auto">
        <StepContainerHeaderTitle
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
          selected={true}
        >
          {t("Step1.DÉPART")}
          <img
            style={{ width: 50, padding: 10 }}
            src={iconMarker}
            onClick={handleGetLocation}
            alt="flesh"
          />
        </StepContainerHeaderTitle>
        {isResponsive && (
          <StepContainerHeaderTitle selected={true}>
            <img
              className={minimizeWindow ? "up-flesh" : "down-flesh"}
              src={downFlesh}
              onClick={() => setMinimizeWindow(!minimizeWindow)}
              alt="minimize"
            />
          </StepContainerHeaderTitle>
        )}
      </StepContainerHeader>
      {!minimizeWindow ? (
        <StepContainerBody>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
            bounds={grandTunisBounds}
            options={{
              componentRestrictions: { country: "tn" },
              strictBounds: true,
            }}
          >
            <InputItem dir="auto">
              <InputIcon src={markerStep} alt="markerStep" />
              <Input
                value={command.pickUpAddress.Address}
                autoComplete="off"
                name="number"
                type="text"
                className="inputt"
                autoFocus={!isResponsive}
                onChange={handleAddressChange}
                placeholder={
                  command?.pickUpAddress?.Address || t("Step1.Adresse-départ")
                }
                ref={originRef}
              />
            </InputItem>
          </Autocomplete>
          <StepContainerButton onClick={handleNextStep}>
            {t("Step1.Btn-saisire")}
          </StepContainerButton>
        </StepContainerBody>
      ) : (
        <StepContainerBody>
          <h4 style={{ color: "black" }}> {t("Step1.detail")}</h4>
        </StepContainerBody>
      )}
    </StepContainerLayout>
  );
};

export default Step1;

const Input = styled.input`
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

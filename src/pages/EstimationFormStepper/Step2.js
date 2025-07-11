import React, { useEffect, useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
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
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import markerStep from "../../assets/icons/markerStep.svg";
import iconMarker from "../../assets/icons/current-location.svg";
import { useTranslation } from "react-i18next";
import { updateDropOfAddress } from "../../redux/newCommand/newCommandSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import downFlesh from "../../assets/icons/fleshrightblue.svg";

const Step2 = ({ setStep, allTunisiaBounds, handleGetLocation, directionsResponse }) => {
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);
  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const isResponsive = useMediaQuery({ maxWidth: 1150 });
  const { t, i18n } = useTranslation();
  const autocompleteRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddressChange = (e) => {
    dispatch(
      updateDropOfAddress({
        ...command.dropOfAddress,
        Address: e.target.value,
      })
    );
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      dispatch(
        updateDropOfAddress({
          Address: place.formatted_address,
          coordonne: { latitude: lat, longitude: lng },
        })
      );
    }
  };

  const handleNextStep = () => {
    if (command?.dropOfAddress?.Address && directionsResponse) {
      setStep(3);
    } else {
      alert(t("Step1.remplirA"));
    }
  };

  const isLanguageRTL = i18n.language === "ar-AR";

  return (
    <StepContainerLayout>
      <StepContainerHeader dir="auto" directionflesh={isLanguageRTL}>
        <StepContainerHeaderTitle
          selected={true}
          directionflesh={isLanguageRTL}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={previousFleshIcon}
              onClick={() => setStep(1)}
              alt="flesh"
            />
            {t("Step2.ARRIVÉÉ")}
          </div>
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
            style={{ zIndex: 9999, width: "100%" }}
            bounds={allTunisiaBounds}
            options={{
              componentRestrictions: { country: "tn" },
            }}
          >
            <InputItem dir="auto">
              <InputIcon src={markerStep} alt="markerStep" />
              <Input
                value={command?.dropOfAddress?.Address || ""}
                autoComplete="off"
                name="address"
                type="text"
                className="inputt"
                autoFocus={!isResponsive}
                onChange={handleAddressChange}
                placeholder={
                  command?.dropOfAddress?.Address || t("Step2.Adresse-arrivée")
                }
              />
            </InputItem>
          </Autocomplete>
          <StepContainerButton onClick={handleNextStep}>
            {t("Step2.Btn-saisire-objet")}
          </StepContainerButton>
        </StepContainerBody>
      ) : (
        <StepContainerBody>
          <h4 style={{ color: "black" }}>{t("Step1.detail")}</h4>
        </StepContainerBody>
      )}
    </StepContainerLayout>
  );
};

export default Step2;

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

import React, { useEffect, useRef, useState, lazy } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { styled } from "styled-components";
import {
  AccesBlocConatiner,
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

import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";

import markerStep from "../../assets/icons/markerStep.svg";
import WarningIcon from "../../assets/icons/warningIcon.svg";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCommand,
  updatePickUpAcces,
  updatePickUpAddress,
} from "../../redux/newCommand/newCommandSlice";
import downFlesh from "../../assets/icons/fleshrightblue.svg"

const DateTimeInput = lazy(() => import("./items/DateTimeInput"));
const ToggleSwitch = lazy(() => import("./items/ToggleSwitch"));
const WarningMessage = lazy(() => import("./items/WarninMessage"));
const StepContainerSelectRoundSwitch = lazy(() =>
  import("./items/StepContainerSelectRoundSwitch")
);
import CountComponent from "./items/CountComponent";
import { useMediaQuery } from "react-responsive";

const Step1 = ({ setStep, mapRef, grandTunisBounds, handleGetLocation }) => {
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);

  const [clickedSwitch, setClickedSwitch] = useState(false);
  const [dateSwitcher, setDateSwitcher] = useState(true);
  const [accesToggle, setAccesToggle] = useState(
    command?.pickUpAcces?.options === "Ascenseur"
  );
  const [count, setCount] = useState(command?.pickUpAcces?.floor);
  const [switchValue, setSwitchValue] = useState(
    command?.pickUpAcces?.options === "Camion" ? "Camion" : false
  );

  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const isResponsive = useMediaQuery({ maxWidth: 1150 });

  const originRef = useRef();
  const autocompleteRef = useRef(null);

  const [t] = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (switchValue) {
      dispatch(updatePickUpAcces({ floor: 0, options: "Camion" }));
    } else {
      const accessOptions =
        count === 0 ? "Rez-de-chaussée" : accesToggle ? "Ascenseur" : "Monter";
      dispatch(updatePickUpAcces({ floor: count, options: accessOptions }));
    }
  }, [accesToggle, count, switchValue]);

  const currentHour = new Date().getHours();
  const isDisabled = currentHour >= 18 || currentHour < 5;

  const handleNextStep = () => {
    const { pickUpAddress, departDate, deparTime } = command;
    if (pickUpAddress?.Address && departDate && deparTime) {
      mapRef.current.setZoom(8)
      mapRef.current.panTo({ lat: 35.600253, lng: 9.18617 })
      setStep(2);
    } else {
      alert(t("Step1.remplir"));
    }
  };

  // const handleGetLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("🚀 ~ handleGetLocation ~ position:", position);
  //         const { latitude, longitude } = position.coords;
  //         console.log({ lat: latitude, lng: longitude });
  //         getAddressFromCoordinates(latitude, longitude);
  //         dispatch(
  //           updatePickUpAddress({
  //             // Address: place.formatted_address,
  //             coordonne: { latitude, longitude },
  //           })
  //         );
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         alert(t("Step1.alert.unable_to_get_location"));
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by your browser.");
  //   }
  // };

  // const handleResetForm = () => {
  //   dispatch(clearCommand())
  //   setCount(0)
  //   setClickedSwitch(false)
  //   setDateSwitcher(false)
  //   setAccesToggle(false)
  //   setSwitchValue("Camion")
  // }

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
      // if (mapRef.current) {
      //   mapRef.current.panTo(new window.google.maps.LatLng(lat, lng));
      //   mapRef.current.setZoom(8); // Adjust zoom level as needed
      // }
    }
  };

  const handleAddressChange = (e) => {
    dispatch(
      updatePickUpAddress({ ...command.pickUpAddress, Address: e.target.value })
    );
  };

  const onDateChange = (checked) => setDateSwitcher(checked);

  const handleSwitchChange = (newValue) => setSwitchValue(newValue);

  const handleIncrement = () =>
    setCount((prevCount) => (prevCount < 163 ? prevCount + 1 : prevCount));
  const handleDecrement = () =>
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));

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

        {/* <h4 style={{color:"black"}} onClick={handleGetLocation}> Fetch  </h4> */}
        {/* <h4 style={{color:"black"}} onClick={handleResetForm}> Reset  </h4> */}
        {isResponsive && (
          <StepContainerHeaderTitle selected={true}>
            <img className={minimizeWindow ? "up-flesh"  :"down-flesh" } src={downFlesh} onClick={() => setMinimizeWindow(!minimizeWindow)} alt="minimize"/>
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
              // types: ["address"],
              componentRestrictions: { country: "tn" },
              strictBounds: true, 
            }}
          >
            <InputItem dir="auto">
              <InputIcon src={markerStep} alt="markerStep" />
              <Input
                value={command.pickUpAddress.Address}
                autocomplete={false}
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

          <DateTimeInput
            defaultTime={command?.deparTime}
            defaultDate={command?.departDate}
            updateHour={setDateSwitcher}
            checkedHour={dateSwitcher}
            isDisabled={isDisabled}
          />

          <div dir="auto">
            <span
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                if (isDisabled) setClickedSwitch(true);
              }}
            >
              <ToggleSwitch
                id="newsletter"
                checked={dateSwitcher}
                onChange={onDateChange}
                optionLabels={["", ""]}
                small={false}
              />
              <Label htmlFor="newsletter">{t("Step1.Au-plus")}</Label>
            </span>
            {isDisabled && clickedSwitch && (
              <span style={{ color: "darkred", fontSize: 14 }}>
                {t("Step1.ServiceUnavailable")}
              </span>
            )}
          </div>

          <AccesBlocConatiner
            directionLanguage={i18n.language === "ar-AR"}
            direction="column"
          >
            <h2>{t("Step1.Accés")}</h2>
            <StepContainerSelectRoundSwitch
              directionLanguage={i18n.language === "ar-AR"}
              leftValue="Camion"
              rightValue={false}
              leftLabel={t("Step1.Aupied")}
              rightLabel={t("Step1.chezMoi")}
              value={switchValue}
              onChange={handleSwitchChange}
            />
          </AccesBlocConatiner>

          {!switchValue && (
            <AccesBlocConatiner
              directionLanguage={i18n.language === "ar-AR"}
              direction="column"
            >
              <CountComponent
                placeholder="RDC"
                value={count}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
              {count !== 0 && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <ToggleSwitch
                    id="accesDepart"
                    checked={accesToggle}
                    onChange={() => setAccesToggle(!accesToggle)}
                    optionLabels={["", ""]}
                    small={false}
                  />
                  <label htmlFor="accesDepart"> {t("Step1.RDC")}</label>
                </span>
              )}
            </AccesBlocConatiner>
          )}

          <WarningMessage
            icon={<StyledIcon src={WarningIcon} alt="warningIcon" />}
            description={t("Step1.Info")}
          />
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

const StepContainer = styled.div`
  width: 100vw;
  height: 100vh;

  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

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

const Calendar = styled.div`
  padding: 0;
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;

const InputCalendar = styled.input`
  width: 50%;
  padding: 5px;
  height: 50px;
  border-radius: 10px;
  border: transparent;
  color: #aaaaaa;
  @media (max-width: 744px) {
    width: 50%;
    height: 40px;
  }
`;
const Label = styled.label`
  color: #aaaaaa;
`;

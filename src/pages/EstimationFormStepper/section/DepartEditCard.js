import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import DateTimeInput from "../items/DateTimeInput";
import ToggleSwitch from "../items/ToggleSwitch";
import {
  AccesBlocConatiner,
  ButtonContainer,
  Input,
  InputIcon,
  InputItem,
} from "..";
import markerStep from "../../../assets/icons/markerStep.svg";
import StepContainerSelectRoundSwitch from "../items/StepContainerSelectRoundSwitch";
import CountComponent from "../items/CountComponent";
// import { styled } from "styled-components";

// import { set } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const DepartEditCard = ({ setShow, setPing, ping }) => {
  const [t, i18n] = useTranslation();
  const command = useSelector((store) => store?.newCommand?.command);
  const dispatch = useDispatch();

  const [clickedSwitch, setClickedSwitch] = useState(false);

  /** @type React.MutableRefObject<HTMLInputElement> */

  const originRef = useRef();
  const [originState, setOriginState] = useState(null);

  const [dateSwitcher, setDateSwitcher] = useState(false);
  const onDateChange = (checked) => {
    setDateSwitcher(checked);
  };
  // Get the current hour (0-23) in the user's local time
  const currentHour = new Date().getHours();

  // Check if the current hour is between 18 (7:00 PM) and 7 (7:00 AM)
  const isDisabled = currentHour >= 18 || currentHour < 7;

  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
  };
  const [count, setCount] = useState(command?.pickUpAcces?.floor);

  const handleIncrement = () => {
    if (count < 163) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const [switchValue, setSwitchValue] = useState(
    command?.pickUpAcces?.options === "Camion" ? "Camion" : false
  );

  const [accesToggle, setAccesToggle] = useState(
    command?.pickUpAcces?.options === "Ascenseur"
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transform: "scale(0.8)",
      }}
    >
      <>
        <DateTimeInput
          defaultTime={command?.deparTime}
          defaultDate={command?.departDate}
          command={command}
          setCommand={setCommand}
          updateHour={setDateSwitcher}
          checkedHour={dateSwitcher}
          isDisabled={isDisabled}
        />
        <div>
          <span
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              if (isDisabled) {
                setClickedSwitch(true);
              }
            }}
          >
            {" "}
            <ToggleSwitch
              id="newsletter"
              checked={dateSwitcher}
              onChange={onDateChange}
              optionLabels={["", ""]}
              small={false}
              // disabled={isDisabled} // Disable the ToggleSwitch based on the time condition
            />
            <label htmlFor="newsletter"> {t("Step1.Au-plus")}</label>
          </span>
          {isDisabled && clickedSwitch ? (
            <span style={{ color: "darkred", fontSize: 14 }}>
              Service indisponible de 20h à 7h.
            </span>
          ) : (
            ""
          )}
        </div>
        {/* {!(dateSwitcher || command?.departDate) && (
            <WarningMessage
              icon={<StyledIcon src={WarningIcon} />}
              description={`Vous pouvez choisir "Au plus tôt" pour une prise en charge dans l'heure, ou planifier une date et une heure spécifique.`}
            />
          )} */}
      </>

      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.setBounds({
            // Define the boundaries of Île-de-France region
            east: 2.8666,
            west: 2.2241,
            north: 49.0391,
            south: 48.3647,
          });
        }}
        options={{
          strictBounds: true, // Restrict results to the specified bounds
          types: ["address"], // Restrict results to only show addresses
        }}
        style={{ zIndex: 9999999999999, width: "100%" }}
        onPlaceChanged={() => {
          setOriginState(originRef?.current?.value);
          setCommand({
            ...command,
            data: {
              ...command.data,
              pickUpAddress: {
                ...command.data.pickUpAddress,
                Address: originRef?.current?.value,
              },
            },
          });
          // clearRoute();
          // calculateRoute();
        }}
      >
        <InputItem>
          <InputIcon src={markerStep} alt="markerStep" />
          <Input
            autocomplete={false}
            name="number"
            type="text"
            className="inputt"
            placeholder={
              command?.pickUpAddress?.Address || t("Step1.Adresse-départ")
            }
            ref={originRef}
          />
        </InputItem>
      </Autocomplete>
      <StepContainerSelectRoundSwitch
        leftValue="Camion"
        rightValue={false}
        rightLabel={t("Step1.chezMoi")}
        leftLabel={t("Step1.Aupied")}
        value={switchValue}
        onChange={handleSwitchChange}
      />
      {!switchValue && (
        <AccesBlocConatiner>
          <CountComponent
            placeholder="RDC"
            value={count}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          {count === 0 ? null : (
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
      <ButtonContainer>
        <button
          // onClick={(e) => {
          //   setShow(""), e.stopPropagation();
          // }}
          className="white-btn btn"
        >
          {t("Step4.annuler")}
        </button>

        <button
          className="orange-btn btn"
          onClick={() => {
            // setCommand({
            //   ...command,
            //   data: {
            //     ...command.data,
            //     pickUpAcces: switchValue
            //       ? { options: "Camion", floor: 0 }
            //       : count === 0
            //       ? { options: "Rez-de-chaussée", floor: 0 }
            //       : {
            //           options: `${accesToggle ? "Ascenseur" : "Monter"}`,
            //           floor: count,
            //         },
            //   },
            // });
            // setPing(!ping);
            setShow("");
          }}
        >
          {t("Step4.confirmer")}
        </button>
      </ButtonContainer>
    </div>
  );
};

export default DepartEditCard;

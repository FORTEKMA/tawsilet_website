import React, { useRef, useState } from "react";
import {
  AccesBlocConatiner,
  ButtonContainer,
  Input,
  InputIcon,
  InputItem,
} from "..";
import { Autocomplete } from "@react-google-maps/api";
import markerStep from "../../../assets/icons/markerStep.svg";
import StepContainerSelectRoundSwitch from "../items/StepContainerSelectRoundSwitch";
import ToggleSwitch from "../items/ToggleSwitch";
import CountComponent from "../items/CountComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ArriveeEditCard = ({ setShow }) => {
  const [t, i18n] = useTranslation();
  const command = useSelector((store) => store?.newCommand?.command);
  const dispatch = useDispatch();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const [destiantionState, setDestiantionState] = useState(null);

  const [accesToggle, setAccesToggle] = useState(
    command?.dropAcces?.options === "Ascenseur"
  );

  const onAccesChange = (checked) => {
    setAccesToggle(checked);
  };

  const [switchValue, setSwitchValue] = useState(
    command?.dropAcces?.options === "Camion" ? "Camion" : false
  );

  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
  };

  // ------------- acces count ------------------------------------------------------
  const [count, setCount] = useState(command?.dropAcces?.floor);

  const handleIncrement = () => {
    if (count < 163) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };
  // -------------------------------------------------------------------

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transform: "scale(0.8)",
      }}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.setBounds({
            // Define the approximate boundaries of Europe
            east: 39.6494, // Easternmost point
            west: -9.8274, // Westernmost point
            north: 71.1855, // Northernmost point
            south: 35.3964, // Southernmost point
          });
        }}
        options={{
          strictBounds: true, // Restrict results to the specified bounds
          types: ["address"], // Restrict results to only show addresses
        }}
        style={{ zIndex: 9999999999999, width: "100%" }}
        onPlaceChanged={() => {
          setDestiantionState(destiantionRef?.current?.value);
          // setCommand({
          //   ...command,
          //   data: {
          //     ...command.data,
          //     dropOfAddress: {
          //       ...command.data.pickUpAddress,
          //       Address: destiantionRef?.current?.value,
          //     },
          //   },
          // });
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
              command?.dropOfAddress?.Address ||
              t("Step2.Adresse-arrivée")
            }
            ref={destiantionRef}
          />
        </InputItem>
      </Autocomplete>
      <StepContainerSelectRoundSwitch
        leftValue={"Camion"}
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
                id="newsletter"
                checked={accesToggle}
                onChange={setAccesToggle}
                optionLabels={["", ""]}
                small={false}
              />
              <label htmlFor="newsletter"> {t("Step1.RDC")}</label>
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
            setCommand({
              ...command,
              data: {
                ...command.data,
                dropAcces: switchValue
                  ? { options: "Camion", floor: 0 }
                  : count === 0
                  ? { options: "Rez-de-chaussée", floor: 0 }
                  : {
                      options: `${accesToggle ? "Ascenseur" : "Monter"}`,
                      floor: count,
                    },
              },
            });
            setPing(!ping);
            setShow("");
          }}
        >
          {t("Step4.confirmer")}
        </button>
      </ButtonContainer>
    </div>
  );
};

export default ArriveeEditCard;

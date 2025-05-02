import React, { lazy, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
import Geocode from "react-geocode";
// import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
  // Input,
  // InputIcon,
  // InputItem,
  StepCardsContainer,
  StepContainerBody,
  // StepContainerBodyModal,
  // StepContainerButton,
  StepContainerButtonRight,
  StepContainerHeader,
  StepContainerHeaderTitle,
  StepContainerInfor,
  StepContainerLayout,
} from ".";

import Card from "./items/CardItem";
import StepContainerSelectRoundSwitch from "./items/StepContainerSelectRoundSwitch";
import Sindentifier from "./items/Sidentifier";
import Sinscrire from "./items/Sinscrire";
import DepartEditCard from "./section/DepartEditCard";
import ArriveeEditCard from "./section/ArriveeEditCard";
import ObjetEditCard from "./section/ObjetEditCard";
// import DateTimeInput from "./items/DateTimeInput";
// import ToggleSwitch from "./items/ToggleSwitch";

// import user from "../../assets/icons/user.png";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
// import cube from "../../assets/icons/3dcube.svg";
// import clockpast from "../../assets/icons/clockpast.svg";
// import bluepickerIcon from "../../assets/icons/bluepickerIcon.svg";
import interrogationBlueIcon from "../../assets/icons/interrogationBlueIcon.svg";
import Agentandcaryellow from "../../assets/icons/Agentandcaryellow.svg";
import twoagentandcargray from "../../assets/icons/twoagentandcargray.svg";
import twoagentandcaryellow from "../../assets/icons/twoagentandcaryellow.svg";
import agentandcargray from "../../assets/icons/agentandcargray.svg";
import arrowleftgray from "../../assets/icons/arrowleftgray.svg";
import arrowleftyellow from "../../assets/icons/arrowleftyellow.svg";
import arrowrightgray from "../../assets/icons/arrowrightgray.svg";
import arrowrightyellow from "../../assets/icons/arrowrightyellow.svg";
import box3dgray from "../../assets/icons/box3dgray.svg";
import box3dyellow from "../../assets/icons/box3dyellow.svg";
import { calculatePrice } from "../../utils/priceCalcul";
import { Spin } from "antd";
import axios from "axios";



const Step4 = ({ setStep, command, setCommand, setLoading, setPing, ping }) => {
  const jwt = localStorage.getItem("token");
  // console.log(command);
  // Initialize state variables
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  // Get settings from Redux store
  const settings = useSelector(
    (store) => store?.settings?.settings[0]?.attributes
  );

  // Calculate total volume of items
  const calculateTotalVolume = (items) => {
    return items?.reduce(
      (total, item) => total + item.quant * item.item.volume,
      0
    );
  };

  // Initialize volume state based on the command data
  const [volume, setVolume] = useState(
    calculateTotalVolume(command?.items)
  );

  // Get translation and i18n objects
  const { t, i18n } = useTranslation();
  const [firstLoading, setFirstLoading] = useState(true);
  // Effect to calculate route, prices, and update state
  useEffect(() => {
    const fetchData = async () => {
      const result = await calculateRoute({
        originRef: command?.pickUpAddress?.Address,
        destiantionRef: command?.dropOfAddress?.Address,
      });
      return result;
    };
    fetchData().catch((err) => console.log(err));
    if (command?.distance) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}calcul`, {
          distance: command?.distance,
          volume: command?.items,
        })
        .then((res) => setMinPrice(res.data));

      // calculatePrice({
      //   distance: command?.distance,
      //   volume: calculateTotalVolume(command?.items),
      //   settings: settings,
      // })
      // calculatePrice({
      //   distance: command?.distance,
      //   volume: calculateTotalVolume(command?.items),
      //   accessDepart: command?.pickUpAcces,
      //   accessArrivee: command?.dropAcces,
      //   settings: settings,
      // });
      // console.log(command?.items);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}calcul`, {
          distance: command?.distance,
          volume: command?.items,
          accessDepart: command?.pickUpAcces,
          accessArrivee: command?.dropAcces,
        })
        .then((res) => setMaxPrice(res.data));
    }
  }, [ping, command?.distance]);

  // Function to calculate route using Google Maps API
  async function calculateRoute({ originRef, destiantionRef }) {
    if (originRef === "" || destiantionRef === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    // Geocode.setApiKey("AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"); //(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    const results = await directionsService.route({
      origin: originRef,
      destination: destiantionRef,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setCommand({
      ...command,
      data: {
        ...command?.data,
        distance: results.routes[0].legs[0].distance.value,
        duration: results.routes[0].legs[0].duration.text,
        pickUpAddress: {
          ...command?.pickUpAddress,
          coordonne: {
            latitude: results.routes[0].legs[0].start_location.lat(),
            longitude: results.routes[0].legs[0].start_location.lng(),
          },
        },
        dropOfAddress: {
          ...command?.dropOfAddress,
          coordonne: {
            latitude: results.routes[0].legs[0].end_location.lat(),
            longitude: results.routes[0].legs[0].end_location.lng(),
          },
        },
      },
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.value);
    setDuration(results.routes[0].legs[0].duration.text);

    setOriginPosition({
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    });

    setDestinationPosition({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
  }

  // Initialize price-related state variables
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(
    null
    // () =>
    // calculatePrice({
    //   distance: command?.distance,
    //   volume: calculateTotalVolume(command?.items),
    //   accessDepart: command?.pickUpAcces,
    //   accessArrivee: command?.dropAcces,
    //   settings: settings,
    // })
  );

  // Function to format date
  function formatDate(inputDate) {
    // Date formatting logic here
  }

  // Get current user from Redux store
  const currentUser = useSelector((store) => store.user.currentUser);

  // Initialize state variables for UI
  const [authenticationShow, setAuthenticationShow] = useState(false);
  // console.log(authenticationShow, "auth");
  const [selectedCard, setSelectedCard] = useState(
    (command?.dropAcces.options === "Camion" &&
      command?.pickUpAcces.options === "Camion") ||
      false
  );
  const [switchValue, setSwitchValue] = useState(true);
  const [setshowModalInfoLeftCard, setSetshowModalInfoLeftCard] =
    useState(false);
  const [showModalInfoRightCard, setshowModalInfoRightCard] = useState(false);
  const [showModalEditLeftSide, setShowModalEditLeftSide] = useState("");
  const [showModalEditRightSide, setShowModalEditRightSide] = useState("");

  useEffect(() => {
    setSelectedCard(
      command?.dropAcces.options === "Camion" &&
        command?.pickUpAcces.options === "Camion"
    );
  }, [command]);

  // Handle switch change
  const handleSwitchChange = (newValue) => {
    setSwitchValue(newValue);
  };

  // Handle the next step
  const handleNextStep = async () => {
    if (jwt !== null) {
      setCommand({
        ...command,
        data: {
          ...command.data,
          client_id: currentUser.id,
          totalPrice: selectedCard ? minPrice : maxPrice,
        },
      });
      // if (command?.totalPrice) {
      if (command?.totalPrice) {
        setStep(5);
      }
      // }
    } else {
      window.scrollTo(0, 0);
      setAuthenticationShow(true);
    }
  };

  // Render left side of the UI based on the selected modal
  const showTheShowLeft = () => {
    switch (showModalEditLeftSide) {
      case "":
        return (
          <>
            <span className="depart-date">
              {formatDate(command?.departDate)}
            </span>
            <Card
              setShowModalEdit={setShowModalEditLeftSide}
              content="depart"
              // onClick={(e) => {
              //   setShowModalEditRightSide("depart");
              //   // e.stopPropagation();
              // }}
              selectedCard={selectedCard}
              iconSrc={selectedCard ? arrowrightyellow : arrowrightgray}
              title={command?.pickUpAddress?.Address}
              description={t("Step4.camion")}
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />{" "}
            <Card
              setShowModalEdit={setShowModalEditLeftSide}
              content="arrivee"
              // onClick={(e) => {
              //   setShowModalEditRightSide("arrivee");
              //   e.stopPropagation();
              // }}
              // setShowModalEdit={setShowModalEditRightSide}
              selectedCard={selectedCard}
              iconSrc={selectedCard ? arrowleftyellow : arrowleftgray}
              title={command?.dropOfAddress?.Address}
              description={t("Step4.camion")}
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />{" "}
            <Card
              setShowModalEdit={setShowModalEditLeftSide}
              content="objets"
              // onClick={(e) => {
              //   setShowModalEditRightSide("objets");
              //   e.stopPropagation();
              // }}
              // setShowModalEdit={setShowFirstModalEditRightSide}
              selectedCard={selectedCard}
              iconSrc={selectedCard ? box3dyellow : box3dgray}
              description={command?.items?.map((el, i) =>
                i < 3
                  ? `${el.quant}x ${el.item.name}${
                      i < command?.items?.length - 1 ? ", " : ""
                    }`
                  : i === 3
                  ? "..."
                  : null
              )}
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />
            <StepContainerButtonRight
              disabled={!selectedCard}
              selectedCard={selectedCard}
              centerbutton={
                command?.dropAcces.options === "Camion" &&
                command?.pickUpAcces.options === "Camion"
              }
              onClick={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
            >
              {/* {!command?.totalPrice ? <Spin /> : null} */}
              {t("Step4.Continuer")}
            </StepContainerButtonRight>
          </>
        );
      case "depart":
        return (
          <DepartEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditLeftSide}
            setPing={setPing}
            ping={ping}
          />
        );
      case "arrivee":
        return (
          <ArriveeEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditLeftSide}
            setPing={setPing}
            ping={ping}
          />
        );
      case "objets":
        return (
          <ObjetEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditLeftSide}
            setPing={setPing}
            ping={ping}
            setStep={setStep}
          />
        );
      default:
        return <h1>!!!!!!!!!</h1>;
    }
  };

  // Render right side of the UI based on the selected modal
  const showTheShowRight = () => {
    switch (showModalEditRightSide) {
      case "":
        return (
          <>
            <span className="depart-date">
              {formatDate(command?.departDate)}
            </span>
            <Card
              content="depart"
              setShowModalEdit={setShowModalEditRightSide}
              selectedCard={!selectedCard}
              iconSrc={!selectedCard ? arrowrightyellow : arrowrightgray}
              title={command?.pickUpAddress?.Address}
              description={
                command?.pickUpAcces?.options === "Camion"
                  ? t("Step1.Aupied")
                  : command?.pickUpAcces?.floor > 0 ||
                    command?.pickUpAcces?.floor < 0
                  ? `${t("Step1.chezMoi")}, ${
                      command?.pickUpAcces?.floor
                    } ${t("Step1.étage")}, ${
                      command?.pickUpAcces?.options === "Ascenseur"
                        ? t("Step1.RDC")
                        : t("Step1.sansRDC")
                    }`
                  : t("Step1.rdc")
              }
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />{" "}
            <Card
              content="arrivee"
              setShowModalEdit={setShowModalEditRightSide}
              selectedCard={!selectedCard}
              iconSrc={!selectedCard ? arrowleftyellow : arrowleftgray}
              title={command?.dropOfAddress?.Address}
              description={
                command?.dropAcces?.options === "Camion"
                  ? t("Step1.Aupied")
                  : command?.dropAcces?.floor > 0 ||
                    command?.dropAcces?.floor < 0
                  ? `${t("Step1.chezMoi")}, ${
                      command?.dropAcces?.floor
                    } ${t("Step1.étage")}, ${
                      command?.dropAcces?.options === "Ascenseur"
                        ? t("Step1.RDC")
                        : t("Step1.sansRDC")
                    }`
                  : t("Step1.rdc")
              }
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />{" "}
            <Card
              content="objets"
              setShowModalEdit={setShowModalEditRightSide}
              selectedCard={!selectedCard}
              iconSrc={!selectedCard ? box3dyellow : box3dgray}
              description={command?.items?.map((el, i) =>
                i < 3
                  ? `${el.quant}x ${el.item.name}${
                      i < command?.items?.length - 1 ? ", " : ""
                    }`
                  : i === 3
                  ? "..."
                  : null
              )}
              onEdit={() => {
                // Handle the edit action here
                // console.log("Edit clicked");
              }}
            />
            <StepContainerButtonRight
              disabled={selectedCard}
              selectedCard={!selectedCard}
              centerbutton={
                command?.dropAcces.options === "Camion" &&
                command?.pickUpAcces.options === "Camion"
              }
              onClick={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
            >
              {/* {!command?.totalPrice ? <Spin /> : null} */}
              {t("Step4.Continuer")}
            </StepContainerButtonRight>
          </>
        );
      case "depart":
        return (
          <DepartEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditRightSide}
            setPing={setPing}
            ping={ping}
          />
        );
      case "arrivee":
        return (
          <ArriveeEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditRightSide}
            setPing={setPing}
            ping={ping}
          />
        );
      case "objets":
        return (
          <ObjetEditCard
            command={command}
            setCommand={setCommand}
            setShow={setShowModalEditRightSide}
            setPing={setPing}
            ping={ping}
            setStep={setStep}
          />
        );
      default:
        return <h1>!!!!!!!!!!!!</h1>;
    }
  };

  return (
    <>
      {authenticationShow ? ( //++=============================================================================
        <StepContainerLayout>
          <StepContainerHeader
            directionflesh={i18n.language === "ar-AR"}
            dir="auto"
          >
            {i18n.language === "ar-AR" ? (
              <StepContainerHeaderTitle selected={true} directionflesh={true}>
                <img
                  src={previousFleshIcon}
                  onClick={() => setStep(3)}
                  alt="flesh"
                />
                {t("Step4.info")}
              </StepContainerHeaderTitle>
            ) : (
              <StepContainerHeaderTitle selected={true} directionflesh={false}>
                <img
                  src={previousFleshIcon}
                  onClick={() => setStep(3)}
                  alt="flesh"
                />
                {t("Step4.info")}
              </StepContainerHeaderTitle>
            )}
          </StepContainerHeader>
          <StepContainerBody directionLanguage={i18n.language === "ar-AR"}>
            {i18n.language === "ar-AR" ? (
              <StepContainerSelectRoundSwitch
                directionLanguage={true}
                center={true}
                leftValue={true}
                rightValue={false}
                leftLabel={t("SINSCRIRE.sidentifier")}
                rightLabel={t("SINSCRIRE.Inscrire")}
                value={switchValue}
                onChange={handleSwitchChange}
              />
            ) : (
              <StepContainerSelectRoundSwitch
                directionLanguage={false}
                center={true}
                leftValue={true}
                rightValue={false}
                leftLabel={t("SINSCRIRE.sidentifier")}
                rightLabel={t("SINSCRIRE.Inscrire")}
                value={switchValue}
                onChange={handleSwitchChange}
              />
            )}

            {switchValue ? (
              <Sindentifier
                command={command}
                setCommand={setCommand}
                totalPrice={selectedCard ? minPrice : maxPrice}
                setAuthenticationShow={setAuthenticationShow}
                setStep={setStep}
              />
            ) : (
              <Sinscrire
                command={command}
                setCommand={setCommand}
                totalPrice={selectedCard ? minPrice : maxPrice}
                setAuthenticationShow={setAuthenticationShow}
                setStep={setStep}
              />
            )}
          </StepContainerBody>
        </StepContainerLayout>
      ) : (
        //++=============================================================================
        <Container>
          <StepCardsContainer>
            

            {command?.dropAcces.options === "Camion" &&
            command?.pickUpAcces.options === "Camion" ? null : (
              <StepContainerLayout
                pointer={true}
                shadowColor={
                  selectedCard
                    ? "rgba(200, 200, 200, 1)"
                    : "#F37A1D"
                }
                onClick={() => {
                  setSelectedCard(false), setShowModalEditLeftSide("");
                }}
              >
                {showModalInfoRightCard ? (
                  <StepContainerInfor
                    selectedCard={!selectedCard}
                    onMouseOut={(e) => {
                      setshowModalInfoRightCard(false);
                      e.stopPropagation();
                    }}
                  >
                    <img
                      src={
                        selectedCard
                          ? interrogationBlueIcon
                          : interrogationBlueIcon
                      }
                      className="bigIcon"
                      onClick={(e) => {
                        setshowModalInfoRightCard(false);
                        e.stopPropagation();
                      }}
                      alt="interrog"
                    />
                    <h2>Avec Aide</h2>
                    <ul>
                      <li>
                        Choisissez cette option si vous avez des colis plus
                        lourds ou encombrants qui nécessitent une assistance.
                      </li>
                      <li>
                        2 manutentionnaires sera disponible pour vous aider à
                        charger/décharger vos colis en toute sécurité.
                      </li>
                    </ul>
                    <img
                      src={
                        selectedCard ? twoagentandcargray : twoagentandcaryellow
                      }
                      alt="agent"
                    />
                  </StepContainerInfor>
                ) : null}
                <StepContainerHeader
                  background={
                    selectedCard
                      ? "rgba(200, 200, 200, 1)"
                      : "#F37A1D"
                  }
                  height="90px"
                  selected={!selectedCard}
                >
                  <img
                    src={previousFleshIcon}
                    onClick={() => setStep(3)}
                    alt="flesh"
                  />
                  <StepContainerHeaderTitle selected={!selectedCard}>
                    <h3>
                      <span>PRIX</span> {maxPrice ? maxPrice : <Spin />}Dt
                    </h3>
                  </StepContainerHeaderTitle>

                  <img
                    className="bigIcon"
                    src={interrogationBlueIcon}
                    onClick={(e) => {
                      setshowModalInfoRightCard(true);
                      e.stopPropagation();
                    }}
                    onMouseEnter={(e) => {
                      setshowModalInfoRightCard(true);
                      e.stopPropagation();
                    }}
                    alt="interro"
                  />
                </StepContainerHeader>

                <StepContainerBody gap={"0px"} selected={!selectedCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: 10,
                    }}
                  >
                    <h4 className="card-body-title">Chez moi</h4>
                    <img
                      src={
                        !selectedCard
                          ? twoagentandcaryellow
                          : twoagentandcargray
                      }
                      alt="agent"
                    />
                  </div>
                  {showTheShowRight()}
                </StepContainerBody>
              </StepContainerLayout>
            )}

<StepContainerLayout
              pointer={true}
              shadowColor={
                !selectedCard
                  ? "rgba(200, 200, 200, 1)"
                  : "#F37A1D"
              }
              onClick={() => {
                setSelectedCard(true), setShowModalEditRightSide("");
              }}
            >
              {/* ------------------------------------------------------- */}
              {/* ------------------------------------------------------- */}
              {/* ------------------------------------------------------- */}
              {/* ------------------------------------------------------- */}
              {setshowModalInfoLeftCard ? (
                <StepContainerInfor
                  selectedCard={selectedCard}
                  onMouseOut={(e) => {
                    setSetshowModalInfoLeftCard(false);
                    e.stopPropagation();
                  }}
                >
                  <img
                    src={
                      selectedCard
                        ? interrogationBlueIcon
                        : interrogationBlueIcon
                    }
                    className="bigIcon"
                    onClick={(e) => {
                      setSetshowModalInfoLeftCard(false);
                      e.stopPropagation();
                    }}
                    alt="interrog"
                  />
                  <h2>{t("Step4.sansAide.sansAide")}</h2>
                  <ul>
                    <li>{t("Step4.sansAide.desc1")}</li>
                    <li>{t("Step4.sansAide.desc2")}</li>
                  </ul>
                  <img
                    src={selectedCard ? Agentandcaryellow : agentandcargray}
                    alt="agent"
                  />
                </StepContainerInfor>
              ) : null}
              <>
                <StepContainerHeader
                  background={
                    selectedCard
                      ? "#F37A1D"
                      : "rgba(200, 200, 200, 1)"
                  }
                  height="90px"
                  selected={selectedCard}
                >
                  <img
                    src={previousFleshIcon}
                    onClick={() => setStep(3)}
                    alt="flesh"
                  />
                  <StepContainerHeaderTitle selected={selectedCard} dir="auto">
                    <h3>
                      <span>{t("Step4.PRIX")}</span>{" "}
                      {minPrice ? minPrice : <Spin />}Dt
                    </h3>
                  </StepContainerHeaderTitle>
                  <img
                    src={interrogationBlueIcon}
                    className="bigIcon"
                    onClick={(e) => {
                      setSetshowModalInfoLeftCard(true);
                      e.stopPropagation();
                    }}
                    onMouseEnter={(e) => {
                      setSetshowModalInfoLeftCard(true);
                      e.stopPropagation();
                    }}
                    alt="interrog"
                  />
                </StepContainerHeader>
                <StepContainerBody gap={"0px"} selected={selectedCard}>
                  <div
                    dir="auto"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: 10,
                    }}
                  >
                    <h4 className="card-body-title">{t("Step4.camion")}</h4>
                    <img
                      src={selectedCard ? Agentandcaryellow : agentandcargray}
                      alt="agent"
                    />
                  </div>
                  {showTheShowLeft()}{" "}
                </StepContainerBody>
                {/*
                {showSecondModalEditRightSide && (
                  <StepContainerBodyModal>
                    <h1>Stepper modal Arrivée</h1>
                  </StepContainerBodyModal>
                )}
                {showThirdModalEditRightSide && (
                  <StepContainerBodyModal>
                    <h1>Stepper modal Mes Objets</h1>
                  </StepContainerBodyModal>
                )} */}
                {/* {!(
                  showFirstModalEditRightSide ||
                  showSecondModalEditRightSide ||
                  showThirdModalEditRightSide
                ) && ( */}

                {/* )} */}
              </>
            </StepContainerLayout>
          </StepCardsContainer>
          {/* <div style={{ flex: 1, zIndex: 9999, width: "90vw" }}> */}

          {/* </div> */}
        </Container>
      )}
    </>
  );
};

export default Step4;

export const Container = styled.div`
  width: 90vw;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-inline: auto;
  @media (max-width: 1150px) {
    width: 100%;
  }
  .mainImg {
    width: 15vw;
    @media (max-width: 1150px) {
      width: 40vw;
      display: none;
    }
  }
`;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import {
  StepContainerBody,
  StepContainerButton,
  StepContainerHeader,
  StepContainerHeaderTitle,
  StepContainerLayout,
} from ".";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import CarSelection from "./items/CarSelection";
import { useTranslation } from "react-i18next";
import {
  updateTransportType,
  updateDistance,
  updateDuration,
  updateDepartDate,
  updateDeparTime,
} from "../../redux/newCommand/newCommandSlice";
import downFlesh from "../../assets/icons/fleshrightblue.svg";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import DateTimeInput from "./items/DateTimeInput";

export async function calculateDistanceAndTime(startCoords, endCoords) {
  const apiKey = 'AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE';
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${apiKey}&language=fr`;
  try {
    const response = await axios.get(url);
    const distance = response.data.routes[0].legs[0].distance.value;
    const duration = response.data.routes[0].legs[0].duration.text.trim();
    return {
      distance: distance,
      time: duration,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Step3 = ({ setStep }) => {
  const command = useSelector((store) => store?.newCommand?.command);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const isResponsive = useMediaQuery({ maxWidth: 1150 });
   const [selectedCar, setSelectedCar] = useState(command?.TansportType?.id || '');
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(command?.departDate ? new Date(command.departDate) : null);
  const [selectedTime, setSelectedTime] = useState(command?.deparTime || null);
  const [carError, setCarError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const calculateRoute = async () => {
      if (command?.startLocation && command?.endLocation) {
        const result = await calculateDistanceAndTime(
          command.startLocation,
          command.endLocation
        );
        if (result) {
          dispatch(updateDistance(result.distance));
          dispatch(updateDuration(result.time));
        }
      }
    };
    calculateRoute();
  }, [command?.startLocation, command?.endLocation, dispatch]);

 

  const handleCarSelect = (carType) => {
    setSelectedCar(carType.id);
    setCarError("");
    dispatch(updateTransportType(carType ));
  };

  const distance = command?.distance ? `${(command.distance / 1000).toFixed(2)} km` : '0 km';
  const duration = command?.duration || '0 min';

  const handleClockButtonClick = () => {
    setShowDateModal(true);
  };

  const handleCloseDateModal = () => {
    setShowDateModal(false);
  };

  const handleDateTimeChange = (date, time) => {
    setSelectedDate(date ? new Date(date) : null);
    setSelectedTime(time);
  };

  const handleConfirmDate = () => {
    dispatch(updateDepartDate(selectedDate ? selectedDate.toISOString().split("T")[0] : null));
    dispatch(updateDeparTime(selectedTime));
    setShowDateModal(false);
  };

  const handleNextStep = (e) => {
    e.stopPropagation();
    if (selectedCar) {
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCarError(t("Veuillez sélectionner un type de véhicule avant de continuer."));
    }
  };

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString(i18n.language) : '';

  return (
    <StepContainerLayout dir="auto">
      <StepContainerHeader directionflesh={i18n.language === "ar-AR"}>
        <StepContainerHeaderTitle
          selected={true}
          directionflesh={i18n.language === "ar-AR"}
        >
          <img src={previousFleshIcon} onClick={(e) => {e.stopPropagation(); setStep(2);}} alt="flesh" />
          {t("Sélectionner une voiture")}
        </StepContainerHeaderTitle>
        {isResponsive && (
          <StepContainerHeaderTitle selected={true}>
            <img
              className={minimizeWindow ? "up-flesh" : "down-flesh"}
              src={downFlesh}
              onClick={(e) => {e.stopPropagation(); setMinimizeWindow(!minimizeWindow);}}
              alt="minimize"
            />
          </StepContainerHeaderTitle>
        )}
      </StepContainerHeader>
      {!minimizeWindow ? (
        <StepContainerBody>
          <CarSelection 
            selectedCar={selectedCar}
            onSelectCar={handleCarSelect}
          />
          {carError && (
            <div style={{ color: '#d32f2f', fontWeight: 500, margin: '8px 0 0 0', textAlign: 'center' }}>{carError}</div>
          )}
          <InfoContainer>
            <InfoItem>
              <FontAwesomeIcon icon={faLocationDot} />
              {distance}
            </InfoItem>
            <InfoItem>
              <FontAwesomeIcon icon={faClock} />
              {duration}
            </InfoItem>
            {selectedDate && selectedTime && (
              <InfoItem>
                <FontAwesomeIcon icon={faClock} />
                {formattedDate} {selectedTime.substring(0, 5)}
              </InfoItem>
            )}
          </InfoContainer>
          {selectedCar && (
            <BookButtonContainer>
              <ClockButton onClick={handleClockButtonClick}>
                <FontAwesomeIcon icon={faClock} />
              </ClockButton>
              <ReserveButton onClick={handleNextStep}>
                {t("Réserver maintenant")}
              </ReserveButton>
            </BookButtonContainer>
          )}
        </StepContainerBody>
      ) : (
        <StepContainerBody>
          <h4 style={{ color: "black" }}>{t("Step1.detail")}</h4>
        </StepContainerBody>
      )}
      {showDateModal && (
        <DateModalOverlay onClick={handleCloseDateModal}>
          <DateModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseDateModal}>&times;</CloseButton>
            <ModalTitle>{t("Choisissez la date et l'heure de départ")}</ModalTitle>
            <DateTimeInput
              defaultDate={selectedDate}
              defaultTime={selectedTime}
              onDateTimeChange={handleDateTimeChange}
            />
            <ModalButtonRow>
              <ModalResetButton
                onClick={() => {
                  setSelectedDate(null);
                  setSelectedTime(null);
                  dispatch(updateDepartDate(null));
                  dispatch(updateDeparTime(null));
                  setShowDateModal(false);
                }}
              >
                {t("Réinitialiser")}
              </ModalResetButton>
              <ModalCancelButton onClick={handleCloseDateModal}>{t("Annuler")}</ModalCancelButton>
              <ModalConfirmButton onClick={handleConfirmDate}>{t("Confirmer")}</ModalConfirmButton>
            </ModalButtonRow>
          </DateModalContent>
        </DateModalOverlay>
      )}
    </StepContainerLayout>
  );
};

export default Step3;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f0f0f0;
  padding: 15px 20px;
  border-radius: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const BookButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ClockButton = styled.button`
  background: #e0e0e0;
  border: none;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ReserveButton = styled.button`
  flex-grow: 1;
  background: black;
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DateModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const DateModalContent = styled.div`
  background: #fff;
  padding: 32px 24px 24px 24px;
  border-radius: 18px;
  width: 80%;
 
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(216,181,108,0.12);
  animation: modalFadeIn 0.25s cubic-bezier(0.4,0,0.2,1);
  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  text-align: center;
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
`;

const ModalResetButton = styled.button`
  flex: 1;
  background: #fff3cd;
  color: #856404;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #ffeeba;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffeeba;
  }
`;

const ModalCancelButton = styled.button`
  flex: 1;
  background: #f0f0f0;
  color: #222;
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e0e0e0;
  }
`;

const ModalConfirmButton = styled.button`
  flex: 1;
  background: #222;
  color: #fff;
  font-weight: 600;
  font-size: 1.08rem;
  padding: 12px 28px;
  border-radius: 10px;
  transition: background 0.2s;
  &:hover {
    background: #d8b56c;
    color: #222;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
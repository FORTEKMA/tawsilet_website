import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import { StepContainerLayout, StepContainerHeaderTitle } from ".";
import SignIn from "./items/Sidentifier";
import SignUp from "./items/Sinscrire";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

 

const Step6 = ({ setStep }) => {
  const { t, i18n } = useTranslation();
  const [switchValue, setSwitchValue] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const command = useSelector((store) => store?.newCommand?.command);
  const price = useSelector((store) => store?.newCommand?.price);
  const currentUser = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();

  const handleGoToHistory = () => {
    setShowSuccessModal(false);
    navigate("ClientProfile/history");
  };

  // Reservation logic extracted for use in SignIn/SignUp
  const createReservation = async (user) => {

     
    if (!command?.departDate && !command?.deparTime) {
      setStep(5);
      return false;
    }
    setButtonLoading(true);
    try {
      const formData = {
        ...command,
        pickupAddress: command.pickUpAddress,
        dropAddress: command.dropOfAddress,
        vehicleType: command.TansportType,
        selectedDate: command.date,
        distance: command.distance,
        time: command.time,
      };
      const payload = {
        payType: "Livraison",
        commandStatus: "Pending",
        totalPrice: price,
        distance: formData.distance,
        departDate: command.departDate,
        deparTime: command.deparTime,
        duration: formData.time,
        isAccepted: false,
        client: {
          id: user?.id,
        },
        carType: formData?.vehicleType?.id,
        pickUpAddress: {
          Address: formData?.pickupAddress?.Address || "Livraison",
          coordonne: {
            longitude: formData?.pickupAddress?.coordonne?.longitude || "17",
            latitude: formData?.pickupAddress?.coordonne?.latitude || "17",
          },
        },
        dropOfAddress: {
          Address: formData?.dropAddress?.Address || "Livraison",
          coordonne: {
            longitude: formData?.dropAddress?.coordonne?.longitude || "17",
            latitude: formData?.dropAddress?.coordonne?.latitude || "17",
          },
        },
      };
      await axios.post(`${process.env.REACT_APP_BASE_URL}/commands`, { data: payload });
      setShowSuccessModal(true);
      return true;
    } catch (error) {
      // Optionally handle error
      return false;
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <StepContainerLayout>
      <div style={{ margin: "20px" }}>
        <StepContainerHeaderTitle
          selected={true}
          directionflesh={i18n.language === "ar-AR"}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: i18n.language === "ar-AR" ? "row-reverse" : "row"
          }}
        >
          <img 
            src={previousFleshIcon} 
            onClick={(e) => {
              e.stopPropagation();
              setStep(4);
            }} 
            alt="flesh" 
          />
          {switchValue ? t("Step6.connectToAccount") : t("Step6.createAccount")}
        </StepContainerHeaderTitle>
        <SwitchContainer>
          <SwitchButton
            active={switchValue}
            onClick={() => setSwitchValue(true)}
          >
            {t("Step6.signIn")}
          </SwitchButton>
          <SwitchButton
            active={!switchValue}
            onClick={() => setSwitchValue(false)}
          >
            {t("Step6.signUp")}
          </SwitchButton>
        </SwitchContainer>
        <div style={{ margin: "20px" }}></div>
        {switchValue ? (
          <SignIn
           
            setStep={createReservation}
            
            buttonLoading={buttonLoading}
          />
        ) : (
          <SignUp
          
            setStep={createReservation}
            
            buttonLoading={buttonLoading}
          />
        )}
      </div>
      {showSuccessModal && (
        <BillModal>
          <BillContent dir={i18n.language === "ar-AR" ? "rtl" : "ltr"}>
            <h2>{t('Step6.reservationSuccess')}</h2>
            <ul>
              <li>{t('Step6.checkHistoryProfile')}</li>
            </ul>
            <CloseBtn onClick={handleGoToHistory}>{t('Step6.goToHistory')}</CloseBtn>
          </BillContent>
        </BillModal>
      )}
    </StepContainerLayout>
  );
};

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const SwitchButton = styled.button`
  background: ${({ active }) => (active ? "#0c0c0c" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#0c0c0c")};
  border: 1px solid #0c0c0c;
  border-radius: 8px;
  padding: 8px 24px;
  margin: 0 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
`;

const ConfirmButtonWrapper = styled.div`
  width: 100%;
  padding: 10px 6px;
  background-color: #fff;
  box-shadow: none;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled.button`
  background: #0c0c0c;
  color: #fff;
  border: none !important;
  border-radius: 18px;
  padding: 14px 28px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  max-width: 370px;
  transition: background 0.2s;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.6)};
  pointer-events: ${({ enabled }) => (enabled ? 'auto' : 'none')};
  &:hover {
    background: #222;
  }
`;

const PriceText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

const ConfirmText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

const BillModal = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
const BillContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px 32px 24px 32px;
  min-width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  h2 {
    color: #0c0c0c;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
  ul {
    margin: 0 0 10px 0;
    padding: 0 0 0 18px;
    color: #222;
    font-size: 1.1rem;
  }
`;
const CloseBtn = styled.button`
  margin-top: 18px;
  background: #0c0c0c;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
`;

const Spinner = styled.div`
  margin-left: 8px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0c0c0c;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Step6; 
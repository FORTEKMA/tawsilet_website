import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import carIcon from "../../assets/images/classeCar.png";
import { StepContainerLayout, StepContainerHeader, StepContainerHeaderTitle, StepContainerBody } from ".";
import { useTranslation } from "react-i18next";
import { updateTotalPrice, updateClient } from "../../redux/newCommand/newCommandSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

 
export const calculatePrice = async (formData, driver = null) => {
  const data = {
    accessDepart: {
      lat: formData.pickupAddress.coordonne.latitude,
      lng: formData.pickupAddress.coordonne.longitude,
    },
    accessArrivee: {
      lat: formData.dropAddress.coordonne.latitude,
      lng: formData.dropAddress.coordonne.longitude,
    },
    id: formData?.vehicleType?.id,
    selectedDate: formData?.selectedDate,
  };
  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/calcul`, data);
  return response.data;
};

// Car types config for dynamic rendering
const carTypes = [
  {
    id: '1',
    title: 'Éco',
    description: 'Véhicule économique',
    image: require("../../assets/images/ecoCar.png"),
    capacity: 4
  },
  {
    id: '2',
    title: 'classe',
    description: 'Classe confortable',
    image: require("../../assets/images/classeCar.png"),
    capacity: 4
  },
  {
    id: '3',
    title: 'XL',
    description: 'Grande capacité',
    image: require("../../assets/images/xlCar.png"),
    capacity: 7
  }
];

const Step4 = ({ setStep }) => {
  const command = useSelector((store) => store?.newCommand?.command);
  const { t, i18n } = useTranslation();
  const jwt = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(true);
  const [driver, setDriver] = useState(null);
  const [price, setPrice] = useState(null);
  const currentUser = useSelector((store) => store.user.currentUser);
  const date = command?.departDate || command?.date || null;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrice = async () => {
      if (command?.pickUpAddress && command?.dropOfAddress && command?.TansportType) {
        setLoadingState(true);
        try {
          const formData = {
            pickupAddress: command.pickUpAddress,
            dropAddress: command.dropOfAddress,
            vehicleType: command.TansportType.id,
            selectedDate: date,
          };
          const calculatedPrice = await calculatePrice(formData, driver);
          setPrice(calculatedPrice?.price);
        } catch (error) {
          setPrice("N/A");
        } finally {
          setLoadingState(false);
        }
      }
    };
    fetchPrice();
  }, [command, date, driver]);

  // Use departDate and deparTime directly from command if present
  const splitDateTime = (commandObj) => {
    return {
      departDate: commandObj?.departDate || '',
      deparTime: commandObj?.deparTime || '',
    };
  };

  const handleGoToHistory = () => {
    setShowSuccessModal(false);
    navigate("ClientProfile/history");
  };

  const handleNextStep = async () => {
    if (jwt === null) {
      setStep(6);
      return;
    }
 
    if (command?.departDate) {
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
        const user = currentUser;
        const payload = {
          payType: "Livraison",
          commandStatus: "Pending",
          totalPrice: price,
          distance: formData.distance,
          ...splitDateTime(command),
          duration: formData.time,
          isAccepted: false,
          client: {
            id:  user?.id,
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
       
        await axios.post(`${process.env.REACT_APP_BASE_URL}/commands`, { data: payload }, {
          headers: { Authorization: `Bearer ${jwt}` }
        });
        setShowSuccessModal(true);
      } catch (error) {
        console.log(error);
      } finally {
        setButtonLoading(false);
      }
    } else {
      dispatch(updateTotalPrice(price));
      dispatch(updateClient(currentUser?.documentId));
      setStep(5);
    }
  };

  const isResponsive = window.innerWidth <= 1150;

  return (
    <StepContainerLayout dir="auto">
      <StepContainerHeader directionflesh={i18n.language === "ar-AR"}>
        <StepContainerHeaderTitle selected={true} directionflesh={i18n.language === "ar-AR"}>
          <img src={previousFleshIcon} onClick={() => setStep(3)} alt="retour" />
          {t("Confirmer la course")}
        </StepContainerHeaderTitle>
        {isResponsive && <StepContainerHeaderTitle selected={true} />}
      </StepContainerHeader>
      <StepContainerBody>
        <ContentWrapper>
          {/* Dynamic VehicleTypeCard */}
          {(() => {
            const tansportType = command?.TansportType;
            return (
              <>
                <VehicleTypeCard>
                  <VehicleTypeIcon src={tansportType?.image || carIcon} alt={tansportType?.title || 'car'} />
                  <VehicleTypeDetails>
                    <VehicleTypeName>{tansportType?.title || t('Type inconnu')}</VehicleTypeName>
                    {/* <VehicleTypeDescription>{tansportType?.description || t('Type de véhicule non reconnu')}</VehicleTypeDescription> */}
                  </VehicleTypeDetails>
                </VehicleTypeCard>
                
              </>
            );
          })()}
          <DetailsCard>
            <AddressContainer>
              <AddressRowContainer>
                <AddressIconCircle />
                <AddressDetails>
                  <AddressLabel>{t("Point de départ")}</AddressLabel>
                  <AddressValue>{command?.pickUpAddress?.Address}</AddressValue>
                </AddressDetails>
              </AddressRowContainer>
              <VerticalLine />
              <AddressRowContainer>
                <AddressIconSquare />
                <AddressDetails>
                  <AddressLabel>{t("Point d'arrivée")}</AddressLabel>
                  <AddressValue>{command?.dropOfAddress?.Address}</AddressValue>
                </AddressDetails>
              </AddressRowContainer>
            </AddressContainer>
            {date && (
              <CarTypeRow>
                <CarTypeLabel>Date :</CarTypeLabel>
                <CarTypeValue>{date}</CarTypeValue>
              </CarTypeRow>
            )}
          </DetailsCard>
        </ContentWrapper>
        {date && (
                  <ReservationFeeInfo>
                    {t('Le prix inclut les frais de réservation')}
                    {command.tansportType?.reservation_price && (
                      <> : <strong>{tansportType.reservation_price} DT</strong></>
                    )}
                  </ReservationFeeInfo>
                )}

        <ConfirmButtonWrapper>
          <ConfirmButton
            enabled={!loading && !buttonLoading}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleNextStep();
            }}
          >
            {buttonLoading ? (
              <Spinner style={{ marginRight: 8, marginLeft: 0 }} />
            ) : (
              <PriceText>{price ? `${price} DT` : '...'}</PriceText>
            )}
            <ConfirmText>{t("Confirmer")}</ConfirmText>
          </ConfirmButton>
        </ConfirmButtonWrapper>
        {showSuccessModal && (
          <BillModal>
            <BillContent>
              <h2>{t('Votre réservation a été créée avec succès!')}</h2>
              <ul>
                <li>{t('Vous pouvez consulter l\'historique de vos réservations dans votre profil.')}</li>
              </ul>
              <CloseBtn onClick={handleGoToHistory}>{t('Aller à mon historique')}</CloseBtn>
            </BillContent>
          </BillModal>
        )}
      </StepContainerBody>
    </StepContainerLayout>
  );
};

export default Step4;

const LogsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 16px;
`;
const LogLine = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${({ active }) => (active ? "#0c0c0c" : '#888')};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  display: flex;
  align-items: center;
`;
const Spinner = styled.div`
  margin-left: 8px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${"#0c0c0c"};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const PriceBlock = styled.div`
  display: none;
`;
const PriceValue = styled.span`
  font-size: 2.1rem;
  font-weight: 600;
  color: #18365a;
`;
const PriceLabel = styled.span`
  font-size: 1.2rem;
  color: #18365a;
  font-weight: 400;
`;
const DetailsCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: none;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  border: 1px solid #ccc;
`;
const TruckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;
const TruckTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
`;
const AddressRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0px;
  width: 100%;
`;
const AddressMain = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
`;
const CarTypeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
`;
const CarTypeLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #888;
`;
const CarTypeValue = styled.span`
  font-size: 1rem;
  color: #222;
  font-weight: 500;
`;
const ContinueButton = styled.button`
  margin-top: 18px;
  background: ${"#0c0c0c"};
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 12px 36px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 2px 2px 0px 1px #18365a33;
  align-self: flex-end;
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
    color: ${"#0c0c0c"};
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
const TotalRow = styled.div`
  font-size: 1.2rem;
  color: ${"#0c0c0c"};
  font-weight: 700;
  margin-top: 8px;
  display: flex;
  gap: 10px;
`;
const CloseBtn = styled.button`
  margin-top: 18px;
  background: ${"#0c0c0c"};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
`;

const VehicleTypeCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: none;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid #ccc;
`;

const VehicleTypeIcon = styled.img`
  width: 60px;
  height: 40px;
  object-fit: cover;
`;

const VehicleTypeDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const VehicleTypeName = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0c0c0c;
`;

const VehicleTypeDescription = styled.span`
  font-size: 1rem;
  color: #888;
  font-weight: 400;
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 100%;
`;

const AddressRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
`;

const AddressIconCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #0c0c0c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddressIconSquare = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #fff;
  border: 2px solid #0c0c0c;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddressDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressLabel = styled.span`
  font-size: 0.8rem;
  color: #888;
  font-weight: 400;
`;

const AddressValue = styled.span`
  font-size: 1rem;
  color: #0c0c0c;
  font-weight: 500;
`;

const VerticalLine = styled.div`
  width: 2px;
  height: 20px;
  background-color: #ccc;
  margin-left: 9px;
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
  background: ${"#0c0c0c"};
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

const ContentWrapper = styled.div`
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ReservationFeeInfo = styled.div`
  margin: 8px 0 0 0;
  font-size: 1rem;
  color: #0c0c0c;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: 500;
`;

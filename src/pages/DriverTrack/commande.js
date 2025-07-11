import React, { createElement, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import creditcard from "../../assets/icons/credit-card.png";
import clipboard from "../../assets/icons/clipboard.png";
import add from "../../assets/icons/add.png";
import phone from "../../assets/icons/phone.png";
import user from "../../assets/icons/user.png";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import SignalerProblem from "../DashClient/Profile/SignalerProblem";
import { db } from "../../services/firebase";
import { ref, update } from "firebase/database";

const cancellationReasons = [
  'Driver is taking too long',
  'Driver is not moving / stuck',
  "Can't reach the driver",
  'Driver is going the wrong way',
  'Driver asked to cancel',
  'Fare is too high / changed',
  'I no longer need a ride',
  'Waited too long at pickup',
  'Wrong pickup location',
  "Don't feel safe",
  'Emergency situation',
  'Other'
];

const Commande = ({data}) => {
 
  const { t, i18n } = useTranslation();
  const componentRef = useRef(null);
  const command = data;
  const livraison = require("../../assets/icons/livraison.png");
  const money = require("../../assets/icons/Money.png");
  const navigate = useNavigate();
  let paymentText;
  switch (command?.payType) {
    case "Credit":
      paymentText = t("Historique.Status.order.ligne");
      break;
    case "Livraison":
      paymentText = t("Historique.Status.order.livraison");
      break;
    default:
      paymentText = t("Historique.Status.order.inpayer");
      break;
  }

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancelOrder = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    setShowReasonModal(true);
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason !== "Other") setOtherReason("");
  };

  const handleSubmitReason = async () => {
    if (!selectedReason) return;
    setLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_DOMAIN_URL}/api/commands/${command.documentId}`,
        {
          data: {
            commandStatus: "Canceled_by_client",
            cancelReason: selectedReason === "Other" ? otherReason : selectedReason,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update in Firebase
      if (command?.requestId) {
        await update(ref(db, `rideRequests/${command.requestId}`), {
          commandStatus: "Canceled_by_client",
        });
      }
      setShowReasonModal(false);
      setSelectedReason("");
      setOtherReason("");
      // Redirect to ClientProfile/history
      navigate("/ClientProfile/history");
    } catch (error) {
      // Optionally handle error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModals = () => {
    setShowCancelConfirm(false);
    setShowReasonModal(false);
    setSelectedReason("");
    setOtherReason("");
  };

  const handleCallDriver = () => {
    if (command?.driver?.phoneNumber) {
      window.location.href = `tel:${command.driver.phoneNumber}`;
    }
  };

  return (
    <FullWidthSection>
      {/* Cancel Confirmation Popup */}
      {showCancelConfirm && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Are you sure you want to cancel this order?</ModalTitle>
            <ModalActions>
              <ModalButton onClick={handleConfirmCancel}>Yes</ModalButton>
              <ModalButton onClick={handleCloseModals} $secondary>No</ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
      {/* Reason Modal */}
      {showReasonModal && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Please select a reason for cancellation</ModalTitle>
            <ReasonList>
              {cancellationReasons.map((reason) => (
                <ReasonItem key={reason}>
                  <input
                    type="radio"
                    id={reason}
                    name="cancelReason"
                    style={{color:"#0c0c0c"}}
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => handleReasonSelect(reason)}
                  />
                  <label color="#0c0c0c" htmlFor={reason}   style={{color:"#0c0c0c"}}>{reason}</label>
                </ReasonItem>
              ))}
            </ReasonList>
            {selectedReason === "Other" && (
              <Textarea
                placeholder="Please specify your reason"
                value={otherReason}
                onChange={e => setOtherReason(e.target.value)}
                rows={3}
              />
            )}
            <ModalActions>
              <ModalButton
                onClick={handleSubmitReason}
                disabled={loading || !selectedReason || (selectedReason === "Other" && !otherReason)}
              >
                {loading ? "Submitting..." : "Confirm"}
              </ModalButton>
              <ModalButton onClick={handleCloseModals} $secondary disabled={loading}>Cancel</ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
      <OrderHeader>
        <OrderTitle>
          {t("ClientProfile.ProfileHistory.details.commande")} #{command?.refNumber || command?.id}
        </OrderTitle>
      
      </OrderHeader>
      <OrderGrid>
        <RightColumn>
         
          {/* Driver Info Section */}
          {command?.driver && (
            <SectionCard style={{padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', background: '#fff', marginTop: 24}}>
              <div style={{padding: '32px 24px 16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg, #fffbe6 0%, #fff 100%)'}}>
                <img
                  src={command.driver.profilePicture?.formats?.thumbnail?.url || user}
                  alt="driver"
                  className="driver-icon"
                  style={{width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #d8b56c', background: '#fff', marginBottom: 12}}
                />
                <div style={{fontWeight: 700, fontSize: 20, color: '#0c0c0c', marginBottom: 4, textAlign: 'center'}}>
                  {command.driver.firstName} {command.driver.lastName}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4}}>
                  <span style={{fontWeight: 500, color: '#92929e', fontSize: 15}}>{t("ClientProfile.ProfileHistory.details.driver_phone")}</span>
                  <span style={{fontWeight: 600, color: '#0c0c0c', fontSize: 15}}>{command.driver.phoneNumber}</span>
                  <CallButton onClick={handleCallDriver}>
                    <img src={phone} alt="call" className="call-icon" />
                  </CallButton>
                </div>
              </div>
              <Divider style={{margin: 0, background: '#f0e6d8', height: 2}} />
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 0, background: '#f7f8fa'}}>
                <div style={{flex: 1, minWidth: 220, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8}}>
                  <span style={{fontWeight: 600, color: '#d8b56c', fontSize: 15, marginBottom: 2}}>
                    <i className="fa fa-id-card" style={{marginRight:6}}></i>
                    {t("ClientProfile.ProfileHistory.details.driver_info")}
                  </span>
                  <span style={{fontSize: 14, color: '#666'}}>{t("ClientProfile.ProfileHistory.details.driver_name")}: <b>{command.driver.firstName} {command.driver.lastName}</b></span>
                  <span style={{fontSize: 14, color: '#666'}}>{t("ClientProfile.ProfileHistory.details.driver_phone")}: <b>{command.driver.phoneNumber}</b></span>
                </div>
                {command.vehicule_id && (
                  <div style={{flex: 1, minWidth: 220, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '1px solid #eee'}}>
                    <span style={{fontWeight: 600, color: '#d8b56c', fontSize: 15, marginBottom: 2}}>
                      <i className="fa fa-car" style={{marginRight:6}}></i>
                      {t("ClientProfile.ProfileHistory.details.vehicle")}
                    </span>
                    <span style={{fontSize: 14, color: '#666'}}>{command.vehicule_id.mark} {command.vehicule_id.model} {command.vehicule_id.year ? `(${command.vehicule_id.year})` : ''}</span>
                    <span style={{fontSize: 14, color: '#666'}}><i className="fa fa-paint-brush" style={{marginRight:4}}></i>{t("ClientProfile.ProfileHistory.details.color")} {command.vehicule_id.color}</span>
                    <span style={{fontSize: 14, color: '#666'}}><i className="fa fa-id-card" style={{marginRight:4}}></i>{t("ClientProfile.ProfileHistory.details.matriculation")} {command.vehicule_id.matriculation}</span>
                    {command.vehicule_id.vehiculePictureface1?.formats?.thumbnail?.url && (
                      <img
                        src={command.vehicule_id.vehiculePictureface1.formats.thumbnail.url}
                        alt="vehicle"
                        style={{width: 64, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee', marginTop: 8}}
                      />
                    )}
                  </div>
                )}
              </div>
            </SectionCard>
          )}
        </RightColumn>
      </OrderGrid>
      <MainSection>
        <Content>
          <Wrapper directionflesh={i18n.language === "ar-AR"} dir="auto">
            <HeaderSection>
              <div className="header-left">
                <img
                  src={clipboard}
                  alt="external link"
                  className="header-icon"
                />
                <ShopName>
                  {t("ClientProfile.ProfileHistory.details.commande")}
                </ShopName>
              </div>
              <ShopSubtitle>#{command?.refNumber || command?.id}</ShopSubtitle>
            </HeaderSection>
            <Divider
              style={{
                margin: 0,
                backgroundColor: "#92929e",
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <TableWrapper id="toPrint" ref={componentRef}>
              {(command?.departDate || command?.createdAt) && (<TableRow>
                <TableCell>
                  <DateTimeSection>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.date")}
                    </InfoTitle>
                    <p>
                     {command?.departDate || (command?.createdAt && new Date(command.createdAt).toLocaleDateString())}
                     {command?.deparTime ? `, ${command?.deparTime?.split(":").slice(0, 2).join(":")}` : ''}
                    </p>
                  </DateTimeSection>
                </TableCell>
              </TableRow>)}
              <TableRow>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t(
                        "ClientProfile.ProfileHistory.details.adresse_ramassage"
                      )}
                    </InfoTitle>
                    <p>{command?.dropOfAddress?.Address}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.adresse_depot")}
                    </InfoTitle>
                    <p>{command?.pickUpAddress?.Address}</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.distance_course")}
                    </InfoTitle>
                    <p>{(command?.distance / 1000).toFixed(2)} km</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.duree_course")}
                    </InfoTitle>
                    <InfoItem>{command?.duration}</InfoItem>
                  </div>
                </TableCell>
              </TableRow>
            </TableWrapper>
          </Wrapper>
          <RightSection
            directionflesh={i18n.language === "ar-AR"}
            dir="auto"
          >
            <Container directionflesh={i18n.language === "ar-AR"} dir="auto">
              <div className="container-header">
                <img
                  src={creditcard}
                  alt="external link"
                  className="header-icon"
                />
                <InfoTitle>
                  {t("ClientProfile.ProfileHistory.details.prix")}
                </InfoTitle>
              </div>
              <Divider />
              <TableRow>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.prix")}
                    </InfoTitle>
                    <InfoItem>{command?.totalPrice} DT</InfoItem>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <InfoTitle>
                      {t("ClientProfile.ProfileHistory.details.mode_paiement")}
                    </InfoTitle>
                    <InfoItem className="payment-item">
                      <img
                        src={command?.payType === "Livraison" ? money : livraison}
                        alt={
                          command?.payType === "Livraison"
                            ? "Money payment"
                            : "Delivery payment"
                        }
                        className="payment-icon"
                      />
                      <div className="payment-text">
                        {command?.payType === "Credit"
                          ? t(
                              "ClientProfile.ProfileHistory.details.carte_bancaire"
                            )
                          : t(
                              "ClientProfile.ProfileHistory.details.paiement_a_la_livraison"
                            )}
                      </div>
                    </InfoItem>
                  </div>
                </TableCell>
              </TableRow>
            </Container>
            {['Pending', 'Arrived_at_pickup', 'Go_to_pickup'].includes(command?.commandStatus) && (
              <CancelOrderButton onClick={handleCancelOrder}>
                {t("ClientProfile.ProfileHistory.details.cancel_order") || "Cancel Order"}
              </CancelOrderButton>
            )}
            <SignalerProblem data={data} />
          </RightSection>
        </Content>
       
      </MainSection>
    </FullWidthSection>
  );
};
export default Commande;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 15px;
    gap: 20px;
  }
`;

const Content = styled.section`
  display: flex;
  gap: 30px;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  min-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 10px 20px rgba(12, 12, 12, 0.1);
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #0c0c0c;
  border: 1px solid rgba(12, 12, 12, 0.1);

  @media (max-width: 1200px) {
    width: 100%;
    min-width: unset;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
    font-size: 13px;
  }
`;

const RightSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  
  @media (max-width: 1200px) {
    width: 100%;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  
  .header-left {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .header-icon {
    width: 25px;
    height: 25px;
    
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 20px rgba(12, 12, 12, 0.1);
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #0c0c0c;
  border: 1px solid rgba(12, 12, 12, 0.1);

  .container-header {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .header-icon {
    width: 25px;
    height: 25px;
    
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  .payment-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .payment-icon {
    width: 25px;
    height: 25px;
    object-fit: contain;
    
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  .payment-text {
    margin-top: 0;
    font-size: 13px;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    min-height: 180px;
    font-size: 13px;
  }
`;

const CancelOrderButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #ffffff;
  border: 2px solid #dc3545;
  border-radius: 8px;
  color: #dc3545;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(220, 53, 69, 0.1);

  &:hover {
    background-color: #dc3545;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(220, 53, 69, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const DriverSection = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 10px 20px rgba(12, 12, 12, 0.1);
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #0c0c0c;
  border: 1px solid rgba(12, 12, 12, 0.1);

  .driver-header {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .driver-icon {
    width: 25px;
    height: 25px;
    
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  .driver-details {
    width: 100%;
  }
  
  .driver-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .driver-name,
  .driver-phone,
  .driver-vehicle {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .label {
    font-weight: 600;
    color: #0c0c0c;
    min-width: 60px;
    font-size: 13px;
  }
  
  .value {
    color: #666;
    font-size: 13px;
    flex: 1;
  }

  @media (max-width: 768px) {
    padding: 15px;
    gap: 12px;
    font-size: 13px;
  }
`;

const CallButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  .call-icon {
    width: 16px;
    height: 16px;
    filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
  }
  
  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
    transform: scale(1.1);
  }
`;

const Itemss = styled.div`
  width: 100%;
  overflow: hidden;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 10px 20px rgba(12, 12, 12, 0.1);
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #0c0c0c;
  border: 1px solid rgba(12, 12, 12, 0.1);

  .items-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .header-left {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .header-icon {
    width: 25px;
    height: 25px;
    
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  .items-subtitle {
    color: #666;
    font-size: 13px;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
    font-size: 13px;
  }
`;

const ShopName = styled.h1`
  font-size: 22px;
  color: #0c0c0c;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ShopSubtitle = styled.h2`
  font-size: 18px;
  color: #d8b56c;
  font-weight: normal;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const DateTimeSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
`;

const InfoItem = styled.div`
  flex: 1;
  font-weight: 500;
`;

const InfoTitle = styled.h4`
  color: #0c0c0c;
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  p {
    border-radius: 10px;
    border: 1px solid rgba(12, 12, 12, 0.2);
    padding: 8px 12px;
    white-space: nowrap;
    background-color: rgba(12, 12, 12, 0.02);
    font-size: 13px;
    
    @media (max-width: 768px) {
      padding: 6px 10px;
      font-size: 12px;
    }
  }
`;

const TableWrapper = styled.table`
  position: relative;
  border-collapse: collapse;
  border: none;
  width: 100%;
  
  .payBtn {
    cursor: pointer;
    padding: 8px 24px;
    border-radius: 10px;
    font-size: 16px;
    border: 1px solid #d8b56c;
    color: #d8b56c;
    position: absolute;
    right: 8px;
    top: 8px;
    
    @media (max-width: 768px) {
      padding: 6px 16px;
      font-size: 14px;
    }
  }
`;

const TableRow = styled.tr`
  width: 100%;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  width: 50%;
  vertical-align: top;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

const FullWidthSection = styled.section`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: #f7f8fa;
  min-height: 100vh;
  padding: 0 0 40px 0;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 8vw 16px 8vw;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const OrderTitle = styled.h1`
  font-size: 2.2rem;
  color: #0c0c0c;
  margin: 0;
`;

const OrderStatus = styled.div`
  .status-badge {
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1.1rem;
    background: #e0f7e9;
    color: #0c0c0c;
    &.status-paid { background: #e0f7e9; color: #0c0c0c; }
    &.status-pending { background: #fff3cd; color: #0c0c0c; }
    &.status-failed { background: #f8d7da; color: #0c0c0c; }
  }
`;

const OrderGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding: 32px 2vw 0 2vw;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    padding: 24px 2vw 0 2vw;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(12,12,12,0.06);
  padding: 24px 28px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #0c0c0c;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.05rem;
  color: #0c0c0c;
  &.total {
    font-weight: 700;
    color: #0c0c0c;
    font-size: 1.15rem;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.15);
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #0c0c0c;
  margin-bottom: 24px;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const ModalButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  background: ${(props) => (props.$secondary ? '#eee' : '#dc3545')};
  color: ${(props) => (props.$secondary ? '#333' : '#fff')};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => (props.$secondary ? '#ddd' : '#b02a37')};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ReasonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;
`;

const ReasonItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  cursor: pointer;
  input[type="radio"] {
    accent-color: #dc3545;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  margin: 12px 0 0 0;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
`;
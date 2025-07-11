import React, { useEffect, useState } from "react";
import Map from "./Map";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCommandById } from "../../redux/ordersSlice/OrderSlice";
import Loader from "../../components/Items/Loader";
import { getReviewsByUser } from "../../redux/userSlice/userSlice";
import { useTranslation } from "react-i18next";
import Commande from "./commande";
import OrderStatusStepper from "../../components/Items/OrderStatusStepper";
import { db } from '../../services/firebase';
import { ref, onValue, off } from 'firebase/database';
import ModalRating from "./ModalRating";
import DriverRating from "../DriverRating";
import { setCurrentCommandStatus } from "../../redux/ordersSlice/OrderSlice";

const DriverTrack = (props) => {
  const { t } = useTranslation();
  const command = useSelector((store) => store?.orders?.currentCommand);
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const [forceLoader, setForceLoader] = useState(true);
  const [driverPosition, setDriverPosition] = useState(null);
  const [realtimeStatus, setRealtimeStatus] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let statusRef = null;
    let driverRef = null;
    let statusListener = null;
    let driverListener = null;
    let cleanup = () => {};

    if (currentUser && params.id) {
      dispatch(getCommandById({ id: params.id })).then((res) => {
        const order = res?.payload?.data;
        if (order?.driver?.documentId) {
          dispatch(getReviewsByUser({ id: order.driver.documentId }));
        }
        // Add Firebase listeners if status is not in the excluded list
        if (order && !["Canceled_by_partner", "Completed", "Canceled_by_client"].includes(order.commandStatus)) {
          if (order.requestId) {
            statusRef = ref(db, `rideRequests/${order.requestId}/commandStatus`);
            statusListener = onValue(statusRef, (snapshot) => {
              const status = snapshot.val();
              if (status) {
                setRealtimeStatus(status);
                dispatch(setCurrentCommandStatus(status));
              }
            });
          }
          if (order.driver?.documentId) {
            driverRef = ref(db, `drivers/${order.driver.documentId}`);
            driverListener = onValue(driverRef, (snapshot) => {
              const pos = snapshot.val();
              if (pos && pos.latitude && pos.longitude) {
                setDriverPosition({ latitude: pos.latitude, longitude: pos.longitude,type:pos.type,angle:pos.angle });
              }
            });
          }
          cleanup = () => {
            if (statusRef && statusListener) off(statusRef, 'value', statusListener);
            if (driverRef && driverListener) off(driverRef, 'value', driverListener);
          };
        }
        setForceLoader(false);
      });
    } else {
      setForceLoader(false);
    }
    return () => {
      cleanup();
    };
  }, [currentUser, params.id, dispatch]);

  // Use realtimeStatus if available, else fallback to command.commandStatus
  const commandStatus = realtimeStatus || command?.commandStatus;
  const isRated = !!command?.review;

  // Auto-show rating modal when completed and not rated
  useEffect(() => {
    if (commandStatus === 'Completed' && !isRated) {
      setShowRatingModal(true);
    }
  }, [commandStatus, isRated]);

  const handleRateClick = () => {
    if (!isRated) setShowRatingModal(true);
  };

  if (forceLoader) {
    return <Loader />;
  }

  return (
    <section>
      {commandStatus === 'Pending' && (
        <PendingStatus>
          {t('ClientProfile.Commande.status.pending') || 'Pending...'}
        </PendingStatus>
      )}
      <PlienMap ref={props.MapRef}>
        <Map driverPosition={driverPosition} command={command}  />
      </PlienMap>
      <div className="order-details-container">
        <OrderStatusStepper commandStatus={commandStatus} onRateClick={handleRateClick} isRated={isRated} />
      </div>
      <Section>
        <Commande data={command} />
      </Section>
      {showRatingModal && <DriverRating onClose={() => setShowRatingModal(false)} />}
    </section>
  );
};

export default DriverTrack;

export const PlienMap = styled.div`
  width: 100%;
  height: calc(50vh - 80px);
  position: relative;
  @media (max-width: 744px) {
    display: flex;
    flex-wrap: wrap;
    height: 50vh;
    flex-direction: column-reverse;
  }
`;

const Section = styled.section`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: flex-start;
  align-content: center;
  padding: 30px;
  padding-top: 0;
  @media (max-width: 744px) {
    width: 100%;
  }
`;

const PendingStatus = styled.div`
  width: 100%;
  background: #fffbe6;
  color: #d8b56c;
  text-align: center;
  padding: 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid #ffe58f;
`;

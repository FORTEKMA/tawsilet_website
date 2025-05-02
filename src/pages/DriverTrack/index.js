import React, { useEffect, useState } from "react";
import Map from "./Map";
import Badge from "./Badge";
import styled from "styled-components";
import { Navigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getDriverById,
  getLocationById,
} from "../../redux/locationSlice/locationSlice";

import tracking from "../../assets/images/tracking.png";
import warehouse from "../../assets/images/warehouse.png";
import packing from "../../assets/images/packing.png";
import { Link } from "react-router-dom";
import Loader from "../../components/Items/Loader";
import { getReviewsByUser } from "../../redux/userSlice/userSlice";
import { useTranslation } from "react-i18next";
import Reject from "./Reject";
import Accepted from "./accepted";
import Delivered from "./delivered";
import Completed from "./completed";
import Failedpickup from "./failed-picup";
import Faileddelivery from "./failed-delivry";
import ProfileHistoryViewDetails from "../DashClient/Profile/ProfileHistoryViewDetails";
import Commande from "./commande";
import OrderStatusStepper from "../../components/Items/OrderStatusStepper";
import DriverRating from "../DriverRating";

const DriverTrack = (props) => {
  const { t, i18n } = useTranslation();
  const command = useSelector((store) => store?.location?.command);
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const [forceLoader, setForceLoader] = useState(true);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getLocationById({ id: params.id })).then((res) => {
        // console.log(res?.payload?.data?.driver_id?.data?.id);
        dispatch(
          getReviewsByUser({
            id: res?.payload?.data?.driver_id?.documentId,
          })
        );
        setForceLoader(false);
      });

      const intervalId = setInterval(() => {
        dispatch(getLocationById({ id: params.id })).then((res) => {});
      }, 10000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setForceLoader(false);
    }
    // Return a cleanup function to clear the interval when the component unmounts
  }, []);

  if (forceLoader) {
    return <Loader />;
  }

  if (
    !currentUser?.id ||
    (command?.client_id?.id && !(command?.client_id?.id === currentUser?.id)) ||
    !command
  ) {
    return (
      <MessageContainer>
        <h1>{t("ClientProfile.Commande.Message.unauthorized")}</h1>
        <h3>{t("ClientProfile.Commande.Message.span")}</h3>
        <Link to="/" className="retour">
          {t("ClientProfile.Commande.Message.button")}
        </Link>
      </MessageContainer>
    );
  }

  return ["Pending", "Dispatched_to_partner"].includes(
    command?.commandStatus
  ) ? (
    <section>
      <PlienMap ref={props.MapRef}>
        <Map />
      </PlienMap>
      <div className="order-details-container">
        {command && command?.commandStatus ? (
          <OrderStatusStepper commandStatus={command?.commandStatus} />
        ) : (
          <p>{t("ClientProfile.Commande.status.loading")}</p>
        )}
      </div>

      <Section style={{}}>
        <Commande />
      </Section>
    </section>
  ) : ["Arrived_at_pickup", "Arrived_at_delivery"].includes(
      command?.commandStatus
    ) ? (
    <section>
      <PlienMap ref={props.MapRef}>
        <Map />
      </PlienMap>
      <Badge />
      <div className="order-details-container">
        {command && command?.commandStatus ? (
          <OrderStatusStepper commandStatus={command?.commandStatus} />
        ) : (
          <p>{t("ClientProfile.Commande.status.loading")}</p>
        )}
      </div>

      <Section style={{}}>
        <Commande />
      </Section>
    </section>
  ) : [
      "Assigned_to_driver",
      "Driver_on_route_to_pickup",
      "Picked_up",
      "On_route_to_delivery",
      "Delivered",
      "Failed_delivery",
      "Failed_pickup",
      "Canceled_by_partner",
      "Canceled_by_client",
    ].includes(command?.commandStatus) ? (
    <section>
      <PlienMap ref={props.MapRef}>
        <Map />
      </PlienMap>
      <div className="order-details-container">
        {command && command?.commandStatus ? (
          <OrderStatusStepper commandStatus={command?.commandStatus} />
        ) : (
          <p>{t("ClientProfile.Commande.status.loading")}</p>
        )}
      </div>

      <Section style={{}}>
        <Commande />
      </Section>
    </section>
  ) : // ) : command?.commandStatus === "Assigned_to_driver" ? (
  //   <Accepted />
  command?.commandStatus === "Completed" ? (
    <section>
      {/* <PlienMap ref={props.MapRef}>
        <Map />
      </PlienMap> */}
      <DriverRating />

      {/* <Section style={{}}>
        <Commande />
      </Section> */}
    </section>
  ) : (
    // ) : command?.commandStatus === "Delivered" ? (
    // //   <Delivered />
    // command?.commandStatus === "Canceled_by_partner" ? (
    //   <Reject />
    // ) : command?.commandStatus === "Canceled_by_client" ? (
    //   <Reject />
    // ) : command?.commandStatus === "Failed_pickup" ? (
    //   <Failedpickup />
    // // ) : command?.commandStatus === "Failed_delivery" ? (
    // //   <Faileddelivery />
    // )

    <TrackingContainer>
      <h1>
        {t("ClientProfile.Commande.Message.encours")}
        {/* {command?.commandStatus} */}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={tracking} alt="addCommandCover" />
        <img src={packing} alt="addCommandCover" />
        <img src={warehouse} alt="addCommandCover" />
      </div>
    </TrackingContainer>
  );
};

const defaultProps = {
  center: {
    lat: 33.769012,
    lng: 10.8674087,
  },
  zoom: 11,
};

export default DriverTrack;

export const PlienMap = styled.div`
  width: 100%;
  height: calc(50vh - 80px);
  position: relative;
  @media (max-width: 744px) {
    display: flex;
    flexWrap:"wrap",flexWrap:"wrap",
    height: 50vh;
    flex-direction: column-reverse;
  }
`;
const Section = styled.section`
width:"60%",
margin:"auto",
  display: "flex",
  flexWrap:"wrap",
  gap: 50,
  justifyContent: "flex-start",
  alignContent: "center",
  padding:30,
  paddingTop:0
    @media (max-width: 744px) {
  width:100%
  }
`;
const TrackingContainer = styled.div`
  margin-top: -10vh;
  width: 100%;
  height: 90vh;
  display: flex;
  flexWrap:"wrap",
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
  font-size: 1.3vw;
  padding-inline: 16px;
  @media (max-width: 700px) {
    font-size: 12px;
  }
  img {
    width: 15%;
  }
`;
const MessageContainer = styled.div`
  background-color: #18365a !important;
  padding-top: 30vh;
  padding-bottom: 30px;
  width: 100%;
  min-height: 90vh;
  display: flex;
  flexWrap:"wrap",
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  @media (max-width: 744px) {
    padding-top: 20px;
    justify-content: center;
  }
  h3 {
    color: #f37a1d;
    font-weight: 300;
  }
  h1 {
    color: white;
    text-transform: capitalize;
    text-align: center;
  }
  .retour {
    margin-top: 20px;
    border: 1px solid white;
    border-radius: 16px;
    padding: 8px 16px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    &:hover {
      background-color: white;
      border: 1px solid #f37a1d;
      color: #f37a1d;
    }
  }
`;
const StatusStepper = styled.div`
  margin: 20px 0;
  position: relative;
  padding-left: 20px;
`;

const StatusStep = styled.div`
  position: relative;
  padding-bottom: 20px;
  ${({ last }) =>
    !last &&
    `
    &:before {
      content: '';
      position: absolute;
      left: -20px;
      top: 20px;
      height: calc(100% - 20px);
      width: 2px;
      background: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
    }
  `}
`;

const StatusBadge = styled.span`
  display: flex;
  flexWrap:"wrap",
  flex-direction:column;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  // background-color: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  color: ${(props) => (props.active ? "#18365a" : "grey")};
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 28px;
    margin-bottom:10px;
    top: -13px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) => (props.active ? "#18365a" : "#ecf0f1")};
    border: 2px solid white;
  }
`;
const StatusBadgee = styled.p`
  position: absolute;
  left: -59px;
  top: -32px;
  color: ${(props) => (props.active ? "#18365a" : "grey")};
  // border: 2px solid white;
`;

const StatusDescription = styled.p`
  font-size: 14px;
  margin: 8px 0 0 0;
  color: #7f8c8d;
  padding-left: 10px;
`;

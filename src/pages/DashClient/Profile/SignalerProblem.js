import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Icons (using Font Awesome for web)
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faPaperclip,
//   faTimes,
//   faPhone
// } from '@fortawesome/free-solid-svg-icons';
import { createTicketWithAttachments } from "../../../redux/ticketsSlice/ticketsSlice";

// // Images (assuming you'll import web versions)
// import startIcon from '../assets/historyStart.png';
// import endIcon from '../assets/historyArrive.png';
// import dotsIcon from '../assets/dots.png';
// import livraisonIcon from '../assets/livraison.png';
// import phoneIcon from '../assets/phone.png';

const SignalerProblem = () => {
  const token = localStorage.getItem("token");
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [problemModalVisible, setProblemModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [problem, setProblem] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketExists, setTicketExists] = useState(false);
  const [ping, setPing] = useState(false);
  const [checkingTicket, setCheckingTicket] = useState(false);
  const order = useSelector((store) => store?.location?.command);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const { t } = useTranslation();

  useEffect(() => {
    const checkIfTicketExists = async () => {
      if (!order?.id || !currentUser?.id) return;

      try {
        setCheckingTicket(true);
        const res = await axios.get(
          `${process.env.REACT_APP_DOMAIN_URL}/api/tickets`,
          {
            params: {
              filters: {
                command: {
                  id: order?.id,
                },
                user: {
                  id: currentUser?.id,
                },
              },
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.data.length) {
          setTicketExists(res.data.data);
        } else {
          setTicketExists(false);
        }
      } catch (error) {
        console.log("Error checking ticket existence:", error);
      } finally {
        setCheckingTicket(false);
      }
    };

    checkIfTicketExists();
  }, [order?.id, currentUser?.id, ping]);

  const handleAttachment = async (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(
      createTicketWithAttachments({
        title: problem,
        description: message,
        command: order.id,
        user: currentUser.id,
        attachments,
      })
    )
      .then((res) => {
        setProblemModalVisible(false);
        setAlertModalVisible(true);
        setProblem("");
        setMessage("");
        setAttachments([]);
        setPing(!ping);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        alert("Erreur", "Une erreur s'est produite.");
      });
  };

  const handleCall = () => {
    window.location.href = "tel:36848020";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA500"; // Orange 
      case "Assigned_to_driver":
        return "#FFD700"; // Gold 
      case "Driver_on_route_to_pickup":
        return "rgb(245 202 244)"; // Medium purple 
      case "Arrived_at_pickup":
        return "#32CD32"; // Lime green 
      case "Picked_up":
        return "#00CED1"; // Dark turquoise 
      case "On_route_to_delivery":
        return "#FFDAB9"; // Dark orange 
      case "Arrived_at_delivery":
        return "#20B2AA"; // Light sea green 
      case "Delivered":
        return "#FF69B4"; // Hot pink 
      case "Completed":
        return "#228B22"; // Forest green 
      case "Failed_pickup":
        return "#DC143C"; // Crimson 
      case "Failed_delivery":
        return "#B22222"; // Firebrick 
      case "Canceled_by_partner":
        return "#B22222"; // Dark gray 
      case "Canceled_by_client":
        return "#B22222"; // Dim gray 
      default:
        return "#808080"; // Gray 
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return t("ClientProfile.Commande.Message.pending");
      case "Dispatched_to_partner":
        return t("ClientProfile.Commande.Message.dispatched_to_partner");
      case "Assigned_to_driver":
        return t("ClientProfile.Commande.Message.assigned_to_driver");
      case "Driver_on_route_to_pickup":
        return t("ClientProfile.Commande.Message.driver_on_route_to_pickup");
      case "Arrived_at_pickup":
        return t("ClientProfile.Commande.Message.arrived_at_pickup");
      case "Picked_up":
        return t("ClientProfile.Commande.Message.picked_up");
      case "On_route_to_delivery":
        return t("ClientProfile.Commande.Message.on_route_to_delivery");
      case "Arrived_at_delivery":
        return t("ClientProfile.Commande.Message.arrived_at_delivery");
      case "Delivered":
        return t("ClientProfile.Commande.Message.delivered");
      case "Completed":
        return t("ClientProfile.Commande.Message.completed");
      case "Failed_pickup":
        return t("ClientProfile.Commande.Message.failed_pickup");
      case "Failed_delivery":
        return t("ClientProfile.Commande.Message.failed_delivery");
      case "Canceled_by_client":
        return t("ClientProfile.Commande.Message.canceled_by_client");
      case "Canceled_by_partner":
        return t("ClientProfile.Commande.Message.canceled_by_partner");
      default:
        return t("ClientProfile.Commande.status.aucun");
    }
  };

  const renderAttachmentItem = ({ item, index }) => (
    <div className="attachment-item">
      <span className="attachment-name" title={item.name}>
        {item.name}
      </span>
      <span className="attachment-size">
        {(item.size / 1024).toFixed(2)} KB
      </span>
      <button
        onClick={() => removeAttachment(index)}
        className="remove-attachment"
      >
        {/* <FontAwesomeIcon icon={faTimes} color="red" /> */}
      </button>
    </div>
  );

  return (
    <div
      className="signaler-problem-container"
      directionflesh={i18n.language === "ar-AR"}
      dir="auto"
    >
      {/* Button to open the "Signaler un problème" modal */}
      <button
        className="problem-button"
        onClick={() => setProblemModalVisible(true)}
      >
        {t("Historique.Status.Problème.title")}
      </button>

      {/* "Signaler un problème" Modal */}
      {problemModalVisible && (
        <div
          className="modal-overlay"
          directionflesh={i18n.language === "ar-AR"}
          dir="auto"
        >
          {ticketExists ? (
            <div
              className="modal-content"
              directionflesh={i18n.language === "ar-AR"}
              dir="auto"
            >
            <button
                className="close-modal-button"
                onClick={() => setProblemModalVisible(false)}
              >
                &times;
              </button>
              <div className="ticket-exists-container">
                <h2 className="alert-title" style={{ textAlign: "center" }}>
                  {t("Historique.Status.Problème.deja")}
                </h2>
                <div className="contact-section">
                  <p className="contact-text" style={{ color: "#92929e" }}>
                    {t("Historique.Status.Problème.contact")}
                  </p>
                  <button className="call-button" onClick={handleCall}>
                    {/* <img src={phoneIcon} alt="Phone" className="phone-icon" /> */}
                    <span className="phone-text">36848020</span>
                  </button>
                </div>
                {ticketExists[0] && (
                  <div
                    className="ticket-info"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    <div
                      className="ticket-field"
                      directionflesh={i18n.language === "ar-AR"}
                      dir="auto"
                    >
                      <span className="ticket-label">
                        {t("Historique.Status.Problème.tickettitre")}
                      </span>
                      <span className="ticket-value">
                        {ticketExists[0]?.title}
                      </span>
                    </div>
                    <div
                      className="ticket-field"
                      directionflesh={i18n.language === "ar-AR"}
                      dir="auto"
                    >
                      <span className="ticket-label">
                        {t("Historique.Status.Problème.ticketdesc")}
                      </span>
                      <span className="ticket-value">
                        {ticketExists[0]?.description}
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className="ticket-response"
                  directionflesh={i18n.language === "ar-AR"}
                  dir="auto"
                >
                  <p className="ticket-response-label">
                    {t("Historique.Status.Problème.response")}
                  </p>
                  <p className="ticket-response-text">
                    {ticketExists[0]?.response ||
                      t("Historique.Status.Problème.responsemessage")}
                  </p>
                </div>
              </div>
              <button
                style={{ width: "100%" }}
                className="submit-button close-button"
                onClick={() => setProblemModalVisible(false)}
              >
                {t("Historique.Status.Problème.responsebutton")}
              </button>
            </div>
          ) : (
            <div
              className="modal-content"
              directionflesh={i18n.language === "ar-AR"}
              dir="auto"
            >
              <button
                className="close-modal-button"
                onClick={() => setProblemModalVisible(false)}
              >
                &times;
              </button>
              <div className="order-details">
                <p
                  className="order-details-title"
                  directionflesh={i18n.language === "ar-AR"}
                  dir="auto"
                >
                  {t("Historique.Status.Problème.adresse")}
                </p>
                <div className="address-section">
                  <div
                    className="address-line"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    {/* <img src={startIcon} alt="Start" className="address-icon" /> */}
                    <div className="address-text">
                      <p className="address-access">
                        {order?.pickUpAcces?.options}{" "}
                        {order?.pickUpAcces?.floor > 0
                          ? order?.pickUpAcces?.floor + " étage"
                          : null}
                      </p>
                      <p className="address-main">
                        {order?.pickUpAddress?.Address}
                      </p>
                    </div>
                    <p className="address-time">{order?.departDate}</p>
                  </div>

                  <div
                    className="address-line"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    {/* <img src={endIcon} alt="End" className="address-icon" /> */}
                    <div className="address-text">
                      <p className="address-access">
                        {order?.dropAcces?.options}{" "}
                        {order?.dropAcces?.floor > 0
                          ? order?.dropAcces?.floor + " étage"
                          : null}
                      </p>
                      <p className="address-main">
                        {order?.dropOfAddress?.Address}
                      </p>
                    </div>
                    <p className="address-time">{order?.deparTime}</p>
                  </div>
                </div>
              </div>

              <div
                className="status-badge-container"
                directionflesh={i18n.language === "ar-AR"}
                dir="auto"
              >
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusBadgeColor(order?.commandStatus),
                  }}
                >
                  {getStatusText(order?.commandStatus)}
                </span>
              </div>

              {isLoading ? (
                <div
                  className="loading-container"
                  directionflesh={i18n.language === "ar-AR"}
                  dir="auto"
                >
                  <div className="spinner"></div>
                  <p className="loading-text">
                    {t("Historique.Status.Problème.envoi")}
                  </p>
                </div>
              ) : (
                <div
                  className="form-container"
                  directionflesh={i18n.language === "ar-AR"}
                  dir="auto"
                >
                  <h2 className="form-title">
                    {t("Historique.Status.Problème.title")}
                  </h2>

                  <div
                    className="form-group"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    <label className="form-label">
                      {t("Historique.Status.Problème.problem")}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={t("Historique.Status.Problème.placeholder1")}
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                    />
                  </div>

                  <div
                    className="form-group"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    <label className="form-label">
                      {t("Historique.Status.Problème.message")}
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder={t("Historique.Status.Problème.placeholder2")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                    />
                  </div>

                  <div
                    className="form-group"
                    directionflesh={i18n.language === "ar-AR"}
                    dir="auto"
                  >
                    <label className="form-label">
                      {t("Historique.Status.Problème.pieces")}
                    </label>
                    <label className="attachment-button">
                      {/* <FontAwesomeIcon icon={faPaperclip} className="attachment-icon" /> */}
                      <span className="attachment-text">
                        {attachments.length > 0
                          ? `${attachments.length} ${t(
                              "Historique.Status.Problème.selectionner"
                            )}`
                          : t("Historique.Status.Problème.placeholder3")}
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleAttachment}
                        style={{ display: "none" }}
                        accept="image/*"
                      />
                    </label>

                    {attachments.length > 0 && (
                      <div
                        className="attachments-list"
                        directionflesh={i18n.language === "ar-AR"}
                        dir="auto"
                      >
                        {attachments.map((item, index) =>
                          renderAttachmentItem({ item, index })
                        )}
                      </div>
                    )}
                  </div>

                  <button className="submit-button" onClick={handleSubmit}>
                    {t("Historique.Status.Problème.button")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Alert Modal */}
      {alertModalVisible && (
        <div
          className="modal-overlay"
          directionflesh={i18n.language === "ar-AR"}
          dir="auto"
        >
          <div className="alert-content">
            <p className="alert-title">
              {t("Historique.Status.Problème.alert.thank_you")}
            </p>
            <p className="alert-message">
              {t("Historique.Status.Problème.alert.message")}
            </p>
            <button
              className="alert-button"
              onClick={() => setAlertModalVisible(false)}
            >
              {t("Historique.Status.Problème.alert.button")}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .signaler-problem-container {
          width: 100%;
        }
        .problem-button {
          padding: 12px;
          width: 100%;

          background-color: #f8f9fa;
          border-radius: 5px;
          border: 2px solid #18365a;
          border-right-width: 5px;
          border-bottom-width: 5px;
          color: #18365a;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .problem-button:hover {
          background-color: #e9ecef;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          position: relative;
        }

        .alert-content {
          width: 90%;
          max-width: 400px;
          background-color: white;
          border-radius: 10px;
          text-align: center;
        }

        .alert-title {
          font-weight: 700;
          padding-top: 20px;
          font-size: 18px;
          color: #18365a;
          margin-bottom: 10px;
        }

        .alert-message {
          padding: 20px;
          font-size: 16px;
          margin-bottom: 20px;
          color: #6c757d;
        }

        .alert-button {
          padding: 15px;
          background-color: #f37a1d;
          border-radius: 5px;
          width: 100%;
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .alert-button:hover {
          background-color: #f37a1d;
        }

        .form-container {
          width: 100%;
        }

        .form-title {
          color: #18365a;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
          width: 100%;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #18365a;
          margin-bottom: 6px;
          display: block;
        }

        .form-input,
        .form-textarea {
          border-bottom: 1px solid #f37a1d !important;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          padding: 10px;
          font-size: 14px;
          width: 100%;
          color: #212529;
        }

        .form-textarea {
          height: 100px;
          resize: vertical;
        }

        .attachment-button {
          padding: 10px;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          border-bottom: 1px solid #f37a1d;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .attachment-icon {
          color: #18365a;
          margin-right: 10px;
        }

        .attachment-text {
          color: #666;
          font-size: 14px;
        }

        .attachments-list {
          margin-top: 10px;
          max-height: 150px;
          overflow-y: auto;
        }

        .attachment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border: 1px solid #eee;
          border-radius: 4px;
          margin-bottom: 5px;
          background-color: #f9f9f9;
        }

        .attachment-name {
          flex: 1;
          font-size: 12px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .attachment-size {
          font-size: 12px;
          color: #6c757d;
          margin: 0 10px;
        }

        .remove-attachment {
          background: none;
          border: none;
          cursor: pointer;
        }

        .submit-button {
          padding: 15px;
          margin-top: 20px;
          background-color: #f37a1d;
          border-radius: 5px;
          border: 2px solid #18365a;
          border-right-width: 5px;
          border-bottom-width: 5px;
          color: white;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }

        .submit-button:hover {
          background-color: #f37a1d;
        }

        .close-button {
          margin-top: 20px;
          width: 90%;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #18365a;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-text {
          color: #18365a;
          margin-top: 5px;
        }

        .order-details {
          width: 100%;
          margin-top: 10px;
        }

        .order-details-title {
          font-weight: 700;
          margin-top: 10px;
          font-size: 14px;
          color: #18365a;
          text-align: left;
        }

        .address-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .address-line {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
        }

        .address-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

        .address-text {
          flex: 1;
          overflow: hidden;
          padding-left: 10px;
        }

        .address-access {
          font-weight: 600;
          font-size: 11px;
          color: #6c757d;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .address-main {
          color: #18365a;
          font-weight: 600;
          font-size: 13px;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .address-time {
          color: #6c757d;
          font-size: 13px;
          margin-left: 10px;
        }

        .status-badge-container {
          width: 100%;
          margin-top: 20px;
        }

        .status-badge {
          display: inline-block;
          padding: 8px 12px;
          border-radius: 6px;
          color: white;
          text-align: center;
          font-weight: 600;
          width: 100%;
          margin-bottom: 10px;
        }

        .ticket-exists-container {
          margin-top: 30px;
          width: 100%;
        }

        .contact-section {
          margin-top: 30px;
        }

        .contact-text {
          padding: 0 10px;
          font-size: 16px;
          color: #212529;
        }

        .call-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .phone-icon {
          width: 25px;
          height: 25px;
        }

        .phone-text {
          font-size: 16px;
          color: green;
        }

        .ticket-info {
          margin-top: 20px;
          padding: 20px;
          color: #6c757d;
          background-color: #f7f7f9;
          border-radius: 5px;
          border: 2px solid #18365a;
          border-right-width: 5px;
          border-bottom-width: 5px;
        }

        .ticket-field {
          display: flex;
          margin-bottom: 10px;
        }

        .ticket-label {
          font-size: 16px;
          color: #18365a;
          font-weight: 600;
          margin-right: 5px;
        }

        .ticket-value {
          font-size: 16px;
          color: #545454;
          font-weight: 500;
        }

        .ticket-response {
          margin-top: 20px;
          padding: 20px;
          color: #6c757d;
          background-color: #f7f7f9;
          border-radius: 5px;
          border: 2px solid #18365a;
          border-right-width: 5px;
          border-bottom-width: 5px;
          max-height: 200px;
          overflow-y: auto;
        }

        .ticket-response-label {
          font-size: 16px;
          color: #f37a1d;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .close-modal-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 32px;
          cursor: pointer;
          color: #18365a;
          padding: 5px 10px;
        }

        .close-modal-button:hover {
          color: #f37a1d;
        }
        .ticket-response-text {
          font-size: 16px;
          color: #212529;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export default SignalerProblem;

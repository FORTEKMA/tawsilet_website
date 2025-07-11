import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SignalerProblem = ({data}) => {
  const token = localStorage.getItem("token");
  const { i18n } = useTranslation();
  const [problemModalVisible, setProblemModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ticketExists, setTicketExists] = useState(false);
  const [ping, setPing] = useState(false);
  const [checkingTicket, setCheckingTicket] = useState(false);
  const order = useSelector((store) => store?.location?.command);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const { t } = useTranslation();

  

  const handleSubmit = async () => {
    console.log("order",order)
    setIsLoading(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_DOMAIN_URL}/api/commands/${data?.documentId}`,
        { data: { SpecificNote: message } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/tickets`,
        {
          data: {
            description: message,
            client: currentUser.id,
            command: data?.id,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProblemModalVisible(false);
      setAlertModalVisible(true);
      setMessage("");
      setPing(!ping);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      //alert("Erreur", "Une erreur s'est produite.");
    }
  };

  const handleCall = () => {
    window.location.href = "tel:36848020";
  };

  return (
    <Container directionflesh={i18n.language === "ar-AR"} dir="auto">
      <ProblemButton onClick={() => setProblemModalVisible(true)}>
        {t("Historique.Status.Problème.title")}
      </ProblemButton>
      {problemModalVisible && (
        <ModalOverlay>
          {ticketExists ? (
            <ModalContent>
              <CloseButton onClick={() => setProblemModalVisible(false)}>
                ×
              </CloseButton>
              <ContactSection>
                <ContactText>
                  {t("Historique.Status.Problème.contact")}
                </ContactText>
                <CallButton onClick={handleCall}>
                  <span>36848020</span>
                </CallButton>
              </ContactSection>
              {ticketExists[0] && (
                <TicketInfo>
                  <TicketField>
                    <TicketLabel>
                      {t("Historique.Status.Problème.tickettitre")}
                    </TicketLabel>
                    <TicketValue>
                      {ticketExists[0]?.title}
                    </TicketValue>
                  </TicketField>
                  <TicketField>
                    <TicketLabel>
                      {t("Historique.Status.Problème.ticketdesc")}
                    </TicketLabel>
                    <TicketValue>
                      {ticketExists[0]?.description}
                    </TicketValue>
                  </TicketField>
                </TicketInfo>
              )}
              <TicketResponse>
                <TicketResponseLabel>
                  {t("Historique.Status.Problème.response")}
                </TicketResponseLabel>
                <TicketResponseText>
                  {ticketExists[0]?.response ||
                    t("Historique.Status.Problème.responsemessage")}
                </TicketResponseText>
              </TicketResponse>
              <SubmitButton onClick={() => setProblemModalVisible(false)}>
                {t("Historique.Status.Problème.responsebutton")}
              </SubmitButton>
            </ModalContent>
          ) : (
            <ModalContent>
              <CloseButton onClick={() => setProblemModalVisible(false)}>
                ×
              </CloseButton>
              {isLoading ? (
                <LoadingContainer>
                  <Spinner />
                  <LoadingText>
                    {t("Historique.Status.Problème.envoi")}
                  </LoadingText>
                </LoadingContainer>
              ) : (
                <FormContainer>
                  <FormTitle>
                    {t("Historique.Status.Problème.title")}
                  </FormTitle>
                  <FormGroup>
                    <FormLabel>
                      {t("Historique.Status.Problème.message")}
                    </FormLabel>
                    <FormTextarea
                      placeholder={t("Historique.Status.Problème.placeholder2")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="4"
                    />
                  </FormGroup>
                  <SubmitButton onClick={handleSubmit}>
                    {t("Historique.Status.Problème.button")}
                  </SubmitButton>
                </FormContainer>
              )}
            </ModalContent>
          )}
        </ModalOverlay>
      )}
      {alertModalVisible && (
        <ModalOverlay>
          <AlertContent>
            <AlertTitle>
              {t("Historique.Status.Problème.alert.thank_you")}
            </AlertTitle>
            <AlertMessage>
              {t("Historique.Status.Problème.alert.message")}
            </AlertMessage>
            <AlertButton onClick={() => setAlertModalVisible(false)}>
              {t("Historique.Status.Problème.alert.button")}
            </AlertButton>
          </AlertContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SignalerProblem;

const Container = styled.div`
  width: 100%;
`;

const ProblemButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #ffffff;
  border: 2px solid #0c0c0c;
  border-radius: 8px;
  color: #0c0c0c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(12, 12, 12, 0.1);

  &:hover {
    background-color: #0c0c0c;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(12, 12, 12, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const ModalOverlay = styled.div`
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
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  box-shadow: 0px 20px 40px rgba(12, 12, 12, 0.15);

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

const AlertContent = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  padding: 24px;
  box-shadow: 0px 20px 40px rgba(12, 12, 12, 0.15);

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0c0c0c;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(12, 12, 12, 0.1);
    color: #d8b56c;
  }
`;

const AlertTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
  color: #0c0c0c;
  margin-bottom: 16px;
  text-align: center;
`;

const AlertMessage = styled.p`
  padding: 16px 0;
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
`;

const AlertButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #0c0c0c;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d8b56c;
    transform: translateY(-2px);
  }
`;

const ContactSection = styled.div`
  margin-top: 20px;
`;

const ContactText = styled.p`
  padding: 0 10px;
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
`;

const CallButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #0c0c0c;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  span {
    font-size: 16px;
    color: #0c0c0c;
    font-weight: 600;
  }

  &:hover {
    background-color: #0c0c0c;
    span {
      color: white;
    }
  }
`;

const TicketInfo = styled.div`
  margin-top: 16px;
  padding: 16px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid rgba(12, 12, 12, 0.1);
`;

const TicketField = styled.div`
  display: flex;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const TicketLabel = styled.span`
  font-size: 14px;
  color: #0c0c0c;
  font-weight: 600;
  margin-right: 8px;
  min-width: 80px;
`;

const TicketValue = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  flex: 1;
`;

const TicketResponse = styled.div`
  margin-top: 16px;
  padding: 16px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid rgba(12, 12, 12, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const TicketResponseLabel = styled.p`
  font-size: 14px;
  color: #d8b56c;
  font-weight: 600;
  margin-bottom: 8px;
`;

const TicketResponseText = styled.p`
  font-size: 14px;
  color: #0c0c0c;
  font-weight: 400;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Spinner = styled.div`
  border: 4px solid rgba(12, 12, 12, 0.1);
  border-left-color: #0c0c0c;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #0c0c0c;
  margin-top: 8px;
  font-size: 14px;
`;

const FormContainer = styled.div`
  width: 100%;
`;

const FormTitle = styled.h2`
  color: #0c0c0c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0c0c0c;
  margin-bottom: 8px;
  display: block;
`;

const FormTextarea = styled.textarea`
  border: 1px solid rgba(12, 12, 12, 0.2);
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  width: 100%;
  color: #0c0c0c;
  background-color: #ffffff;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0c0c0c;
    box-shadow: 0px 0px 0px 3px rgba(12, 12, 12, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #0c0c0c;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #d8b56c;
    transform: translateY(-2px);
    box-shadow: 0px 6px 12px rgba(12, 12, 12, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;
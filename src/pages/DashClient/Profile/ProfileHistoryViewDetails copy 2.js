import React, { createElement, useRef } from "react";
import styled from "styled-components";
import uploadFile from "../../../assets/icons/uploadFile.svg";
import printer from "../../../assets/icons/printer.svg";
import arrowyellow from "../../../assets/icons/arrowrightyellow.svg";
import { useTranslation } from "react-i18next";
import signature from "../../../assets/icons/signature.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router";

const ProfileHistoryViewDetails = ({ toggleModal, selectedOrder }) => {
  const { t, i18n } = useTranslation();
  const componentRef = useRef(null);
  const navigate = useNavigate();

  const statusSteps = [
    { id: 1, status: 'En route (encore)', description: 'Le shopping a retiré la commande', active: true },
    { id: 2, status: 'En route (encore)', description: 'Le shopping est en route vers le client', active: true },
    { id: 3, status: 'Livrée', description: 'La commande est arrivée à bon port', active: false },
    { id: 4, status: 'Terminée !', description: 'La livraison est terminée', active: false },
  ];

  return (
    <Container>
      <Header>
        <ShopInfo>
  
      
          <ShopName>COMMANDE</ShopName>
          <ShopSubtitle>{selectedOrder?.refNumber }</ShopSubtitle>
          <NavLinks>
          <Actions>
        <ActionButton onClick={() => printPDF()}>
          <img src={printer} alt="export" />
          <p>{t("ClientProfile.ProfileHistory.details.print")}</p>
        </ActionButton>
        <ActionButton onClick={() => exportToPDF()}>
          <img src={uploadFile} alt="export" />
          <p>{t("ClientProfile.ProfileHistory.details.export")}</p>
        </ActionButton>
        {selectedOrder?.documentId && (
          <ActionButton onClick={() => navigate(`/driver/track/${selectedOrder.documentId}`)}>
            <p>{t("ClientProfile.ProfileHistory.details.suivre")}</p>
            <img src={arrowyellow} alt="suivre" />
          </ActionButton>
        )}
      </Actions>
          </NavLinks>
        </ShopInfo>
        
        <CloseButton onClick={toggleModal}>x</CloseButton>
      </Header>

      <Divider />

      <Section>
        <SectionTitle>Page de référence</SectionTitle>
        <ReferenceItem>La limitation est un élément d'un dispositif.</ReferenceItem>
        <ReferenceItem>Le dispositif a demandé la fourniture.</ReferenceItem>
        
        <StatusStepper>
          {statusSteps.map((step, index) => (
            <StatusStep key={step.id} active={step.active} last={index === statusSteps.length - 1}>
              <StatusBadge active={step.active}>
                {step.status}
              </StatusBadge>
              <StatusDescription>{step.description}</StatusDescription>
            </StatusStep>
          ))}
        </StatusStepper>
      </Section>

      <Divider />

      

      <Divider />

      <Section>
        <SectionTitle>Pôle de livraison</SectionTitle>
        <DeliveryDate>{selectedOrder?.departDate }</DeliveryDate>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>Choisissez du logique</SectionTitle>
        <LogicChoice>Entre 13000 et 14000</LogicChoice>
      </Section>

      <Divider />

      <Section>
        <PriceItem>Tél : 7,50 €</PriceItem>
        <PriceItem>Tél : +1,5 €</PriceItem>
        <PriceItem>Produire pour retour : +2,50 €</PriceItem>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>Déclaration</SectionTitle>
        <Declarant>{selectedOrder?.customerName }</Declarant>
      </Section>

      <Divider />

      <Section>
        <SectionTitle>Adresse de livraison</SectionTitle>
        <Address>{selectedOrder?.dropOfAddress?.Address }</Address>
        <Address>{selectedOrder?.dropOfAddress?.city }</Address>
      </Section>

      <Divider />

      <PriceSection>
        <PriceTitle>PRIX</PriceTitle>
        <PriceRow>
          <PriceLabel>Prix de base</PriceLabel>
          <PriceValue>{selectedOrder?.totalPrice }</PriceValue>
        </PriceRow>
      </PriceSection>
     
      {selectedOrder?.items?.length > 0 && (
        <>
          <Divider />
          <Section>
            <SectionTitle>Produits</SectionTitle>
            <ItemsList>
              {selectedOrder.items.map((item, index) => (
                <ItemBox key={index}>
                  <p>{item?.quant} × {item?.item?.name}</p>
                </ItemBox>
              ))}
            </ItemsList>
          </Section>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 50vw;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  color: #333;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ShopInfo = styled.div`
  flex: 1;
`;

const ShopName = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #2c3e50;
`;

const ShopSubtitle = styled.h2`
  font-size: 18px;
  margin: 5px 0 0 0;
  color: #7f8c8d;
  font-weight: normal;
`;

const NavLinks = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 15px;
`;

const NavLink = styled.a`
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CloseButton = styled.div`
  font-size: 22px;
  font-weight: 300;
  font-family: sans-serif;
  cursor: pointer;
  padding: 5px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ecf0f1;
  margin: 20px 0;
`;

const Section = styled.div`
  margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 10px 0;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ReferenceItem = styled.p`
  font-size: 14px;
  margin: 5px 0;
  line-height: 1.4;
`;

const StatusStepper = styled.div`
  margin: 20px 0;
  position: relative;
  padding-left: 20px;
`;

const StatusStep = styled.div`
  position: relative;
  padding-bottom: 20px;
  ${({ last }) => !last && `
    &:before {
      content: '';
      position: absolute;
      left: -20px;
      top: 20px;
      height: calc(100% - 20px);
      width: 2px;
      background: ${props => props.active ? '#3498db' : '#ecf0f1'};
    }
  `}
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  background-color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: -26px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.active ? '#3498db' : '#ecf0f1'};
    border: 2px solid white;
  }
`;

const StatusDescription = styled.p`
  font-size: 14px;
  margin: 8px 0 0 0;
  color: #7f8c8d;
  padding-left: 10px;
`;

const OrderNumber = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #2c3e50;
`;

const DeliveryDate = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const LogicChoice = styled.p`
  font-size: 16px;
  margin: 5px 0;
  font-style: italic;
`;

const PriceItem = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Declarant = styled.p`
  font-size: 16px;
  margin: 5px 0;
  font-weight: bold;
`;

const Address = styled.p`
  font-size: 16px;
  margin: 5px 0;
  line-height: 1.4;
`;

const PriceSection = styled(Section)`
  margin-top: 30px;
`;

const PriceTitle = styled(SectionTitle)`
  font-size: 16px;
  margin-bottom: 15px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const PriceLabel = styled.span`
  font-size: 16px;
`;

const PriceValue = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 8px 10px;
  border: 1px solid #ccc;
  background-color: transparent;
  color: #333;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  
  img {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
`;

const ItemBox = styled.div`
  p {
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 8px;
    white-space: nowrap;
    font-size: 14px;
    margin: 0;
  }
`;

export default ProfileHistoryViewDetails;
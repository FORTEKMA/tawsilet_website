import React, { createElement, useRef } from "react";
import styled from "styled-components";

import creditcard from "../../assets/icons/credit-card.png";
import clipboard from "../../assets/icons/clipboard.png";
import add from "../../assets/icons/add.png";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import SignalerProblem from "../DashClient/Profile/SignalerProblem";

const Commande = () => {
  const { t, i18n } = useTranslation();
  const componentRef = useRef(null);
  const command = useSelector((store) => store?.location?.command);
  const livraison = require("../../assets/icons/livraison.png");
  const money = require("../../assets/icons/Money.png");
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
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        flexWrap: "wrap",
      }}
    >
      <Content
        style={{
          display: "flex",
          gap: 30,
          width: "70vw",
          margin: "auto",
          flexWrap: "wrap",
        }}
      >
        <Wrapper directionflesh={i18n.language === "ar-AR"} dir="auto">
          <div
            style={{ display: "flex", gap: 5, justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <img
                src={clipboard}
                alt="external link"
                style={{ width: 25, height: 25 }}
              />
              <ShopName>
                {t("ClientProfile.ProfileHistory.details.commande")}
              </ShopName>
            </div>
            <ShopSubtitle>#{command?.refNumber}</ShopSubtitle>
          </div>
          <Divider
            style={{
              margin: 0,
              backgroundColor: "#92929e",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <TableWrapper id="toPrint" ref={componentRef}>
            {/* {command?.paymentStatus === "linkSend" ? (
              <span
                className="payBtn"
                onClick={() =>
                  window.location.replace(`${command?.paymentUrl}`)
                }
              >
                Payer
              </span>
            ) : null} */}
            <TableRow>
              <TableCell>
                <DateTimeSection>
                  <InfoTitle>
                    {t("ClientProfile.ProfileHistory.details.date")}
                  </InfoTitle>
                  <p>
                    {command?.departDate},{" "}
                    {command?.deparTime.split(":").slice(0, 2).join(":")}
                  </p>
                </DateTimeSection>
              </TableCell>
            </TableRow>
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
                  <p>{command?.distance / 1000} km</p>
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
        <section
          directionflesh={i18n.language === "ar-AR"}
          dir="auto"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            margin: "auto",
          }}
        >
          <Container directionflesh={i18n.language === "ar-AR"} dir="auto">
            <div style={{ display: "flex", gap: 10 }}>
              <img
                src={creditcard}
                alt="external link"
                style={{ width: 25, height: 25 }}
              />
              <InfoTitle style={{ marginTop: 5 }}>
                {t("ClientProfile.ProfileHistory.details.prix")}
              </InfoTitle>
            </div>
            <Divider />
            {/* <TableCell>
            {" "}
            {command?.payType === "Livraison" ? null : (
              <>
                <InfoTitle>Status de Paiement</InfoTitle>

                <PayStatus
                  color={
                    command?.paymentStatus === "processing"
                      ? "yellow"
                      : command?.paymentStatus === "success"
                      ? "green"
                      : command?.paymentStatus === "linkSend"
                      ? "none"
                      : "red"
                  }
                >
                  {/* <img src={uploadFile} alt="export" /> 

                  {command?.paymentStatus === "processing" ? (
                    <p>En attente</p>
                  ) : command?.paymentStatus === "success" ? (
                    <p>Payer</p>
                  ) : command?.paymentStatus === "linkSend" ? (
                    <div className="paymentLink">
                      <p
                        onClick={() =>
                          window.location.replace(
                            `${command?.paymentUrl}`
                          )
                        }
                      >
                        En attente de payement
                      </p>
                      <img src={arrowyellow} alt="external link" />
                    </div>
                  ) : (
                    <p>Annuler </p>
                  )}
                </PayStatus>
              </>
            )}
          </TableCell> */}
            <TableRow>
              <TableCell>
                {" "}
                <div>
                  {" "}
                  <InfoTitle>
                    {t("ClientProfile.ProfileHistory.details.prix")}
                  </InfoTitle>{" "}
                  <InfoItem>{command?.totalPrice} DT</InfoItem>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <div>
                  {" "}
                  <InfoTitle>
                    {t("ClientProfile.ProfileHistory.details.mode_paiement")}
                  </InfoTitle>
                  <InfoItem style={{ display: "flex", gap: 5 }}>
                    <img
                      src={command?.payType === "Livraison" ? money : livraison}
                      alt={
                        command?.payType === "Livraison"
                          ? "Money payment"
                          : "Delivery payment"
                      }
                      style={{
                        width: 25,
                        height: 25,
                        marginTop: 5,
                        objectFit: "contain", // Ensures the image maintains aspect ratio
                      }}
                    />
                    <div style={{ marginTop: 10 }}>
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
          <SignalerProblem />
        </section>
      </Content>

      <Itemss
        directionflesh={i18n.language === "ar-AR"}
        dir="auto"
        style={{ marginBottom: 100, display: "flex", flexDirection: "column" }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <img
              src={add}
              alt="external link"
              style={{ width: 25, height: 25 }}
            />
            <InfoTitle style={{ marginTop: 5 }}>
              {" "}
              {t(
                "ClientProfile.ProfileHistory.details.information_commandes"
              )}{" "}
            </InfoTitle>
          </div>
          <span> {t("ClientProfile.ProfileHistory.details.produit")}</span>
        </section>
        <section>
          <ItemsList>
            {command?.items?.map((item, index) => (
              <ItemBox key={index}>
                <p>
                  {item?.quant}* {item?.item?.name}
                </p>
              </ItemBox>
            ))}
          </ItemsList>
        </section>
      </Itemss>
    </section>
  );
};
export default Commande;
const Content = styled.section`
  display: flex;
  gap: 30px;
  width: 70vw;
  margin: auto;
  flex-wrap: wrap;

  @media (max-width: 1500px) {
    width: 90vw;
    margin: auto;
  }
`;

const Wrapper = styled.div`
  width: 40vw;
  overflow: hidden;
  height:"auto",
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* box-shadow: ; */
   box-shadow: 0px 10px 20px #e6e7e8;
  /* border: 1px solid rgba(155, 155, 155, 0.2); */
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f0f0f0;
  

  color: #18365a;
//  border-bottom: 4px solid #18365a,
//     border-right: 4px solid #18365a,
  @media (max-width: 1500px) {
    width: 90vw;
    padding: 10px 16px 20px;
  }
`;
const Container = styled.div`
  width: 28vw;
  height: 200px;

  overflow: hidden;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  /* box-shadow: ; */
  box-shadow: 0px 10px 20px #e6e7e8;
  /* border: 1px solid rgba(155, 155, 155, 0.2); */
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f0f0f0;
  opacity: 0.95;
  color: #18365a;

  @media (max-width: 1500px) {
    width: 90vw;
    padding: 10px 16px 20px;
  }
  @media (max-width: 1000px) {
    width: auto;
    margin: auto;
  }
`;
const Itemss = styled.div`
  width: 70vw;
  overflow: hidden;
  margin: auto;
  height: "auto";
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* box-shadow: ; */
  box-shadow: 0px 10px 20px #e6e7e8;
  /* border: 1px solid rgba(155, 155, 155, 0.2); */
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f0f0f0;
  opacity: 0.95;
  color: #18365a;

  @media (max-width: 1500px) {
    width: 90vw;
    margin: auto;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  /* border-bottom: 1px solid #ccc;
  padding-bottom: 10px; */
  @media (max-width: 1151px) {
    padding: 16px 16px 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  padding: 8px 10px;
  margin: 0 5px;
  border: 1px solid gray;
  background-color: transparent;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const PayStatus = styled.div`
  padding: ${(props) => (props.color === "none" ? "0px" : "8px 16px")};
  margin: 0;
  border: 1px solid ${(props) => props.color || "gray"};
  background-color: transparent;
  color: ${(props) => (props.color === "none" ? "#4598FF" : props.color)};
  width: fit-content;
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-decoration: ${(props) =>
    props.color === "none" ? "underline" : "none"};
  gap: 10px;
  img {
    width: 12px;
    height: 12px;
    transform: rotate(-45deg);
  }
  .paymentLink {
    cursor: pointer;
    display: flex;
    gap: 10px;
  }
`;
const ShopName = styled.h1`
  font-size: 22px;
  color: "white";
`;

const ShopSubtitle = styled.h2`
  font-size: 18px;
  color: #f37a1d;
  font-weight: normal;
`;

const AddressSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Address = styled.div`
  font-weight: bold;
`;

const DateTimeSection = styled.div`
  display: flex;
  justify-content: space-between;
  //   margin-top: 10px;
  flex-direction: column;
`;

const DateTime = styled.div`
  font-weight: bold;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const InfoItem = styled.div`
  flex: 1;
`;

const PictureSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .cardSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1150px) {
      flex-wrap: wrap;
      margin: 0px;
      padding: 8px;
    }
  }
  .activeCard {
    background-color: #f37a1d;
    height: 9.5vw;
    @media (max-width: 1150px) {
      height: 100%;
    }
  }
  .imgV {
    width: 9vw;
    height: 10vw;
    z-index: 1;
    @media (max-width: 1150px) {
      width: 100%;
      height: 100%;
    }
  }

  .BimgV {
    position: absolute;
    opacity: 0;
    width: 9vw;
    height: 10vw;
    z-index: 99;
    transition: all 0.2s ease-in;
    @media (max-width: 1150px) {
      display: none;
    }
  }
  .BimgV:hover {
    opacity: 1;
  }

  .HBimgV {
    display: none;
  }
  @media (max-width: 1150px) {
    /* width: 47%; */
    height: max-content;
    margin-bottom: 0;
  }
`;

const Picture = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;
const SmallCard = styled.div`
  // background-color: aquamarine;

  width: 20%;
  height: unset;

  box-shadow: 0px 6.360688209533691px 19.082067489624023px 0px #0000001f;
  .activeCard {
    background-color: #f37a1d !important;
    height: 9.5vw;
    @media (max-width: 1150px) {
      height: 100%;
    }
  }
  .imgV {
    width: 100%;
    height: unset;
    z-index: 1;
    background-color: white;

    @media (max-width: 1150px) {
      width: 100%;
      height: 100%;
    }
  }

  .BimgV {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: unset;
    z-index: 99;
    transition: all 0.2s ease-in;

    @media (max-width: 1150px) {
      display: none;
    }
  }
  .BimgV:hover {
    opacity: 1;
  }

  .HBimgV {
    display: none;
  }
  @media (max-width: 1150px) {
    width: 47%;
    height: 35vw;
    margin-bottom: 5vh;
  }
`;

const InfoTitle = styled.h4``;

const ItemsList = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
`;

const ItemBox = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;

  p {
    /* width: 80%; */
    border-radius: 10px;
    border: 1px solid gray;
    padding: 8px;
    white-space: nowrap;
  }
  span {
  }
`;

const PlusMinusBox = styled.div`
  display: flex;
  /* padding: 8px; */
  /* border: 1px solid gray; */
  border-radius: 10px;
  /* overflow: hidden; */
  span {
    padding: 8px 16px;
    border: 1px solid gray;
  }
  .span-minus {
    border-radius: 10px 0 0 10px;
  }
  .span-plus {
    border-radius: 0 10px 10px 0;
  }
  .span-middle {
    padding: 8px 20px;
  }
`;

const AddBtn = styled.span`
  border-radius: 10px;
  border: 1px solid gray;
  padding: 8px 16px;
  width: fit-content;
`;

const Note = styled.p`
  height: 100px;
  width: 60%;
  padding: 8px 16px;
  border: 1px solid gray;
  margin-top: 20px;
  border-radius: 10px;
  @media (max-width: 1151px) {
    width: 100%;
    margin: 0;
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
    border: 1px solid yellow;
    color: yellow;
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableCell = styled.td`
  padding: 8px;
  width: 50%;
`;

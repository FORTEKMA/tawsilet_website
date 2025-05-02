import React, { createElement, useEffect, useRef,  useState, } from "react";
import styled from "styled-components";
// import cardImage from "../../../assets/images/Component 47.svg";
// import cardImage2 from "../../../assets/images/Component 51.svg";
// import cardImage3 from "../../../assets/images/Component 53.svg";
// import cardImage4 from "../../../assets/images/Component 55.svg";
// import backCardImage from "../../../assets/images/Component 48.svg";
// import backCardImage2 from "../../../assets/images/Component 49.svg";
// import backCardImage3 from "../../../assets/images/Component 63.svg";
// import backCardImage4 from "../../../assets/images/Component 65.svg";
import uploadFile from "../../../assets/icons/uploadFile.svg";
import printer from "../../../assets/icons/printer.svg";
import arrowyellow from "../../../assets/icons/arrowrightyellow.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import signature from "../../../assets/icons/signature.png";

// import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router";


const Wrapper = styled.div`
  width: 50vw;
  overflow: hidden;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* box-shadow: ; */
  box-shadow: 0px 10px 20px rgba(255, 255, 255, 0.2);
  /* border: 1px solid rgba(155, 155, 155, 0.2); */
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #18365a;
  color: white;
  @media (max-width: 1151px) {
    width: 90vw;
    padding: 2px 16px 20px;
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
const ActionButtonv = styled.button`
  margin-top: 50px;
  padding: 10px;
  border: 1px solid #f37a1d;
  background-color: #f37a1d;
  color: white;
  font-weight: 600;
  margin: auto;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
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
  margin-top: 10px;
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

const ProfileHistoryViewDetails = ({ toggleModal, selectedOrder}) => {
  const { t, i18n } = useTranslation();
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const componentRef = useRef(null);


  const createToExportElement = (print) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString().replaceAll("/", "-");
    const tableWrapper = document.createElement("div");
    tableWrapper.id = "toPrint";
    tableWrapper.style.cssText = `
        width: 210mm;
        min-height: 297mm;
   
        
        color: #333;
       
        box-sizing: border-box;
    `;

    // Logo Image
    const coverTop = document.createElement("div");

    coverTop.style.cssText = `
        width: 90%;
        padding: ${print ? "10mm 0" : "10px 20px"};
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        margin-bottom: 10mm;
        color: #18365a;
    `;

    // Make sure to set this
    const logo = document.createElement("img");
    logo.style.cssText = "width: 40mm; height: auto;";
    logo.src = "/assets/images/Group2.png";
    // Header of doc
    const Title = document.createElement("h3");
    Title.textContent = `Bon de livraison`;
    Title.style.cssText = `
        color: #18365a;
        margin: 0;
        font-size: 18pt;
    `;
    coverTop.appendChild(Title);
    coverTop.appendChild(logo);
    tableWrapper.appendChild(coverTop);
    // Company Info and Footer
  if (!currentUser) return <div>chargement...</div>;
// Client Information
const clientInfo = `

<div style="padding: 2mm; margin-bottom: 10mm; ">
<h4 style="margin: 0 0 2mm 0; font-size: 14pt; color:#18365a">Informations Client</h4>
<p style="margin: 0 0 1mm 0; font-size: 11pt;"><strong>Nom:</strong> ${currentUser?.firstName || 'Non spécifié'} ${currentUser?.lastName || 'Non spécifié'}</p>
<p style="margin: 0 0 1mm 0; font-size: 11pt;"><strong>Tél:</strong> ${currentUser?.phoneNumber || 'Non spécifié'}</p>
<p style="margin: 0; font-size: 11pt;"><strong>Email:</strong> ${currentUser?.email || 'Non spécifié'}</p>
</div>
`;
tableWrapper.innerHTML += clientInfo;





    // Table row styling
    function createTableRow(cell1Content, cell2Content) {
      const row = document.createElement("div");
      row.className = "TableRow";
      row.style.cssText = `
            display: flex;
            gap:30px;
            width:90%;    
                    margin-bottom: 5mm;
            page-break-inside: avoid;
        `;

      const cell1 = document.createElement("div");
      cell1.className = "TableCell";
      cell1.style.cssText = `
             flex: 1;
            padding: ${print ? "2mm" : "10px"};
            position: relative;
            // margin-right: 5mm;
            border: 1px solid #eee;
            border-radius: 3px;
        `;
      cell1.innerHTML = cell1Content;

      const cell2 = document.createElement("div");
      cell2.className = "TableCell";
      cell2.style.cssText = `

            flex: 1;
            padding: ${print ? "2mm" : "10px"};
            position: relative;
            border: 1px solid #eee;
            border-radius: 3px;
        `;
      cell2.innerHTML = cell2Content;

      row.appendChild(cell1);
      row.appendChild(cell2);

      tableWrapper.appendChild(row);
    }

    // Address de rammassage
    const addressRammassage = `
         
        <div style="padding: 2mm;">
            <h4 style="margin: 0 0 2mm 0; font-size: 12pt;"> Adresse de ramassage</h4>
            <p style="margin: 0; font-size: 11pt; width:250px">${selectedOrder?.pickUpAddress?.Address}</p>
        </div>
    `;

    // Address de depot
    const addressDepot = `

                   <h4 style="margin: 0 0 2mm 0; font-size: 12pt;"> Adresse de dépôt</h4>
            <p style="margin: 0; font-size: 11pt;">${selectedOrder?.dropOfAddress?.Address}</p>
        </div>
    `;

    createTableRow(addressRammassage, addressDepot);

    // Distance de la course and Durée de la course
    const distanceCourse = `
        <div style="padding: 2mm;">
            <h4 style="margin: 0 0 2mm 0; font-size: 12pt;">Distance de la course</h4>
            <p style="margin: 0; font-size: 11pt;">${
              selectedOrder?.distance / 1000
            } km</p>
        </div>
    `;

    const dureeCourse = `
        <div style="padding: 2mm;">
            <h4 style="margin: 0 0 2mm 0; font-size: 12pt;">Durée estimée de la course</h4>
            <div style="margin: 0; font-size: 11pt;">${selectedOrder?.duration}</div>
        </div>
    `;

    createTableRow(distanceCourse, dureeCourse);

    // Date de la course et mode de payement
    const dateCourse = `
        <div style="padding: 2mm;">
            <h4 style="margin: 0 0 2mm 0; font-size: 12pt;">Date de depart</h4>
            <p style="margin: 0; font-size: 11pt;">${
              selectedOrder?.departDate
            } ${selectedOrder?.deparTime.split(":").slice(0, 2).join(":")}</p>
        </div>
    `;

    const modeDePayement = `
        <div style="padding: 2mm;">
            <h4 style="margin: 0 0 2mm 0; font-size: 12pt;">Mode de Payement</h4>
            <div style="margin: 0; font-size: 11pt;">${selectedOrder?.payType}</div>
        </div>
    `;

    createTableRow(dateCourse, modeDePayement);

    // Status de payement et Prix
    const paymentStatus = `
        <div style="position: absolute; left: 25mm; ">
            <img src=${signature} style=" width: 40mm; position: absolute; top:-20px;right:-60px;"/>
            <div style="z-index: 99; text-align: right; width: fit-content; margin-top:10px; color: ${
              selectedOrder?.paymentStatus === "success" ? "green" : "red"
            }; padding: 2mm 5mm; border-radius: 3mm; border: 2px solid ${
      selectedOrder?.paymentStatus === "success" ? "green" : "red"
    }; font-size: 14pt; font-weight: 700;">
                <p style="margin: 0;">${
                  selectedOrder?.paymentStatus === "success" ? "Payé" : "Impayé"
                }</p>
            </div>
        </div>
    `;

    const commendPrix = `
        <div style="padding: 2mm; color: ${
          selectedOrder?.paymentStatus === "success" ? "green" : "red"
        }">
            <h3 style="margin: 0 0 2mm 0; font-size: 12pt;">Prix Total</h3>
            <h2 style="margin: 0; font-size: 14pt;">${
              selectedOrder?.totalPrice
            }</h2>
        </div>
    `;

    createTableRow(commendPrix, paymentStatus);
    const lineHR = document.createElement("hr");
    lineHR.style.cssText = "margin: 0 0 5mm 0; border: 0.5px solid #fff;";
    // Items list
    const listTitle = document.createElement("h2");
    listTitle.textContent = "Liste des objets:";
    listTitle.style.cssText = `
        margin: 10mm 0 5mm 0;
        font-size: 14pt;
        page-break-before: avoid;
        color:#18365a;
    `;
    tableWrapper.appendChild(listTitle);


    tableWrapper.appendChild(lineHR);

    const itemsTable = document.createElement("table");
    itemsTable.style.cssText = `
        width: 90%;
        border-collapse: collapse;
        margin: 0 0 10mm 0;
        text-align: center;
        font-size: 11pt;
        page-break-inside: avoid;
    `;

    itemsTable.innerHTML = `
        <thead>
            <tr style="background-color: white; color: #18365a;">
                <th style="width: 25%; padding: 3mm; border: 1px solid #ddd; text-align: left;">Quantité</th>
                <th style="width: 75%; padding: 3mm; border: 1px solid #ddd; text-align: left;">Nom d'objet</th>
            </tr>
        </thead>
        <tbody>
            ${selectedOrder?.items
              ?.map(
                (el, i) => `
                    <tr style="background-color: "white"
                    };">
                        <td style="width: 25%; padding: 3mm; border: 1px solid #ccc; text-align: left;">${
                          el.quant
                        }</td>
                        <td style="width: 75%; padding: 3mm; border: 1px solid #ccc; text-align: left;">${
                          el.item.name
                        }</td>
                    </tr>`
              )
              .join("")}
        </tbody>
    `;

    tableWrapper.appendChild(itemsTable);

// Footer
const footer = document.createElement("div");
footer.style.cssText = `
    width: 90%;
    margin-top: 10mm;
    padding-top: 5mm;
    border-top: 1px solid #eee;
`;

// Left side - Invoice info
const footerLeft = document.createElement("div");
footerLeft.style.cssText = "float: left; text-align: left;";
footerLeft.innerHTML = `
      
   
    <p style="margin: 0 0 1mm 0; font-size: 11pt;">Tél: +216 36 848 020</p>
    <p style="margin: 0; font-size: 11pt;">Email: contact@sheelni.com</p> 
    <p style="margin: 0 0 1mm 0; font-size: 11pt;">Adresse: Immeuble Yasmine du Lac, Avenue de la Bourse</p>
    <p style="margin: 0 0 1mm 0; font-size: 11pt;">Berges du Lac 1, La Marsa, Tunis 1053</p>
`;

// Right side - Company info
const footerRight = document.createElement("div");
// const logoo = document.createElement("img");
// logoo.src = "/assets/images/Group1.png";// Update this path
// logoo.alt = "Sheelni Logo";
// logoo.style.cssText = `
//     width: 30mm;
//     height: auto;
//     max-height: 20mm;
//     object-fit: contain;
// `;
footerRight.style.cssText = "float: right; text-align: right;";
footerRight.innerHTML = `
     <p style="margin: 0 0 1mm 0; font-size: 10pt; color: #666;">
        Facture n° ${selectedOrder?.refNumber || 'N/A'}
    </p>
    <p style="margin: 0; font-size: 10pt; color: #666;">
        Imprimé le ${formattedDate}
    </p>
`;

// Clear float
const clearFix = document.createElement("div");
clearFix.style.cssText = "clear: both;";

// footerRight.appendChild(logoo);
footer.appendChild(footerLeft);
footer.appendChild(footerRight);
footer.appendChild(clearFix);
tableWrapper.appendChild(footer);
return tableWrapper;
  };

  const printPDF = () => {
    const toExportElement = createToExportElement(true);

    // Create a print-friendly HTML document
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
        
            <title>Commande ${selectedOrder?.refNumber}</title>
            <style>
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                    }
                    #toPrint {
                        width: 210mm;
                        min-height: 297mm;
                        margin: 0 auto;
                    }
                    .TableRow {
                        page-break-inside: avoid;
                    }
                    h2, h3, h4 {
                        page-break-after: avoid;
                    }
                    table {
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            ${toExportElement.outerHTML}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        window.close();
                    }, 200);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString().replaceAll("/", "-");
    const fileName = `Command-${formattedDate}-${selectedOrder?.refNumber}.pdf`;
    // const toPrint=document.create

    const toExportElement = createToExportElement();

    // const container = document.getElementById("toPrint"); // Replace with your actual container ID
    // doc.appendChild(tableWrapper);

    doc.html(toExportElement, {
      callback: function (doc) {
        // Save the PDF
        doc.save(fileName);
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  };

  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 300,
            fontFamily: "sans-serif",
            cursor: "pointer",
          }}
          onClick={toggleModal}
        >
          {"  "}x
        </div>
        <Actions directionflesh={i18n.language === "ar-AR"} dir="auto">
          <ActionButton onClick={() => printPDF()}>
            <img src={printer} alt="export" />
            <p>{t("ClientProfile.ProfileHistory.details.print")}</p>
          </ActionButton>
          <ActionButton onClick={() => exportToPDF()}>
            <img src={uploadFile} alt="export" />
            <p>{t("ClientProfile.ProfileHistory.details.export")}</p>
          </ActionButton>

          {/* /driver/track/ */}
        </Actions>
      </Header>
      <hr style={{ width: "220%", marginLeft: "-120px" }} />
      <TableWrapper id="toPrint" ref={componentRef}>
        {selectedOrder?.paymentStatus === "linkSend" ? (
          <span
            className="payBtn"
            onClick={() =>
              window.location.replace(`${selectedOrder?.paymentUrl}`)
            }
          >
            Payer
          </span>
        ) : null}
        <TableRow>
          <TableCell>
            <div>
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.adresse_ramassage")}
              </InfoTitle>
              <p>{selectedOrder?.dropOfAddress?.Address}</p>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div>
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.adresse_depot")}
              </InfoTitle>
              <p>{selectedOrder?.pickUpAddress?.Address}</p>
            </div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <div>
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.distance_course")}
              </InfoTitle>
              <p>{selectedOrder?.distance / 1000} km</p>
            </div>
          </TableCell>
          <TableCell>
            <div>
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.duree_course")}
              </InfoTitle>
              <InfoItem>{selectedOrder?.duration}</InfoItem>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <DateTimeSection>
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.date")}
              </InfoTitle>
              <p>
                {selectedOrder?.departDate},{" "}
                {selectedOrder?.deparTime.split(":").slice(0, 2).join(":")}
              </p>
            </DateTimeSection>
          </TableCell>
          <TableCell>
            {" "}
            {selectedOrder?.payType === "Livraison" ? null : (
              <>
                <InfoTitle>Status de Paiement</InfoTitle>

                <PayStatus
                  color={
                    selectedOrder?.paymentStatus === "processing"
                      ? "yellow"
                      : selectedOrder?.paymentStatus === "success"
                      ? "green"
                      : selectedOrder?.paymentStatus === "linkSend"
                      ? "none"
                      : "red"
                  }
                >
                  {/* <img src={uploadFile} alt="export" /> */}

                  {selectedOrder?.paymentStatus === "processing" ? (
                    <p>En attente</p>
                  ) : selectedOrder?.paymentStatus === "success" ? (
                    <p>Payer</p>
                  ) : selectedOrder?.paymentStatus === "linkSend" ? (
                    <div className="paymentLink">
                      <p
                        onClick={() =>
                          window.location.replace(
                            `${selectedOrder?.paymentUrl}`
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
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {" "}
            <div>
              {" "}
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.prix")}
              </InfoTitle>{" "}
              <InfoItem>{selectedOrder?.totalPrice} DT</InfoItem>
            </div>
          </TableCell>
          <TableCell>
            {" "}
            <div>
              {" "}
              <InfoTitle>
                {t("ClientProfile.ProfileHistory.details.mode_paiement")}
              </InfoTitle>
              <InfoItem>
                {selectedOrder?.payType === "Credit"
                  ? "Carte Bancaire"
                  : "Paiement à la Livraison"}
              </InfoItem>
            </div>
          </TableCell>
        </TableRow>
      </TableWrapper>

      {/* <PictureSection>
        <div className="cardSection">
          <SmallCard
            className="cardMain
          "
            // onClick={() => {
            //   setOrder({
            //     data: {
            //       ...order.data,
            //       TansportType: {
            //         Type: "S.small",
            //         Quantity: 1,
            //       },
            //     },
            //   });
            //   setactiveCardIndex(1);
            // }}
          >
            <img
              src={cardImage}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "S.Small"
                  ? "imgV activeCard"
                  : "imgV"
              }
            />
            {/* <img
              src={backCardImage}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "S.Small"
                  ? "HBimgV"
                  : "BimgV"
              }
            /> *
          </SmallCard>

          <SmallCard
          // onClick={() => {
          //   setOrder({
          //     data: {
          //       ...order.data,
          //       TansportType: {
          //         Type: "Small",
          //         Quantity: 1,
          //       },
          //     },
          //   });
          //   setactiveCardIndex(2);
          // }}
          >
            <img
              src={cardImage2}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "Small"
                  ? "imgV activeCard"
                  : "imgV"
              }
            />
            {/* <img
              src={backCardImage2}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "Small"
                  ? "HBimgV"
                  : "BimgV"
              }
            /> *
          </SmallCard>
          <SmallCard
          // onClick={() => {
          //   setOrder({
          //     data: {
          //       ...order.data,
          //       TansportType: {
          //         Type: "Classic",
          //         Quantity: 1,
          //       },
          //     },
          //   });
          //   setactiveCardIndex(3);
          // }}
          >
            <img
              src={cardImage3}
              alt="cover image"
              //   className={activeCardIndex === 3 ? "imgV activeCard" : "imgV"}
              className={
                selectedOrder?.TansportType?.Type === "Classic"
                  ? "imgV activeCard"
                  : "imgV"
              }
            />
            {/* <img
              src={backCardImage3}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "Classic"
                  ? "HBimgV"
                  : "BimgV"
              }
            /> *
          </SmallCard>
          <SmallCard
          // onClick={() => {
          //   setOrder({
          //     data: {
          //       ...order.data,
          //       TansportType: {
          //         Type: "Large",
          //         Quantity: 1,
          //       },
          //     },
          //   });
          //   setactiveCardIndex(4);
          // }}
          >
            <img
              src={cardImage4}
              alt="cover image"
              //   className={activeCardIndex === 4 ? "imgV activeCard" : "imgV"}
              className={
                selectedOrder?.TansportType?.Type === "Large"
                  ? "imgV activeCard"
                  : "imgV"
              }
            />
            {/* <img
              src={backCardImage4}
              alt="cover image"
              className={
                selectedOrder?.TansportType?.Type === "Large"
                  ? "HBimgV"
                  : "BimgV"
              }
            /> *
          </SmallCard>
        </div>
      </PictureSection> */}
      <InfoTitle>
        {t("ClientProfile.ProfileHistory.details.information_commandes")}
      </InfoTitle>
      <span> {t("ClientProfile.ProfileHistory.details.produit")}</span>
      <ItemsList>
        {selectedOrder?.items?.map((item, index) => (
          <ItemBox key={index}>
            <p>
              {item?.quant}* {item?.item?.name}
            </p>
          </ItemBox>
        ))}
      </ItemsList>
      <div style={{ marginTop: 60 }}>
        <ActionButtonv
          onClick={() => navigate(`/driver/track/${selectedOrder.documentId}`)}
        >
          <p style={{ textAlign: "center" }}>
            {t("ClientProfile.ProfileHistory.details.suivre")}
          </p>
          {/* <img src={arrowyellow} alt="suivre" /> */}
        </ActionButtonv>
      </div>
    </Wrapper>
  );
};

export default ProfileHistoryViewDetails;

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
  width: 90%;
  gap: 8px;
`;

const ItemBox = styled.div`
  /* width: 90%; */
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
  width: 90%;
`;

const TableCell = styled.td`
  padding: 8px;
  width: 50%;
`;

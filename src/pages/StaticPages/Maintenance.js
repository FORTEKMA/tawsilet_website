import React, { lazy } from "react";
import "./maintenance.css";
import maintenanceImg from "./../../assets/images/maintenance.svg";
import { useTranslation } from "react-i18next";


function Maintenance() {
  const { t, i18n } = useTranslation();

  return (
    <div className="maintenance_main">
      <div className="maintenance_text_container">
        <h1>  {t("Maintenance.title")}</h1>
        <p>
        {t("Maintenance.description1")} 
        <br></br>
        {t("Maintenance.span")} 
        </p>
        <p>
        {t("Maintenance.description2")} 
        </p>
      </div>
      <div className="maintenance_image_container">
        <img src={maintenanceImg} alt="" />
      </div>
    </div>
  );
}

export default Maintenance;

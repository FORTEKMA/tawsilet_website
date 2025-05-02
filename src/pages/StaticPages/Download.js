import React from "react";
import Downlaodimage from "./../../assets/images/Mask.png";
const Download = () => {
  return (
    <div className="download_container" id="download">
      <div className="download">
        <div className="img_download">
          <div className="service_img">
            <img src={Downlaodimage} alt="download" />
          </div>
        </div>

        <div className="downlaod_content">
          <div className="heading_up_downlaod"> TÉLÉCHARGER</div>
          <div className="heading_downlaod">Téléchargez notre application</div>
          <div className="description_downlaod">
            Simplifiez votre expérience de transport avec l'application Sheelni.
            Réservez, suivez et gérez les livraisons sans effort. Commencez dès
            maintenant et profitez d'une logistique transparente à portée de
            main.
          </div>

          <button className="details">EN SAVOIR PLUS</button>
        </div>
      </div>
    </div>
  );
};

export default Download;

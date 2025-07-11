import React from "react";
import Mapimage from "./../../assets/images/map.png";

import Address from "./../../assets/images/fleche.png";

import Tel from "./../../assets/images/tel.png";

import Email from "./../../assets/images/email.png";
const Coordinates = () => {
  return (
    <div className="map_container">
   
  
   <div className="map">           
 
          
        
          <div className="map_content"> 
          <div className="heading_up_map"> TÉLÉCHARGER</div>
          <div className="heading_map">Téléchargez
notre application</div>
<div className="description_map">Simplifiez votre expérience de transport avec l'application Tawsilet. Réservez, suivez et gérez les livraisons sans effort. Commencez dès maintenant et profitez d'une logistique transparente à portée de main.
</div>
<div className="contacts">
      <div className="address">
    <img src={Address} />
        <p className="text">Djerba, Houmt Souk</p>
      </div>
      <div className="address">
      <img src={Tel} />
        <p className="text">+216 12345678</p>
      </div>
      <div className="address">
      <img src={Email} />
        <p className="text">Tawsilet@contact.com</p>
      </div>
    </div>
         
               
                
                 
                  
                
                  
      
                  
                  
              
                  
          </div>
      
       
         
        
         
       
            
          
      
       
                  
              
                  
        
          <div className="img_map">
    <div className="map_img">
       <img src={Mapimage} />
        </div>
       
        </div>
      
     
          
       
        
  </div>
        
  </div>



  );
};

export default Coordinates ;

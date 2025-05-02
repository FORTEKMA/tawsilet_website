// import React from "react";
// import Logo_one from "./../../assets/images/carrefour.png";
// import Logo_two from "./../../assets/images/decathlon.png";
// import Logo_three from "./../../assets/images/geant.png";
// import Logo_four from "./../../assets/images/bricola.png";
// import Footer from "./Footer";

// const cardsData = [
//   {
//     imgSrc: 'path_to_image1',
//     title: 'Card 1',
//     description: 'Description for Card 1',
//   },
//   {
//     imgSrc: 'path_to_image2',
//     title: 'Card 2',
//     description: 'Description for Card 2',
//   },
//   {
//     imgSrc: 'path_to_image2',
//     title: 'Card 2',
//     description: 'Description for Card 2',
//   },
//   {
//     imgSrc: 'path_to_image2',
//     title: 'Card 2',
//     description: 'Description for Card 2',
//   },
//   {
//     imgSrc: 'path_to_image2',
//     title: 'Card 2',
//     description: 'Description for Card 2',
//   },
//   {
//     imgSrc: 'path_to_image2',
//     title: 'Card 2',
//     description: 'Description for Card 2',
//   },
//   // Add more card data as needed
// ];

// const Card = ({ imgSrc, title, description }) => (
//   <div
//     className="card"
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       padding: '50px',
//       gap: '25px',
//       width: '393.33px',
//       height: '275px',
//       background: '#F9F9F9',
//       flex: 'none',
//       order: 0,
//     }}
//   >
//     <img src={imgSrc} alt={title} />
//     <div className="heading_up_about">{title}</div>
//     <div className="about_description">{description}</div>
//   </div>
// );

// export const Partner = () => (

//   <div className="partner">    <div className="partner_content">
//   <div className="heading_up_about"> PRESTATIONS DE SERVICE</div>
//   <div className="heading_about">Fournir un excellent service</div>
// <div className="about_description">Faites l'expérience d'un service exceptionnel avec Hizli - livraisons rapides, assistance attentive et tranquillité d'esprit.</div>

// </div>    <div className="cards">
//     {cardsData.map((card, index) => (
//       <Card key={index} {...card} />
//     ))} </div>

//     <div classname="container_partner">

//          <div className="parteners">
//          <div className="heading_about">Ils nous faisaient confiance</div>
//        <div className="partners_logo">
//  <div className="partner_img">
//  <img src={Logo_one} alt=""/></div>
//  <div className="partner_img">
//  <img src={Logo_two} alt=""/></div>
//  <div className="partner_img">
//  <img src={Logo_three} alt=""/></div>
//  <div className="partner_img">
//  <img src={Logo_four} alt=""/></div>

//        </div>

//        </div>
//  <div className="bulletin">
//        <div className="left_section">
//           <div className="vertical_text">

//           <div className="heading_up_about">Bulletin</div>
//            <div className="about_description">Abonnez-vous à notre newsletter</div>
//           </div>
//         </div>
//         <div className="right_section">
//           <input type="text" placeholder="Enter something" />
//           <button>Submit</button>
//         </div>

//         </div>
//      </div>
//   </div>
// );

// export default Partner;

import React from "react";
import SinsecrireAgent from "../Authentification/SinsecrireAgent";
// import { Helmet } from "react-helmet-async";

const Partner = ({ setLoading }) => {
  return (
    <div>
   
      <SinsecrireAgent setLoading={setLoading} />
    </div>
  );
};

export default Partner;

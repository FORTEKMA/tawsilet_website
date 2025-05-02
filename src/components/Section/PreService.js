import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";

import Truck from "../../assets/icons/truck.svg";
import Sofa from "./../../assets/icons/sofa.svg";
import Cog from "./../../assets/icons/cog.svg";
import Black from "./../../assets/icons/box.svg";
import White from "./../../assets/icons/house.svg";
import Building from "./../../assets/icons/building.svg";
import ExelentService from "./ExelentService";
import ExelentServiceService from "../Section/ExelentServiceService";

const PreServices = () => (
  
 <> 
 
    {/* <Heading> PRESTATIONS DE SERVICES </Heading>
    <HeadingUpService>Fournir un excellent service</HeadingUpService>
    <DescriptionService>
      Faites l'expérience d'un service exceptionnel avec Hizli - livraisons
      rapides, assistance attentive et tranquillité d'esprit.
    </DescriptionService>
   
    <GridContainer>
      <GridItem>
        <img src={Truck} />
        <HeadingBox>Livraison en magasin </HeadingBox>
        <DescriptionBox>
        Livraison simplifiée dans les magasins de détail pour une logistique efficace
        </DescriptionBox>
      </GridItem>
      <GridItem>
        <img src={Sofa} />
        <HeadingBox>Petits mouvements</HeadingBox>
        <DescriptionBox>
        La solution parfaite pour déplacer facilement un ou quelques articles 
        </DescriptionBox>
      </GridItem>
      <GridItem>
        <img src={Cog} />
        <HeadingBox>Chargement déchargement</HeadingBox>
        <DescriptionBox>
          Nous sommes là pour vous aider à charger et décharger vos colis.
        </DescriptionBox>
      </GridItem>
      <GridItem>
        <img src={Black} />
        <HeadingBox>Mouvements de main-d'œuvre</HeadingBox>
        <DescriptionBox>
        Ne levez pas doigt. nous déplacerons vos meubles et autres objets.
        </DescriptionBox>
      </GridItem>
      <GridItem>
        <img src={White} />

        <HeadingBox>Déménagements d'appartements </HeadingBox>
        <DescriptionBox>
        Faites déménager votre appartement sans stress grâce à nos services .
        </DescriptionBox>
      </GridItem>
      <GridItem>
        <img src={Building} />
        <HeadingBox>Déménagement de bureau</HeadingBox>
        <DescriptionBox>
        Déménagez votre bureau sans stress grâce à nos services .
        </DescriptionBox>
      </GridItem>
    </GridContainer> */}
<ExelentServiceService afficherBilte={true}/>


  
  </>
);
export default PreServices;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 50px 0px;
  background-color: white;
  justify-content: center;
  width: 96%;
  height: 100%;
  border-radius: 32px;
  margin-inline: auto;
  @media (max-width: 360px) and (min-width: 200px) {
    padding: 12px;
  }
  @media (max-width: 744px) {
    padding: 12px;
  
  }
`;

const ContentService = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 55%;
`;

const HeadingUpService = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  color: #020111;
  padding: 20px 0;
  @media (max-width: 744px) {
    font-size: 1.25rem;
    padding: 0 0 10px 0;
    
    
  }
`;
const DescriptionService = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 18px;
  color: #666666;
  line-height: 30px;
  width: 60%;
  height: 4rem;
  text-align: center;
  @media (max-width: 744px) {
    text-align: center;
    font-size: 12px;
    line-height: 30px;
    width: 100%;
    padding-inline: 25px;
    padding-bottom: 30px;
  }
`;
const GridContainer = styled.div`
  display: flex;
  margin-top: 30px;
  flex-wrap: wrap;
  width: ${(props) => (props.containerwidth ? props.containerwidth : "100%")};
  padding: ${(props) =>
    props.containerpadding
      ? props.containerpadding
      : style.spacing.PADDING_SMALL};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 50px;
  @media (max-width: 744px) {
    padding: 20px;
    width: 100%;
    gap: 25px;
  }
`;
const GridItem = styled.div`
  background-color: #f2f2f2;
  margin-bottom: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  padding: 10px;
  gap: 15px;
  width: 340.33px;
  height: 250px;
  /* white grey */
  background: #f9f9f9;
  @media (max-width: 744px) {
    width: 100%;
    margin: 0px;
    padding: 2rem 1.5rem;
  }
`;
const HeadingBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 18px;
  line-height: 2.1875rem;
  color: #020111;
  text-align: center;
  width:100%;
  @media (max-width: 744px) {
    font-size: 1.25rem;
    width: 100%;
  }
`;
const HeadingUpPartner = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  padding-top: 100px;
  color: #020111;
`;
const Partners = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 100px;
`;
const PartnersLogo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PartnersImg = styled.div`
  padding: 50px 100px 0px 0px;
  justify-content: space-between;
`;

const Bulletin = styled.div`
background-color:white;
  display: flex;
  padding: 50px;
  align-items: center;
  width: 96%;
  justify-content: space-between;

  /* border-top: 1px solid #aaaaaa; */
  @media (max-width: 744px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeadingBulletin = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 24px;
  line-height: 155.56%;
  color: #020111;
`;
const DescriptionBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  line-height: 30px;
  text-align: center;
  width:100%;
  @media (max-width: 744px) {
    font-size: 0.6875rem;
    width:100%;
    color: #aaa;
  }
`;
const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 744px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
   gap: 1rem;
    margin-top: 30px;
  }
`;

const InputAddress = styled.input`
  height: 47px;
  padding-left: 10px;
  width: 270px;
  background: #ffffff;
  /* Body text1 */
  margin-top: 0;
  border: 1px solid #aaaaaa;
  border-radius: 12px;
  @media (max-width: 744px) {
    border-radius: 12px;
    padding-left: 10px;
    
  }
`;
// const Input = styled.input`
//   height: 47px;
//   padding-left: 10px;
//   width: 270px;
//   background: #ffffff;
//   /* Body text1 */
//   border: 1px solid #aaaaaa;
//   border-radius: 12px;
// `;
const SubmitButton = styled.button`
  padding: 10px;

  margin-left: 10px;
  width: 105px;
  height: 47px;
  color: #aaaaaa;
  background: #ffffff;
  /* Body text1 */
  border: 1px solid #aaaaaa;
  border-radius: 12px;
  @media (max-width: 744px) {
    border-radius: 12px;
    height: 45px;
  }
`;
const Heading = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 20px;
  line-height: 155.56%;
  color: #020111;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    padding-top: 30px;
    padding-bottom: 10px;
  }
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  line-height: 30px;
  padding-top: 16px;
  padding-bottom: 50px;
  width: 65%;
  text-align: center;
`;
export const HeadingUp = styled.div`
  font-weight: 900;
  font-size: 45px;

  color: #020111;
  padding-top: 12px;
  color: #020111;
  text-align: center;
`;

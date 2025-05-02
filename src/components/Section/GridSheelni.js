import React, { useEffect } from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Truck from "../../assets/icons/truck.svg";
import Sofa from "./../../assets/icons/sofa.svg";
import Cog from "./../../assets/icons/cog.svg";
import Black from "./../../assets/icons/box.svg";
import White from "./../../assets/icons/house.svg";
import Building from "./../../assets/icons/building.svg";
import AOS from "aos";
import "aos/dist/aos.css";
const GridSheelni = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <Content>
      <GridContainer data-aos="fade-down">
        <GridItem>
          <img src={Truck} />
          <HeadingBox>Livraison en magasin </HeadingBox>
          <DescriptionBox>
            Livraison rationalisée en magasin pour une logistique efficace
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Sofa} />
          <HeadingBox>Petits mouvements</HeadingBox>
          <DescriptionBox>
            La solution idéale pour déplacer facilement un ou plusieurs objets
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
          <HeadingBox>Mouvements de main-d'œuvre uniquement</HeadingBox>
          <DescriptionBox>
            Ne lève pas le petit doigt. nous déplacerons vos meubles et autres
            objets plus volumineux.
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={White} />

          <HeadingBox>Déménagements d'appartements </HeadingBox>
          <DescriptionBox>
            Faites déménager votre appartement sans stress grâce à nos services
            de déménagement fiables.
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Building} />
          <HeadingBox>Déménagement de bureau</HeadingBox>
          <DescriptionBox>
            Déménagez votre bureau sans stress grâce à nos services de
            déménagement fiables.
          </DescriptionBox>
        </GridItem>
      </GridContainer>
    </Content>
  );
};
export default GridSheelni;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 50px 10px;
  background-color: white;
  width: 96%;
  height: 100%;
  border-radius: 32px;
  position: "absolute";
  text-align: "center";
  margin-left: 20px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => (props.containerwidth ? props.containerwidth : "100%")};
  /* padding: ${(props) =>
    props.containerpadding
      ? props.containerpadding
      : style.spacing.PADDING_SMALL}; */
  /* justify-content: ${(props) =>
    props.justify ? props.justify : "space-evenly"}; */
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 50px;
  gap: 15px;
`;
const GridItem = styled.div`
  background-color: #f2f2f2;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  gap: 20px;
  width: 350.33px;
  height: 340px;
  /* white grey */
  background: #f9f9f9;
  img {
    width: auto;
    height: auto;
  }
`;
const HeadingBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 25px;
  line-height: 155.56%;
  color: #020111;
  text-align: center;
`;

const DescriptionBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  line-height: 30px;
  text-align: center;
`;

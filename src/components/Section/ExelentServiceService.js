import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import React, { useEffect } from "react";
import Logo_one from "./../../assets/icons/carrefour.png";
import Logo_two from "./../../assets/icons/decathlon.png";
import Logo_three from "./../../assets/icons/geant.png";
import Logo_four from "./../../assets/icons/bricola.png";
import Truck from "../../assets/icons/truck.svg";
import Sofa from "./../../assets/icons/sofa.svg";
import Cog from "./../../assets/icons/cog.svg";
import Black from "./../../assets/icons/box.svg";
import White from "./../../assets/icons/house.svg";
import Building from "./../../assets/icons/building.svg";


import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
const ExelentServiceService = ({ afficherBilte = false }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const { t, i18n } = useTranslation();
  return (
    <Content>
      <Middle>
        <Heading>{t("ACCEUILE.PRESTATION-SERVICE-3.title1")}</Heading>
        <HeadingUp>{t("ACCEUILE.PRESTATION-SERVICE-3.title2")}</HeadingUp>
        <Description>{t("ACCEUILE.PRESTATION-SERVICE-3.desc")}</Description>
      </Middle>
      <GridContainer containerwidth="100%" justify="center">
        <GridItem>
          <img src={Truck} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card1.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card1.desc")}
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Sofa} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card2.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card2.desc")}
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Cog} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card3.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card3.desc")}
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Black} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card4.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card4.desc")}
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={White} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card5.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card5.desc")}
          </DescriptionBox>
        </GridItem>
        <GridItem>
          <img src={Building} />
          <HeadingBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card6.title")}{" "}
          </HeadingBox>{" "}
          <DescriptionBox>
            {t("ACCEUILE.PRESTATION-SERVICE-2.Cards.card6.desc")}
          </DescriptionBox>
        </GridItem>
      </GridContainer>
      {/* <HeadingUpPartner data-aos="zoom-in">
        Ils nous faisaient confiance
      </HeadingUpPartner> */}
      {/* <Partners>
        <PartnersLogo data-aos="fade-left" data-aos-delay={200}>
          <PartnersImg>
            <Image src={Logo_one} alt="" />
          </PartnersImg>
          <PartnersImg>
            <Image src={Logo_two} alt="" />
          </PartnersImg>
          <PartnersImg>
            <Image src={Logo_three} alt="" />
          </PartnersImg>
          <PartnersImg>
            <Image src={Logo_four} alt="" />
          </PartnersImg>
        </PartnersLogo>
      </Partners>{" "}*/}
      {/* <Bulletin afficherBilte={afficherBilte}>
        <Section>
          <HeadingBulletin> {t("ACCEUILE.PRESTATION-SERVICE-2.Bulletin.title1")} </HeadingBulletin>
          <DescriptionBox> {t("ACCEUILE.PRESTATION-SERVICE-2.Bulletin.title2")}</DescriptionBox>
        </Section>
        <Address>
          <InputAddress
            name="number"
            type="text"
            className="input"
            placeholder="Votre e-mail"
          />
          <SubmitButton> {t("ACCEUILE.PRESTATION-SERVICE-2.Bulletin.Btn-Envoyer")}</SubmitButton>
        </Address>
      </Bulletin>  */}
    </Content>
  );
};
export default ExelentServiceService;

const Blocone = styled.div`
  width: 40%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 5rem;

  background-color: white;
  width: 96%;
  height: 100%;
  border-radius: 32px;

  margin-inline: auto;
  @media (max-width: 744px) {
    text-align: center;
    padding: 2rem;
  }
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
`;
export const Heading = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 155.56%;

  color: rgba(24, 54, 90, 1);

  text-align: center;
  justify-content: center;
  display: flex;
  @media (max-width: 744px) {
    font-size: 14px;
  }
`;
export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  line-height: 30px;
  width: 65%;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    width: 100%;
  }
`;
export const HeadingUp = styled.div`
  font-weight: 900;

  font-size: 2.8125rem;
  color: rgba(24, 54, 90, 1);


  text-align: center;
  @media (max-width: 744px) {
    font-size: 24px;
  }
`;
const Hr = styled.div`
  width: 80%;

  @media (max-width: 744px) {
    display: none;
  }
`;

const HeadingUpPartner = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  padding-top: 3.19rem;

  color: rgba(24, 54, 90, 1);
  @media (max-width: 744px) {
    font-size: 30px;
    line-height: 40px;
    padding: 1rem;
  }
`;
const Partners = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 744px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    width: 100%;
  }
`;
const PartnersLogo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 744px) {
    /* flex-direction: column; */
    width: 100%;
    gap: 40px;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
  }
`;
const PartnersImg = styled.div`
  padding: 2rem;
  width: 20%;

  @media (max-width: 744px) {
    padding: 0px;
    width: 35%;
    /* justify-content: center; */
  }
`;
const Bulletin = styled.div`
  display: ${(props) => (props.afficherBilte ? "flex" : "none")};
  border-top: 1px solid #aaa;
  align-items: center;
  width: 100%;
  padding: 3rem;
  margin-top: 20px;
  justify-content: space-between;

  /* border-top: 1px solid #aaaaaa; */
  @media (max-width: 744px) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 1.75em;
    gap: 1rem;
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
  color: rgba(24, 54, 90, 1);
  @media (max-width: 744px) {
    align-self: start;
  }
`;
const DescriptionBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 0.9rem;
  color: #666666;
  line-height: 30px;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    color: #aaa;
  }
`;
const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 744px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
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
    border-radius: 30px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;

  width: 105px;
  height: 47px;
  color: #aaaaaa;
  background: #ffffff;
  /* Body text1 */
  border: 1px solid #aaaaaa;
  border-radius: 12px;
  @media (max-width: 744px) {
    border-radius: 26px;
    height: 45px;
  }
`;
export const Image = styled.img`
  width: 80%;
  aspect-ratio: 3/2;

  object-fit: contain;
  @media (max-width: 744px) {
    width: 100%;
    /* height: 110px; */
    margin-left: 0px;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  width: ${(props) => (props.containerwidth ? props.containerwidth : "100%")};
  padding-top: 5rem;
  justify-content: ${(props) =>
    props.justify ? props.justify : "space-evenly"};
  gap: 1rem;
  @media (max-width: 744px) {
    gap: 1rem;
  }
`;
const GridItem = styled.div`
  background-color: #f2f2f2;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.12rem;
  gap: 1.5625rem;
  width: 340px;
  height: 340px;
  /* white grey */
  background: #f9f9f9;
  @media (max-width: 744px) {
    gap: 30px;
    padding: 40px;
    margin-right: 0px;
  }
`;
const HeadingBox = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 155.56%;
  color: #020111;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 16px;
  }
`;

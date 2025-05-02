import React from "react";
import Logo from "./../../assets/images/YellowLogo.png";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Address from "./../../assets/images/fleche.png";

import Tel from "./../../assets/images/tel.png";

import Email from "./../../assets/images/email.png";
import FaceBook from "./../../assets/images/facebook.png";

import Twitter from "./../../assets/images/twitter.png";

import Instagram from "./../../assets/images/instagram.png";
const FooterContainer = styled.footer`
  display: flex;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? "row" : "column")};
  align-items: flex-start;

  &.footer__section--left {
    align-items: flex-start;
  }

  &.footer__section--middle {
    align-items: center;
  }

  &.footer__section--right {
    align-items: flex-end;
  }
`;

export const LogoImg = styled.img`
  padding: ${style.spacing.PADDING_LARGE};
  width: 160px;
  height: 80px;
  align-self: start;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection className="footer__section footer__section--left">
        <LogoImg src={Logo} alt="logo" />
      </FooterSection>
      <FooterSection
        className="footer__section footer__section--middle"
        horizontal
      >
        <div className="contacts">
          <div className="address">
            <p className="text"> Menu</p>
          </div>
          <div className="address">
            <p className="text"> A propos de nous</p>
          </div>
          <div className="address">
            <p className="text">Nos services</p>
          </div>
          <div className="address">
            <p className="text">Contact</p>
          </div>
          <div className="address">
            <p className="text">Obtenir un devis</p>
          </div>
          <div className="address">
            <p className="text">Devenir partenaire</p>
          </div>
        </div>{" "}
        <div className="contacts">
          <div className="address">
            <p className="text"> Restez à l'écoute avec nous</p>
          </div>
          <div className="address">
            <img src={Address} tel="address" />
            <p className="text">8 Rue Montesquieu 93700 Drancy</p>
          </div>
          <div className="address">
            <img src={Tel} alt="tel" />
            <p className="text">+216 12345678</p>
          </div>
          <div className="address">
            <img src={Email} alt="email" />
            <p className="text">Sheelni@contact.com</p>
          </div>
        </div>
      </FooterSection>
      <FooterSection className="footer__section footer__section--right">
        <div className="footer__image">
          <img src={FaceBook} alt="facebook" />
        </div>
        <div className="footer__image">
          <img src={Twitter} alt="twitter" />
        </div>
        <div className="footer__image">
          <img src={Instagram} alt="instagram" />
        </div>
      </FooterSection>
      <div className="footer__bottom">
        <p className="footer__text-left">&copy; 2023. Tous droits réservés.</p>
        <div className="footer__text-right">
          <p className="footer__text">Conditions d'utilisation</p>
          <p className="footer__text">Politique de confidentialité</p>
        </div>
      </div>
    </FooterContainer>
  );
};

const Login = () => {
  return <p>Login component</p>;
};

const TextBlock = ({ title, children }) => {
  return (
    <div className="text-block">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Footer;

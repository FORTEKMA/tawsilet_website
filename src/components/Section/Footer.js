import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/Group1.png";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <Wrap dir="auto">
      <Inner>
        <Col>
          <BrandRow>
            <Brand src={logo} alt="tawsilet logo" />
            <Tagline>{t("ACCEUILE.EFFICACITE")}</Tagline>
          </BrandRow>
          <SocialRow>
            <a href="https://www.facebook.com/people/Tawsilet/61576659811297/?sk=about_contact_and_basic_info" target="_blank" rel="noopener noreferrer">
              <SocialIcon>
                <FaFacebookF color="#111" size={16} />
              </SocialIcon>
            </a>
            <a href="https://www.tiktok.com/@tawsilet" target="_blank" rel="noopener noreferrer">
              <SocialIcon>
                <FaTiktok color="#111" size={16} />
              </SocialIcon>
            </a>
            <a href="https://www.instagram.com/tawsilet.tn/" target="_blank" rel="noopener noreferrer">
              <SocialIcon>
                <FaInstagram color="#111" size={16} />
              </SocialIcon>
            </a>
          </SocialRow>
        </Col>

        <Col>
          <GroupTitle>{t("FOOTER.Menu")}</GroupTitle>
          <Links>
            <a href="/about">{t("FOOTER.FooterLink.FooterLink1")}</a>
            <a href="/services">{t("FOOTER.FooterLink.FooterLink2")}</a>
            <a href="/contact">{t("FOOTER.FooterLink.FooterLink3")}</a>
            <a href="/Sidentifierpartenaire">{t("FOOTER.FooterLink.FooterLink5")}</a>
          </Links>
        </Col>

        <Col>
          <GroupTitle>{t("FOOTER.Container.HeadingLast")}</GroupTitle>
          <ContactList>
            <li>{t("ACCEUILE.CONTACT.Adresse.addresses")}</li>
            <li>contact@tawsilet.com</li>
          </ContactList>
        </Col>
      </Inner>

      <BottomRow>
        <Small>
          {t("FOOTER.Copyright")} © {year} {t("FOOTER.Tous-réservés")}
        </Small>
        <RightLinks>
          <Link to="/Conditions" target="_blank">
            <Small>{t("FOOTER.Last1")}</Small>
          </Link>
          <Link to="/Politiques" target="_blank">
            <Small>{t("FOOTER.Last2")}</Small>
          </Link>
        </RightLinks>
      </BottomRow>
    </Wrap>
  );
};

export default Footer;

const Wrap = styled.footer`
  background: #ffffff;
  border-top: 1px solid #ececec;
  margin-top: 64px;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 28px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Brand = styled.img`
  width: 120px;
  height: auto;
`;

const Tagline = styled.p`
  margin: 0;
  color: #444;
  font-size: 14px;
  line-height: 1.5;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 6px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, background 0.15s ease;
  &:hover { transform: translateY(-2px); background: #eaeaea; }
`;

const GroupTitle = styled.h4`
  margin: 0 0 4px 0;
  color: #111;
  font-size: 16px;
  font-weight: 600;
`;

const Links = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  a { color: #444; text-decoration: none; font-size: 14px; }
  a:hover { color: #111; text-decoration: underline; }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  li { color: #444; font-size: 14px; }
`;

const BottomRow = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f3f3f3;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Small = styled.p`
  color: #666;
  font-size: 12px;
  margin: 0;
`;

const RightLinks = styled.div`
  display: flex;
  gap: 16px;
`;

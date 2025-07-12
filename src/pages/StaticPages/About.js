import styled from "styled-components";
import Company from "../../components/Section/Company";
import about from "../../assets/images/aboutehero.png";
import Footer from "../../components/Section/Footer";
import { useTranslation } from "react-i18next";
import JoinSheelni from "../../components/Section/JoinSheelni";
import Bulletin from "../../components/Section/Bulletin";
import MarqueAbout from "../../components/Section/MarqueAbout";
import { useNavigate } from "react-router";

const About = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <CompanySection>
        <Sect>
          <img
            sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
            src={about}
            alt="about demenagement"
            loading="lazy"
          />
          <ContactHero style={{ position: "absolute" }}>
            <SideTitle>{t("ABOUT.Apropos.title2")}</SideTitle>
            <LastTitle>{t("ABOUT.Apropos.desc")}</LastTitle>
            <BUT onClick={() => navigate("/")}>
              {t("Sheelni-CONTACT.btn-obten")}
            </BUT>
          </ContactHero>
        </Sect>

        <Company />
        <MarqueAbout />
      </CompanySection>
      <Footer />
    </>
  );
};

export default About;

const CompanySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: 744px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }
`;

export const BUT = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: white;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  background-color: #d8b56c;
  box-shadow: 2px 2px 0px 0px #18365a;

  @media (max-width: 1050px) {
    width: 200px;
    font-weight: 900;
    height: 55px;
  }
`;

const ContactHero = styled.div`
  top: 0;
  height: calc(100vh - 80px);
  width: 100%;
  background-color: rgba(24, 54, 90, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const SideTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 50px;
  color: white;
  @media (max-width: 760px) {
    font-size: 28px;
  }
`;

export const LastTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: white;
  width: 50%;
  text-align: center;
  line-height: 30px;

  @media (max-width: 760px) {
    font-size: 14px;
    width: 90%;
    line-height: 30px;
  }
`;

const Sect = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    height: calc(100vh - 80px);
    object-fit: cover;
  }
  @media (max-width: 744px) {
    img {
      object-fit: cover;
      object-position: right;
      width: 130%;
    }
  }
`;

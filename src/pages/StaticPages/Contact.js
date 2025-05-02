import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import contact from "../../assets/images/contact-cover.png";
// import Commencer from "../../components/Items/Commencer";
import phone from "../../assets/icons/phone.svg";
import message from "../../assets/icons/Line.svg";
// import loca from "../../assets/icons/Iconlyaddress.svg";
// import logo from "../../assets/icons/send 1.svg";
// // import button from "../../assets/icons/button.transition.png";
// import Send from "./../../assets/icons/det.svg";
// import Arrow from "./../../assets/icons/arrowdown.svg";

// import frame from "../../assets/icons/Frame 630.png";
// import pathh from "../../assets/icons/Path (6).png";
// import Buttondetails from "../../components/Items/buttondetails";
// import Call from "../../components/Items/Call";
// import LoginCard from "../../components/Items/LoginCard";
import Inpuut from "../../components/Items/Inpuut";
// import Trrustus from "../../components/Section/TrrustUs";
import Footer from "../../components/Section/Footer";
// import Buttonobtenez from "../../components/Items/buttonobtenez";
import { useTranslation } from "react-i18next";
// import JoinSheelni from "../../components/Section/JoinSheelni";
import WhiteJoin from "../../components/Section/WhiteJoin";
import { useNavigate } from "react-router";
const Contact = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  return (
    <>
      <Sect dir="auto">
         <img
                    srcSet={`
                    ${require("../../assets/images/contact-cover-400w.webp")} 400w,
                    ${require("../../assets/images/contact-cover-600w.webp")} 600w,
                    ${require("../../assets/images/contact-cover-800w.webp")} 800w,
                    ${require("../../assets/images/contact-cover-1000w.webp")} 1000w,
                    ${require("../../assets/images/contact-cover-1200w.webp")} 1200w
                  `}
                    sizes="(max-width: 400px) 400px, (max-width: 600px) 600px, (max-width: 800px) 800px, (max-width: 1000px) 1000px, (min-width: 1001px) 1200px"
                    src={contact}
                    alt="contact sheelni"
                    // width="1440"
                    // height="944"
                    loading="lazy"
                  />
        {/* <img src={contact} alt="contact"   loading="lazy"/> */}
        <ContactHero style={{ position: "absolute" }}>
          <Title> {t("Sheelni-CONTACT.title1")} </Title>
          <SideTitle>{t("Sheelni-CONTACT.title2")}</SideTitle>
          <LastTitle>{t("Sheelni-CONTACT.desc")}</LastTitle>{" "}
          <BUT onClick={()=>navigate("/")}>{t("Sheelni-CONTACT.btn-obten")}</BUT>
          {/* <Btn>
          <Buttonobtenez icon={Arrow} Textbody={t("Sheelni-CONTACT.btn-obten")} />
        </Btn>
        <Call className="buttonobtenez" /> */}
        </ContactHero>{" "}
      </Sect>
      {/*

    <Buttonobtenez icon={Arrow} Textbody="Obtenez une estimation" />
    <section
      style={{
        display: "flex",
        gap: "190px",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <section style={{ width: "35%" }}>
*/}
      <ContactForm dir="auto">
        <section>
          <DIV style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <IMa src={phone}></IMa>
            <Titlle> {t("Sheelni-CONTACT.ContactForm.title2")} </Titlle>
          </DIV>
          <TI>{t("Sheelni-CONTACT.ContactForm.title1")}</TI>
          <PA>{t("Sheelni-CONTACT.ContactForm.desc")}</PA>
          {/* <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <IM src={phone}></IM>
              <Te>{t("Sheelni-CONTACT.ContactForm.phone")}</Te>
            </div>

            <NU>(216) 123 456 78</NU>
          </div> */}{" "}
          <IM src={message} alt="message"></IM>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <NU>{t("Sheelni-CONTACT.ContactForm.textAresse")}</NU>

            <NU>{t("Sheelni-CONTACT.ContactForm.textAress")}</NU>
            <div style={{ display: "flex", gap: "20px" }}></div>
            {/* <NU>contact@sheelni.com</NU> */}
          </div>
          <DIVE dir="auto" isRtl={i18n.language.startsWith("ar")}>
            {/* <IMa src={loca} alt="local"></IMa> */}
            <Te>{t("Sheelni-CONTACT.ContactForm.email")}</Te>
            <Te>{t("Sheelni-CONTACT.ContactForm.Adresse")}</Te>
          </DIVE>
        </section>
        <Section>
          <SEND>
            {/* <img src={logo} alt="logooo"></img> */}
            <TIR>{t("Sheelni-CONTACT.ContactForm.btnSend")} </TIR>
          </SEND>

          <Inpuut />

          <div
            style={{
              marginTop: "50px",
              marginLeft: "5px",
              marginBottom: "90px",
            }}
          >
            {/* <Btn>
              <Buttondetails
                icon={Send}
                Textbody={t("Sheelni-CONTACT.ContactForm.placeholder")}
              />
            </Btn> */}
            <BUTT>{t("Sheelni-CONTACT.ContactForm.placeholder")}</BUTT>
          </div>
        </Section>
      </ContactForm>
      {/* <Sec>
        <Commencer hasdessin={false} />
        
      </Sec> */}
      <Sec></Sec>
      <WhiteJoin />
      <Footer />
    </>
  );
};

export default Contact;
export const Section = styled.section`
  padding-left: 30px;
  padding-right: 30px;

  border: 2px solid #18365a;
  border-radius: 10px;
  width: 430px;
  height: 500px;
  @media (max-width: 1050px) {
    width: 330px;
    height: auto;
    margin: auto;
    height: 450px;
    /* margin-bottom:50rem; */
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
      width: 150%;
    }
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

  background-color: #f37a1d;
  box-shadow: 2px 2px 0px 0px #18365a;
  /* margin-right:45%; */
  @media (max-width: 1050px) {
    width: 200px;
    font-weight: 900;
    height: 55px;
    /* margin-right:0rem; */
  }
`;

export const BUTT = styled.button`
  margin-top: 50px;
  width: 370px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #18365a;
  color: white;
  font-size: 15px;
  text-align: center;

  cursor: pointer;

  background-color: #f37a1d;
  box-shadow: 2px 2px 0px 0px #18365a;
  /* margin-right:45%; */
  @media (max-width: 1050px) {
    width: 260px;
    font-weight: 900;
    height: 55px;
    margin-top: 20px;
  }
`;
export const SEND = styled.div`
  margin-bottom: 35px;
  display: flex;
  gap: 20px;
  margin-top: 22px;
  @media (max-width: 760px) {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    /* margin: 30px; */
  }
`;
export const DIV = styled.div`
  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    align-self: center;
    text-align: center;
  }
`;
export const DIVE = styled.div`
  margin-top: 20px;
  direction: ltr;

  text-align: ${({ isRtl }) => (isRtl ? "right" : "left")};
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media (max-width: 760px) {
    margin-top: 0px;
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

const Btn = styled.div`
  padding: 10px;
  width: 20vw;
  margin-bottom: 5vh;
  @media (max-width: 744px) {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1vh;
    /* flex: 1; */
    padding: 0;
    align-self: center;
    /* border: 1px solid red; */
    /* margin-top: 20px; */
  }
`;

const Sec = styled.div``;
export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: white;
`;
export const Titlle = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.SECONDARY_COLOR};
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
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  @media (max-width: 744px) {
    /* display: none; */
    gap: 2rem;
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

const ContactForm = styled.section`
  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  /* height: 90vh; */
  justify-content: space-between;
  margin-top: 20px;
  padding: 30px 30px;
  margin-bottom: 150px;

  section:first-child {
    width: 45%;

    @media (max-width: 760px) {
      width: 100%;
    }
  }

  @media (max-width: 760px) {
    padding: 30px 20px;
    width: 100%;
    margin-bottom: 0px;
    gap: 50px;
  }
`;

export const TI = styled.h2`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 155.56%;
  color: ${(props) => props.theme.SECONDARY_COLOR};
  @media (max-width: 760px) {
    font-size: 28px;
    /* text-align: center; */
  }
`;
export const PA = styled.h1`
  margin-top: 10px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: ${(props) => props.theme.SECONDARY_COLOR};
  @media (max-width: 760px) {
    /* text-align: center; */
  }
`;
export const Te = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: ${(props) => props.theme.SECONDARY_COLOR};
`;
export const NU = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 155.56%;
  color: ${(props) => props.theme.SECONDARY_COLOR};
`;
export const IM = styled.img`
  width: 200px;
  height: 15px;
  margin-top: 20px;
`;
export const IMa = styled.img`
  width: 18px;
  height: 20px;
`;

export const Divder = styled.hr`
  width: 420px;
  height: 0px;
`;
export const TIR = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 155.56%;
  margin-bottom: 10px;
  color: ${(props) => props.theme.SECONDARY_COLOR};
  @media (max-width: 760px) {
    text-align: start;
    font-size: 20px;
  }
`;
export const Cor = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 80px;
  /* identical to box height, or 188% */

  letter-spacing: 0.03em;

  /* white */

  color: ${(props) => props.theme.SECONDARY_COLOR};
`;
export const IO = styled.img`
  margin-top: 44px;
  margin-left: -31px;
`;
const Text = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: #020111;
  font-size: 14px;
  margin-left: -72px;
`;

export const Button404 = styled.button`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 700;
  font-size: 16px;
  color: white;
  background-color: #f37a1d;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  width: 360px;
  height: 55.14px;
  margin-top: 40px;
  .icon-arrow {
    width: 20px;
    height: 20px;
  }
`;

export const Fram = styled.img``;
export const YU = styled.h1`
  padding-top: 30px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #f37a1d;
`;
export const JU = styled.img`
  width: 20px;
`;

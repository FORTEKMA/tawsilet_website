import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
// import Van from "./../../assets/images/";

// import Group from "./../../assets/images/Group7898.svg";
// import Arrow from "./../../assets/icons/arrowdown.svg";
// import { Button } from "../Items/Button";
import Buttonobtenez from "../Items/buttonobtenez";
import Call from "../Items/Call";
import { Navigate, useNavigate } from "react-router";

const Hero = ({ ScrollToMap }) => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <HeroContainer>
      <LeftSide>
        <HeroHeading>
          <div data-aos="zoom-down" data-aos-delay={200}>
            Expédiez vos affaires
          </div>
          <div data-aos="zoom-down" data-aos-delay={400}>
            En toute sécurité,
          </div>
          <div data-aos="zoom-down" data-aos-delay={600}>
            Avec nous!
          </div>
        </HeroHeading>
        <HeroBody data-aos="zoom-down" data-aos-delay={800}>
          "Confiez vos objets de valeur à notre équipe <br /> d'experts en
          transport"
        </HeroBody>

        <Div data-aos="fade-up" data-aos-delay={1000}>
          <Btn onClick={() => navigate("/estimation")}>
            {/* <Buttonobtenez icon={Arrow} Textbody="Obtenez une estimation" /> */}
          </Btn>{" "}
          <Call />
        </Div>

        {/* data-aos="fade-down" data-aos-delay={1500} pour button obtenez et Call.js (replace it :  <img src={Call} alt="phone" />
          <span>+216 12345678</span>) */}
      </LeftSide>

      {/* <Img
        data-aos="fade-left"
        data-aos-delay={1600}
        src={Van}
        alt="van image"
        style={{
          height: "60vh",
          position: "absolute",
          right: 0,

          bottom: 0,
          zIndex: 2,
        }}
      />
      <Img
        data-aos="zoom-in"
        data-aos-delay={1400}
        src={Group}
        alt="group"
        style={{
          position: "absolute",
          right: 220,
          top: "16vh",
          height: "60vh",
        }}
      /> */}
    </HeroContainer>
  );
};
export default Hero;
const Div = styled.div`
  width: 20vw;
  @media (max-width: 744px) {
    width: 100%;
  }
`;
const RightSide = styled.div`
  width: 50vw;
`;

const Img = styled.img`
  @media (max-width: 744px) {
    display: none;
  }
`;
const Btn = styled.div`
  padding: 10px;
  width: 25vw;
  @media (max-width: 744px) {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    flex: 1;
    padding: 0;
    align-self: center;
    /* border: 1px solid red; */
    /* margin-top: 20px; */

    display: none;
  }
`;
const HeroContainer = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 80px);
  padding-inline: 60px;
padding-top: 10.75rem;

  @media (max-width: 744px) {
    margin-top: 20px;
    padding-inline: 0px;
    padding-top: 10px;
    text-align: center;
    height: 80vh;
    min-height: 600px;
    /* margin-bottom: 100px; */
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  width: 50vw;

  @media (max-width: 744px) {
    width: 100%;
    gap: 20px;
    align-items: center;
  }
`;

export const HeroHeading = styled.h1`
  font-weight: 900;
  font-size: 42px;
  line-height: 155.556%;

  @media (max-width: 744px) {
    font-size: 30px;
    justify-content: center;
    text-align: center;
    line-height: 50px;
  }
`;

export const HeroBody = styled.div`
  color: ${(p) => p.theme.GRAY_TEXT_COLOR};
  opacity: 0.6;
  font-size: 16px;

  color: var(--body-text-1, #aaa);
  @media (max-width: 744px) {
    font-size: 14px;
  }
`;

{
  /* commitone
import Group from "./../../assets/images/Group 7898.svg";
import Call from "./../../assets/images/call.png";

const HeroContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom:40px;
`;

const ContentHome = styled.div`
  width: 50%;
  padding-left:46px;
`;


const CallContact = styled.div`
 display: flex;
 flex-direction: row;
 padding-top: 20px;
 color:#d8b56c;
 font-weight: 600;
  font-size: 17px;
`;


const Contact = styled.div`
 

`;
const Heading = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 900;
  font-size: 60px;
  padding-top: 50px;
`;

const Content = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #aaaaaa;
  padding-top:24px;
  padding-bottom:24px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const Input = styled.input`
  height: 50px;
  border-radius: 10px;
  border: transparent;

`;

const Calendar = styled.div`
 padding: 10px;
`;

const InputCalendar = styled.input`
  height: 50px;
  border-radius: 10px;
  border: transparent;
  color: #aaaaaa;
`;

const Card = styled.div`
  width: 351px;
  height: 296.26px;
  background-color: #302f4a;
  border: 0.798544px solid #666666;
  border-radius: 24.75px;
  
 
`;

const Dropdown = styled.select`
  height: 50px;
  border-radius: 10px;
  border: transparent;
  width: 75px;
`;

const SubmitButton = styled.button`
  height: 43.92px;
  border-radius: 10px;
  border: transparent;
 padding: 10px;
 margin-left:10px;
width: 325px;
  background-color: #d8b56c;
  
`;

const ImgContainer = styled.div`
  position: relative;
  width: 45%;
  top:65px;
  left: -5%
`;



const VanImage = styled.img`
  position: absolute;

  z-index: 1000;
  top:30%;
  left:12%;
  -webkit-animation: movebotcar 5s infinite;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <ContentHome>
        <Heading>Expédiez vos affaires En toute sécurité, avec nous!</Heading>
        <Content>
          Confiez vos objets de valeur à notre équipe d'experts en transport
        </Content>
        <Card>
          <Address>
            <Input name="number" type="text" className="input" placeholder="Adresse de ramassage" />
            <Input name="number" type="text" className="input" placeholder="Adresse de dépôt" />
          </Address>
          <Calendar>
            <div className="calender_input">
              <InputCalendar name="number" type="text" className="input_calender" placeholder="aujourd'hui" />
              <Dropdown className="dropdown">
                <option value="" disabled selected hidden>
                  Heure
                </option>
                <option value="Student">heure</option>
                <option>Heure</option>
              </Dropdown>
              <Dropdown className="dropdown">
                <option value="" disabled selected hidden>
                Date
            </option>
            <option value="Student">date</option>
            <option>date</option>
          </Dropdown>
        </div>
       
      </Calendar>
      <SubmitButton>Envoyer</SubmitButton>
    </Card>
    <CallContact>
    <Contact > <img src={Call} alt="Group" /> +216 12345678</Contact> </CallContact>
  </ContentHome>
  <ImgContainer>
   
      <VanImage src={Van} alt="Delivery Van" />
      <img src={Group} alt="Group" />
   
  </ImgContainer>
</HeroContainer>
);
};

export default Hero; */
}

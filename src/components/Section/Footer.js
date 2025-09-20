import React from "react";
// import Logo from "../../assets/images/YellowLogo.png";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Path from "../../assets/icons/Path.png";
import Pat from "../../assets/icons/mail.svg";
import Pa from "../../assets/icons/Path.svg";
import Fb from "../../assets/icons/fborange.svg";
import logo from "../../assets/images/Group1.png";
import Inst from "../../assets/icons/orangeinsta.svg";
import TikTok from "../../assets/icons/tiktok.svg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
// import { Link } from "react-router-dom";

const TopDivider = styled.div`
  width: 100%;
  height: 2px;
  background: #fff;
  margin-bottom: 0;
`;

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const CopyRight = new Date();
  const year = CopyRight.getFullYear(); // returns 100
  return (
    <FooterContainer dir="auto">
      <TopDivider />
      <div style={{ paddingBottom: "30px",borderTop:5,borderColor:"#fff" }}> </div>
     

      <Box>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Image src={logo} style={{width:"20%"}} alt="tawsilet logo"></Image>
        </div>
        <Container>
          <MENU style={{}}>
            <HEE>
              <Heading>{t("FOOTER.Menu")}</Heading>
            </HEE>
            <CONT>
              <LINKK>
                <FooterLink href="/about">
                  {t("FOOTER.FooterLink.FooterLink1")}
                </FooterLink>
                <FooterLink href="/services">
                  {t("FOOTER.FooterLink.FooterLink2")}
                </FooterLink>
                <FooterLink href="/contact">
                  {t("FOOTER.FooterLink.FooterLink3")}
                </FooterLink>
                <FooterLink href="/Sidentifierpartenaire">
                  {t("FOOTER.FooterLink.FooterLink5")}
                </FooterLink>
              </LINKK>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FooterLink href="#">
                  {t("FOOTER.FooterLink.FooterLink4")}
                </FooterLink>
                
              </div>
            </CONT>
          </MENU>
        </Container>
        <LAST>
          <Container dir="auto">
            <Heading>{t("FOOTER.Container.HeadingLast")}</Heading>
            <Content dir="auto">
              {" "}
              <ContentService>
                <Ligne>
                  {" "}
                  <Paths src={Path} alt="logo"></Paths>
                  <FooterLinkk   dir="auto"
        
        isRtl={i18n.language.startsWith("ar")}>
                    {t("ACCEUILE.CONTACT.Adresse.addresses")}
                  </FooterLinkk>
                </Ligne>
 
              
   <br></br>
                <Ligne>
                  <Paths src={Pat} alt="pa"></Paths>
                  <FooterLinkk   dir="auto"
        
        isRtl={i18n.language.startsWith("ar")}>contact@tawsilet.com</FooterLinkk>
                </Ligne>
              </ContentService>{" "}
            </Content>
          </Container>
         

          <Contacts>
            <a href="https://www.facebook.com/people/Tawsilet/61576659811297/?sk=about_contact_and_basic_info" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <FaFacebookF color="#fff" style={{width: 22,height: 22}} size={10} />
              </SocialIconWrapper>
            </a>
            <a href="https://www.tiktok.com/@tawsilet" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <FaTiktok color="#fff" style={{width: 22,height: 22}}  size={10} />
              </SocialIconWrapper>
            </a>
            <a href="https://www.instagram.com/tawsilet.tn/" target="_blank" rel="noopener noreferrer">
              <SocialIconWrapper>
                <FaInstagram color="#fff" style={{width: 22,height: 22}}  size={10} />
              </SocialIconWrapper>
            </a>
          </Contacts>
        </LAST>
      </Box>
      <Ends>
        <Last>
          {t("FOOTER.Copyright")} © {year} {t("FOOTER.Tous-réservés")}
        </Last>
        <DIIV style={{}}>
          <Link to="/Conditions" target="_blank">
            {" "}
            <Last> {t("FOOTER.Last1")}</Last>{" "}
          </Link>
          <Link to="/Politiques" target="_blank">
            {" "}
            <Last>{t("FOOTER.Last2")}</Last>
          </Link>{" "}
        </DIIV>
      </Ends>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  background-color: #000000;
  margin-top: 10%;
  justify-content: center;
  display: flex;
   
  flex-wrap: wrap;

      border-color: #fff;
    
    border-width: 10px;
`;

export const LAST = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  @media (min-width: 919px) and (max-width: 1268px) {
    display: flex;
    flex-direction: column;
    gap: 0px;
  }
  @media (min-width: 360px) and (max-width: 920px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
`;
export const Div = styled.div``;
export const Box = styled.section`
  bottom: 0;
  margin: 0 auto;
  /* position: absolute; */
  background-color:#000000;
  display: flex;
  
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: flex-start;
  justify-content: center;
  gap: 10%;
  width: 100%;
  padding: 40px 40px 20px;
  /* min-height: 350px; */
  /* @media (min-width: 1060px) and (max-width: 1270px) {
  
gap:4%;
  } */
  @media (min-width: 360px) and (max-width: 895px) {
    gap: 100%;
  }
  .logo {
    margin: 0;
    @media (min-width: 360px) and (max-width: 812px) {
      order: -1;
    }
  }
`;

const MENU = styled.div`
  display: flex;
  flex-direction: column;

  /* padding-bottom: 20px; */

  @media (min-width: 895px) and (max-width: 1268px) {
    width: 100%;
    gap: 10px;
  }
  @media (min-width: 360px) and (max-width: 920px) {
    width: 100%;
    gap: 10px;
  }
  /* @media  (min-width: 789px) and (max-width: 920px) {
    width: 100%;
    gap: 10px
    
  } */
`;
const HEE = styled.div`
  /* padding-bottom: 20px; */
  @media (min-width: 360px) and (max-width: 920px) {
    display: flex;
    gap: 30px;
  }
  @media (min-width: 919px) and (max-width: 1268px) {
    display: flex;
    gap: 30px;
  }
  /* @media  (min-width: 789px) and (max-width: 920px) {
    display: flex;
    gap: 30px;
    
  } */
`;
const CONT = styled.div`
  /* padding-bottom: 20px; */

  /* @media  (min-width: 919px) and (max-width: 1061px) {
   
   /* display: flex;
   gap: 50px 
   
    } */

  /* @media  (min-width: 789px) and (max-width: 920px) {
        display: flex;
        gap: 50px
      
    } */
  @media (min-width: 360px) and (max-width: 895px) {
    display: flex;
    gap: 50px;
  }
`;
const ContainerLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: flex-start;

  /* padding-bottom: 20px; */
  @media (min-width: 360px) and (max-width: 812px) {
    width: 80%;
    justify-content: space-around;
    flex-direction: row;
    align-items: baseline;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  padding-bottom: 20px;
  @media (min-width: 360px) and (max-width: 920px) {
    /* width: 100%; */
    gap: 4px;

    /* display: none; */
  }
`;
export const Image = styled.img`
  display: flex;
  align-self: start;
  width: 100%;
  @media (min-width: 360px) and (max-width: 812px) {
    margin-bottom: 30px;
  }
`;
export const Containerr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;

export const FooterLink = styled.a`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  letter-spacing: 0.02em;
  color: #ffff;
  line-height: 25px;
  &:hover {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    transition: 200ms ease-in;
  }
  @media (min-width: 360px) and (max-width: 812px) {
    font-size: 14px;
    width: 100%;
  }
`;

export const FooterLinkk = styled.span`
  font-family: "Inter", sans-serif;
      direction:ltr;

            text-Align: ${({ isRtl }) => (isRtl ? "right" : "left")};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-decoration: none;
  letter-spacing: 0.02em;
  color: #ffff;
  line-height: 25px;
  &:hover {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    transition: 200ms ease-in;
  }
  @media (min-width: 360px) and (max-width: 812px) {
    font-size: 14px;
  }
`;


//   @media (max-width: 732px) and (min-width: 360px) {
//     display: flex;
//     flex-direction: row;
//   }
//   @media (max-width: 361px) {

//   }
// `;
// export const FooterLinks = styled.a`
//   font-family: "Inter", sans-serif;
//   font-style: normal;
//   font-weight: ${style.font.FONT_WEIGHT_NORMAL};
//   font-size: ${style.font.FONT_SIZE_MEDIUM};
//   text-decoration: none;
//   letter-spacing: 0.02em;
//   color: #ffff;
//   line-height: 25px;
//   &:hover {
//     color: ${(props) => props.theme.PRIMARY_COLOR};
//     transition: 200ms ease-in;
//   }
//   @media (max-width: 732px) and (min-width: 360px) {

//   }
// `;
/* 
  @media (min-width: 360px) and (max-width: 812px) {
    font-size: 2.3vw;
  }
`; */

const HeadingLast = styled.h2`
  margin-bottom: 20px;

  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: white;
  @media (min-width: 360px) and (max-width: 812px) {
    display: none;
  }
`;
export const Heading = styled.h2`
  margin-bottom: 20px;

  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: white;
  @media (min-width: 360px) and (max-width: 895px) {
    font-size: 16px;

    margin-top: 20px;
  }
`;
//   @media (max-width: 732px) and (min-width: 360px) {
//     display: flex;
//     flex-direction: row;
//   }
//   @media (max-width: 361px) {

//     flex-direction: column;
//   }
// `;
// export const He = styled.h1`
//   margin-bottom: 20px;

//   font-family: "Inter", sans-serif;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 23px;
//   color: #aaaaaa;
//   @media (max-width: 732px) and (min-width: 360px) {
//     display: none;
/* 
  @media (min-width: 360px) and (max-width: 812px) {
    font-size: 12px;

  }
`; */

export const LogoImg = styled.img`
  width: 128px;
  height: 28px;

  /* //   @media (max-width: 732px) and (min-width: 360px) {
  //     flex-direction: row;
  //   }
  //   @media (max-width: 361px) {
  //     align-items: flex-start; */

  @media (min-width: 360px) and (max-width: 812px) {
    width: 15vw;
    height: 3vw;
  }
`;
export const Ligne = styled.div`
  width: 200px;
  gap: 20px;
  display: flex;
  justify-content: flex-start;

  /* //   @media (max-width: 732px) and (min-width: 360px) {
  //     flex-direction: row; } */

  @media (min-width: 360px) and (max-width: 812px) {
    margin-left: 20px;
  }
`;

export const Contacts = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  margin-left: 150px;
  @media (min-width: 919px) and (max-width: 1268px) {
    flex-direction: row;
    gap: 8px;
    margin-left: 0;
    padding-top: 30px;
  }
  @media (min-width: 360px) and (max-width: 920px) {
    flex-direction: column;
    gap: 8px;
    margin-left: 0;
    padding-top: 30px;
  }

  /* @media (min-width: 1060px) and (max-width: 1117px) {
    flex-direction: row;
  
    margin-left: 0;
    
  } */
`;
export const Paths = styled.img`
  display: flex;
  justify-content: flex-start;
  width: 12px;
  height: 12px;
  margin-top: 5px;
  object-fit: contain;
`;
export const Last = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: ${style.font.FONT_WEIGHT_NORMAL};
  font-size: ${style.font.FONT_SIZE_SMALL};
  text-decoration: none;
  letter-spacing: 0.02em;
  color: #ffff;
  line-height: 25px;

  &:hover {
    color: ${(props) => props.theme.PRIMARY_COLOR};
    transition: 200ms ease-in;
  }
`;
export const Ends = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 50px;
  gap: 430px;
  /* //   //   @media (max-width: 732px) and (min-width: 360px) { */

  justify-content: space-between;
  /* gap: 430px; */
  @media (min-width: 360px) and (max-width: 812px) {
    /* display: none; */
    flex-direction: column;
    gap: 10px;
    padding: 10px 20px;
  }
  @media (max-width: 360px) {
    /* display: none; */
  }
`;
export const DIIV = styled.div`
  display: flex;
  gap: 30px;
  width: 30%;
  @media (min-width: 360px) and (max-width: 812px) {
    width: 100%;
  }
  @media (max-width: 360px) {
    width: 100%;
  }
`;
export const LINKK = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 360px) and (max-width: 812px) {
    display: flex;
    flex-direction: column;
  }
  /* @media  (min-width: 789px) and (max-width: 920px) {
      display: flex;
      flex-direction: column;
    
  } */
`;
export const Hr = styled.hr`
  display: none;
  @media (min-width: 360px) and (max-width: 812px) {
    width: 80%;
    align-self: center;
    justify-content: center;
    display: block;

    align-items: center;

    margin-inline: auto;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  align-items: center;

  @media (max-width: 744px) {
    flex-direction: column;
    gap: 30px;
  }
`;
const Lineone = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 744px) {
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  border-radius: 32px;
  @media (max-width: 744px) {
    width: 80%;
  }
  .icon-cercle {
    width: 40px;
    /* margin: 10px; */
    object-fit: contain;
  }
`;
const ImgService = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 32px;

  @media (max-width: 744px) {
    flex-direction: column-reverse;
    width: 60%;
    /* display: none; */
    height: 100%;
    justify-content: start;
    text-align: start;
    iframe {
      width: 290px;
      height: 290px;
      margin-left: -30px;
    }
  }
`;
const Description = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 400;
  font-size: 1rem;
  color: white;
  line-height: 30px;
  padding: 10px;
  @media (max-width: 744px) {
    line-height: 10px;
    font-size: 0.6875rem;
  }
`;

const SocialIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: #111111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: #1a1a1a;
  }
  svg {
    width: 44px;
    height: 44px;
    display: block;
  }
`;

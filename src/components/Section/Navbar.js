import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Logo from "./../../assets/icons/Group 1000003622.svg";
import LogoBlue from "./../../assets/icons/Group 1000003622.svg";
import Menu from "../Navigation/Menu";
import { Button } from "../Items/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import burgernavbar from "../../assets/icons/menuetogle.svg";
import SecondNav from "../Navigation/SecondNav";
import { AiOutlineClose } from "react-icons/ai";
import Profile from "../../assets/images/mann.png";
import { useTranslation } from "react-i18next";
import frFlag from "../../assets/icons/falg-fr.svg";
import arFlag from "../../assets/icons/saudi-arabia.svg";
import enFlag from "../../assets/icons/US_icon.svg";
import historyIcon from "../../assets/icons/iconhistoryprofileclient.svg";
import detailsIcon from "../../assets/icons/icondetaildecompte.svg";
import icondeconnecternav from "../../assets/icons/icondeconnecternav.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import googlePlayIcon from "../../assets/icons/googleplay.svg";
import appStoreIcon from "../../assets/icons/appstore.svg";

const Navbar = ({ navigationValues, currentUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const refDropLanguage = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropDrop, setShowDropDrop] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    window.location.reload();
  };

  const getFlag = (language) => {
    switch (language) {
      case "fr-FR":
      case "fr":
        return frFlag;
      case "ar-AR":
      case "ar":
        return arFlag;
      case "en-EN":
      case "en":
        return enFlag;
      default:
        return enFlag;
    }
  };

  useEffect(() => {
    if (isOpen) refDropLanguage.current?.focus();
  }, [isOpen]);

  return (
    <Nav showmenu={showMenu.toString()} dir="auto">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {showMenu ? (
            <AiOutlineClose
              id="x"
              onClick={() => setShowMenu(false)}
              style={{ color: "#111", cursor: "pointer", fontSize: 36 }}
              aria-label="close"
            />
          ) : (
            <Burger
              onClick={() => setShowMenu(true)}
              src={burgernavbar}
              alt="open"
            />
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoImg
              alt="Tawsiltlogo"
              showshow={showMenu}
              onClick={() => navigate("/")}
              src={Logo}
            />
            <StoreBadges>
              <a href="https://play.google.com/store/apps/details?id=com.fortekma.tawsilet" target="_blank" rel="noopener noreferrer">
                <StoreIcon src={googlePlayIcon} alt="Google Play" />
              </a>
              <a href="https://apps.apple.com/us/app/tawsilet/id6745802311" target="_blank" rel="noopener noreferrer">
                <StoreIcon src={appStoreIcon} alt="App Store" />
              </a>
            </StoreBadges>
          </div>
        </div>
      </div>
      {showMenu && (
        <SecondNav
          navigationValues={navigationValues}
          setShowMenu={setShowMenu}
        />
      )}
      <Menu navigationValues={navigationValues} />
      <Side>
        <DropdownContainer directionglobe={i18n.language === "ar-AR"} dir="auto">
          <DropdownButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FlagIcon src={getFlag(i18n.language)} alt={i18n.language} />
          </DropdownButton>
          {isOpen ? (
            <DropdownMenu
              ref={refDropLanguage}
              tabIndex={1}
              onBlur={() => setIsOpen(false)}
              isOpen={isOpen}
              directionglobe={i18n.language === "ar-AR"}
            >
              <DropdownItem directionglobe={i18n.language === "ar-AR"} onClick={() => changeLanguage("ar-AR")}> <FlagIcon src={arFlag} alt="ar" /> العربية </DropdownItem>
              <DropdownItem directionglobe={i18n.language === "ar-AR"} onClick={() => changeLanguage("fr-FR")}> <FlagIcon src={frFlag} alt="fr" /> Français </DropdownItem>
              <DropdownItem directionglobe={i18n.language === "ar-AR"} onClick={() => changeLanguage("en-EN")}> <FlagIcon src={enFlag} alt="en" /> Anglais </DropdownItem>
            </DropdownMenu>
          ) : null}
        </DropdownContainer>
        {currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              justifyContent: "flex-start",
            }}
            ref={refDropLanguage}
            tabIndex={0}
            onBlur={() => setShowDropDrop(false)}
          >
            <LazyLoadImage
              effect="blur"
              className="avatar"
              src={
                currentUser?.profilePicture?.formats
                  ? `${currentUser?.profilePicture?.formats?.thumbnail?.url}`
                  : currentUser?.profilePicture
                    ? `${currentUser?.profilePicture?.url}`
                    : Profile
              }
              alt="avatar"
              onClick={() => {
                setShowDropDrop(!showDropDrop);
              }}
            />
            {showDropDrop ? (
              <DropDownProfile
                onMouseLeave={() => setShowDropDrop(false)}
                isDirectionLeft={i18n.language === "ar-AR"}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 4,
                    justifyContent: "space-between",
                    width: "100%",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  <p className="bonjour">
                  {t("Dropdown.bonjour")} {currentUser?.firstName}
                  </p>
                  <p
                    style={{ cursor: "pointer", justifySelf: "flex-start" }}
                    onClick={() => setShowDropDrop(false)}
                  >
                    x
                  </p>
                </div>
                <NavItem
                  onClick={() => {
                    navigate("/ClientProfile/details");
                    setShowDropDrop(false);
                  }}
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <img src={detailsIcon} style={{ width: "25px" }} />
                  <p style={{ marginLeft: "5px" }}> {t("Dropdown.compte")}</p>
                </NavItem>
                <NavItem
                  onClick={() => {
                    navigate("/ClientProfile/history");
                    setShowDropDrop(false);
                  }}
                  style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "flex-start",
                  }}
                >
                  <img
                    src={historyIcon}
                    style={{ width: "25px" }}
                    className="historique"
                  />
                  <p style={{ paddingLeft: "5px" }}>{t("Dropdown.historique")}</p>
                </NavItem>
                <NavItem
                  style={{
                    display: "flex",
                    gap: 10,
                    cursor: "pointer",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.replace("/");
                  }}
                >
                  <img src={icondeconnecternav} style={{ width: "30px" }} />
                  <p>{t("Dropdown.deconnecter")}</p>
                </NavItem>
              </DropDownProfile>
            ) : null}
          </div>
        ) : (
          <div>
            <Link to="/SidentifierClient" aria-label="Register client">
              <Button style={{ margin: 0 }} className="connexion-btn">
                {t("NAVBAR.Connexion")}
              </Button>
            </Link>
            <Button
              style={{ margin: 0, padding: "8px 16px" }}
              onClick={() => navigate("/SinsecrireClient")}
              hasborder="true"
              className="sinscrire-btn"
            >
              {t("NAVBAR.Sinscrire")}
            </Button>
          </div>
        )}
      </Side>
    </Nav>
  );
};

export default Navbar;

const Side = styled.div`
  display: flex;
  gap: 0px;
`;
const Burger = styled.img`
  width: auto;
  height: auto;
  filter: none;
  @media (min-width: 1151px) {
    display: none;
  }
`;
export const LogoImg = styled.img`
  margin-left: ${style.spacing.MARGIN_LARGE};
  width: auto;
  height: 60px;
  cursor: pointer;
  @media (max-width: 1151px) {
    height: 44px;
    filter: ${(props) =>
      props.showshow
        ? "none"
        : "none"};
  }
`;
export const Nav = styled.header`
  flex: 1;
  z-index: 1000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 5px;

  border-bottom: 1px solid #eeeeee;
  background-color: #ffffff;

  @media (max-width: 1151px) {
    border-bottom: 1px solid ${(props) => props.theme.PRIMARY_COLOR};
    max-width: 100vw;
    padding: 0 5px;
  }
  .connexion-btn {
    @media (max-width: 1151px) {
      display: none;
    }
  }
  .sinscrire-btn {
    @media (max-width: 600px) {
      display: none !important;
    }
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    object-fit: cover;
    object-position: top;
    cursor: pointer;
  }
`;
const DropdownContainer = styled.div`
  width: auto !important;
  width: auto;
  padding: 10px;
  position: relative;
  display: inline-block;
  color: #111;
 
`;
const DropdownButton = styled.button`
  background-color: transparent;
  color: #111;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0px;
`;
const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
 
  background-color: #ffffff;
 
  padding: 0;
  margin: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  gap: 0px;
  min-width: 120px;
  z-index: 1001;
  transform-origin: top left;
  transform: ${props => props.directionglobe ? 'scaleX(1)' : 'scaleX(-1)'};
`;
const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0px;
  transform: ${props => props.directionglobe ? 'scaleX(1)' : 'scaleX(-1)'};
  &:hover {
    background: #f5f5f5;
 
    color: #111;
 
  }
`;
const FlagIcon = styled.img`
  width: 20px;
  height: 18px;
`;
const NavItem = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  width: fit-content;
`;
const DropDownProfile = styled.div`
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  top: 84px;
  left: ${({ isDirectionLeft }) => (isDirectionLeft ? "1vw" : "unset")};
  right: ${({ isDirectionLeft }) => (isDirectionLeft ? "unset" : "1vw")};
  padding: 20px;
 
  background-color: #ffffff;
 
  border-radius: 20px;
  border-bottom: 4px solid rgba(220, 220, 220, 0.6);
  &:hover {
    background: #f5f5f5;
 
    color: #111;
 
  }
  a {
    color: #111;
    text-decoration: none;
    &:hover {
      background: #f5f5f5;
      color: #111;
    }
  }
  p {
    color: #111;
    &:hover {
      background: #f5f5f5;
      color: #111;
    }
  }
  .bonjour {
    &:hover {
      color: #111;
    }
  }
`;
const StoreBadges = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-left: 10px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 1151px) {
    gap: 4px;
    margin-left: 6px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 1px;
  }
  @media (max-width: 600px) {
    gap: 2px;
    margin-left: 2px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 0px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const StoreIcon = styled.img`
  height: 22px;
  width: auto;
  transition: transform 0.15s;
  cursor: pointer;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.08));
  &:hover {
    transform: scale(1.08);
    filter: brightness(0.95) drop-shadow(0 2px 4px rgba(0,0,0,0.12));
  }
  @media (max-width: 1151px) {
    height: 18px;
  }
  @media (max-width: 600px) {
    height: 14px;
  }
`;

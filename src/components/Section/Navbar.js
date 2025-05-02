import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Logo from "./../../assets/icons/Group 1000003622.svg";
import LogoBlue from "./../../assets/icons/Group 1000003622.svg";
import Menu from "../Navigation/Menu";
import { Button } from "../Items/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
// import LoginCard from "../Items/LoginCard";
// import Modale from "../Items/Modale";
import burgernavbar from "../../assets/icons/menuetogle.svg";
import SecondNav from "../Navigation/SecondNav";
import Xicon from "../../assets/icons/ix.svg";
import Profile from "../../assets/images/mann.png";
// import i18n from "../../i18n";
// import { withNamespaces } from 'react-i18next';
// import { withI18n } from "react-i18next";
import { useTranslation } from "react-i18next";
// import { FiGlobe } from "react-icons/fi";
// import Flag, { ReactCountryFlag } from "react-country-flag";
// import arrow from "../../assets/icons/down-solid.svg";
import frFlag from "../../assets/icons/falg-fr.svg";
// import arrFlag from "../../assets/icons/flag-tn.svg";
import arFlag from "../../assets/icons/saudi-arabia.svg";
import enFlag from "../../assets/icons/US_icon.svg";

import historyIcon from "../../assets/icons/iconhistoryprofileclient.svg";
import detailsIcon from "../../assets/icons/icondetaildecompte.svg";
import icondeconnecternav from "../../assets/icons/icondeconnecternav.svg";

// import globe from "../../assets/icons/globe-solid.svg";
// import { FaLanguage } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Navbar = ({ navigationValues, currentUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Language Dropdown State
  const [isOpen, setIsOpen] = useState(false);
  const refDropLanguage = useRef();

  const [selectedLanguage, setSelectedLanguage] = useState("Français");

  const [showMenu, setShowMenu] = useState(false);
  const [showDropDrop, setShowDropDrop] = useState(false);

  // Open/Close Language Dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle Language Change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng); // Save language in localStorage
    window.location.reload();
  };

  // Get Flag Based on Language
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
    <Nav showmenu={showMenu.toString} dir="auto">
      <div style={{ display: "flex", alignItems: "center" }}>
        {showMenu ? (
          <img
            src={Xicon}
            id="x"
            onClick={() => setShowMenu(false)}
            alt="close"
          ></img>
        ) : (
          <Burger
            onClick={() => setShowMenu(true)}
            src={burgernavbar}
            alt="open"
          />
        )}
        <LogoImg
          alt="sheelnilogo"
          showshow={showMenu}
          onClick={() => navigate("/")}
          src={showMenu ? LogoBlue : Logo}
          // srcSet={
          //   !showMenu
          //     ? "assets/images/YellowLogo-d289153b718ec79bcef3_f1zimc_c_scale-w_200.png 200w,assets/images/YellowLogo-d289153b718ec79bcef3_f1zimc_c_scale-w_1400.png 1400w"
          //     : ""
          // }
        />
      </div>
      {showMenu && (
        <SecondNav
          navigationValues={navigationValues}
          setShowMenu={setShowMenu}
        />
      )}
      <Menu navigationValues={navigationValues} />
      {/* Language */}
      <Side>
        <DropdownContainer directionglobe={i18n.language === "ar-AR"} dir="auto">
          <DropdownButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FlagIcon src={getFlag(i18n.language)} alt={i18n.language} />
            {/* <span>{t("languageSelector." + i18n.language)}</span> */}
          </DropdownButton>

          {isOpen ? (
            <DropdownMenu
              ref={refDropLanguage}
              tabIndex={1}
              onBlur={() => setIsOpen(false)}
              isOpen={isOpen}
              directionglobe={true}
            >
              <DropdownItem onClick={() => changeLanguage("ar-AR")}>
                <FlagIcon src={arFlag} alt="ar" />
                العربية{" "}
              </DropdownItem>
              <DropdownItem onClick={() => changeLanguage("fr-FR")}>
                <FlagIcon src={frFlag} alt="fr" />
                Français
              </DropdownItem>

              <DropdownItem onClick={() => changeLanguage("en-EN")}>
                <FlagIcon src={enFlag} alt="en" />
                Anglais
              </DropdownItem>
            </DropdownMenu>
          ) : null}
        </DropdownContainer>

        {/* Language */}
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
                // autoFocus
                onFocus={() => {
                  refDrop.current.focus();
                }}
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
                  {/* <img src="" /> */}
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
                {/* <NavLink to="/ClientProfile/details"> */}
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
                {/* </NavLink> */}
                {/* <NavLink to="/ClientProfile/history"> */}
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
                {/* </NavLink> */}

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

            {/* <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.replace("/");
            }}
            style={{ margin: 0 }}
            hasborder
          >
            {t("NAVBAR.Deconnecte")}
          </Button> */}
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
            >
              {t("NAVBAR.Sinscrire")}
            </Button>
            {/* <Modale
            openModal={openModal}
            closeModal={closeModal}
            setShow={setShow}
            show={show}
          /> */}
          </div>
        )}
      </Side>
    </Nav>
  );
};

export default Navbar;
// select Language
const LanguageSelectorContainer = styled.div`
  display: flex;

  align-items: center;
`;
const Dropdown = styled.select`
  height: 50px;
  border-radius: 10px;
  border: transparent;
  width: 75px;
`;
const Side = styled.div`
  display: flex;
  gap: 10px;
`;
const LanguageOption = styled.div`
  cursor: pointer;
  margin-right: 10px;
  font-size: 16px;
  color: ${({ isSelected }) => (isSelected ? "blue" : "black")};

  &:hover {
    color: blue;
  }
`;
const Burger = styled.img`
  width: auto;
  height: auto;
  @media (min-width: 1151px) {
    display: none;
  }
`;

const Avatar = styled(LazyLoadImage)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  object-fit: cover;
  object-position: top;
  cursor: pointer;
`;
export const SwitcherContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const LogoImg = styled.img`
  margin-left: ${style.spacing.MARGIN_LARGE};
  /* padding: ${style.spacing.PADDING_LARGE}; */
  /* width: 160px; */
  width: auto;
  height: 41px;
  /* align-self: start; */
  cursor: pointer;

  @media (max-width: 1151px) {
    height: 30px;
    /* margin-left: 16px; */
    filter: ${(props) =>
      props.showshow
        ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%)hue-rotate(3deg) brightness(104%) contrast(101%)"
        : "none"};
  }
`;

export const Nav = styled.header`
  flex: 1;
  /* border: 1px solid red; */
  z-index: 1000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  padding: 0 32px;
  box-shadow: -4px 12px 5px -11px #e0e0e0;
  background-color: ${(props) =>
    props.showmenu === "true" ? "white" : props.theme.BACKGROUND_COLOR};
  /* @media (min-width: 360px) and (max-width: 1151px) {
    display: none;
  }
  @media (max-width: 360px) {
    display: none;
  } */
  /* #x {
    filter: ${(props) =>
    props.showmenu
      ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(3deg) brightness(104%) contrast(101%)"
      : "none"};
  } */
  @media (max-width: 1151px) {
    border-bottom: 1px solid ${(props) => props.theme.PRIMARY_COLOR};
    /* background-color: white; */
    max-width: 100vw;
    padding: 0 18px;
  }
  .connexion-btn {
    @media (max-width: 1151px) {
      display: none;
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
// Language settings
const DropdownContainer = styled.div`
  /* border:1px solid red; */
  width: auto !important;
  width: auto;
  padding: 10px;
  position: relative;
  display: inline-block;

  color: #fff;
  /* left: 16px; */
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  /* &:hover {
    color: #F37A1D;
  } */
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  width: auto !important;
  right: 0;
  list-style: none;
  background-color: #18365a;
  /* border: 1px solid #ccc; */
  padding: 0;
  margin: 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  gap: 5px;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  /* justify-content:center; */
  gap: 5px;
  &:hover {
    color: #f37a1d;
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
  background-color: #18365a;
  border-radius: 20px;
  border-bottom: 4px solid rgba(220, 220, 220, 0.6);
  /* &:focus {
    outline: none;
  }
  ${NavItem}:hover img {
    filter: brightness(0) saturate(100%) invert(87%) sepia(21%) saturate(5238%)
      hue-rotate(360deg) brightness(104%) contrast(104%);
  } */
  &:hover {
    color: #f37a1d;
  }
  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #f37a1d;
    }
  }
  p {
    color: white;
    &:hover {
      color: #f37a1d;
    }
  }
  .bonjour {
    &:hover {
      color: white;
    }
  }
`;

import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
import Logo from "./../../assets/icons/Group 1000003622.svg";
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

const Navbar = ({ navigationValues, currentUser }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const refDropLanguage = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropDrop, setShowDropDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Header scrolled={scrolled} dir="auto">
      <Inner>
        <LeftGroup>
          <Burger
            onClick={() => setShowMenu(true)}
            src={burgernavbar}
            alt="open"
            aria-label="Open menu"
          />
          <LogoImg alt="Tawsilet" onClick={() => navigate("/")} src={Logo} />
        </LeftGroup>

        <Menu navigationValues={navigationValues} />

        <RightGroup>
          <DropdownContainer dir="auto">
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
              >
                <DropdownItem onClick={() => changeLanguage("ar-AR")}>
                  <FlagIcon src={arFlag} alt="ar" /> العربية
                </DropdownItem>
                <DropdownItem onClick={() => changeLanguage("fr-FR")}>
                  <FlagIcon src={frFlag} alt="fr" /> Français
                </DropdownItem>
                <DropdownItem onClick={() => changeLanguage("en-EN")}>
                  <FlagIcon src={enFlag} alt="en" /> English
                </DropdownItem>
              </DropdownMenu>
            ) : null}
          </DropdownContainer>

          {currentUser ? (
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-start" }}
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
                <DropDownProfile>
                  <div style={{ display: "flex", gap: 10, marginBottom: 4, justifyContent: "space-between", width: "100%" }}>
                    <p className="bonjour">{t("Dropdown.bonjour")} {currentUser?.firstName}</p>
                    <p style={{ cursor: "pointer" }} onClick={() => setShowDropDrop(false)}>
                      x
                    </p>
                  </div>
                  <NavItem
                    onClick={() => {
                      navigate("/ClientProfile/details");
                      setShowDropDrop(false);
                    }}
                    style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}
                  >
                    <img src={detailsIcon} style={{ width: 25 }} />
                    <p style={{ marginLeft: 5 }}> {t("Dropdown.compte")}</p>
                  </NavItem>
                  <NavItem
                    onClick={() => {
                      navigate("/ClientProfile/history");
                      setShowDropDrop(false);
                    }}
                    style={{ display: "flex", gap: 10, justifyContent: "flex-start" }}
                  >
                    <img src={historyIcon} style={{ width: 25 }} className="historique" />
                    <p style={{ paddingLeft: 5 }}>{t("Dropdown.historique")}</p>
                  </NavItem>
                  <NavItem
                    style={{ display: "flex", gap: 10, cursor: "pointer", justifyContent: "flex-start" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.replace("/");
                    }}
                  >
                    <img src={icondeconnecternav} style={{ width: 30 }} />
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
              <Button style={{ margin: 0, padding: "8px 16px" }} onClick={() => navigate("/SinsecrireClient")} hasborder="true" className="sinscrire-btn">
                {t("NAVBAR.Sinscrire")}
              </Button>
            </div>
          )}
        </RightGroup>
      </Inner>

      {showMenu && (
        <MobileOverlay onClick={() => setShowMenu(false)}>
          <MobileSheet onClick={(e) => e.stopPropagation()}>
            <TopRow>
              <LogoImg alt="Tawsilet" src={Logo} />
              <AiOutlineClose id="x" onClick={() => setShowMenu(false)} style={{ color: "#111", cursor: "pointer", fontSize: 28 }} aria-label="close" />
            </TopRow>
            <SecondNav navigationValues={navigationValues} setShowMenu={setShowMenu} />
          </MobileSheet>
        </MobileOverlay>
      )}
    </Header>
  );
};

export default Navbar;

const Header = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255,255,255,0.8);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid #f3f3f3;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  box-shadow: ${({ scrolled }) => (scrolled ? "0 6px 20px rgba(0,0,0,0.06)" : "none")};
`;

const Inner = styled.div`
  height: 72px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Burger = styled.img`
  width: 28px;
  height: 28px;
  display: none;
  @media (max-width: 1151px) {
    display: block;
  }
`;

export const LogoImg = styled.img`
  margin-left: ${style.spacing.MARGIN_LARGE};
  width: auto;
  height: 48px;
  cursor: pointer;
  @media (max-width: 1151px) {
    height: 40px;
  }
`;

const DropdownContainer = styled.div`
  width: auto !important;
  padding: 8px;
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
  gap: 6px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background-color: #ffffff;
  padding: 6px 0;
  margin: 6px 0 0 0;
  border: 1px solid #ececec;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 160px;
  z-index: 1001;
  transform-origin: top left;
`;

const DropdownItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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
  align-items: center;
  cursor: pointer;
  width: fit-content;
`;

const DropDownProfile = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: absolute;
  top: 84px;
  left: 1vw;
  right: 1vw;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #ececec;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  a { color: #111; text-decoration: none; }
  p { color: #111; }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.22);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-end;
`;

const MobileSheet = styled.div`
  width: min(90vw, 380px);
  height: 100vh;
  background: #fff;
  border-left: 1px solid #ececec;
  box-shadow: -12px 0 24px rgba(0,0,0,0.10);
  animation: slideIn 240ms ease;
  @keyframes slideIn {
    from { transform: translateX(10%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const TopRow = styled.div`
  height: 64px;
  padding: 0 12px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

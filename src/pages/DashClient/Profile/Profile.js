import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import detailsIcon from "../../../assets/icons/icondetaildecompte.svg";
import passwordIcon from "../../../assets/icons/iconpasswordprofile.svg";
// import paimentIcon from "../../../assets/icons/iconpaiementclientprofile.svg";
import historyIcon from "../../../assets/icons/iconhistoryprofileclient.svg";

import { styled } from "styled-components";
import { useDispatch } from "react-redux";
// import { getOrderById } from "../../../redux/ordersSlice/OrderSlice";
import { useTranslation } from "react-i18next";

const Profile = ({ currentUser }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   currentUser && dispatch(getOrderById(currentUser?.id));
  // }, [currentUser]);
  return (
    <ProfileContainer dir="auto" right={i18n.language === "ar-AR"}>
      {i18n.language === "ar-AR" ? (
        <NestedNavbar right={true}>
          <NavLink to="details" activeClassName="active">
            <li>
              <img src={detailsIcon} alt="details" />
              <span>{t("ClientProfile.Compte")}</span>
            </li>
          </NavLink>
          <NavLink to="history" activeClassName="active">
            <li>
              <img src={historyIcon} alt="paiement" />
              <span>{t("ClientProfile.Historique")}</span>
            </li>
          </NavLink>

          {/* <NavLink to="paiement" activeClassName="active">
              <li>
                <img src={paimentIcon} alt="paiement" />
                <span>Paiement</span>
              </li>
            </NavLink> */}
          <NavLink to="motdepasse" activeClassName="active">
            <li>
              <img src={passwordIcon} alt="password icon" />
              <span>{t("ClientProfile.MTA")}</span>
            </li>
          </NavLink>
        </NestedNavbar>
      ) : (
        <NestedNavbar right={false}>
          <NavLink to="details" activeClassName="active">
            <li>
              <img src={detailsIcon} alt="details" />
              <span>{t("ClientProfile.Compte")}</span>
            </li>
          </NavLink>
          <NavLink to="history" activeClassName="active">
            <li>
              <img src={historyIcon} alt="paiement" />
              <span>{t("ClientProfile.Historique")}</span>
            </li>
          </NavLink>

          {/* <NavLink to="paiement" activeClassName="active">
              <li>
                <img src={paimentIcon} alt="paiement" />
                <span>Paiement</span>
              </li>
            </NavLink> */}
          <NavLink to="motdepasse" activeClassName="active">
            <li>
              <img src={passwordIcon} alt="password icon" />
              <span>{t("ClientProfile.MTA")}</span>
            </li>
          </NavLink>
        </NestedNavbar>
      )}

      <NestedOutlet>
        <Outlet />
      </NestedOutlet>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  border-top: 2px solid white;
  z-index: 99999999999;
  background-color: #18365a;
  @media (max-width: 1151px) {
    flex-direction: column;
    width: 100vw;
    /* overflow: auto; */
  }
`;

const NestedOutlet = styled.div`
  width: fit-content;
  max-width: 80%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    color: red;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f37a1d;
  }
  @media (max-width: 1151px) {
    width: 100vw;
    max-width: 100%;
    overflow: hidden;
  }
`;

const NestedNavbar = styled.ul`
  width: 20%;
  display: flex;
  min-height: 100vh;
  min-width: 250px;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  gap: 30px;
  padding: 30px 2vw;
  border-right: ${(props) =>
    props.right === false ? "2px solid #020111" : "none"};
  border-left: ${(props) =>
    props.right === true ? "2px solid #020111" : "none"};
  @media (max-width: 1151px) {
    padding: 8px;
    row-gap: 8px;
    column-gap: 2px;
    width: 100vw;
    height: auto;
    flex-wrap: wrap;
    min-height: unset;
    flex-direction: row;
    overflow-y: scroll;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-inline: auto;
  }
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    @media (max-width: 1151px) {
      width: max-content;
      padding: 2px;
    }
  }

  a {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding: 8px 16px;
    text-decoration: none;
    color: white;
    @media (max-width: 1151px) {
      width: max-content;
      padding: 4px 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  img {
    height: 12px;
  }

  .active {
    @media (max-width: 1151px) {
      width: max-content;
    }
    background-color: #FFF;
    color: #f37a1d;
    border: 2px solid #f37a1d;
    img {
      filter: brightness(0) saturate(100%) invert(63%) sepia(60%) saturate(4043%) hue-rotate(349deg) brightness(98%) contrast(94%);
    }
  }
`;

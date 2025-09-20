import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import * as style from "../../constants/StyleSheets";

export const Nav = styled.nav`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  width: 60%;
  height: 10%;
  @media (max-width: 1151px) {
    display: none;
  }
`;

export const ListItem = styled.li`
  display: inline-block;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: ${style.font.FONT_WEIGHT_MEDUIM};
  font-size: ${style.font.FONT_SIZE_SMALL};

  /* padding: ${style.spacing.PADDING_SMALL}; */
  &:hover {
    color: #111;
  }
  a {
    padding: 8px;
    text-decoration: none;
    color: ${(props) => props.theme.TEXT_COLOR};
  }
  a:hover {
    color: ${(props) => props.theme.PRIMARY_COLOR};
  }
  a.active {
    color: #111;
    font-weight: 600;
    border-bottom: 2px solid #111;
  }
  /* a:visited {
    color: ${(props) => props.theme.TEXT_COLOR};
  } */
`;

export const MenuList = styled.ul``;

const Menu = ({ navigationValues }) => {
  const [active, setActive] = useState({ to: "/" });

  const handleItemClick = (item) => {
    setActive(item);
  };
  const handleTelechargerClick = (e) => {
    e.preventDefault();
    const telechargerSection = document.getElementById("telechargerSection");
    if (telechargerSection) {
      telechargerSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Nav>
      {navigationValues?.navbar?.menu?.links?.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => handleItemClick(item)}
          isactive={(active.to === item.to).toString()}
        >
          <NavLink
            to={item.to}
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
           
          >
            {item.label}
          </NavLink>
        </ListItem>
      ))}
      {/* <ListItem
        // key={index}
        // onClick={() => handleItemClick(item)}
      >
     <a href="#download" onClick={(e) => {
  e.preventDefault();
  const section = document.getElementById("download");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}}>
  APPLICATION
</a>
      </ListItem> */}
    </Nav>
  );
};

export default Menu;

import styled, { createGlobalStyle } from "styled-components";
import * as LightConst from "../constants/LightConstant";
import * as DarkConst from "../constants/DarkConstant";
import * as style from "../constants/StyleSheets";

export const Button = styled.button`
  outline: none;
  border: none;
  padding: ${style.spacing.PADDING_SMALL} ${style.spacing.PADDING_LARGE};
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  color: ${(props) => props.theme.PRIMARY_COLOR};
  border-radius: 5px;
`;

export const DarkTheme = {
  PRIMARY_COLOR: DarkConst.color.PRIMARY_COLOR,
  SECONDARY_COLOR: DarkConst.color.SECONDARY_COLOR,
  BACKGROUND_COLOR: DarkConst.color.BACKGROUND_COLOR,
  TEXT_COLOR: DarkConst.color.TEXT_COLOR,
  LINK_COLOR: DarkConst.color.LINK_COLOR,
  ERROR_COLOR: DarkConst.color.ERROR_COLOR,
  SUCCESS_COLOR: DarkConst.color.SUCCESS_COLOR,
  WARNING_COLOR: DarkConst.color.WARNING_COLOR,
  BORDER_COLOR: DarkConst.color.BORDER_COLOR,
};

export const LightTheme = {
  PRIMARY_COLOR: LightConst.color.PRIMARY_COLOR,
  SECONDARY_COLOR: LightConst.color.SECONDARY_COLOR,
  BACKGROUND_COLOR: LightConst.color.BACKGROUND_COLOR,
  TEXT_COLOR: LightConst.color.TEXT_COLOR,
  LINK_COLOR: LightConst.color.LINK_COLOR,
  ERROR_COLOR: LightConst.color.ERROR_COLOR,
  SUCCESS_COLOR: LightConst.color.SUCCESS_COLOR,
  WARNING_COLOR: LightConst.color.WARNING_COLOR,
  BORDER_COLOR: LightConst.color.BORDER_COLOR,
};

export const GlobalStyles = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
  
}

  

html {
  scrollbar-width: 1px; /* Change to 'auto' or 'thin' for a thinner scrollbar */
  scrollbar-color: #f1f1f1; /* Change to your desired colors */
/* font-size:0.8vw */
}

html::-webkit-scrollbar-thumb {
  background-color: #888;
   /* Change to your desired color */
font-size:calc(0.8vw + 12px)}

body{

    /* color: ${(props) => props.theme.TEXT_COLOR}; */
    background-color: ${(props) => props.theme.BACKGROUND_COLOR};
    font-family:  "Inter", "sans-serif" ;

    }`;





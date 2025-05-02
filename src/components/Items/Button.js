import styled, { css } from "styled-components";
import * as style from "../../constants/StyleSheets";

export const Button = styled.button`
  cursor: pointer;
  margin-inline: ${style.spacing.MARGIN_MEDIUM};
  padding: ${style.spacing.PADDING_SMALL} ${style.spacing.PADDING_LARGE};
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;

  ${(props) =>
    props.hasBackground
      ? css`
          border-width: 2px;
          background-color: ${(props) => props.theme.SECONDARY_COLOR};
          border-color: ${(props) =>
            props.hasborder ? props.theme.SECONDARY_COLOR : "transparent"};

          color: ${(props) => props.theme.BACKGROUND_COLOR};
          &:hover {
            background-color: ${(props) =>
              props.variant !== "outline"
                ? props.theme.BACKGROUND_COLOR
                : props.theme.SECONDARY_COLOR};
            color: ${(props) =>
              props.variant !== "outline"
                ? props.theme.SECONDARY_COLOR
                : props.theme.BACKGROUND_COLOR};
          }
        `
      : css`
          ${props.hasborder
            ? css`
                border-width: 2px;
                box-shadow: 2px 2px 0px 0px rgba(24, 54, 90, 1);

                background-color: ${(props) => props.theme.BACKGROUND_COLOR};
                border-color: ${(props) =>
                  props.hasborder
                    ? props.theme.SECONDARY_COLOR
                    : "transparent"};
                color: ${(props) => props.theme.SECONDARY_COLOR};
                &:hover {
                  background-color: ${props.theme.SECONDARY_COLOR};
                  color: ${(props) =>
                    props.variant !== "outline" ? "#FFFFFF" : "#F37A1D"};
                }
              `
            : css`
                color: ${props.theme.TEXT_COLOR};
                border: "none";
                border-color: transparent;
                &:hover {
                  color: ${props.theme.SECONDARY_COLOR};
                }
              `}
        `}/* &:hover {
    background-color: ${(props) =>
    props.variant !== "outline" ? "#F37A1D" : "#18365a"};
    color: ${(props) => (props.variant !== "outline" ? "#18365a" : "#F37A1D")};
  } */
`;

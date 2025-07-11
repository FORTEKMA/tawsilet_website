import React from "react";
import PropTypes from "prop-types";
import { styled } from "styled-components";

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function.
The props name, small, disabled and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/

const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled,
}) => {
  return (
    <ToggleContainer dir="auto">
      <div className={"toggle-switch" + (small ? " small-switch" : "")}>
        <input
          type="checkbox"
          name={name}
          className="toggle-switch-checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {id ? (
          <label className="toggle-switch-label" htmlFor={id}>
            <span
              className={
                disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes={optionLabels[0]}
              data-no={optionLabels[1]}
            />
            <span
              className={
                disabled
                  ? "toggle-switch-switch toggle-switch-disabled"
                  : "toggle-switch-switch"
              }
            />
          </label>
        ) : null}
      </div>
    </ToggleContainer>
  );
};

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ["Oui", "Non"],
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  optionLabels: PropTypes.array,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ToggleSwitch;

// Colors
const labelColor = "#bbb";
const disabledColor = "#ddd";
const toggleColor = "#d8b56c";
const whiteColor = "#fff";
const focusColor = "#d8b56c";

export const ToggleContainer = styled.div`
  transform: ${props=>props.directionLanguage ? "scale(-0.75)" : "scale(0.75)"} ;
  .toggle-switch {
    position: relative;
    margin-right: 10px;
    width: 75px;
    display: inline-block;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    text-align: left;

    .toggle-switch-checkbox {
      display: none;
    }

    .toggle-switch-label {
      display: block;
      overflow: hidden;
      cursor: pointer;
      border: 0 solid ${labelColor};
      border-radius: 20px;
      margin: 0;

      &:focus {
        outline: none;
        > span {
          box-shadow: 0 0 2px 5px ${focusColor};
        }
      }

      > span:focus {
        outline: none;
      }
    }

    .toggle-switch-inner {
      display: block;
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;

      &:before,
      &:after {
        display: block;
        float: left;
        width: 50%;
        height: 34px;
        padding: 0;
        line-height: 34px;
        font-size: 14px;
        color: ${whiteColor};
        font-weight: bold;
        box-sizing: border-box;
      }

      &:before {
        content: attr(data-yes);
        text-transform: uppercase;
        padding-left: 10px;
        background-color: ${toggleColor};
        color: ${whiteColor};
      }
    }

    &.toggle-switch-disabled {
      background-color: ${disabledColor};
      cursor: not-allowed;

      &:before {
        background-color: ${disabledColor};
        cursor: not-allowed;
      }
    }

    .toggle-switch-inner:after {
      content: attr(data-no);
      text-transform: uppercase;
      padding-right: 10px;
      background-color: ${labelColor};
      color: ${whiteColor};
      text-align: right;
    }

    .toggle-switch-switch {
      display: block;
      width: 24px;
      margin: 5px;
      background: ${whiteColor};
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      border: 0 solid ${labelColor};
      border-radius: 20px;
      transition: all 0.3s ease-in 0s;
    }

    .toggle-switch-checkbox:checked + .toggle-switch-label {
      .toggle-switch-inner {
        margin-left: 0;
      }

      .toggle-switch-switch {
        right: 0px;
      }
    }

    &.small-switch {
      width: 40px;

      .toggle-switch-inner {
        &:after,
        &:before {
          content: "";
          height: 20px;
          line-height: 20px;
        }
      }

      .toggle-switch-switch {
        width: 16px;
        right: 20px;
        margin: 2px;
      }
    }

    @media screen and (max-width: 991px) {
      transform: scale(0.9);
    }
    @media screen and (max-width: 767px) {
      transform: scale(0.825);
    }
    @media screen and (max-width: 575px) {
      transform: scale(0.75);
    }
  }
`;

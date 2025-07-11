import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 1050px) {
    padding: 20px;
  }
`;

export const Formulaire = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  margin-bottom: 32px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const LabelCard = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 18px;
`;

export const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 9/7;
  border-radius: 16px;
  overflow: hidden;
  background: #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  cursor: pointer;
  @media (max-width: 900px) {
    max-width: 220px;
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    min-width: 140px;
    border-radius: 10px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.25);
  color: #fff;
  opacity: 1;
  pointer-events: none;
`;

export const OverlayText = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-weight: 500;
`;

export const ProfilePicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const ProfileCircle = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  .profile-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const UserIcon = styled.svg`
  width: 80px;
  height: 80px;
  display: block;
`;

// Stepper styles
export const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: ${(props) => (props.active ? "#0c0c0c" : "#e0e0e0")};
    transform: translateX(50%);
    z-index: -1;
  }
`;

export const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#0c0c0c" : "#e0e0e0")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StepTitle = styled.div`
  font-size: 14px;
  color: ${(props) => (props.active ? "#0c0c0c" : "#a0a0a0")};
  text-align: center;
`;

export const Buttonn = styled.button`
  cursor: pointer;
  width: 70%;
  align-self: center;
  height: 45px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  background-color: #0c0c0c;
  border: none;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #333333;
  }
`;

export const DISP = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0px;
  }
`;

export const Container = styled.div`
  position: relative;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  direction: ltr;
  .In {
    padding: 0px 10px;
    height: 45px;
    width: 100%;
    &::placeholder {
      font-size: 12px;
    }
  }

  .ant-upload-wrapper {
    ${(props) => props.full && { width: "100%" }};
    overflow: hidden;
    text-align: start;
    width: 100%;
  }

  .ant-upload-list-text {
    width: ${(props) => (props.full ? "70%" : "47%")};
    min-width: ${(props) => (props.full ? "70%" : "47%")};
  }
  :where(.css-byeoj0).ant-upload-wrapper .ant-upload-list {
    overflow: hidden;
  }

  .react-tel-input {
    height: 45px;
    width: 100%;
    direction: ltr;
  }
  .flag-dropdown {
    background-color: transparent !important;
    border: none !important;
    padding-left: 10px;
  }
  .selected-flag {
    background-color: transparent !important;
  }
  .country-list {
    margin: 0 !important;
    color: grey;
    left: 0;
    right: 0 !important;
  }
  .react-tel-input .form-control {
    height: 100%;
    width: 100%;
    border-width: 1px;
    border-color: ${(props) =>
      props.phoneborder ? "red !important" : "#cccccc !important"};
    &:focus {
      border-color: #0c0c0c !important;
      box-shadow: none;
    }
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: -10px;
  left: ${(props) => (!props.right ? "10px" : "auto")};
  right: ${(props) => (props.right ? "10px" : "auto")};
  font-size: 12px;
  color: #555;
  background-color: white;
  padding: 0 4px;
  pointer-events: none;
`;

export const In = styled.input`
  direction: ${(props) => (props.right ? "rtl" : "ltr")};
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.errorBorder ? "#ff6961" : "#cccccc")};
  background-color: transparent;
  border-radius: 8px;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 14px;
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #0c0c0c;
  }
  &[type="file"]::file-selector-button {
    border: none;
    background: #0c0c0c;
    padding: 3px 7px;
    font-size: 13px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  &::file-selector-button:hover {
    background-color: #333;
  }
  &,
  #mdp {
    padding-right: ${(props) => (props.right ? "40px" : "10px")};
    padding-left: ${(props) => (!props.right ? "40px" : "10px")};
    overflow: hidden;
  }
`;

export const DISPA = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const BTNn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 45px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  background-color: #0c0c0c;
  border: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: #333333;
  }
`;

// Add other styled components as needed from the original file 
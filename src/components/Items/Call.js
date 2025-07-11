import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
// import Tel from "./../../assets/images/call.png";
const CallContact = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #d8b56c;
  gap: 20px;
  font-size: 17px;
  margin-top: 8px;
  font-weight: 600;
  @media (max-width: 744px) {
    font-weight: 900px;
    width: 100%;
  }

  img {
    width: 26px !important;
    height: 26px !important;
  }
`;
const Contact = styled.div``;
export const Call = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <CallContact>
      {/* <img src={Tel} alt="Group" /> */}
      
    </CallContact>
  );
};
export default Call;

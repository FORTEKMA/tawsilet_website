import React, { useState } from "react";
import "./FlotingPopUp.css";
import messagepop from "../../assets/images/messageCore.svg";

const FlotingPopUp = () => {
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);
  return (
    <div class="adminActions" tabIndex={1}>
      <img
        src={messagepop}
        className={show2 ? "messagepop" : "messagepopOff"}
        alt="message"
      />
      <input
        type="checkbox"
        name="adminToggle"
        class="adminToggle"
        onClick={() => {
          setshow2(!show2), setshow(false);
        }}
      />
      <a class="adminButton" href="">
        <i class="fa-regular fa-comment-dots"></i>
      </a>

     
    </div>
  );
};

export default FlotingPopUp;

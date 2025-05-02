import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { message } from "antd";
import { useTranslation } from "react-i18next";


const Survey = ({ setShowEnqeuteModal }) => {
  const { t, i18n } = useTranslation();

  const [source, setSource] = useState("");
  const currentUser = useSelector((store) => store?.user?.currentUser);

  const handleRadioChange = (event) => {
    setSource(event.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/enquetes`,
        {
          data: {
            reponse: source,
            client: currentUser.id,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        message.success(`Enquête envoyée avec success`);
        setShowEnqeuteModal(false);
      });
    //   .catch(()=>message.error());
    // console.log("Survey submitted with source:", source);
  };

  const sources = [
    { value: "Facebook", text: t("Survey.Facebook") },
    { value: "Instagram", text: t("Survey.Instagram")  },
    { value: "Google", text: t("Survey.Google")  },
    { value: "Email", text: t("Survey.Email") },
    { value: "Bouche", text: t("Survey.Bouche à oreille")  },
    { value: "Autre", text: t("Survey.Other")  },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(20,20,20,0.8)",
        zIndex: 999999,
      }}
    >
      <SurveyContainer>
        <h1
          style={{
            top: 8,
            right: 16,
            position: "absolute",
            fontWeight: 400,
            cursor: "pointer",
            fontSize: 24,
            padding: 8,
          }}
          onClick={() => setShowEnqeuteModal(false)}
        >
          x
        </h1>
        {/* <h2>Enquête</h2> */}
        <h3>  {t("Survey.title")}</h3>
        <form>
          {sources.map((element) => (
            <Item key={element.value}>
              <input
                id={element.value}
                type="radio"
                name="source"
                value={element.value}
                checked={source === element.value}
                onChange={handleRadioChange}
              />
              <label htmlFor={element.value}>{element.text}</label>
            </Item>
          ))}

          <button type="button" onClick={handleSubmit}>
          {t("Survey.button")}
          </button>
        </form>
      </SurveyContainer>
    </div>
  );
};

export default Survey;

const SurveyContainer = styled.div`
  position: absolute;
  z-index: 9999999;
  top: 50vh;
  right: 50%;
  transform: translate(50%, -50%);
  width: fit-content;
  min-width: 280px;
  height: fit-content;
  min-height: 400px;
  background-color: #18365a; // #F37A1D
  border-radius: 20px;
  padding: 50px 50px;
  border: 3px solid white;
  color: white;

  h3 {
    margin-bottom: 30px;
    text-align: center;
    align-self: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  button {
    margin-top: 30px;
    background-color:  #F37A1D;
    color: #18365a;
    width: fit-content;
    padding: 8px 26px;
    align-self: center;
    cursor: pointer;
    border-radius: 11px;
    border: none;
  }

  label {
    cursor: pointer;
  }

  input[type="radio"]:checked + label {
    font-weight: bold;
    color: #F37A1D; //#F37A1D
  }
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
  &:hover {
    color: #F37A1D;
  }
`;

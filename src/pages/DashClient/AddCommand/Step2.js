import React, { useState } from "react";
import styled from "styled-components";
import addcommandimage from "../../../assets/images/addcommandcover.png";
import { StepperForm } from "../../../components/Navigation/Stepper";
import cardImage from "../../../assets/images/Component 47.svg";
import cardImage2 from "../../../assets/images/Component 51.svg";
import cardImage3 from "../../../assets/images/Component 53.svg";
import cardImage4 from "../../../assets/images/Component 55.svg";
import backCardImage from "../../../assets/images/Component 48.svg";
import backCardImage2 from "../../../assets/images/Component 49.svg";
import backCardImage3 from "../../../assets/images/Component 63.svg";
import backCardImage4 from "../../../assets/images/Component 65.svg";
import * as style from "../../../constants/StyleSheets";
import { useLocation } from "react-router";

const Step2 = ({ setStep, command, setCommand }) => {
  const location = useLocation();
  // console.log(location?.state?.data);
  const preData = location.state?.data;

  const [order, setOrder] = useState({ data: { ...command.data, ...preData } });

  const addObject = (e) => {
    e.preventDefault();
    if (currentObject.id) {
      setPanier([
        ...panier,
        {
          quant: objetCount,
          item: {
            name: currentObject.value,
            volume: currentObject.volume,
            // category: null,
            // weight: 0,
          },
        },
        // {
        //   object: currentObject,
        //   count: objetCount,
        // },
      ]);
      setOrder({
        data: {
          ...order.data,
          items: [
            ...panier,
            {
              quant: objetCount,
              item: {
                name: currentObject.value,
                volume: currentObject.volume,
                // category: null,
                // weight: 0,
              },
            },
          ],
        },
      });
      setCurrentObject({ value: "" });
      setObjetCount(1);
    } else {
      setShowWarning(true);
    }
  };
  const floreOptions = [
    { value: "Ascenseur", id: 2 },
    { value: "Monter", id: 3 },
    { value: "Rez-de-chaussée", id: 4 },
  ];
  const handleInputChange = (e) => {
    const selectedValue = e.target.value;
    const option = options.find((opt) => opt.value === selectedValue);
    setCurrentObject(option);
    setShowWarning(false);
  };

  const handleFloorChange = (e) => {
    const selectedValue = e.target.value;
    const option = floreOptions.find((opt) => opt.value === selectedValue);
    setOrder({
      data: {
        ...order.data,
        pickUpAcces: { ...order.data.pickUpAcces, options: option?.value },
      },
    });
    setShowWarning(false);
  };

  const handleFloorChange2 = (e) => {
    const selectedValue = e.target.value;
    const option = floreOptions.find((opt) => opt.value === selectedValue);
    setOrder({
      data: {
        ...order.data,
        dropAcces: { ...order.data.dropAcces, options: option?.value },
      },
    });
    setShowWarning(false);
  };

  const [panier, setPanier] = useState([]);
  const [objetCount, setObjetCount] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const options = [
    { value: "Table", id: 1, volume: 0.5 },
    { value: "Door", id: 2, volume: 0.8 },
    { value: "Accesoire", id: 4, volume: 0.8 },
    { value: "BOX-large", id: 5, volume: 1.8 },
    { value: "Option 6", id: 6, volume: 0.2 },
    { value: "Option 7", id: 7, volume: 0.8 },
    { value: "Option 8", id: 8, volume: 1.2 },
    { value: "Option 9", id: 9, volume: 0.1 },
  ];
  const [activeCardIndex, setactiveCardIndex] = useState(0);
  const [currentObject, setCurrentObject] = useState({});
  // console.log(order);

  // console.log(order);

  const nextStep3 = () => {
    setStep(3);
    setCommand(order);
  };

  const orderValidation = () => {
    order?.data?.items?.length &&
    order?.data?.TansportType?.Type &&
    order?.data?.dropAcces?.options &&
    order?.data?.pickUpAcces?.options
      ? nextStep3()
      : alert("Veillez remplir tous les champs ");
  };

  return (
    <StepperForm onSubmit={(e) => e.preventDefault()}>
      <div style={{ flexDirection: "column" }}>
        <img
          src={addcommandimage}
          alt="cover image"
          className="estimationImg"
        />
        <p style={{ marginTop: 20, fontSize: "1.3rem" }}>
          Qu'est-ce qu'on bouge ?
        </p>
      </div>
      <form>
        <BlueTitle> Mes articles</BlueTitle>
        <SearchBox>
          <SearchInputContainer>
            <SearchIcon>&#128269;</SearchIcon>

            {/* <StyledInput onInput={handleInputChange}>
              <option value="Table">Selection d'article:</option>
              <option value="Porte">Porte</option>
              <option value="Chaise">Chaise</option>
              <option value="Refregirateur">Refregirateur</option>
              <option value="Gaz">Gaz</option>
              <option value="5">Honda</option>
              <option value="6">Jaguar</option>
              <option value="7">Land Rover</option>
              <option value="8">Mercedes</option>
              <option value="9">Mini</option>
              <option value="10">Nissan</option>
              <option value="11">Toyota</option>
              <option value="12">Volvo</option>
            </StyledInput> */}

            <StyledInput
              className="test"
              type="text"
              list="searchOptions"
              placeholder="Search..."
              value={currentObject ? currentObject.value : ""}
              onInput={handleInputChange}
            />
            <datalist id="searchOptions">
              {options?.map((option) => (
                <option
                  className="datalistOption"
                  key={option.id}
                  value={option.value}
                />
              ))}
            </datalist>
          </SearchInputContainer>
          <CountNumber>
            <span
              onClick={() => objetCount > 0 && setObjetCount(objetCount - 1)}
            >
              {"<"}
            </span>
            <p>{objetCount}</p>
            <span onClick={() => setObjetCount(objetCount + 1)}>{">"}</span>
          </CountNumber>
          <button className="articlesBtn" onClick={addObject}>
            ADD
          </button>
        </SearchBox>

        {showWarning && <Warning>Selectionner un objet depuis la list</Warning>}
        <h3>{1} Véhicule</h3>
        <ItemsList>
          {panier?.map((objet, index) => (
            <div>
              <p>{`${objet?.quant}x ${objet?.item.name}`}</p>
              <p>&#88;</p>
            </div>
          ))}
        </ItemsList>

        <BlueTitle>Choisissez le véhicule qui vous convient</BlueTitle>

        <div className="cardSection">
          <SmallCard
            className="cardMain
          "
            onClick={() => {
              setOrder({
                data: {
                  ...order.data,
                  TansportType: {
                    Type: "S.small",
                    Quantity: 1,
                  },
                },
              });
              setactiveCardIndex(1);
            }}
          >
            <img
              src={cardImage}
              alt="cover image"
              className={activeCardIndex === 1 ? "imgV activeCard" : "imgV"}
            />
            <img
              src={backCardImage}
              alt="cover image"
              className={activeCardIndex === 1 ? "HBimgV" : "BimgV"}
            />
          </SmallCard>

          <SmallCard
            onClick={() => {
              setOrder({
                data: {
                  ...order.data,
                  TansportType: {
                    Type: "Small",
                    Quantity: 1,
                  },
                },
              });
              setactiveCardIndex(2);
            }}
          >
            <img
              src={cardImage2}
              alt="cover image"
              className={activeCardIndex === 2 ? "imgV activeCard" : "imgV"}
            />
            <img
              src={backCardImage2}
              alt="cover image"
              className={activeCardIndex === 2 ? "HBimgV" : "BimgV"}
            />
          </SmallCard>
          <SmallCard
            onClick={() => {
              setOrder({
                data: {
                  ...order.data,
                  TansportType: {
                    Type: "Classic",
                    Quantity: 1,
                  },
                },
              });
              setactiveCardIndex(3);
            }}
          >
            <img
              src={cardImage3}
              alt="cover image"
              className={activeCardIndex === 3 ? "imgV activeCard" : "imgV"}
            />
            <img
              src={backCardImage3}
              alt="cover image"
              className={activeCardIndex === 3 ? "HBimgV" : "BimgV"}
            />
          </SmallCard>
          <SmallCard
            onClick={() => {
              setOrder({
                data: {
                  ...order.data,
                  TansportType: {
                    Type: "Large",
                    Quantity: 1,
                  },
                },
              });
              setactiveCardIndex(4);
            }}
          >
            <img
              src={cardImage4}
              alt="cover image"
              className={activeCardIndex === 4 ? "imgV activeCard" : "imgV"}
            />
            <img
              src={backCardImage4}
              alt="cover image"
              className={activeCardIndex === 4 ? "HBimgV" : "BimgV"}
            />
          </SmallCard>
        </div>

        <BlueTitle>Dites-nous en plus sur les articles</BlueTitle>
        <TextArea
          name=""
          id=""
          aria-expanded="false"
          onChange={(e) =>
            setOrder({
              data: {
                ...order.data,
                SpecificNote: e.target.value,
              },
            })
          }
        ></TextArea>
        <h1>Accés Ramassage</h1>
        <div className="accesContainer">
          <input
            className="AccesIn"
            type="text"
            list="floreOptions"
            placeholder="Veuillez choisir une option "
            value={
              order?.data?.pickUpAcces?.options
                ? order?.data?.pickUpAcces?.options
                : ""
            }
            onInput={handleFloorChange}
          />
          <datalist id="floreOptions">
            {floreOptions?.map((option) => (
              <option key={option.id} value={option.value} />
            ))}
          </datalist>
          <input
            className="AccesIn"
            type="number"
            placeholder="Quel étage?"
            onChange={(e) =>
              setOrder({
                data: {
                  ...order.data,
                  pickUpAcces: {
                    ...order.data.pickUpAcces,
                    floor: e.target.value,
                  },
                },
              })
            }
          />
        </div>
        <h1>Accés Dépot</h1>
        <div className="accesContainer">
          <input
            className="AccesIn"
            type="text"
            list="floreOptions"
            placeholder="Veuillez choisir une option "
            value={
              order?.data?.dropAcces?.options
                ? order?.data?.dropAcces?.options
                : ""
            }
            onInput={handleFloorChange2}
          />
          <datalist id="floreOptions">
            {floreOptions?.map((option) => (
              <option key={option.id} value={option.value} />
            ))}
          </datalist>
          <input
            className="AccesIn"
            type="number"
            placeholder="Quel étage?"
            onChange={(e) =>
              setOrder({
                data: {
                  ...order.data,
                  dropAcces: {
                    ...order.data.dropAcces,
                    floor: e.target.value,
                  },
                },
              })
            }
          />
        </div>

        <div className="finalBtn">
          <button className="nextButton" onClick={orderValidation}>
            Suivant
          </button>
        </div>
      </form>
    </StepperForm>
  );
};

export default Step2;

export const BlueTitle = styled.h1`
  color: ${(p) => p.theme.SECOND_TEXT_COLOR};
  @media (max-width: 1150px) {
    font-size: 1.4rem;
  }
`;

export const Warning = styled.span`
  font-size: 10px;
  color: red;
  margin-top: -16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 2%;
  font-size: 1.2rem;
  font-weight: bold;
  @media (max-width: 1150px) {
    padding: 3%;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;
export const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  div {
    color: ${(p) => p.theme.SECOND_TEXT_COLOR};
    margin: 6px;
    border: 1px solid ${(p) => p.theme.SECOND_TEXT_COLOR};
    padding: 6px 10px;
    border-radius: 8px;
    display: flex;
    align-items: baseline;
    gap: 26px;
    align-content: center;
  }
`;

export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 36px;
  button {
    width: 9vw;
    height: 6vh;
    padding: 12px 24px;
    border-radius: 8px;
    background-color: ${(p) => p.theme.BACKGROUND_COLOR};
    color: ${(p) => p.theme.PRIMARY_COLOR};
    border: none;
    box-shadow: ${style.shadow.BOX_SHADOW_MEDIUM};
    @media (max-width: 1150px) {
      width: 35vw;
      height: 12vw;
    }
  }
  .test {
    width: 300px;
  }

  @media (max-width: 1150px) {
    flex-wrap: wrap;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  /* display: inline-block; */
  datalist {
    position: absolute;
    max-height: 20em;
    border: 0 none;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .datalistOption {
    font-size: 0.8em;
    padding: 0.3em 1em;
    background-color: #ccc;
    cursor: pointer;
  }

  .datalistOption:hover,
  .datalistOption:focus {
    color: #fff;
    background-color: #036;
    outline: 0 none;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding-right: 24px; /* Adjust padding to accommodate the search icon */
  padding-left: 36px !important;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.2);
`;
const StyledInput2 = styled.input`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.2);
`;
const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
`;

export const CountNumber = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: aqua; */
  font-size: 18px;
  /* gap: 30px; */
  span {
    font-size: ${style.font.FONT_SIZE_LARGE};
    cursor: pointer;
    padding: 8px;
  }
`;
const SmallCard = styled.div`
  // background-color: aquamarine;

  width: 9vw;
  height: 9.5vw;

  box-shadow: 0px 6.360688209533691px 19.082067489624023px 0px #0000001f;

  .imgV {
    width: 9vw;
    height: 10vw;
    z-index: 1;
    @media (max-width: 1150px) {
      width: 100%;
      height: 100%;
    }
  }

  .BimgV {
    position: absolute;
    opacity: 0;
    width: 9vw;
    height: 10vw;
    z-index: 99;
    transition: all 0.2s ease-in;
    @media (max-width: 1150px) {
      display: none;
    }
  }
  .BimgV:hover {
    opacity: 1;
  }

  .HBimgV {
    display: none;
  }
  @media (max-width: 1150px) {
    width: 47%;
    height: 35vw;
    margin-bottom: 5vh;
  }
`;

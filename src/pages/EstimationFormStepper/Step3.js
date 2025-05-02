import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  AccesBlocConatiner,
  StepContainerBody,
  StepContainerButton,
  StepContainerHeader,
  StepContainerHeaderTitle,
  StepContainerLayout,
  StyledIcon,
} from ".";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import WarningIcon from "../../assets/icons/warningIcon.svg";
import ComboBox from "./items/DataList";
import WarningMessage from "./items/WarninMessage";
import CountComponent from "./items/CountComponent";
import { useTranslation } from "react-i18next";
import {
  updateItems,
  updateSpecificNote,
} from "../../redux/newCommand/newCommandSlice";
import downFlesh from "../../assets/icons/fleshrightblue.svg"

import { useMediaQuery } from "react-responsive";

const Step3 = ({ setStep }) => {
  const command = useSelector((store) => store?.newCommand?.command);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const objects = useSelector((store) => store?.objects?.objects);
  const commandItems = useSelector(
    (store) => store?.newCommand?.command?.items
  );

  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const isResponsive = useMediaQuery({ maxWidth: 1150 });

  const remarqueRef = useRef("");

  // Helper function to calculate total volume
  const calculateTotalVolume = (items) => {
    return items?.reduce(
      (total, item) => total + item.quant * item.item.volume,
      0
    );
  };

  const [selectedItems, setSelectedItems] = useState(commandItems);
  // const [note, setNote] = useState(commandItems?.SpecificNote || "");
  const [volume, setVolume] = useState(
    calculateTotalVolume(command?.items || [])
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update Redux store when selectedItems change
  const updateSelectedItems = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
    dispatch(updateItems(newSelectedItems)); // Dispatching the updateItems action
  };

  // Handle incrementing item quantity
  const handleIncrement = (index) => {
    const updatedItems = commandItems.map((item, i) => {
      if (i === index) {
        const newItem = { ...item }; // Create a new object for the item
        if (volume + newItem?.item?.volume <= 20) {
          newItem.quant += 1; // Increment the quantity
        }
        return newItem;
      }
      return item;
    });

    setVolume(calculateTotalVolume(updatedItems));
    updateSelectedItems(updatedItems); // Dispatching the updated list
  };

  const handleNoteChange = (e) => {
    const updatedNote = e.target.value;
    // setNote(updatedNote);
    dispatch(updateSpecificNote(updatedNote)); // Dispatch the updated note
  };

  // Handle decrementing item quantity
  const handleDecrement = (index) => {
    const updatedItems = commandItems
      .map((item, i) => {
        if (i === index) {
          const newItem = { ...item }; // Create a new object for the item
          newItem.quant -= 1; // Decrement the quantity

          if (newItem.quant < 1) {
            return null; // Remove the item if quantity becomes less than 1
          }
          return newItem;
        }
        return item;
      })
      .filter((item) => item !== null); // Filter out null items (those that were removed)

    setVolume(calculateTotalVolume(updatedItems));
    updateSelectedItems(updatedItems); // Dispatching the updated list
  };

  // Handle moving to the next step
  const handleNextStep = (e) => {
    e.stopPropagation();
    if (volume > 20) {
      alert("Volume Max 20 mètre cube");
    } else if (commandItems.length) {
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert("Sélectionner des objets");
    }
  };

  return (
    <StepContainerLayout dir="auto">
      <StepContainerHeader directionflesh={i18n.language === "ar-AR"}>
        <StepContainerHeaderTitle
          selected={true}
          directionflesh={i18n.language === "ar-AR"}
        >
          <img src={previousFleshIcon} onClick={(e) => {e.stopPropagation() ;setStep(2)}} alt="flesh" />
          {t("Step3.objets")}
        </StepContainerHeaderTitle>
        {isResponsive && (
          <StepContainerHeaderTitle selected={true}>
            <img
              className={minimizeWindow ? "up-flesh" : "down-flesh"}
              src={downFlesh}
              onClick={(e) =>{e.stopPropagation(); setMinimizeWindow(!minimizeWindow)}}
              alt="minimize"
            />
          </StepContainerHeaderTitle>
        )}
      </StepContainerHeader>
      {!minimizeWindow ? (
        <StepContainerBody>
          {/* ComboBox for selecting items */}
          <ComboBox
            volume={volume}
            objects={objects}
            setSelectedItems={updateSelectedItems} // Update items with dispatch
            selectedItems={selectedItems}
          />
          {commandItems?.length !== 0 && (
            <ItemsBox>
              {commandItems.map((item, index) => (
                <AccesBlocConatiner key={index} style={{ padding: 12 }}>
                  <h4 style={{ fontWeight: 500, textTransform: "capitalize" }}>
                    {item?.item?.name}
                  </h4>
                  <CountComponent
                    value={item?.quant}
                    onIncrement={() => handleIncrement(index)}
                    onDecrement={() => handleDecrement(index)}
                  />
                </AccesBlocConatiner>
              ))}
            </ItemsBox>
          )}
          {/* {commandItems.length > 0 ? ( */}
          <>
            <h3 style={{ color: "black" }}>{t("Step3.remarque")}</h3>
            <NoteArea
              ref={remarqueRef}
              rows={4}
              placeholder={t("Step3.textarea")}
              defaultValue={command?.SpecificNote} 
              onChange={handleNoteChange} 
            />
          </>
          {/* ) : ( */}
          {/* <WarningMessage
            icon={<StyledIcon src={WarningIcon} alt="warningIcon" />}
            description={t("Step3.desc")}
          /> */}
          {/* )} */}
          {commandItems.length > 0 && (
            <StepContainerButton onClick={handleNextStep}>
              {t("Step3.obtenir")}
            </StepContainerButton>
          )}
        </StepContainerBody>
      ) : (
        <StepContainerBody>
          <h4 style={{ color: "black" }}>{t("Step1.detail")}</h4>
        </StepContainerBody>
      )}
    </StepContainerLayout>
  );
};

export default Step3;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .mainImg {
    width: 15vw;
    @media (max-width: 1150px) {
      width: 40vw;
    }
  }
  .finalBtn {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    @media (max-width: 1150px) {
      margin: 20px;
      width: 90%;
    }
  }

  .nextButton {
    background: #f37a1d;

    padding: 12px 24px 12px 24px;
    border-radius: 12px;
    border: 1px;
    gap: 8px;
    width: 10vw;
    height: 7vh;
    font-size: 1vw;
    font-weight: 600;

    box-shadow: 0px 4.410621643066406px 13.231865882873535px 0px #0000001f;
    @media (max-width: 1150px) {
      width: 60%;
      font-size: 4vw;
    }
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  width: 60%;
  margin-top: 2%;

  align-items: center;
  @media (max-width: 1150px) {
    width: 85%;
  }
  .title {
    font-size: 1.4rem;
    font-weight: 500;
    @media (max-width: 1150px) {
      font-size: 0.8rem;
    }
  }

  .detais {
    font-size: 16px;
    font-weight: 400;
    @media (max-width: 1150px) {
      font-size: 12px;
    }
  }
  .imgD {
    width: 2vw;
    margin-right: 2vw;
    @media (max-width: 1150px) {
      width: 10vw;
      margin-right: 4vw;
    }
  }
`;

const ItemsBox = styled.div`
  max-height: 200px;
  overflow: scroll;
  // z-index:9999999999999999;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoteArea = styled.textarea`
  border: 2px solid #66666633;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  padding: 10px;
  width: 100%;
  margin: auto;
  &::placeholder {
    font-size: 12px;
  }
`;

{
  /* <Container>
      <img className="mainImg" src={MainImage} />
      <BoxContainer>
        <img className="imgD" src={timerImg} />
        <div className="textBox">
          <p className="title">Emplacement de ramassage sélectionné</p>
          <span className="detais">
            {command.data.departDate} à {command.data.deparTime}
          </span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={location} />
        <div>
          <p className="title">Adresse de ramassage</p>
          <span className="detais">{command.data.pickUpAddress.Address}</span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={location2} />
        <div>
          <p className="title">Adresse de dépôt</p>
          <span className="detais">{command.data.dropOfAddress.Address}</span>
        </div>
      </BoxContainer>

      <BoxContainer>
        <img className="imgD" src={box} />
        <div className="subCont">
          <p className="title">Mes articles</p>
          <span className="detais">
            {command.data.items.map((item) => (
              <span className="detais">
                {item.quant}*{item.item.name}
              </span>
            ))}
          </span>
        </div>
      </BoxContainer>
      <BoxContainer>
        <img className="imgD" src={layer} />
        <div>
          <p className="title">Accès</p>
          <span className="detais">
            {command.data.pickUpAcces.options} ,{" "}
            {command.data.pickUpAcces.floor} étage
          </span>
        </div>
      </BoxContainer>

      <div className="finalBtn">
        <button
          className="nextButton"
          onClick={() => (userLoggedIn ? setStep(5) : setStep(4))}
        >
          Suivant
        </button>
      </div>
    </Container> */
}

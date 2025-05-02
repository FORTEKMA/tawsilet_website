import React, { useEffect, useState } from "react";
import { AccesBlocConatiner, ButtonContainer } from "..";
import ComboBox from "../items/DataList";
import CountComponent from "../items/CountComponent";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";

const ObjetEditCard = ({
  command,
  setCommand,
  setShow,
  setPing,
  ping,
  setStep,
}) => {
  const [t, i18n] = useTranslation();

  const objects = useSelector((store) => store?.objects?.objects);
  const [selectedItems, setSelectedItems] = useState(command?.items || []);
  const calculateTotalVolume = (items) => {
    return items?.reduce(
      (total, item) => total + item.quant * item.item.volume,
      0
    );
  };

  const [volume, setVolume] = useState(
    calculateTotalVolume(command?.items)
  );

  useEffect(() => {
    setVolume(calculateTotalVolume(selectedItems));
  }, [selectedItems]);

  const handleIncrement = (index) => {
    const updatedSelectedItems = [...selectedItems];
    if (volume <= 20) {
      updatedSelectedItems[index].quant += 1;
      setSelectedItems(updatedSelectedItems);
    } else {
      alert("Volume Max 20 mètre cube");
    }
  };

  const handleDecrement = (index) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index].quant -= 1;

    if (updatedSelectedItems[index].quant <= 0) {
      updatedSelectedItems.splice(index, 1); // Remove item if count becomes 0
    }

    setSelectedItems(updatedSelectedItems);
  };

  const setCommandPromise = (items) =>
    Promise.resolve(
      setCommand({
        ...command,
        data: {
          ...command.data,
          items: items,
        },
      })
    );

  const handleNextStep = () => {
    setCommandPromise(selectedItems).then(
      () => selectedItems?.length && setStep(4)
    );
    // .catch(() => alert("selectionner des objets"));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transform: "scale(0.8)",
      }}
    >
      {" "}
      <ComboBox
        volume={volume}
        objects={objects}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
      />
      {selectedItems?.length !== 0 && (
        <ItemsBox>
          {selectedItems?.map((item, index) => (
            <AccesBlocConatiner style={{ padding: 12 }}>
              <h3>{item?.item?.name}</h3>
              <CountComponent
                // placeholder="RDC"
                value={item?.quant}
                onIncrement={() => handleIncrement(index)}
                onDecrement={() => handleDecrement(index)}
              />
            </AccesBlocConatiner>
          ))}
        </ItemsBox>
      )}
      <ButtonContainer>
        <button
          // onClick={(e) => {
          //   setShow(""), e.stopPropagation();
          // }}
          className="white-btn btn"
        >
          {t("Step4.annuler")}
        </button>

        <button
          className="orange-btn btn"
          onClick={() => {
            handleNextStep();
            setPing(!ping);
            setShow("");
          }}
        >
          {t("Step4.confirmer")}
        </button>
      </ButtonContainer>
    </div>
  );
};

export default ObjetEditCard;

const ItemsBox = styled.div`
  max-height: 200px;
  overflow: scroll;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

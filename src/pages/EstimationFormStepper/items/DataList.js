import React, { useState } from "react";
import styled from "styled-components";
import cube from "../../../assets/icons/3dcube.svg";
import { useTranslation } from "react-i18next";
import { AutoComplete, Dropdown } from "antd";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  .combo-popup {
    background-color: red !important;
    border: 1px solid green !important;
  }
`;
const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  background-image: url(${cube});
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: ${(props) =>
    props.directionCube ? "right 2% center " : "10px center"};
  padding-right: ${(props) => (props.directionCube === true ? "40px" : "none")};
  padding-left: ${(props) => (props.directionCube === false ? "40px" : "none")};

  ::placeholder {
    color: #999;
  }
`;

const DropDownItem = styled.div`
  // background-color: #ff0000;
  border-radius: 8;
  padding: 8;
  // z-index: 999999999999999 !important;
`;

const DropdownList = styled.datalist`
  /* Style the dropdown items */
  option {
    color: #333;
    padding: 5px;
  }
`;

const DataList = ({ objects, setSelectedItems, selectedItems, volume = 0 }) => {
  const { t, i18n } = useTranslation();
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

  const [inputError, setInputError] = useState(false);
  // console.log(objects, "error");
  // console.log(autoCompleteValue, "value");

  const handleAutoCompleteChange = (value) => {
    setAutoCompleteValue(value);

    // Check if the entered value exists in autoCompleteOptions
    const valueMatches = autoCompleteOptions.some((option) => {
      return option.label.toUpperCase().includes(value.toUpperCase());
    });

    setInputError(!valueMatches); // Set inputError to true if value doesn't exist
  };

  const handleAutoCompleteSelect = (value, option) => {
    setAutoCompleteValue(value);
    handleInputChange({ target: { value } });
  };
  const handleInputChange = (event) => {
    setInputError(false);
    const selectedValue = event.target.value;
    const selectedItem = objects?.find((item) => {
      return item?.documentId === selectedValue;
    });

    if (volume + selectedItem?.objet?.volume <= 20) {
      if (selectedItem) {
        const existingItemIndex = selectedItems.findIndex(
          (item) => item?.item?.reference === selectedItem?.objet?.id
        );

        if (existingItemIndex !== -1) {
          // Item exists, increment its quant by 1
          let updatedSelectedItems = [...selectedItems];
          let itemToUpdate = { ...updatedSelectedItems[existingItemIndex] }; // Create a shallow copy of the object
          itemToUpdate.quant += 1; // Update the mutable copy
          updatedSelectedItems[existingItemIndex] = itemToUpdate; // Replace the original object with the updated copy
          setSelectedItems(updatedSelectedItems);
        } else {
          // Item doesn't exist, add it with quant 1
          setSelectedItems([
            ...selectedItems,
            {
              quant: 1,
              item: {
                reference: selectedItem?.objet?.id,
                volume: selectedItem?.objet?.volume,
                name: selectedItem?.objet?.name,
                category: selectedItem?.objet?.category,
                weight: selectedItem?.objet?.weight,
              },
            },
          ]);
        }

        setAutoCompleteValue(""); // Clear the input value
      }
    } else {
      event.target.value = "";
      alert("Volume Max 20 metre cube");
    }
  };
  const autoCompleteOptions = objects?.map((item) => ({
    value: item.documentId,
    label: `${item.objet.name} (${item.objet.volume})m³`,
  }));

  //
  return (
    <Container directionCube={i18n.language === "ar-AR"}>
      <AutoComplete
        style={{
          zIndex: 999999999999999,
          width: "100%",
          borderColor: inputError ? "red" : "#ccc",
          fontSize: "16px",
        }}
        dropdownRender={(menu) => <DropDownItem>{menu}</DropDownItem>}
        popupClassName="combo-popup"
        options={autoCompleteOptions}
        value={autoCompleteValue}
        onChange={handleAutoCompleteChange}
        onSelect={handleAutoCompleteSelect}
        placeholder={t("Step3.ex")}
        filterOption={(inputValue, option) =>
          option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        status={inputError ? "error" : undefined}
      />
      {inputError && (
        <ErrorMessage>Object n'existe pas dans la liste</ErrorMessage>
      )}
    </Container>
  );
};

export default DataList;

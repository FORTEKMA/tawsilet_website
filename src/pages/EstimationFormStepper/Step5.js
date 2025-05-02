import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../redux/ordersSlice/OrderSlice";
import { t } from "i18next";
import {
  StepContainerBody,
  StepContainerButton,
  StepContainerHeader,
  StepContainerHeaderTitle,
  StepContainerLayout,
} from ".";
import { useTranslation } from "react-i18next";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router";
import i18n from "../../i18n";

import Visa from "../../assets/icons/visa.svg";
import Mastercard from "../../assets/icons/Mastercard.svg";
import { Spin } from "antd";
import { sendNotification } from "../../redux/notifications/notificationSlice";
import { clearCommand } from "../../redux/newCommand/newCommandSlice";

const RadioContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 30px;
`;

const RadioLabel = styled.label`
  cursor: pointer;
  display: flex;
  gap: 20px;
  position: relative;
  padding-left: 35px;
  padding-left: ${(props) => (props.directionRadio === true ? "35px" : "none")};
  padding-left: ${(props) =>
    props.directionRadio === false ? "35px" : "none"};
`;

const RadioInput = styled.input`
  border: 1px solid red;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  margin-right: 5px;

  &:checked + ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid #f37a1d; /* Outer circle color */
    box-sizing: border-box;
  }

  &:checked + ::after {
    content: "";
    position: absolute;
    left: 6px; /* Adjust the positioning of the inner circle */
    top: 6px; /* Adjust the positioning of the inner circle */
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f37a1d; /* Inner circle color */
  }
  &:not(:checked) + ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    /* background-color: transparent; */
    border: 2px solid rgba(220, 220, 220, 0.8); /* Default outer circle color */
    box-sizing: border-box;
  }

  &:not(:checked) + ::after {
    content: "";
    position: absolute;
    left: 6px; /* Adjust the positioning of the inner circle */
    top: 6px; /* Adjust the positioning of the inner circle */
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(220, 220, 220, 0.8); /* Default inner circle color */
  }
`;

const RadioButton = ({ options, selectedOption, handleOptionChange }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RadioContainer>
      {options?.map((option, i) => (
        <RadioLabel key={option?.value}>
          <RadioInput
            type="radio"
            value={option?.value}
            disabled={i === 1}
            // defaultChecked={options[0].value}
            checked={selectedOption === option?.value}
            onChange={handleOptionChange}
          />

          <div>
            <div style={{ display: "flex", gap: 10 }}>
              <h4 style={{ marginRight: 10, color: "black" }}>
                {option?.label}
              </h4>
              {i === 1 && (
                <>
                  <img src={Visa} width={20} alt="visa" />
                  <img src={Mastercard} width={34} alt="mastercard" />
                </>
              )}
            </div>

            <span style={{ color: "gray", fontSize: 14 }}>
              {option?.description}
            </span>
          </div>
        </RadioLabel>
      ))}
    </RadioContainer>
  );
};

const Step5 = ({ setStep }) => {
  const { t, i18n } = useTranslation();
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const command = useSelector((store) => store?.newCommand?.command);
  const dispatch = useDispatch();
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  // const [finalOrder, setFinalOrder] = useState(command);
  let loading = useSelector((state) => state?.orders?.isLoading);
  // const finish = (finalOrder) => {
  //   dispatch(createNewOrder(finalOrder));
  //   setOpen(true);
  // };

  // const ordred = (finalOrder) => {
  //   if (finalOrder?.payType === null) {
  //     alert(t("Step5.alert1"));
  //   } else if (isChecked === false) {
  //     alert(t("Step5.alert2"));
  //   } else {
  //     finish(finalOrder);
  //   }
  // };
  const navigate = useNavigate();
  const createOrder = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dispatch(
          createNewOrder({
            data: {
              ...command,
              client_id: currentUser?.documentId,
              payType: selectedOption,
              // testItems: command.data.items,
            },
          })
        );
        resolve(result);
      } catch (error) {
        reject(
          new Error(
            "Une erreur s'est produite lors du traitement de votre demande."
          )
        );
      }
    });
  };

  const handleNextStep = async () => {
    const jwt = localStorage.getItem("token");
    setIsContinueClicked(true);

    if (jwt) {
      if (selectedOption === "Livraison") {
        try {
          setIsLoading(true);
          createOrder()
            .then(async (result) => {
              // dispatch(
              //   sendNotification({
              //     id: 227,
              //     title: "Nouvelle commande",
              //     sendFrom: {
              //       id: currentUser?.id,
              //       name: currentUser?.accountOverview[0]?.firstName,
              //     },
              //     command: result?.payload?.id,
              //     notification_type: "created",
              //     types: ["notification"],
              //     smsCore: `${currentUser?.accountOverview[0]?.firstName} a passé une commande N°: ${result?.payload?.attributes?.refNumber}`,
              //     notificationCore: `${currentUser?.accountOverview[0]?.firstName} a passé une commande N°: ${result?.payload?.attributes?.refNumber}`,
              //     saveNotification: true,
              //     template_id: "d-8b266aac7fd64f73bab6ee0c80df8dbd",
              //     dynamicTemplateData: {
              //       commandeid: result?.id,
              //     },
              //   })
              // );

              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div
                      className="custom-ui"
                      style={{
                        zIndex: "99999999999999 !important",
                        gap: "10px",
                      }}
                    >
                      <h1>{t("Step5.Succès")}</h1>
                      <p>{t("Step5.description")}</p>
                      <button
                        style={{
                          padding: "10px 30px",
                          backgroundColor: "#f37a1d",
                          borderRadius: 12,
                          marginTop: 20,
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          onClose();
                          setTimeout(() => {
                            setIsLoading(false);
                            dispatch(clearCommand());
                            localStorage.removeItem("command");
                            setStep(1);
                            navigate("/ClientProfile/history");
                          }, 600);
                        }}
                      >
                        {t("Step5.OK")}
                      </button>
                    </div>
                  );
                },
              });
            })
            .catch((error) => {
              // Erreur
              console.error(
                "Erreur lors de la création de la commande :",
                error.message
              );
            });
        } catch (error) {
          alert(error.message);
        }
      } else {
        setIsLoading(true);
        createOrder().then(
          (result) => {
            setIsLoading(false);
          }
          //   dispatch(
          //     sendNotification({
          //       id: 227,
          //       title: "Nouvelle commande",
          //       sendFrom: {
          //         id: currentUser?.id,
          //         name: currentUser?.accountOverview[0]?.firstName,
          //       },
          //       command: result?.payload?.id,
          //       notification_type: "created",
          //       types: ["notification"],
          //       smsCore: `${currentUser?.accountOverview[0]?.firstName} a passé une commande N°: ${result?.payload?.attributes?.refNumber}`,
          //       notificationCore: `${currentUser?.accountOverview[0]?.firstName} a passé une commande N°: ${result?.payload?.attributes?.refNumber}`,
          //       saveNotification: true,
          //       template_id: "d-8b266aac7fd64f73bab6ee0c80df8dbd",
          //       dynamicTemplateData: {
          //         commandeid: result?.id,
          //       },
          //     })
          //   )
        );
      }
    } else {
      setStep(4);
    }
  };

  // useEffect(() => {
  //   setFinalOrder({
  //     data: {
  //       ...finalOrder.data,
  //       client_id: currentUser?.id,
  //     },
  //   });
  // }, []);

  const options = [
    {
      label: t("Step5.PayerL"),
      value: "Livraison",
      description: t("Step5.PayerLD"),
    },
    {
      label: t("Step5.PayerC"),
      value: "Credit",
      description: t("Step5.PayerCD"),
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]?.value);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <StepContainerLayout>
      <StepContainerHeader
        directionflesh={i18n.language === "ar-AR"}
        dir="auto"
      >
        {i18n.language === "ar-AR" ? (
          <StepContainerHeaderTitle selected={true} directionflesh={true}>
            <img
              src={previousFleshIcon}
              onClick={!isContinueClicked ? () => setStep(3) : undefined}
              alt="flesh"
              style={{
                cursor: isContinueClicked ? "not-allowed" : "pointer",
                opacity: isContinueClicked ? 0.5 : 1,
              }}
            />
            {t("Step5.Payement")}
          </StepContainerHeaderTitle>
        ) : (
          <StepContainerHeaderTitle selected={true} directionflesh={false}>
            <img
              src={previousFleshIcon}
              onClick={!isContinueClicked ? () => setStep(3) : undefined}
              alt="flesh"
              style={{
                cursor: isContinueClicked ? "not-allowed" : "pointer",
                opacity: isContinueClicked ? 0.5 : 1,
              }}
            />
            {t("Step5.Payement")}
          </StepContainerHeaderTitle>
        )}
      </StepContainerHeader>
      <StepContainerBody gap="20px" dir="auto">
        <RadioButton
          options={options}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />

        <StepContainerButton
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          disabled={isLoading}
          onClick={(e) => {
            handleNextStep();
            e.preventDefault();
          }}
        >
          {loading ? (
            <>
              <Spin /> {t("Step5.confPayement")}
            </>
          ) : (
            t("Step5.confPayement")
          )}
        </StepContainerButton>
      </StepContainerBody>
    </StepContainerLayout>
  );
};
export default Step5;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .mainImg {
    width: 10vw;
    @media (max-width: 1150px) {
      width: 30vw;
    }
  }
`;

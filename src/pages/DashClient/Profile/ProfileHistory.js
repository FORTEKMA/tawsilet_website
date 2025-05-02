import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Items/Pagination";
import moment from "moment";
import { notification } from "antd";
import { DatePicker, InputNumber, Modal, Select } from "antd";
import ModalProfileHistory from "./ModalProfileHistory";
import { useTranslation } from "react-i18next";
import {
  getOrderById,
  updateReservation,
} from "../../../redux/ordersSlice/OrderSlice";
import { sendNotification } from "../../../redux/notifications/notificationSlice";
import axios from "axios";
import Survey from "../../EstimationFormStepper/section/Enqeute";
const { Option } = Select;
import { useNavigate } from "react-router";
const ProfileHistory = ({ }) => {
  const navigate = useNavigate();
  const [ping, setPing] = useState(false);
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const [newDate, setNewDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState(1);
  const onPageChange = (index) => {
    setActivePage(index);
  };
  const orders = useSelector((store) => store?.orders?.orders?.data);
  const pagination = useSelector(
    (store) => store?.orders?.orders?.meta?.pagination
  );
  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (e) => {
    const selectedPageSize = parseInt(e.target.value);
    setPageSize(selectedPageSize);
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [text, setText] = useState("");
  const [showEnqeuteModal, setShowEnqeuteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    dispatch(
      getOrderById({
        id: currentUser,
        text: value, // Pass the search text
      })
    );
  };
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      currentUser &&
        dispatch(
          getOrderById({
            id: currentUser?.id,
            currentPage: activePage,
            pageSize: pageSize,
            text: text,
          })
        );
    }
  }, [currentUser, activePage, ping, text]);

  useEffect(() => {
    currentUser &&
      dispatch(
        getOrderById({
          id: currentUser?.id,
          currentPage: 1,
          pageSize: pageSize,
        })
      );
  }, [pageSize]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${process.env.REACT_APP_DOMAIN_URL}/api/enquetes?filters[client][id][$eq]=${currentUser?.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res?.data?.data?.length === 0) {
          setShowEnqeuteModal(true);
        }
      });
  }, []);

  const filteredOrders = orders?.filter(
    (order) =>
      order?.refNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      order?.commandStatus?.toLowerCase().includes(searchText.toLowerCase())
  );

  const [editTime, setEditTime] = useState(true);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Dispatched_to_partner":
        return "rgb(241 197 116)";

      case "Assigned_to_driver":
        return "#FFFACD"; // Pastel Yellow
      case "Assigned_to_driver":
        return "#FFFACD"; // Pastel Yellow
      case "Driver_on_route_to_pickup":
        return "#D8BFD8"; // Pastel Lavender
      case "Arrived_at_pickup":
        return "#98FB98"; // Pastel Mint Green
      case "Picked_up":
        return "#a7c6f4"; // Pastel Aqua
      case "On_route_to_delivery":
        return "#FFDAB9"; // Pastel Peach
      case "Arrived_at_delivery":
        return "#a7c6f4"; // Pastel Powder Blue
      case "Delivered":
        return "rgb(245 202 244)"; // Pastel Pink
      case "Completed":
        return "#C1E1C1"; // Pastel Sage Green
      case "Failed_pickup":
        return "rgb(247 168 166)"; // Pastel Coral
      case "Failed_delivery":
        return "rgb(247 168 166)"; // Pastel Light Pink
      case "Canceled_by_partner":
        return "rgb(235 89 89)";
      case "Canceled_by_client":
        return "rgb(235 89 89)"; // Pastel Light Salmon
      default:
        return "#D3D3D3"; // Pastel Gray
    }
  };

  const StatusMessage = (status) => {
    const statusColor = getStatusBadgeColor(status);
    const statusText = t(
      `ClientProfile.Commande.status.${status.toLowerCase()}`
    );

    return (
      <span
        style={{
          backgroundColor: statusColor,
          fontWeight: "bold",
          color: "black",
          padding: "6px",
          borderRadius: "6px",
        }}
      >
        {statusText}
      </span>
    );
  };

  const StatusFilter = (status) => {
    const lowerCaseStatus = status.toLowerCase();

    if (lowerCaseStatus.includes("attente")) {
      return "Pending";
    } else if (
      lowerCaseStatus.includes("annuler") ||
      lowerCaseStatus.includes("canceled")
    ) {
      return lowerCaseStatus.includes("client")
        ? "Canceled_by_client"
        : "Canceled_by_partner";
    } else if (lowerCaseStatus.includes("assigner")) {
      return "Dispatched_to_partner";
    } else if (
      lowerCaseStatus.includes("conducteur") ||
      lowerCaseStatus.includes("driver")
    ) {
      return "Assigned_to_driver";
    } else if (
      lowerCaseStatus.includes("route") &&
      lowerCaseStatus.includes("pickup")
    ) {
      return "Driver_on_route_to_pickup";
    } else if (
      lowerCaseStatus.includes("arrive") &&
      lowerCaseStatus.includes("pickup")
    ) {
      return "Arrived_at_pickup";
    } else if (
      lowerCaseStatus.includes("ramasser") ||
      lowerCaseStatus.includes("picked")
    ) {
      return "Picked_up";
    } else if (
      lowerCaseStatus.includes("route") &&
      lowerCaseStatus.includes("delivery")
    ) {
      return "On_route_to_delivery";
    } else if (
      lowerCaseStatus.includes("arrive") &&
      lowerCaseStatus.includes("delivery")
    ) {
      return "Arrived_at_delivery";
    } else if (
      lowerCaseStatus.includes("livrer") ||
      lowerCaseStatus.includes("delivered")
    ) {
      return "Delivered";
    } else if (
      lowerCaseStatus.includes("fermer") ||
      lowerCaseStatus.includes("completed")
    ) {
      return "Completed";
    } else if (
      lowerCaseStatus.includes("echec") &&
      lowerCaseStatus.includes("pickup")
    ) {
      return "Failed_pickup";
    } else if (
      lowerCaseStatus.includes("echec") &&
      lowerCaseStatus.includes("delivery")
    ) {
      return "Failed_delivery";
    } else {
      return status;
    }
  };

  const [selectedReason, setSelectedReason] = useState("");
  const selectedReasonRef = useRef("");

  const reasons = [
    t("annuler.raison1"), // "Changement d'avis"
    t("annuler.raison2"), // "J'ai trouvé un meilleur prix ailleurs"
    t("annuler.raison3"), // "Délai de livraison trop long"
    t("annuler.raison4"), // "Commande passée par erreur"
    t("annuler.raison5"), // "Problème de paiement"
    t("annuler.raison6"), // "Service client insatisfaisant"
    t("annuler.raison7"), // "Autre raison"
  ];

  const handleStatus = (order) => {
    if (order?.commandStatus !== "Canceled_by_client") {
      Modal.confirm({
        title: t("annuler.titre"),
        content: (
          <div>
            <p>{t("annuler.confirmation")}</p>
            <Select
              placeholder={t("annuler.raisonPlaceholder")}
              style={{ width: "100%", marginTop: "10px" }}
              onChange={(value) => {
                setSelectedReason(value);
                selectedReasonRef.current = value;
              }}
            >
              {reasons?.map((reason, index) => (
                <Option key={index} value={reason}>
                  {reason}
                </Option>
              ))}
            </Select>
          </div>
        ),
        cancelText: t("annuler.non"), // "Non"
        okText: t("annuler.oui"),
        className: "custom-modal",
        okButtonProps: {
          style: {
            backgroundColor: "#18365a",
            borderColor: "#18365a",
            color: "#FFFFFF",
          },
        },
        cancelButtonProps: {
          style: {
            backgroundColor: "#f37a1d",
            borderColor: "#f37a1d",
            color: "#FFFFFF",
          },
        },
        onOk() {
          const reason = selectedReasonRef.current;

          if (!reason) {
            Modal.error({
              title: t("annuler.erreur"), // "Erreur"
              content: t("annuler.echec1"),
            });
            return Promise.reject();
          }
          dispatch(
            updateReservation({
              id: order?.documentId,
              body: {
                data: {
                  commandStatus: "Canceled_by_client",
                  cancelReason: reason, // Use the reason from the ref
                },
              },
            })
          ).then((result) => {
            dispatch(
              sendNotification({
                id: 227,
                title: "mise à jour commande",
                sendFrom: {
                  id: currentUser?.id,
                  name: currentUser?.firstName,
                },
                command: result?.payload?.data?.id,
                notification_type: "updated",
                types: ["notification", "sms", "email"],
                smsCore: `${currentUser?.firstName} a annulé une commande N°: ${result?.payload?.data?.refNumber}. Raison : ${reason}`,
                notificationCore: `${currentUser?.firstName} a annulé une commande N°: ${result?.payload?.data?.refNumber}. Raison : ${reason}`,
                saveNotification: true,
                template_id: "d-8b266aac7fd64f73bab6ee0c80df8dbd",
                dynamicTemplateData: {
                  commandeid: result?.data?.id,
                },
              })
            );
            setPing(!ping);
          });
        },
        onCancel() {
          setSelectedReason("");
          selectedReasonRef.current = "";
        },
      });
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date;
      setNewDate(formattedDate);
    }
  };

  const changeDate = (order) => {
    setShowModal2(true);
    setSelectedOrder(order);
  };

  let calculeTime = ({ date, time, order }) => {
    const currentTime = new Date();
    const departDate = new Date(date);
    const deparTimeStr = time;
    const [hours, minutes, seconds] = deparTimeStr.split(":").map(Number);
    const deparTime = new Date(
      departDate.getFullYear(),
      departDate.getMonth(),
      departDate.getDate(),
      hours,
      minutes,
      seconds
    );

    const timeDifference = deparTime - currentTime;
    const isCanceled = order?.commandStatus === "Canceled_by_client";
    const oneHourInMilliseconds = 60 * 60 * 1000;

    if (
      timeDifference > oneHourInMilliseconds &&
      ["Pending", "Dispatched_to_partner"].includes(order?.commandStatus)
    ) {
      return (
        <StyledTableCell
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <i
            onClick={() => handleStatus(order)}
            style={{
              color: isCanceled ? "#b1b0b063" : "#FFFFFF",
            }}
            class="fa-solid fa-ban"
            title={
              isCanceled
                ? "Cette commande a été annulée"
                : "Vous pouvez maintenant annuler votre commande jusqu'à une heure avant le départ"
            }
          ></i>
        </StyledTableCell>
      );
    } else {
      return (
        <StyledTableCell
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <i
            onClick={() => {
              setShowModal(true);
              setSelectedOrder(order);
            }}
            class="fa-solid fa-eye"
            title={"Vous ne pouvez plus éditer cette commande"}
            style={{
              color: "white",
              fontSize: "16px",
            }}
          ></i>
          <i
            class="fa-solid fa-ban"
            title={"Vous ne pouvez plus annuler cette commande"}
            style={{
              color: "#b1b0b063",
            }}
          ></i>
        </StyledTableCell>
      );
    }
  };

  const handleUpdateDate = () => {
    if (!newDate || !selectedHour || !selectedMinute) {
      notification.error({
        duration: 1.5,
        placement: "bottomLeft",
        message: "Erreur",
        description: "Merci de remplir les champs avant la confirmation .",
      });
      return;
    }

    dispatch(
      updateReservation({
        id: selectedOrder.id,
        body: {
          ...selectedOrder,
          data: {
            ...selectedOrder?.data,
            departDate: newDate,
            departTime: `${selectedHour}:${selectedMinute}:00.000`,
          },
        },
      })
    ).then((result) => {
      // dispatch(
      //   sendNotification({
      //     id: 227,
      //     title: "mise à jour commande",
      //     sendFrom: {
      //       id: currentUser?.id,
      //       name: currentUser?.accountOverview[0]?.firstName,
      //     },
      //     command: result?.payload?.data?.id,
      //     notification_type: "updated",
      //     types: ["notification", "sms", "email"],
      //     smsCore: `${currentUser?.firstName} a changer la date de commande N°: ${result?.payload?.data?.refNumber}`,
      //     notificationCore: `${currentUser?.firstName} a changer la date de commande N°: ${result?.payload?.data?.refNumber}`,
      //     saveNotification: true,
      //     template_id: "d-8b266aac7fd64f73bab6ee0c80df8dbd",
      //     dynamicTemplateData: {
      //       commandeid: result?.data?.id,
      //     },
      //   })
      // );
      setPing(!ping);
      setShowModal2(false);
    });
  };

  return (
    <>
      {showModal2 && selectedOrder && (
        <Modal
          title="Changer le date de départ"
          visible={showModal2}
          onCancel={() => setShowModal2(false)}
          onOk={() => handleUpdateDate()}
          okText="Confirmer"
          cancelText="Annuler"
        >
          <div className="chnage_date_modal">
            <div className="chnage_date_modal_item">
              <p>Date :</p>
              <DatePicker
                value={newDate}
                onChange={handleDateChange}
                disabledDate={(current) =>
                  current && current <= moment().add(1, "hour")
                }
              />
            </div>
            <div className="chnage_date_modal_item">
              <p>Heure :</p>
              <Select
                style={{ width: "100%" }}
                value={selectedHour}
                onChange={(value) => setSelectedHour(value)}
              >
                {Array.from({ length: 13 }, (_, index) => {
                  const hourValue = (index + 7).toString().padStart(2, "0");
                  return (
                    <Select.Option key={hourValue} value={hourValue}>
                      {hourValue}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>

            <div className="chnage_date_modal_item">
              <p>Minutes :</p>
              <Select
                style={{ width: "100%" }}
                value={selectedMinute}
                onChange={(value) => setSelectedMinute(value)}
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <Select.Option
                    key={minute}
                    value={minute.toString().padStart(2, "0")}
                  >
                    {minute.toString().padStart(2, "0")}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Modal>
      )}
      
      {showModal && (
        
        <ModalProfileHistory
          showModal={showModal}
          setShowModal={setShowModal}
          selectedOrder={selectedOrder}
          currentUser={currentUser}
        />
      )}
      <ProfileHistoryConatiner dir="auto">
        <ProfileHistoryHeader>
          {/* <div className="p-4 bg-white rounded-lg shadow-md">
     

   
      <ul className="mt-4">
        {orders?.map((order) => (
          <li key={order?.id} className="p-2 border-b">
            {order?.refNumber} - {order?.commandStatus}
          </li>
        ))}
      </ul>
    </div> */}
          <SearchBox>
            {/* <Input
              onChange={(e) => setText(StatusFilter(e.target.value))}
              placeholder={t("ClientProfile.Rechercher")}
            ></Input> */}
            <Input
              placeholder={t("ClientProfile.Rechercher")}
              value={searchText}
              onChange={handleSearch}
            />
          </SearchBox>
          <RightBox>
            <Button>
              <Link to="/estimation">
                <span>+</span> {t("ClientProfile.Réservation")}
              </Link>{" "}
            </Button>
          </RightBox>
        </ProfileHistoryHeader>
        <div style={{ width: "100vw", overflow: "hidden" }}>
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>
                  {t("ClientProfile.ProfileHistory.tab.ID")}
                </StyledTableHeader>
                <StyledTableHeader>
                  {t("ClientProfile.ProfileHistory.tab.code")}
                </StyledTableHeader>
                <StyledTableHeader>
                  {t("ClientProfile.ProfileHistory.tab.date")}
                </StyledTableHeader>
                <StyledTableHeader className="max-width-column">
                  {t("ClientProfile.ProfileHistory.tab.adresseR")}
                </StyledTableHeader>
                <StyledTableHeader className="max-width-column">
                  {t("ClientProfile.ProfileHistory.tab.adresseD")}
                </StyledTableHeader>
                <StyledTableHeader>
                  {" "}
                  {t("ClientProfile.ProfileHistory.tab.status")}
                </StyledTableHeader>
                <StyledTableHeader>
                  {t("ClientProfile.ProfileHistory.tab.Actions")}
                </StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.length > 0 ? (
                filteredOrders?.map((order, index) => (
                  <StyledTableRow key={order?.id} isEvenRow={index % 2 === 0}>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {order?.id}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {order?.refNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {order?.departDate}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {order?.pickUpAddress?.Address}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {order?.dropOfAddress?.Address}
                    </StyledTableCell>
                    <StyledTableCell
                      onClick={() => {
                        setShowModal(true);
                        setSelectedOrder(order);
                      }}
                    >
                      {StatusMessage(order?.commandStatus)}
                    </StyledTableCell>
                    {calculeTime({
                      time: order?.deparTime,
                      date: order?.departDate,
                      order,
                    })}
                  </StyledTableRow>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding: "16px 8px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {t("ClientProfile.passer1ere")}
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
        <ProfileHistoryFooter>
          <LeftFooter>
            <p style={{ color: "white" }}>{t("ClientProfile.ligne")}</p>
            <select
              name="pageSize"
              id=""
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span style={{ color: "white" }}>
              1-10 {t("ClientProfile.of")}
              {pagination?.total}
            </span>
          </LeftFooter>
          <Pagination
            pageCount={pagination?.pageCount}
            current={pagination?.page}
            onPageChange={onPageChange}
          />
        </ProfileHistoryFooter>
        {showEnqeuteModal && (
          <Survey setShowEnqeuteModal={setShowEnqeuteModal} />
        )}
      </ProfileHistoryConatiner>
    </>
  );
};

export default ProfileHistory;

const ProfileHistoryConatiner = styled.div`
  padding: 3vw;
  width: 100%;
  @media (max-width: 1151px) {
    padding: 16px 4px;
    overflow: hidden !important;
    width: 100vw !important;
  }
`;
const StyledTable = styled.table`
  table-layout: auto;
  width: 100%;
  max-width: 75vw;
  min-width: 70vw;
  height: 60vh;
  overflow: scroll;
  border-collapse: collapse;
  display: block;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    color: red;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f37a1d;
  }
  .max-width-column {
    width: 50%;
  }

  @media (max-width: 1151px) {
    display: block;
    width: 100%;
    max-width: 98%;
    overflow: auto;
  }
`;
const StyledTableHeader = styled.th`
  font-size: 14px;
  background-color: #334f71;
  color: white;
  padding: 12px;
  font-weight: bold;
  text-align: left;
  padding: 16px;
`;
const StyledTableRow = styled.tr`
  cursor: pointer;
  background-color: ${(props) => (props.isEvenRow ? "transparent" : "#334f71")};
  text-align: left;
  color: white;
  font-size: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const StyledTableCell = styled.td`
  padding: 16px;
  text-align: left;
`;
const ProfileHistoryHeader = styled.div`
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const SearchBox = styled.div`
  width: 30%;
  box-shadow: -4px 12px 15px -13px #000;
  @media (max-width: 1151px) {
    width: 150px;
  }
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1151px) {
    width: 200px;
    font-size: 12px;
    justify-content: center;
  }
`;
const Input = styled.input`
  border-radius: 30px !important;
  border: none;
  height: 35px;
  width: 100%;
  padding: 8px 40px;
  align-self: "flex-start";
`;
const Button = styled.div`
  width: auto;
  padding: 20px;
  height: 35px;
  border-radius: 12px;
  background: var(--yellow-main-color, #f37a1d);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  gap: 10px;
  border: 2px solid #fff;
  span {
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
const ProfileHistoryFooter = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1151px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const LeftFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0px 20px;
  option {
    height: 20px;
  }
`;
const PaginationNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: #334f71;
    border-radius: 50%;
  }
`;

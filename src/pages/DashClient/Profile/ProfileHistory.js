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
 const { Option } = Select;
import { useNavigate } from "react-router";
const ProfileHistory = () => {
  const navigate = useNavigate();
  const [ping, setPing] = useState(false);
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const [newDate, setNewDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState(1);
  const onPageChange = (index) => setActivePage(index);
  const orders = useSelector((store) => store?.orders?.orders?.data);
  const pagination = useSelector((store) => store?.orders?.orders?.meta?.pagination);
  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (e) => setPageSize(parseInt(e.target.value));
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [text, setText] = useState("");
   const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    dispatch(
      getOrderById({
        id: currentUser,
        text: value,
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
       
      });
  }, []);

  const filteredOrders = orders?.filter(
    (order) =>
      order?.refNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      order?.commandStatus?.toLowerCase().includes(searchText.toLowerCase())
  );

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Dispatched_to_partner":
        return "#d8b56c";
      case "Assigned_to_driver":
        return "#222";
      case "Driver_on_route_to_pickup":
        return "#444";
      case "Arrived_at_pickup":
        return "#333";
      case "Picked_up":
        return "#555";
      case "On_route_to_delivery":
        return "#666";
      case "Arrived_at_delivery":
        return "#777";
      case "Delivered":
        return "#888";
      case "Completed":
        return "#0c0c0c";
      case "Failed_pickup":
      case "Failed_delivery":
        return "#b22222";
      case "Canceled_by_partner":
      case "Canceled_by_client":
        return "#b22222";
      default:
        return "#222";
    }
  };

  const StatusMessage = (status) => {
    const statusColor = getStatusBadgeColor(status);
    const statusText = t(`ClientProfile.Commande.status.${status.toLowerCase()}`);
    return (
      <span
        style={{
          backgroundColor: statusColor,
          fontWeight: "bold",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: 13,
          letterSpacing: 1,
        }}
      >
        {statusText}
      </span>
    );
  };

  const [selectedReason, setSelectedReason] = useState("");
  const selectedReasonRef = useRef("");
  const reasons = [
    t("annuler.raison1"),
    t("annuler.raison2"),
    t("annuler.raison3"),
    t("annuler.raison4"),
    t("annuler.raison5"),
    t("annuler.raison6"),
    t("annuler.raison7"),
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
        cancelText: t("annuler.non"),
        okText: t("annuler.oui"),
        className: "custom-modal",
        okButtonProps: {
          style: {
            backgroundColor: "#0c0c0c",
            borderColor: "#0c0c0c",
            color: "#FFFFFF",
          },
        },
        cancelButtonProps: {
          style: {
            backgroundColor: "#d8b56c",
            borderColor: "#d8b56c",
            color: "#FFFFFF",
          },
        },
        onOk() {
          const reason = selectedReasonRef.current;
          if (!reason) {
            Modal.error({
              title: t("annuler.erreur"),
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
                  cancelReason: reason,
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
            setPing((prev) => !prev);
          });
        },
        onCancel() {
          setSelectedReason("");
          selectedReasonRef.current = "";
        },
      });
    }
  };

  const handleDateChange = (date) => setNewDate(date);
  const changeDate = (order) => {
    setShowModal2(true);
    setSelectedOrder(order);
  };

  const calculeTime = ({ date, time, order }) => {
    const currentTime = new Date();
    const departDate = new Date(date);
    const [hours, minutes, seconds] = time.split(":").map(Number);
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
        <StyledTableCell style={{ textAlign: "center", display: "flex", justifyContent: "space-between" }}>
          <i
            onClick={(e) => { e.stopPropagation(); handleStatus(order); }}
            style={{ color: isCanceled ? "#b1b0b063" : "#fff", cursor: isCanceled ? "not-allowed" : "pointer", fontSize: 18 }}
            className="fa-solid fa-ban"
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
        <StyledTableCell style={{ textAlign: "center", display: "flex", justifyContent: "space-between" }}>
          <i
            onClick={(e) => { e.stopPropagation(); setShowModal(true); setSelectedOrder(order); }}
            className="fa-solid fa-eye"
            title={"Vous ne pouvez plus éditer cette commande"}
            style={{ color: "#fff", fontSize: "18px", cursor: "pointer" }}
          ></i>
          <i
            className="fa-solid fa-ban"
            title={"Vous ne pouvez plus annuler cette commande"}
            style={{ color: "#b1b0b063", fontSize: 18, cursor: "not-allowed" }}
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
    ).then(() => {
      setPing((prev) => !prev);
      setShowModal2(false);
    });
  };

  const handleRowClick = (order) => {
    if (order?.documentId) {
      navigate(`/driver/track/${order.documentId}`);
    }
  };

  return (
    <>
      {showModal2 && selectedOrder && (
        <Modal
          title={<span style={{ color: '#0c0c0c' }}>Changer la date de départ</span>}
          visible={showModal2}
          onCancel={() => setShowModal2(false)}
          onOk={handleUpdateDate}
          okText={<span style={{ color: '#fff' }}>Confirmer</span>}
          cancelText={<span style={{ color: '#0c0c0c' }}>Annuler</span>}
          okButtonProps={{ style: { background: '#0c0c0c', borderColor: '#0c0c0c' } }}
          cancelButtonProps={{ style: { background: '#fff', color: '#0c0c0c', borderColor: '#0c0c0c' } }}
        >
          <div className="chnage_date_modal">
            <div className="chnage_date_modal_item">
              <p style={{ color: '#0c0c0c' }}>Date :</p>
              <DatePicker
                value={newDate}
                onChange={handleDateChange}
                disabledDate={(current) => current && current <= moment().add(1, "hour")}
                style={{ width: '100%' }}
              />
            </div>
            <div className="chnage_date_modal_item">
              <p style={{ color: '#0c0c0c' }}>Heure :</p>
              <Select
                style={{ width: "100%" }}
                value={selectedHour}
                onChange={setSelectedHour}
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
              <p style={{ color: '#0c0c0c' }}>Minutes :</p>
              <Select
                style={{ width: "100%" }}
                value={selectedMinute}
                onChange={setSelectedMinute}
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <Select.Option key={minute} value={minute.toString().padStart(2, "0")}>{minute.toString().padStart(2, "0")}</Select.Option>
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
          <SearchBox>
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
              </Link>
            </Button>
          </RightBox>
        </ProfileHistoryHeader>
        <div style={{ width: "100vw", overflow: "hidden" }}>
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>{t("ClientProfile.ProfileHistory.tab.ID")}</StyledTableHeader>
                <StyledTableHeader>{t("ClientProfile.ProfileHistory.tab.code")}</StyledTableHeader>
                <StyledTableHeader>{t("ClientProfile.ProfileHistory.tab.date")}</StyledTableHeader>
                <StyledTableHeader className="max-width-column">{t("ClientProfile.ProfileHistory.tab.adresseR")}</StyledTableHeader>
                <StyledTableHeader className="max-width-column">{t("ClientProfile.ProfileHistory.tab.adresseD")}</StyledTableHeader>
                <StyledTableHeader>{t("ClientProfile.ProfileHistory.tab.status")}</StyledTableHeader>
                <StyledTableHeader>{t("ClientProfile.ProfileHistory.tab.Actions")}</StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.length > 0 ? (
                filteredOrders?.map((order, index) => (
                  <StyledTableRow
                    key={order?.id}
                    isEvenRow={index % 2 === 0}
                    onClick={() => handleRowClick(order)}
                    style={{ cursor: order?.documentId ? "pointer" : "default" }}
                  >
                    <StyledTableCell>{order?.id}</StyledTableCell>
                    <StyledTableCell>{order?.refNumber}</StyledTableCell>
                    <StyledTableCell>{order?.departDate}</StyledTableCell>
                    <StyledTableCell>{order?.pickUpAddress?.Address}</StyledTableCell>
                    <StyledTableCell>{order?.dropOfAddress?.Address}</StyledTableCell>
                    <StyledTableCell>{StatusMessage(order?.commandStatus)}</StyledTableCell>
                    {order?.deparTime && order?.departDate && calculeTime({ time: order?.deparTime, date: order?.departDate, order })}
                  </StyledTableRow>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ padding: "16px 8px", color: "#fff", textAlign: "center", background: '#0c0c0c' }}>
                    {t("ClientProfile.passer1ere")}
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </div>
        <ProfileHistoryFooter>
          <LeftFooter>
            <p style={{ color: "#fff" }}>{t("ClientProfile.ligne")}</p>
            <select name="pageSize" value={pageSize} onChange={handlePageSizeChange} style={{ background: '#0c0c0c', color: '#fff', border: '1px solid #fff', borderRadius: 6 }}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span style={{ color: "#fff" }}>
              1-10 {t("ClientProfile.of")}{pagination?.total}
            </span>
          </LeftFooter>
          <Pagination pageCount={pagination?.pageCount} current={pagination?.page} onPageChange={onPageChange} />
        </ProfileHistoryFooter>
    
      </ProfileHistoryConatiner>
    </>
  );
};

export default ProfileHistory;

const ProfileHistoryConatiner = styled.div`
  padding: 3vw;
  width: 100%;
  background: #0c0c0c;
  min-height: 100vh;
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
  background: #0c0c0c;
  color: #fff;
  &::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d8b56c;
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
  font-size: 15px;
  background-color: #0c0c0c;
  color: #fff;
  padding: 16px;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #d8b56c;
`;
const StyledTableRow = styled.tr`
  cursor: pointer;
  background-color: ${(props) => (props.isEvenRow ? "#181818" : "#0c0c0c")};
  text-align: left;
  color: #fff;
  font-size: 13px;
  transition: background 0.2s;
  &:hover {
    background-color: #232323;
  }
`;
const StyledTableCell = styled.td`
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #232323;
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
  box-shadow: 0 2px 12px -4px #000;
  background: #181818;
  border-radius: 30px;
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
  background: #0c0c0c;
  color: #fff;
  font-size: 15px;
  &::placeholder {
    color: #aaa;
  }
`;
const Button = styled.div`
  width: auto;
  padding: 12px 24px;
  height: 40px;
  border-radius: 12px;
  background: #d8b56c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0c0c0c;
  font-size: 15px;
  gap: 10px;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px -2px #000;
  span {
    font-size: 20px;
  }
  a {
    text-decoration: none;
    color: #0c0c0c;
    display: flex;
    align-items: center;
    gap: 16px;
    font-weight: bold;
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
    background: #0c0c0c;
    color: #fff;
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
    background-color: #fff;
    color: #0c0c0c;
    border-radius: 50%;
  }
`;

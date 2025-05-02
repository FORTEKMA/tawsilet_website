import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);
setDefaultLocale("fr");
import "react-datepicker/dist/react-datepicker.css";
// import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateDepartDate, updateDeparTime } from "../../../redux/newCommand/newCommandSlice";
import { useDispatch, useSelector } from "react-redux";

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  /* background-color: red; */
  align-items: center;
  gap: 15px;
  border-radius: 16px;
  font-size: 16px;
  flex-wrap: wrap;

  .react-datepicker-wrapper {
    flex: 1;
    border-radius: 16px;
    @media (max-width: 1050px) {
      // min-width: 100%;
      // flex: 1;
      border-radius: 8px;
    }
  }
  .DateInput {
    border-radius: 10px !important;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    background-color: rgba(245, 245, 245, 1);
    height: 46px;
    width: 100%;
    font-size: 16px;
    @media (max-width: 1050px) {
      // width: 100%;
      // flex: 1;
      border-radius: 8px !important;
    }
  }
  .react-datepicker__input-container {
    border-radius: 16px;
    font-size: 16px;
    @media (max-width: 1050px) {
      width: 100%;
      flex: 1;
      border-radius: 8px;
    }
  }
`;

const TimeSelect = styled.select`
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: rgba(245, 245, 245, 1);
  border-radius: 10px;
  height: 46px;
  width: 100px;
  @media (max-width: 1050px) {
    flex: 1;
    border-radius: 8px;
    max-width: 70px !important;  }
`;

const DateTimeInput = ({
  updateHour,
  checkedHour,
  defaultDate,
  defaultTime,
  isDisabled,
}) => {
  const dispatch=useDispatch()
  const command = useSelector((store) => store?.newCommand?.command);
  const initialSelectedDate = defaultDate ? new Date(defaultDate) : null;
  const [hhh, mmm] = defaultTime?.split(":") || [null, null];
  const [t, i18n] = useTranslation();
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000 * 2); // * 2  To add twoHours
  const savedCommand = localStorage.getItem("command");
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [selectedHour, setSelectedHour] = useState(hhh || null);
  const [selectedMinute, setSelectedMinute] = useState(mmm || null);

  useEffect(() => {
    checkedHour
      ? isDisabled === true
        ? (() => {
            const newDate = new Date(oneHourFromNow);
            newDate.setDate(newDate.getDate() + 1);

            // Check if the selected time is before 00:00
            if (parseInt(newDate.getHours()) < 6) {
              // If before 00:00, add one more day
              newDate.setDate(newDate.getDate() - 1);
            }

            setSelectedHour("06");
            setSelectedMinute("00");
            setSelectedDate(newDate);
          })()
        : (() => {
            setSelectedHour(
              oneHourFromNow.getHours().toString().padStart(2, "0")
            );
            setSelectedMinute(
              oneHourFromNow.getMinutes().toString().padStart(2, "0")
            );
            setSelectedDate(oneHourFromNow);
          })()
      : null;
  }, [checkedHour]);

  useEffect(() => {
    setSelectedDate((prevDate) => {
      if (isToday(prevDate)) {
        const newDate = new Date(prevDate);
        newDate.setHours(selectedHour);
        newDate.setMinutes(selectedMinute);
        return newDate;
      }
      return prevDate;
    });
  }, [selectedHour, selectedMinute]);

  useEffect(() => {
    if(selectedDate){
      dispatch(updateDepartDate(selectedDate.toISOString().split("T")[0]))
    }
  }, [selectedDate]);

  useEffect(() => {
    if(selectedDate){
      dispatch(updateDeparTime(`${selectedHour}:${selectedMinute}:00.000`))
    }
  }, [selectedHour, selectedMinute]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateHour(false);
  };

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
    updateHour(false);
  };

  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
    updateHour(false);
  };

  const isToday = (date) => {
    const today = new Date();
    return date
      ? date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
      : false;
  };

  // Disable options that are less than two hour from now
  const disableOptions = (
    hour = oneHourFromNow.getHours().toString().padStart(2, "0"),
    minute = oneHourFromNow.getMinutes().toString().padStart(2, "0")
  ) => {
    if (!isToday(selectedDate)) return false;
    const selectedTime = new Date(selectedDate);
    selectedTime.setHours(parseInt(hour, 10));
    selectedTime.setMinutes(parseInt(minute, 10));
    return selectedTime < oneHourFromNow;
  };

  return (
    <InputWrapper dir="auto">
      {}
      <DatePicker
        className="DateInput"
        placeholderText={t("Step1.Aujourd")}
        locale="fr"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
      />
      <TimeSelect
        aria-label="heure"
        value={selectedHour}
        onChange={handleHourChange}
        disabled={!selectedDate}
      >
        <option value="">{t("Step1.Heure")}</option>
        {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
          return !disableOptions(
            (parseInt(hour) + 1).toString().padStart(2, "0"),
            selectedMinute || "59"
          ) ? (
            hour >= 6 && hour < 22 ? (
              <option
                key={hour}
                value={hour.toString().padStart(2, "0")}
                disabled={disableOptions(
                  parseInt(hour).toString().padStart(2, "0"),
                  selectedMinute || "59"
                )}
              >
                {hour.toString().padStart(2, "0")}
              </option>
            ) : null
          ) : null;
        })}
      </TimeSelect>

      <TimeSelect
        aria-label="minute"
        value={selectedMinute}
        onChange={handleMinuteChange}
        disabled={!selectedHour}
      >
        <option value="">{t("Step1.Minute")}</option>
        {Array.from({ length: 60 }, (_, i) => i).map((minute) => {
          return !disableOptions(
            selectedHour ||
              oneHourFromNow.getHours().toString().padStart(2, "0"),
            (parseInt(minute) + 1).toString().padStart(2, "0")
          ) ? (
            <option
              key={minute}
              value={minute.toString().padStart(2, "0")}
              disabled={disableOptions(
                selectedHour ||
                  oneHourFromNow.getHours().toString().padStart(2, "0"),
                (parseInt(minute) + 1).toString().padStart(2, "0")
              )}
            >
              {minute.toString().padStart(2, "0")}
            </option>
          ) : null;
        })}
      </TimeSelect>
    </InputWrapper>
  );
};

export default DateTimeInput;

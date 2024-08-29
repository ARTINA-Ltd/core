import React, { useState, Fragment } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import SimpleInput from "../Inputs/SimpleInput.jsx";
import BorderButton from "./../Buttons/BorderButton";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import i18n from "../../i18n.js";
import { useTranslation } from "react-i18next";

const SellArea = ({ tokenId }) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [date, setDate] = useState([null, null]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [price, setPrice] = useState("");

  const { t } = useTranslation("usercollection");

  const convertToGregorian = (persianDate) => {
    if (!persianDate) return null;
    const dateObj = new DateObject({
      calendar: persian,
      date: persianDate,
    });
    return dateObj.toDate(); // Converts to JavaScript Date object
  };

  const submit = () => {
    if (!date[0] || !date[1] || !startTime || !endTime || !price) {
      Notify.failure("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    const startDate = convertToGregorian(date[0]);
    const endDate = convertToGregorian(date[1]);

    if (!startDate || !endDate) {
      Notify.failure("تاریخ نامعتبر");
      return;
    }

    startDate.setHours(startTime.hour, startTime.minute);
    endDate.setHours(endTime.hour, endTime.minute);

    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/sell/",
        {
          token_id: tokenId,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          floor_price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((response) => {
        console.log(response);
        Notify.success("با موفقیت ثبت شد");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Notify.failure("موجودی حساب شما برای پرداخت هزینه شبکه کافی نیست");
        }
        else {
          Notify.failure("خطا در ثبت اطلاعات");
        }
      });
  };

  return (
    <Fragment>
      <div className="bg-base-100 card flex justify-center rounded-none w-full">
        <div className="w-full">
          <div className="gap-12 pt-5 items-center font-b4 lg:flex-col mb-4">
            <div className={`flex justify-between items-center whitespace-nowrap sm:whitespace-normal gap-2 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
              <span className="mx-1">{t("dateDuration")}</span>
              <DatePicker digits={digits} inputClass="bg-base-300 w-48 p-2 text-sm rounded-lg text-center" calendar={i18n.language === "fa" ? persian : null} locale={i18n.language === "fa" ? persian_fa : null} range dateSeparator=" - " onChange={setDate} />
            </div>
            <div className={`flex mt-4 gap-2 justify-between items-center font-b4 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
              <div className="mx-1">{t("startHour")}</div>
              <DatePicker
                value={startTime}
                disableDayPicker
                inputClass="bg-base-300 w-48 p-2 rounded-lg"
                onChange={setStartTime}
                format="HH:mm" // 24-hour format
                plugins={[<TimePicker position="bottom" hideSeconds />]} // TimePicker without seconds
              />
            </div>
          </div>
          <div className="items-center font-b4 lg:flex-col">
            <div className={`flex gap-2 justify-between items-center font-b4 border-x-2 border-x-transparent ${i18n.dir() === "rtl" ? "border-r-primary" : "border-l-primary"}`}>
              <div className="mx-1">{t("endHour")}</div>
              <DatePicker
                value={endTime}
                disableDayPicker
                inputClass="bg-base-300 w-48 p-2 rounded-lg"
                onChange={setEndTime}
                format="HH:mm" // 24-hour format
                plugins={[<TimePicker position="bottom" hideSeconds />]} // TimePicker without seconds
              />
            </div>
          </div>
          <SimpleInput className="mt-8 font-b4" type="number" title={t("price")} placeholder="مثلا" validationError={price === "" && "نمی‌تواند خالی باشد"} defaultValue={null} onChange={(e) => setPrice(e.target.value)} />
          <div className="mt-4 flex gap-4">
            <BorderButton onClick={submit}>{t("submit")}</BorderButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SellArea;

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import "./CollectionDialog.css";
import SimpleInput from "../../Inputs/SimpleInput";
import axios from "axios";
import { Notify } from "notiflix";
import BorderButton from "../../Buttons/BorderButton";
export default function CollectionDialog(tokenId) {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState({ h: 0, m: 0 });
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState({ h: 0, m: 0 });
  const [price, setPrice] = useState();

  const submit = () => {
    var start = startDate;
    var end = endDate;
    start.setHours(startTime.h , startTime.m)
    end.setHours(endTime.h , endTime.m)
    axios
      .put(
        "https://api.artina.org/api/transaction/nfts/sell/",
        {
          token_id: tokenId.tokenId,
          start_date: start,
          end_date: end,
          floor_price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then(() => {
        Notify.success("با موفقیت ثبت شد");
        setVisible(false);
      })
      // .catch(() => Notify.failure("خطا"));
      .catch();
  };

  const footerContent = (
    <div>
      <Button
        label="لغو"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button label="ثبت" icon="pi pi-check" onClick={submit} autoFocus />
    </div>
  );
  const Header = (
    <div>
      <p className="font">فروش کالا</p>
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <BorderButton className={"flex gap-1"} onClick={() => setVisible(true)}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width={"1.25em"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        فروش
      </BorderButton>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "50vw", direction: "rtl" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="flex gap-12 pt-5 items-center font-b4">
          <SimpleInput
            type="date"
            title="تاریخ آغاز فروش "
            placeholder="مثلا"
            validationError="نمیتواند خالی باشد"
            defaultValue={null}
            onChange={(e) => setStartDate(e.value)}
          />
          <div className="flex gap-2 items-center font-b4">
            <div className="">ساعت</div>
            <SimpleInput
              type="time"
              onChange={(e) => setStartTime({ h: e.hour, m: e.minute })}
            />
          </div>
        </div>
        <div className="flex gap-12 pt-5 items-center font-b4">
          <SimpleInput
            type="date"
            title="تاریخ پایان فروش "
            placeholder="مثلا"
            validationError="نمیتواند خالی باشد"
            defaultValue={null}
            onChange={(e) => setEndDate(e.value)}
          />
          <div className="flex gap-2 items-center font-b4">
            <div className="">ساعت</div>
            <SimpleInput
              type="time"
              onChange={(e) => setEndTime({ h: e.hour, m: e.minute })}
            />
          </div>
        </div>
        <SimpleInput
          className={"mt-12 z-50 font-b4"}
          type="text"
          title="قیمت "
          placeholder="مثلا"
          validationError="نمیتواند خالی باشد"
          defaultValue={null}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Dialog>
    </div>
  );
}

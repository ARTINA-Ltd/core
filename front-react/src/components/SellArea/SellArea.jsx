import React, { useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Notify } from "notiflix";
import SimpleInput from "../Inputs/SimpleInput.jsx";
import { Fragment } from "react";
import BorderButton from "./../Buttons/BorderButton";

const SellArea = (tokenId, cancel) => {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState({ h: 0, m: 0 });
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState({ h: 0, m: 0 });
  const [price, setPrice] = useState();

  const submit = () => {
    if (!startDate || !startTime || !endDate || !endTime || !price) {
      Notify.failure("لطفاً تمام فیلدها را پر کنید");
      return;
    }

    var start = startDate;
    var end = endDate;
    start.setHours(startTime.h, startTime.m);
    end.setHours(endTime.h, endTime.m);
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
      .catch();
  };

  return (
    <Fragment>
      <div className="bg-white card flex justify-content-center p-4 rounded-xl w-full ">
        <div style={{ direction: "rtl" }} className="w-full">
          <div className="gap-12 pt-5 items-center font-b4 lg:flex-col mb-4">
            <SimpleInput type="date" title="تاریخ آغاز فروش " placeholder="مثلا" validationError="نمی‌تواند خالی باشد" defaultValue={null} onChange={(e) => setStartDate(e.value)} />
            <div className="flex mt-4 gap-2 items-center font-b4">
              <div>ساعت</div>
              <SimpleInput type="time" onChange={(e) => setStartTime({ h: e.hour, m: e.minute })} />
            </div>
          </div>
          <div className="gap-12 pt-5 items-center font-b4 lg:flex-col">
            <SimpleInput type="date" title="تاریخ پایان فروش " placeholder="مثلا" validationError="نمی‌تواند خالی باشد" defaultValue={null} onChange={(e) => setEndDate(e.value)} />
            <div className="flex mt-4 gap-2 items-center font-b4">
              <div className="">ساعت</div>
              <SimpleInput type="time" onChange={(e) => setEndTime({ h: e.hour, m: e.minute })} />
            </div>
          </div>
          <SimpleInput className={"mt-8 z-50 font-b4"} type="text" title="قیمت " placeholder="مثلا" validationError="نمی‌تواند خالی باشد" defaultValue={null} onChange={(e) => setPrice(e.target.value)} />
          <div className="mt-4 flex gap-4">
            <BorderButton onClick={submit}>ثبت</BorderButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SellArea;

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import "./CollectionDialog.css";
import SimpleInput from "../../Inputs/SimpleInput";
export default function CollectionDialog() {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const footerContent = (
    <div>
      <Button
        label="لغو"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="ثبت"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
  const Header = (
    <div>
      <p className="font">فروش کالا</p>
    </div>
  );
  return (
    <div className="card flex justify-content-center">
      <div
        className=" text-white text-[14px] bg-[#4e45d0] py-3 px-5 rounded-lg cursor-pointer transition-all hover:bg-[#372fac] flex justify-between"
        onClick={() => setVisible(true)}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        فروش
      </div>
      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "50vw" , direction:"rtl"}}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
       
        <div className="flex gap-12">
          <SimpleInput
            type="text"
            title="تاریخ آغاز فروش "
            placeholder="مثلا"
            validationError="نمیتواند خالی باشد"
            defaultValue={null}
          />
          <SimpleInput
            type="text"
            title="تاریخ پایان فروش "
            placeholder="مثلا"
            validationError="نمیتواند خالی باشد"
            defaultValue={null}
          />
        </div>
        <SimpleInput
        className={'mt-12'}
          type="text"
          title="تاریخ پایان فروش "
          placeholder="مثلا"
          validationError="نمیتواند خالی باشد"
          defaultValue={null}
        />

      </Dialog>
    </div>
  );
}

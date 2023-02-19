import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import './CollectionDialog.css'
export default function CollectionDialog() {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(null);

  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
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
    <div
      className="card flex justify-content-center"
      style={{ direction: "rtl" }}
    >
      <Button
        label="فروش"
        icon="pi pi-shopping-cart"
        className="font"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header={Header}
        visible={visible}
        style={{ width: "50vw",direction:'trl' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <p className="m-0 w-full">
          <Message severity="info" className="w-full" text="Info Message" />
          <br />
          <Message
            severity="success"
            className="w-full"
            text="Success Message"
          />
          <br />

          <Message severity="warn" className="w-full" text="Warning Message" />
          <br />

          <Message severity="error" className="w-full" text="Error Message" />
          <br />
        </p>
        <div className="mt-7 w-full">
          <div className="card flex justify-content-center">
            <Calendar
              value={date}
              style={{direction:'rtl'}}
              
              placeholder="تاریخ پایان فروش"
              onChange={(e) => setDate(e.value)}
              showIcon
            />
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="p-inputgroup  p-4" style={{ direction: "rtl" }}>
           
            <InputNumber placeholder="قیمت پایه" />
            <span className="p-inputgroup-addon">تومان</span>
            {/* <span className="p-inputgroup-addon">.00</span> */}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

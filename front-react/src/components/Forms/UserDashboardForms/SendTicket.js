import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const SendTicket = () => {
  const [withraw, setwithraw] = useState("");

  const [deposit, setdeposit] = useState("");
  // #7c73E6
  // #c4c1E0
  // #FEEAE3
  // #FAFAFA
  return (
    <div>
      <label
        style={{ backgroundColor: "#FAFAFA" }}
        htmlFor="ssn"
        className="font-bold font block mb-2 text-4xl m-4 p-2 align-items-start justify-content-start "
      >
        درخواست ها
      </label>

      <div className="grid lg:flex  w-full">
        <div className="grid col-12  lg:flex   md:col-12  lg:col-10  w-auto  ">
          <div className=" grid col-8  sm:w-full md:flex align-items-center justify-content-center md:col-6 lg:col-6  lg:flex">
            <div className="lg:col-8 ">
              <InputText
                value={deposit}
                onChange={(e) => setdeposit(e.target.value)}
                placeholder="1.000.000.000 تومان"
                className="m-4 w-full font"
              />
            </div>
            <div className="  lg:col-3 ">
              <Button className="m-3 font lg:h-auto  align-items-center justify-content-center ">
                واریز
              </Button>
            </div>
          </div>
          <div className=" grid col-8 sm:w-full md:flex align-items-center justify-content-center md:col-6 lg:col-6  lg:flex  ">
            <div className="lg:col-8">
              <InputText
                className="m-4 w-full font"
                value={withraw}
                onChange={(e) => setwithraw(e.target.value)}
                placeholder="1.000.000.000 تومان"
              />
            </div>
            <div className="lg:col-3">
              <Button className="m-3 font  lg:h-auto align-items-center justify-content-center">
                برداشت
              </Button>
            </div>
          </div>
        </div>

        <div className="col-12 lg:flex lg:m-9 md:col-12 lg:col-2   w-auto ">
          <Button className="  lg:m-9  font    align-items-center justify-content-center">
            ارسال تیکت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendTicket;

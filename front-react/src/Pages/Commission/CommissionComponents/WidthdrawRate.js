import React, { useState, useEffect } from "react";

export default function WidthdrawRate() {
  return (
    <div>
      <div className=" m-8">
        <div className="Row1  flex col-12">
          <div
            className="col2 col-6 py-2 -4xl"
            style={{ backgroundColor: "#424874", color: "white" }}
          >
            کارمزد برداشت
          </div>

          <div
            className="col2 col-6 py-2 -4xl"
            style={{ backgroundColor: "#424874", color: "white" }}
          >
            میزان برداشت ریالی
          </div>
        </div>
        <div className="Row1  flex col-12">
          <div className="col2 col-6 py-2 -2xl" style={{ borderBottom: "90px" }}>
            یک درصد میزان برداشت
          </div>

          <div className="col2 col-6 py-2 -2xl">کمتر از 400 هزار تومان</div>
        </div>
        <div className="Row2  flex col-12">
          <div className="col2 col-6 py-2 -2xl">4000 تومان</div>

          <div className="col2 col-6 py-2 -2xl">400 تا 50 میلیون تومان</div>
        </div>
        <div className="Row2  flex col-12">
          <div className="col2 col-6 py-2 -2xl">
            4000هزار تومان به ازای هر 50 میلیون تومان
          </div>

          <div className="col2 col-6 py-2 -2xl">بیشتر از 50 میلیون تومان</div>
        </div>
      </div>
    </div>
  );
}

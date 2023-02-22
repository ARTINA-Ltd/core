import React, { useState, useEffect } from "react";

export default function Commissionmax() {
  return (
    <div>
      <div className="grid m-8">
        <div className="Row1 grid flex col-12 ">
          <div className="col1 col-2 text-3xl " style={{backgroundColor:"#424874",color:"white"}}>حداقل قابل واریز</div>
          <div className="col2 col-2 text-3xl" style={{backgroundColor:"#424874",color:"white"}}>هزینه واریز</div>
          <div className="col1 col-2 text-3xl" style={{backgroundColor:"#424874",color:"white"}}>حداقل قابل برداشت</div>
          <div className="col2 col-3 text-3xl" style={{backgroundColor:"#424874",color:"white"}}>هزینه قابل برداشت</div>
          <div className="col2 col-3 text-3xl" style={{backgroundColor:"#424874",color:"white"}}>دارایی دیجیتال</div>
        </div>
        <div className="Row1 grid flex col-12">
          <div className="col1 col-2 text-2xl">15 USDT</div>
          <div className="col2 col-2 text-2xl">10 USDT</div>
          <div className="col1 col-2 text-2xl">500 USDT</div>
          <div className="col2 col-3 text-2xl">متغییر بنا به شبکه تتر</div>
          <div className="col2 col-3 text-2xl">شبکه اتریوم</div>
        </div>
        <div className="Row2 grid flex col-12">
          <div className="col1 col-2 text-2xl">0.5 USDT</div>
          <div className="col2 col-2 text-2xl">0 USDT</div>
          <div className="col1 col-2 text-2xl">10 USDT</div>
          <div className="col2 col-3 text-2xl">؟</div>
          <div className="col2 col-3 text-2xl">شبکه ترون</div>
        </div>
      </div>
    </div>
  );
}

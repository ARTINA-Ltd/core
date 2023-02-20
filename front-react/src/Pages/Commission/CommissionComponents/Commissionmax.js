import React, { useState, useEffect } from "react";

export default function Commissionmax() {
  return (
    <div>
      <div className="grid m-8">
        <div className="Row1 grid flex col-12 ">
          <div className="col1 col-2 " style={{backgroundColor:"#424874",color:"white"}}>حدا قابل واریز</div>
          <div className="col2 col-2" style={{backgroundColor:"#424874",color:"white"}}>هزینه واریز</div>
          <div className="col1 col-2" style={{backgroundColor:"#424874",color:"white"}}>حداقل قابل برداشت</div>
          <div className="col2 col-3" style={{backgroundColor:"#424874",color:"white"}}>هزینه قابل برداشت</div>
          <div className="col2 col-3" style={{backgroundColor:"#424874",color:"white"}}>دارایی دیجیتال</div>
        </div>
        <div className="Row1 grid flex col-12">
          <div className="col1 col-2">15 USDT</div>
          <div className="col2 col-2">10 USDT</div>
          <div className="col1 col-2">500 USDT</div>
          <div className="col2 col-3">متغییر بنا به شبکه تتر</div>
          <div className="col2 col-3">شبکه اتریوم</div>
        </div>
        <div className="Row2 grid flex col-12">
          <div className="col1 col-2">0.5 USDT</div>
          <div className="col2 col-2">0 USDT</div>
          <div className="col1 col-2">10 USDT</div>
          <div className="col2 col-3">؟</div>
          <div className="col2 col-3">شبکه ترون</div>
        </div>
      </div>
    </div>
  );
}

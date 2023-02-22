import React, { useState, useEffect } from "react";
 

export default function TradeRate() {
  return (
    <div>
      <div className="grid m-8">
        <div className="Row1 grid flex col-12">
          <div className="col1 col-6 text-5xl "  style={{backgroundColor:"#424874",color:"white"}}>
            کارمزد معادلات 
          
          </div>
          <div className="col2 col-6 text-5xl" style={{backgroundColor:"#424874",color:"white"}}>حجم معاملات 30 روز گذشته</div>
        </div>

        <div className="Row2 grid flex col-12">
          <div className="col1 col-6 text-2xl">0.35%</div>
          <div className="col2 col-6 text-2xl">کمتر از 10 میلیون تومان</div>
        </div>

        <div className="Row3 grid flex col-12">
          <div className="col1 col-6 text-2xl">0.3%</div>
          <div className="col2 col-6 text-2xl">بین 10 تا 50 میلیون تومان</div>
        </div>

        <div className="Row4 grid flex col-12">
          <div className="col1 col-6 text-2xl">0.25%</div>
          <div className="col2 col-6 text-2xl">
          بین 50 تا 100 میلیون تومان 
          </div>
        </div>

        <div className="Row5 grid flex col-12">
          <div className="col1 col-6 text-2xl">0.2%</div>
          <div className="col2 col-6 text-2xl">
          بیشتر از 100 میلیون تومان 

          </div>
        </div>
      </div>
    </div>
  );
}

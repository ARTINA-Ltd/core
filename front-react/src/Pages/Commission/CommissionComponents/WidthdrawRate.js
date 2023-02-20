import React, { useState, useEffect } from "react";

export default function WidthdrawRate() {
  return (
    <div>
      <div className="grid m-8">
        <div className="Row1 grid flex col-12">
          <div className="col2 col-6" style={{backgroundColor:"#424874",color:"white"}}>کارمزد برداشت</div>

          <div className="col2 col-6" style={{backgroundColor:"#424874",color:"white"}}>میزان برداشت ریالی</div>
        </div>
        <div className="Row1 grid flex col-12">
          <div className="col2 col-6">
            

یک درصد میزان برداشت-4000 تومان
          </div>

          <div className="col2 col-6">col2</div>
        </div>
        <div className="Row2 grid flex col-12">
          <div className="col2 col-6">col2</div>

          <div className="col2 col-6">col2</div>
        </div>
      </div>
    </div>
  );
}

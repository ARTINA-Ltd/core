import React, { useState, useEffect } from "react";
 import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

 import { Button } from "primereact/button";

  

function Reportcard() {
  const ReportLegend = (
    <div className=" justify-content-center  " style={{color:'#424874'}}>
      <span className="pi pi-user mr-2 text-5xl"></span>
      <span className="font-bold text-5xl font">   دریافت گزارش با فرمت .csv  </span>
    </div>
  );

  // -------------------------------- card Title Section--------------------------------
 // #7c73E6
    // #c4c1E0
    // #FEEAE3
   // #FAFAFA
   
  // --------------------------------    --------------------------------

  return (
    
          
          
         
            <Card title={ReportLegend} className=" m-4 h-full p-1 bg-white shadow-7"                style={{  borderColor:'#424874' ,borderWidth:'2px' }}
            >
              <p className="  text-5xl  ">
                <Button
                  label="گزارش نمایشگاه های یک ماه اخیر"
                  style={{backgroundColor:'#DCD6F7',color:'#424874'}}
                  className=" mt-2 text-5xl  p-button-outlined"
                />
                <br></br>
                <Button
                  label=" گزارش نمایشگاه های یک سال اخیر"
                  style={{backgroundColor:'#DCD6F7',color:'#424874'}}

                  className=" mt-3   text-5xl  p-button-outlined"
                />
              </p>
            </Card>
           
 
  );
}

export default Reportcard;

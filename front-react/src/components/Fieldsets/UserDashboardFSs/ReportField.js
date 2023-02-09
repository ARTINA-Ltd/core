import React, { useState, useEffect } from "react";
  import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
 import "primeflex/primeflex.scss";
 
import './ReportField.css'
import { Fieldset } from "primereact/fieldset";
 

function ReportField() {
 

  // -------------------------------- card Title Section--------------------------------
 // #7c73E6
    // #c4c1E0
    // #FEEAE3
   // #FAFAFA
  const ReportLegend = (
    <div className="flex align-items-center text-primary">
      <span className="pi pi-user mr-2"></span>
      <span className="font-bold text-5xl"> گزارش مالی</span>
    </div>
  );
 

  // --------------------------------    --------------------------------

  return (
     <>
        
            <Fieldset
              className="   m-4   "
              legend={ReportLegend}
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <div className=" flex justify-content-start text-5xl p-2 m-2  ">
                {" "}
                <p className="  ">مانده قابل برداشت : 1111111111111111</p>
              </div>
              <div className=" flex justify-content-start text-5xl p-2  m-2 ">
                {" "}
                <p className="  ">مانده قابل معامله : 999999292292</p>
              </div>
              <div className="flex justify-content-start text-5xl p-2  m-2">
                {" "}
                <p
                  className=" 

"
                >
                  مسدود شده : 0
                </p>
              </div>
            </Fieldset>
         

          
          

            </>   
    
  );
}

export default ReportField;

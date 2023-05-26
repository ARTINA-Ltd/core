import React, { useState, useEffect } from "react";
  import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
 
import './ReportField.css'
import { Fieldset } from "primereact/fieldset";
 

function ReportField() {
 

  // -------------------------------- card Title Section--------------------------------
 // #7c73E6
    // #c4c1E0
    // #FEEAE3
   // #FAFAFA
  const ReportLegend = (
    <div className="flex align-items-center " style={{color:'#424874'}}>
      <span className="pi pi-user mr-2 text-5xl"></span>
      <span className="font-bold text-5xl font"> گزارش مالی</span>
    </div>
  );
 

  // --------------------------------    --------------------------------

  return (
     <>
        
            <Fieldset
              className="   m-4  shadow-7 bg-white"
              legend={ReportLegend}
              style={{  borderColor:'#424874' ,borderWidth:'2px' }}

            >
              <div className=" flex justify-content-start text-5xl p-2 m-2   ">
                {" "}
                <p className="font  ">مانده قابل برداشت : 1111111.111</p>
              </div>
              <div className=" flex justify-content-start text-5xl p-2  m-2     ">
                {" "}
                <p className="  font  ">مانده قابل معامله : 999999.2292</p>
              </div>
              <div className="flex justify-content-start text-5xl p-2  m-2 font">
                {" "}
                <p
                  className=" 
                  font
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

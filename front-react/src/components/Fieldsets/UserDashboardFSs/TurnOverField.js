import React, { useState, useEffect } from "react";
  import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
 import "primeflex/primeflex.scss";
 
import './TurnOverField.css'
import { Fieldset } from "primereact/fieldset";
 

function TurnOverField() {
 

  // -------------------------------- card Title Section--------------------------------
// #7c73E6
    // #c4c1E0
    // #FEEAE3
   // #FAFAFA
   
  const TurnoverLegend = (
    <div className="flex align-items-center text-primary">
      <span className="pi pi-user mr-2"></span>
      <span className="font-bold text-5xl"> گردش حساب </span>
    </div>
  );

  // --------------------------------    --------------------------------

  return (
     <>
 
            <Fieldset
              className="  m-4   "
              legend={TurnoverLegend}
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <div className="  p-2  m-2  flex justify-content-start">
                {" "}
                <p className="text-5xl ">
                  واریز : +900.000.000 <span> +</span>
                </p>
              </div>
              <div className=" p-2  m-2  flex justify-content-start ">
                {" "}
                <p className="text-5xl ">
                  {" "}
                  برداشت : 912.123.12313 <span> -</span>
                </p>
              </div>
              <div className="flex justify-content-start  p-2  m-2">
                {" "}
                <p className="text-5xl ">
                  {" "}
                  واریز : +123.123.12. <span> +</span>{" "}
                </p>
              </div>
            </Fieldset>
          

            </>   
    
  );
}

export default TurnOverField;

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
    <div className="flex align-items-center  " style={{color:'#424874'}}>
      <span className="pi pi-user mr-2  text-5xl"></span>
      <span className="font-bold text-5xl font"> گردش حساب </span>
    </div>
  );

  // --------------------------------    --------------------------------

  return (
     <>
 
            <Fieldset
              className="  m-4  shadow-7 bg-white"
              legend={TurnoverLegend}
              style={{  borderColor:'#424874' ,borderWidth:'2px' }}
            >
              <div className="  p-2  m-2  flex justify-content-start">
                {" "}
                <p className="text-4xl font ">
                  واریز : +900.000.000 <span> +</span>
                </p>
              </div>
              <div className=" p-2  m-2  flex justify-content-start ">
                {" "}
                <p className="text-4xl font ">
                  {" "}
                  برداشت : 912.123.12313 <span> -</span>
                </p>
              </div>
              <div className="flex justify-content-start  p-2  m-2">
                {" "}
                <p className="text-4xl font ">
                  {" "}
                  واریز : +123.123.12. <span> +</span>{" "}
                </p>
              </div>
            </Fieldset>
          

            </>   
    
  );
}

export default TurnOverField;

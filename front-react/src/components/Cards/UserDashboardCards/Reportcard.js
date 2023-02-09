import React, { useState, useEffect } from "react";
 import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
 import "primeflex/primeflex.scss";

 import { Button } from "primereact/button";

  

function Reportcard() {
  

  // -------------------------------- card Title Section--------------------------------
 // #7c73E6
    // #c4c1E0
    // #FEEAE3
   // #FAFAFA
   
  // --------------------------------    --------------------------------

  return (
    
          
          
         
            <Card title="  دریافت گزارش با فرمت .csv" className=" m-4 h-full p-1"  style={{backgroundColor:'#FEEAE3'}}>
              <p className="  text-5xl  ">
                <Button
                  label="گزارش نمایشگاه های یک ماه اخیر"
                  className=" mt-2 text-5xl  p-button-outlined"
                />
                <br></br>
                <Button
                  label=" گزارش نمایشگاه های یک سال اخیر"
                  className=" mt-3   text-5xl  p-button-outlined"
                />
              </p>
            </Card>
           
 
  );
}

export default Reportcard;

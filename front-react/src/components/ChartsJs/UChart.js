import React, { useState, useEffect } from "react";
 import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Chart } from "primereact/chart";
import "primeflex/primeflex.scss";
 

function UserDashboardCharts() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  
 

  
  useEffect(() => {
     
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["برداشت", "مانده", "بلوکه شده"],
      datasets: [
        {
          data: [300000, 50000, 100000],
          backgroundColor: [
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--red-700"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, [ ]);
  
  
 

     // --------------------------------    --------------------------------

  return (
     
      <div >

     
           <Chart
            type="pie"
            data={chartData}
           
            options={chartOptions}
            className="w-full m-4 align-items-center justify-content-center md:w-30rem"
          />  </div>)
      
         
}

export default UserDashboardCharts;

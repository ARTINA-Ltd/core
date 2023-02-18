import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
 import "primeflex/primeflex.scss";

 import { Button } from "primereact/button";

 import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import UserDashboardTable from "../components/Tables/UserDashboardTable/UserDashboardTable";
import UserDashboardCharts from "../components/ChartsJs/UChart";
 import ReportField from "../components/Fieldsets/UserDashboardFSs/ReportField";
import TurnOverField from "../components/Fieldsets/UserDashboardFSs/TurnOverField";
import IncomeCard from "../components/Cards/UserDashboardCards/IncomeCard";
import Reportcard from "../components/Cards/UserDashboardCards/Reportcard";
import SendTicket from "../components/Forms/UserDashboardForms/SendTicket";

function UserDashboard() {
  useEffect(() => {}, []);

  
  // --------------------------------    --------------------------------

  return (
    <div>
      <div className=" overflow-hidden" style={{ direction: "rtl" ,backgroundColor:"#F4EEFF" }}>
        <Header />

        <div className=" grid flex align-items-center justify-content-center     ">
          <div className="    col-12   md:col-6 lg:col-6 " >
          <ReportField/>

          </div>

          <div className="    col-12   md:col-6 lg:col-6 ">
          <TurnOverField/>
             
          </div>

          {/* section 2 : Tabels about exhibitions */}

          <div className="  col-12  mr-0 ml-0 w-screen p-5 ">
            <div className="card  h-30rem shadow-7" style={{borderColor:'#424874' ,borderWidth:'2px'  }}>
              <UserDashboardTable />
            </div>
          </div>
        </div>

        {/* section 3 : devided into two cards ; one with detaild and one with requesting some files \two button */}

        <div className=" flex align-items-center justify-content-center grid   ">
          <div className="   col-12   md:col-6 lg:col-6 ">
          <IncomeCard/>
          </div>

          <div  className="    col-12   md:col-6 lg:col-6 ">
           <Reportcard/>
          </div>
        </div>

        <div         style={{borderColor:'#424874' ,borderWidth:'2px'  }}   className=" shadow-7 chart card align-items-center justify-content-center  ">
          <UserDashboardCharts />
        </div>
        <div  className="card m-9 align-items-center justify-content-center shadow-7  "       style={{borderColor:'#424874' ,borderWidth:'2px'  }}>
          <SendTicket />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserDashboard;

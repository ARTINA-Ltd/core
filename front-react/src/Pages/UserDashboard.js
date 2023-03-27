import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
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
import axios from "axios";

import { useNavigate } from "react-router-dom";
import  { Show400Errors, Show500Errors, ShowNetorkErrors, ShowTokenErrors } from "../components/ErrorDialogs/ShowErrors";
import { Toast } from "primereact/toast";
import { useRef } from "react";

function UserDashboard() {
  // const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [UserDatas, setUserDatas] = useState(false);
   var Token = localStorage.getItem("authTokens");
   const toastBC = useRef(null);

  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  };
  // const footerContent = (
  //   <div>
  //     <Button
  //       label="ورود دوباره"
  //       icon="pi pi-times"
  //       onClick={() => navigate("/login")}
  //       className="p-button-text"
  //     />
  //   </div>
  // );
  const getInfo = () => {
    // address: null
    // birthdate: null
    // cell_number: null
    // email: "parsalubo.k@gmail.com"
    // first_name: null
    // last_name: null
    // national_card_picture: "/static/PicturesOfNationalCard/default.png"
    // national_code: null
    // phone_number: null
    // profile_picture: "/static/PicturesOfProfile/default.png"
    // role: "user_zero"
    // username: "wixloop"
    axios
      .get("http://api.artina.orgapi/account/user-info/", config)
      .then((response) => {
        if (response.status == 200) {
          // localStorage.setItem(
          //   "UserDatas",
          //   JSON.stringify(response.data)
          // );
          if (
            response.data.national_code == null ||
            response.data.first_name == null ||
            response.data.address == null ||
            response.data.email == null ||
            response.data.username == null ||
            response.data.birthdate == null ||
            response.data.phone_number == null ||
            response.data.last_name == null
          ) {
            navigate("/profile");
          }
          else{
            setUserDatas(response.data)
          }
        }
      })
      .catch((exception) => {
        console.log(exception);
        
        if (exception.response.status === 400) {
          Show400Errors(toastBC);
        } else if (exception.response.status === 500) {
          Show500Errors(toastBC);
        }
        else if (exception.response.status === 401) {
          // localStorage.setItem("authTokens",null)
          ShowTokenErrors(toastBC);
        }
        else if (exception.code==="ERR_NETWORK") {
          ShowNetorkErrors(toastBC)
        }
      });
  };

  useEffect(() => {
    getInfo();
  }, []);
 
  // --------------------------------    --------------------------------

  return (
    <div>
       
      <Toast ref={toastBC} position="bottom-center" className="text-3xl w-full" />
      
     
      <div
        className=" overflow-hidden"
        style={{ direction: "rtl", backgroundColor: "#F4EEFF" }}
      >
        <Header />

        <div className=" grid flex align-items-center justify-content-center     ">
          <div className="    col-12   md:col-6 lg:col-6 ">
            <ReportField />
          </div>

          <div className="    col-12   md:col-6 lg:col-6 ">
            <TurnOverField />
          </div>

          {/* section 2 : Tabels about exhibitions */}

          <div className="  col-12  mr-0 ml-0 w-screen p-5 ">
            <div
              className="card  h-30rem shadow-7"
              style={{ borderColor: "#424874", borderWidth: "2px" }}
            >
              <UserDashboardTable />
            </div>
          </div>
        </div>

        {/* section 3 : devided into two cards ; one with detaild and one with requesting some files \two button */}

        <div className=" flex align-items-center justify-content-center grid   ">
          <div className="   col-12   md:col-6 lg:col-6 ">
            <IncomeCard />
          </div>

          <div className="    col-12   md:col-6 lg:col-6 ">
            <Reportcard />
          </div>
        </div>

        <div
          style={{ borderColor: "#424874", borderWidth: "2px" }}
          className=" shadow-7 chart card align-items-center justify-content-center  "
        >
          <UserDashboardCharts />
        </div>
        <div
          className="card m-9 align-items-center justify-content-center shadow-7  "
          style={{ borderColor: "#424874", borderWidth: "2px" }}
        >
          <SendTicket />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserDashboard;

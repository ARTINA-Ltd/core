 
import { Dropdown } from "primereact/dropdown";

import "./Personalinfo.css";
import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import image1 from "../ProductPageComponent/images/creditcard.png";

import { Calendar } from "primereact/calendar";
import { Accordion, AccordionTab } from "primereact/accordion";

function PersonalInfo() {
  const [date, setDate] = useState("hu Feb 09 2023");
  //Datas in the local storage to show them : 
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
  const [UserData, setUserDatas] = useState(
    JSON.parse(localStorage.getItem("UserDatas"))
  );

  //update profile :
  //?
  return (
    <>
      {/* ------------------------------------------------------------------------- */}
      <div
        className="  mt-6   mr-2  align-items-center justify-content-center"
        style={{ width: "97%" }}
      >
        <Accordion multiple activeIndex={[0, 1, 2]}>
          <AccordionTab
            style={{
              borderColor: "#424874",
              borderWidth: "2px",
              borderRadius: "4px",
            }}
            header={
              <div className="flex mr-3 align-items-center Accheader">
                <span className="vertical-align-middle font text-3xl">
                  {" "}
                  اطلاعات شخصی
                </span>
              </div>
            }
            className="text-4xl mb-4  "
          >
            <div className=" col-12 grid flex  align-items-center   ">
              <div
                className="col-12 sm:col-6 md:col-6 lg:col-6   justify-content-start"
                style={{ display: "flex" }}
              >
                <p>
                  نام :
                  <InputText
                    className="h-4rem nameinput "
                    placeholder=""
                    value={UserData.first_name}
                  />
                </p>
              </div>
              <div
                className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p>
                  {" "}
                  نام خانوادگی :{" "}
                  <InputText
                    className="h-4rem "
                    value={UserData.last_name}
                    placeholder="کاظمی"
                  />
                </p>
              </div>
            </div>
            <div className=" col-12 grid flex   mt-2  ">
              <div
                className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p>
                  {" "}
                  کدملی :
                  <InputText
                    className="h-4rem IDinfo"
                    value={UserData.national_code}
                    placeholder="4311333232"
                  />
                </p>
              </div>
              <div
                className="col-12 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p className="">
                  تاریخ تولد :
                  <Calendar
                    value={UserData.birthdate}
                    className="h-4rem dateinfo"
                    onChange={(e) => setDate(e.value)}
                    showButtonBar
                    placeholder="1398/09/09"
                  />
                </p>
                {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
              </div>
            </div>
          </AccordionTab>
          <AccordionTab
            style={{
              borderColor: "#424874",
              borderWidth: "2px",
              borderRadius: "4px",
            }}
            header={
              <div className="flex mr-3 align-items-center">
                <span className="vertical-align-middle font text-3xl">
                  {" "}
                  راه های ارتباطی{" "}
                </span>
              </div>
            }
            className="text-4xl mb-4"
          >
            <div className=" col-12 grid flex mt-2  ">
              <div
                className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p>
                  شماره ثابت :{" "}
                  <InputText
                    value={UserData.cell_number}
                    className="h-4rem homenum"
                    placeholder="09121822776"
                  />
                </p>
              </div>
              <div
                className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p>
                  {" "}
                  شماره همراه :{" "}
                  <InputText
                    value={UserData.phone_number}
                    className="h-4rem phonenum"
                    placeholder="0987123323"
                  />
                </p>
                {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
              </div>
            </div>
            <div
              className=" col-7 sm:col-12 font justify-content-start mt-2 w-full  "
              style={{ display: "flex" }}
            >
              ایمیل :{" "}
              <InputText
                value={UserData.email}
                className="h-4rem Pemail font "
                style={{ width: "40%" }}
                placeholder="parsa@gmail.com"
              />
            </div>
          </AccordionTab>
          <AccordionTab
            style={{
              borderColor: "#424874",
              borderWidth: "2px",
              borderRadius: "4px",
            }}
            header={
              <div className="flex mr-3 align-items-center">
                <span className="vertical-align-middle font text-3xl">
                  {" "}
                  اطلاعات حساب کاربری
                </span>
              </div>
            }
            className="text-4xl mb-4"
          >
            <div className=" col-12 grid flex mt-2  ">
              <div
                className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
                style={{ display: "flex" }}
              >
                <p className="font">امتیاز در سایت : 99999 </p>
              </div>
              <div
                className="col-11 sm:col-6 md:col-6 lg:col-6   justify-content-start"
                style={{ display: "flex" }}
              >
                <p className="font"> نوع کاربر :طلایی</p>
              </div>
            </div>
            {/* <div className="col-12  m-4  flex justify-content-center" >
            <span className="p-float-label font w-auto " style={{direction:'rtl'}}>
                <Dropdown inputId="dd-city" showClear  value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full   font" />
                <label className='text-1xl ml-5 mb-8 font justify-content-center'  htmlFor="dd-city ">   انتخاب نقش</label>
            </span>
        </div> */}
            <div className="col-12 grid flex justify-content-center">
              <h1 className="text-5xl col-12 justify-content-center  ">
                -----احرازهویت------
              </h1>
              <div className="flex  col-12 w-5   justify-content-center   ">
                <img
                  src={image1}
                  alt=""
                  className=""
                  style={{ height: "90px" }}
                />
              </div>
              <div className="col-12">
                <p className="text-4xl mt-12">
                  52154651486514651613 :شماره شبا
                </p>
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
}
export default PersonalInfo;

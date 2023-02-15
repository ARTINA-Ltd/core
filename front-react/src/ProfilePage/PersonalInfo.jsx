// "user": null, TOKEN
// "first_name": "",
// "last_name": "",
// "national_code": "",
// "birthdate": "",
// "phone_number": "",
// "cell_number": "",
// "address": "",
// "national_code_picture": null,
// "image": null,
// "email": "",
// "role": null
import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import image1 from "../ProductPageComponent/images/image_2022-08-15_19-57-46.png";

import { Calendar } from "primereact/calendar";

function PersonalInfo() {
  const [date, setDate] = useState("hu Feb 09 2023");
  // console.log(date)
  return (
    <>
      <div className="grid text-6xl mt-5 mr-5 ">
        <div className=" col-12 grid flex  align-items-center mt-2 ">
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6   justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              نام :
              <InputText className="h-4rem" placeholder="پارسا" />
            </p>
          </div>
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              {" "}
              نام خانوادگی :{" "}
              <InputText className="h-4rem" placeholder="کاظمی" />
            </p>
          </div>
        </div>

        <div className=" col-12 grid flex   mt-2  ">
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              {" "}
              کدملی :
              <InputText className="h-4rem" placeholder="4311333232" />
            </p>
          </div>
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              تاریخ تولد :
              <Calendar
                value={date}
                className="h-4rem"
                onChange={(e) => setDate(e.value)}
                showButtonBar
                placeholder="1398/09/09"
              />
            </p>
            {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
          </div>
        </div>

        <div className=" col-12 grid flex mt-2  ">
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              شماره ثابت :{" "}
              <InputText className="h-4rem" placeholder="09121822776" />
            </p>
          </div>
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>
              {" "}
              شماره همراه :{" "}
              <InputText className="h-4rem" placeholder="0987123323" />
            </p>
            {/* <Calendar value={date} onChange={(e) => setDate(e.value)} />         */}
          </div>
        </div>
        <div className=" col-7 sm:col-12  justify-content-start mt-2 w-full  "
          style={{ display: "flex" }}
        >
          ایمیل :{" "}
          <InputText
            className="h-4rem"
            style={{ width: "40%" }}
            placeholder="parsa@gmail,.com"
          />
        </div>

        <div
          className=" col-8 sm:col-12  justify-content-start mt-2  "
          style={{ display: "flex", width: "100%" }}
        >
          آدرس :{" "}
          <InputText
            className="h-4rem"
            style={{ width: "40%" }}
            placeholder="شهر ایکس وخیابان وای.کوچه 98 پلاک 2"
          />
        </div>
        <Divider type="solid" />
        <div className=" col-12 grid flex mt-2  ">
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p>امتیاز در سایت : 99999 </p>
          </div>
          <div
            className="col-11 sm:col-6 md:col-6 lg:col-6  justify-content-start"
            style={{ display: "flex" }}
          >
            <p> نوع کارب :طلایی</p>
          </div>
        </div>
        <Divider type="solid" />

        {/* --------------------------- authntication  ---------------------- */}
        <div className="col-12 grid flex justify-content-center">
          <h1 className="text-5xl col-12 justify-content-center  ">
            -----احرازهویت------
          </h1>
          <div className="flex  col-12 w-5    ">
            <img src={image1} alt="" className="  " />
          </div>
          <div className="col-12">
            <p className="text-4xl mt-12">52154651486514651613 :شماره شبا</p>

            <button className="text-3xl  p-4 mt-4  ">ویرایش</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PersonalInfo;

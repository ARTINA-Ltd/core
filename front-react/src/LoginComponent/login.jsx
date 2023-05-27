import { useState, useContext } from "react";
import "./login-styles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { UserChangeContext } from "../App";
import SimpleInput from "../components/Inputs/SimpleInput";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "./../components/Cards/UserDashboardCards/SimpleCard";
import BorderButton from "../components/Buttons/BorderButton";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const userChange = useContext(UserChangeContext);

  // const loginUser = useContext(AuthContext);
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const username = e.target.username.value;
  //     const password = e.target.password.value;
  //     console.log(username, password)
  //     username.length > 0 && loginUser(username, password);
  // }

  //     "id": 1,
  //     "name": "غروب و دریا",
  //     "creator": "بهروز فاتحی",
  //     "date": "2022-12-30T00:00:00Z",
  //     "last_price": 12,
  // "base64_image":
  // "start_date": null,
  //     "end_date": null,
  //     "description": "این توضیحاتی برای اثر غروب و دریا است.",
  //     "external_link": "http://www.google.com",

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://api.artina.org/api/account/login/",
        {
          username: values.username,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authTokens", res.data.access);
          userChange(res);
          Notify.success("با موفقیت وارد شدید");
          navigate("/profile");
        }
      })
      .catch((res) => {
        Notify.failure("خطا");
      });
    // const response = await fetch(
    //   "http://78.38.35.249:8000/api/account/login/",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: values.username,
    //       password: values.password,
    //     }),
    //   }
    // );

    // const data = await response.json();

    // if (response.status === 200) {
    //   localStorage.setItem("authTokens", data.access);
    //   alert("با موفقیت وارد شدید");
    //   navigate("/profile");
    // } else {
    //   alert("Something went wrong!");
    // }
  };

  return (
    <TestLayout className="flex items-center justify-center form-input w-full">
      <SimpleCard className={"bg-[#ffffff] w-[450px] sm:m-4"}>
        <div className="text-[24px] text-center">ورود به سایت</div>
        <SimpleInput
          className={"mt-6"}
          type="text"
          title="نام کاربری"
          placeholder="مثلا: علیرضا"
          isValid={values.username != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <SimpleInput
          className={"mt-6"}
          type="password"
          title="رمز عبور"
          placeholder="مثلا: علیرضا"
          isValid={values.password != ""}
          validationError="نمیتواند خالی باشد"
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          defaultValue={""}
        />
        <div className="flex justify-center mt-5">
          <BorderButton onClick={handleSubmit}>ورود</BorderButton>
        </div>
        <div
          className="text-[16px] mt-3 opacity-40 cursor-pointer text-center"
          onClick={() => navigate("/forget-password")}
        >
          فراموشی رمز عبور!
        </div>

        <div className="flex mt-5 items-center justify-center text-[16px] gap-4">
          حساب کاربری ندارید؟
          <div
            className=" text-[14px] bg-[#0000aa08] py-2 px-[4rem] sm:px-[3rem] rounded-lg cursor-pointer transition-all hover:bg-[#0000aa11]"
            onClick={() => navigate("/register")}
          >
            ثبت نام
          </div>
        </div>
      </SimpleCard>
    </TestLayout>
  );
};

export default Login;

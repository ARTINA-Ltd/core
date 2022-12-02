import { useContext } from "react";
import UserInfo from "./UserInfo";
import AuthContext from "./AuthContext";
import {Link} from "react-router-dom";
import React from 'react';
import './index.css'
import Navbar from "./nav-bar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer-component";
const Home = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div className={" "}>
            <Navbar/>
        <div className="flex justify-center bg-background bg-no-repeat bg-cover      ">
            <ul className={"flex justify-center "}>
            <div
                className="rec rounded-[0.5rem] h-[400px]  bg-[#7c73e8] m-16 hover:drop-shadow-4xl  md:w-[400px] sm:w-[350px] lg:w-[500px] text-center">
                <span  className={"flex justify-center mt-12 mr-2 text-5xl font-extrabold text-white "}>ورود</span>
                <span
                    className={"text-white flex justify-center mt-2 text-center  md:text-left sm:text-left  text-xl font-bold"}> به وبسایت ما خوش امدید با عضویت و ثبت نام در وب سایت ما <br />به دنیای دیگری وارد شوید!!!</span>
                <div className={"flex justify-center items-center mr-9"}>
                    <ul>
                        <li>
                            <span className={"mr-8 mt-3 font-bold text-2xl text-center flex justify-center"}>نام کاربری</span>
                        </li>
                        <li>
                            <input dir="rtl" placeholder="نام کاربری"
                                className={"flex justify-center p-2 ml-8 mr-10 mt-2 flex rounded-[.3rem]  md:w-[300px] sm:w-[250px] lg:w-[350px] "}
                                type="text" />
                        </li>
                        <li>
                            <span className={"mr-8 mt-4 font-bold text-2xl text-center"}> رمز عبور</span>
                        </li>
                        <li>
                            <input dir="rtl" placeholder="رمز عبور"
                                className={"flex justify-center p-2 ml-8 mr-10 mt-2  rounded-[.3rem]  md:w-[300px] sm:w-[250px] lg:w-[350px] "}
                                type="password" />
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center">

                    <Link to="/">
                        <button type={"button"}
                                className={" rounded-[0.6rem] text-2xl font-bold text-black bg-[#feeae3] h-[35px] w-[150px] md:w-[250px] sm:w-[200px] lg:w-[300px]    mt-8   p-2"}> ورود
                        </button>
                    </Link>
                </div>
                <Link to="/signup"
                      className={"flex justify-center mt-8 text-white text-2xl  hover:text-black  text-decoration-none"}> ثبت
                                                                                                                 نام
                                                                                                                 نکرده
                                                                                                                 اید؟</Link>
                <Link to="/"
                      className={"flex justify-center mt-4 text-white text-2xl hover:text-black  text-decoration-none"}>فراموشی
                                                                                                                رمز
                                                                                                                عبور</Link>

            </div>

            </ul>
        </div>
        <Footer/>

    </div>
    );
};

export default Home;
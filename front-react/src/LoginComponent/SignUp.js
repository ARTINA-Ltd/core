import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./nav-bar";
import Footer from "./footer-component";
import Section_1 from "../mehdizade_project/artist_page/src/component/section-1_component";
import './SignUP.css';
const SignUp = () => {
    const  loginUser  = useContext(AuthContext);
    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        username.length > 0 && loginUser(username, password);
    };

    return (
        <div>
            <Navbar/>
            <div className=" flex justify-center"dir="rtl">
                <ul className={"col-5 "}>
                    <div className="rec1 rounded-[0.5rem] bg-[#7c73e8] m-10">
                        <span className={"flex justify-center pt-4 mt-2 mr-2 text-5xl font-extrabold text-white "}>ثبت نام</span>
                        <div className={"flex justify-center items-center mr-9  "}>
                            <ul>
                                <li>
                                    <span className={" mt-4 font-bold text-2xl flex text-right"}> نام </span>
                                </li>
                                <li>
                                    <input  dir="rtl"
                                        className={"userinput"}
                                        type="text" />
                                </li>
                                <li>
                                    <span className={" mt-4 font-bold  text-2xl  flex text-right"}> رمز عبور</span>
                                </li>
                                <li>
                                    <input  dir="rtl"
                                        className={"userinput"}                                        type="password" />
                                </li>
                                <li>
                                    <span className={" mt-4 font-bold text-2xl  flex text-right"}>ایمیل</span>
                                </li>
                                <li>
                                    <input  dir="rtl"
                                        className={"userinput"}
                                        type="email" />
                                </li>
                                <li>
                                    <span className={"mt-4 font-bold text-2xl  flex text-right"}>شماره تماس</span>
                                </li>
                                <li>
                                    <input  dir="rtl"
                                        className={"userinput   "}
                                        type="tel" />
                                </li>
                                <li>
                                    <span className={" mt-4 font-bold text-2xl  flex text-right"}> تاریخ تولد</span>
                                </li>
                                <li>
                                    <input  dir="rtl"
                                        className={"userinput      "}
                                        type="date" />
                           </li>
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/signup">
                                <button type={"button"}
                                        className={"loginbutton text-3xl font-bold  text-black  "}> ثبت نام
                                </button>
                            </Link>
                        </div>
                        <Link to="/"
                              className={"flex justify-center mt-4 text-2xl mb-8 text-white"}>ورود</Link>
                    </div>
                </ul>
                <div className="col-7 flex justify-center">
            <img className="image" src={(require("./images/section-3-1.png"))} alt="Girl in a jacket" ></img> 
            </div>
            </div>  
            <Footer/>
            </div>
    );
};
export default SignUp;
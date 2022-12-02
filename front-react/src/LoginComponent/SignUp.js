import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";
import Navbar from "./nav-bar";
import Footer from "./footer-component";
import Section_1 from "../mehdizade_project/artist_page/src/component/section-1_component";
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
            <div className="bg-background2 bg-no-repeat bg-cover hover:backdrop-blur-lg flex  justify-center ">
                <ul className={""}>
                    <div
                        className="rec rounded-[0.5rem]   bg-[#7c73e8] m-10  hover:drop-shadow-2xl w-[220px] md:w-[330px] sm:w-[300px] lg:w-[400px] ">
                        <span className={"flex justify-center mt-2 mr-2 text-5xl font-extrabold text-white "}>ثبت نام</span>
                        <span
                            className={"text-white flex justify-center mt-2 text-center  md:text-left sm:text-left  text-xl font-bold"}> به وبسایت ما خوش امدید با عضویت و ثبت نام در وب سایت ما <br />به دنیای دیگری وارد شوید!!!</span>
                        <div className={"flex justify-center items-center mr-9  "}>
                            <ul>
                                <li>
                                    <span className={"mr-8 mt-3 font-bold text-2xl text-center"}> نام </span>
                                </li>
                                <li>
                                    <input placeholder="نام کاربری " dir="rtl"
                                        className={"p-2 ml-8 mr-8 mt-2 flex rounded-[.3rem]   w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="text" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold  text-2xl"}> رمز عبور</span>
                                </li>
                                <li>
                                    <input placeholder="رمز عبور " dir="rtl"
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}                                        type="password" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold text-2xl"}>ایمیل</span>
                                </li>
                                <li>
                                    <input placeholder="ایمیل " dir="rtl"
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="email" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold text-2xl"}>شماره تماس</span>
                                </li>
                                <li>
                                    <input placeholder="شماره تماس" dir="rtl"
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="tel" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold text-2xl"}> تاریخ تولد</span>
                                </li>
                                <li>
                                    <input placeholder="تاریخ تولد" dir="rtl"
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="date" />
                           </li>
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/signup">
                                <button type={"button"}
                                        className={"text-3xl font-bold rounded-[0.6rem] text-black bg-[#feeae3] h-[35px] w-[150px] md:w-[250px] sm:w-[200px] lg:w-[300px]    mt-8   p-2"}> ثبت نام
                                </button>
                            </Link>
                        </div>
                        <Link to="/"
                              className={"flex justify-center mt-4 text-2xl mb-8 text-white  hover:text-black  text-decoration-none"}>ورود</Link>
                    </div>
                </ul>
            </div>  
            <Footer/>
            </div>
    );
};
export default SignUp;
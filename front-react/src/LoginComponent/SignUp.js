import {Link} from "react-router-dom";

function SignUp() {
    function handlelogin(){

    }
    return<>

        <div className={""}>

            <div className="flex   items-center h-[70px]  bg-gradient-to-r from-[#FFDED2] to-[#7C73E8] sticky-top">

                <div className="flex items-center  text-decoration-none ">

                    <div className={"flex justify-start items-center  container"}>
                        <ul>
                            <Link to={"/"}
                                  className={"text-white hover:text-blue-800  text-decoration-none flex items-center mb-2 mr-2 mt-2 font-bold"}> ورود </Link>
                            <Link to={"/SignUp"}
                                  className={"text-white hover:text-blue-800 text-decoration-none flex items-center mr-2 mt-2 font-bold"}>خانه</Link>
                        </ul>
                    </div>
                    <div className={"flex justify-end items-center container"}>

                        <Link to={"/"} className={"text-purple-900 hover:text-white text-decoration-none  mb-2 ml-2   font-bold "}>درباره ما</Link>
                    </div>
                </div>

            </div>


            <div className="bg-background2 bg-no-repeat bg-cover hover:backdrop-blur-lg flex  justify-center ">
                <ul className={"transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"}>
                    <div
                        className="rec rounded-[0.5rem]   bg-[#7c73e8] m-10  hover:drop-shadow-2xl w-[220px] md:w-[330px] sm:w-[300px] lg:w-[400px] ">
                        <span className={"flex justify-center mt-2 mr-2 text-2xl font-extrabold text-white "}>ثبت نام</span>
                        <span
                            className={"text-white flex justify-center mt-2 text-center  md:text-left sm:text-left  text-xs"}> به وبسایت ما خوش امدید با عضویت و ثبت نام در وب سایت ما <br />به دنیای دیگری وارد شوید!!!</span>
                        <div className={"flex justify-center items-center mr-9  "}>
                            <ul>
                                <li>
                                    <span className={"mr-8 mt-3 font-bold"}> نام </span>
                                </li>
                                <li>
                                    <input
                                        className={"p-2 ml-8 mr-8 mt-2 flex rounded-[.3rem]   w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="text" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold"}> رمز عبور</span>
                                </li>
                                <li>
                                    <input
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}                                        type="password" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold"}>ایمیل</span>
                                </li>
                                <li>
                                    <input
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="email" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold"}>شماره تماس</span>
                                </li>
                                <li>
                                    <input
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="tel" />
                                </li>
                                <li>
                                    <span className={"mr-8 mt-4 font-bold"}> تاریخ تولد</span>
                                </li>
                                <li>
                                    <input
                                        className={"p-2 ml-8 mr-8 mt-2  rounded-[.3rem]  w-[200px] md:w-[270px] sm:w-[230px] lg:w-[350px] "}
                                        type="date" />
                           </li>
                            </ul>
                        </div>
                        <div className="flex justify-center">

                            <Link to="/App">
                                <button type={"button"}
                                        className={" rounded-[0.6rem] text-black bg-[#feeae3] h-[35px] w-[150px] md:w-[250px] sm:w-[200px] lg:w-[300px]   transition ease-in-out delay-75  hover:-translate-y-1 hover:scale-110 hover:bg-[#c4c1e0] hover:animate-bounce duration-300 mt-8   p-2"}> ثبت نام
                                </button>
                            </Link>
                        </div>
                        <Link to="/App"
                              className={"flex justify-center mt-2 mb-4 text-white  hover:text-black  text-decoration-none"}>ورود</Link>


                    </div>


                    <span className={"text-black flex justify-center items-end font-semibold text-center text-lg "}>کلیه حقوق مادی و معنوی این اثر متعلق به شرکت آرتینا می باشد</span>
                </ul>
            </div>
        </div>


    </>

}export default SignUp;
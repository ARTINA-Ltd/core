import { useContext ,useEffect,useState} from "react";
import UserInfo from "./UserInfo";
import AuthContext from "./AuthContext";
import {Link} from "react-router-dom";
import React from 'react';
import './index.css'
import Navbar from "./nav-bar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer-component";
import axios from "axios"
import './HomePage.css'
import { Alert } from "bootstrap";
const Home = () => {
    const { user, logoutUser } = useContext(AuthContext);
const userName=document.getElementById('username')
const password=document.getElementById('password')
console.log(userName)
const [UserName, setUserName] = useState([""]);
const [PassWord, setPassWord] = useState([""]);

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const Baseurl=``
useEffect(() => {
  const fetchExhibitions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/token/`
      );
      setUserName(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserName(null);
    }}
  fetchExhibitions();
}, []);

useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/token/`
        );
        setPassWord(res.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPassWord(null);
      }}
    fetchExhibitions();
  }, []);
console.log(PassWord);

function Handlelogin(){
    if (UserName!==userName && PassWord!==password) {
        {<Link to={"/"}></Link>}
    }
    else{
        alert("invalid")
    }
}
    return (
        <div className={" "} >
            <Navbar/>
            {/* <div className="container">         */}
        <div className=" flex justify-center   bg-no-repeat      " dir='rtl'>
            <ul className={"properties col-6 flex justify-start "}>
            <div className="rec rounded-[0.5rem]  bg-[#7c73e8]    text-center">
                <span  className={"flex justify-center mt-4  text-6xl font-extrabold text-white "}>ورود</span>
                <span
                    className={"disceiption text-white flex justify-center mt-2 lg:text-center  md:text-center sm:text-center   "}>  با عضویت و ثبت نام در وب سایت ما <br/> به دنیای دیگری وارد شوید!!!</span>
                <div className={"flex justify-center items-center mr-9"}>
                    <ul>
                        
                        <li>
                        <label className={"ml-8 mt-4 font-bold text-2xl text-right flex "}>نام کاربری </label>
                            <input 
                               id="username" className={"userinput flex justify-center"}
                                type="text" />
                        </li>
                        <li>
                        <span className={"ml-8 mt-4 font-bold text-2xl text-right flex"}> رمز عبور</span>

                            <input dir="rtl" 
                               id="password" className={"passinput flex justify-center"}
                                type="password" />
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center">

                    {/* <Link to="/"> */}
                        <button type={"button"}
                                onClick={Handlelogin}
                                className={"loginbutton text-2xl font-bold text-black     "}> ورود
                        </button>
                    {/* </Link> */}

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
            <div className="col-3 flex justify-center">
            <img className="image" src={(require("./images/section-3-1.png"))} alt="Girl in a jacket" ></img> 
            </div>
            </div>
        {/* </div> */}
        <Footer/>

    </div>
    );
};

export default Home;
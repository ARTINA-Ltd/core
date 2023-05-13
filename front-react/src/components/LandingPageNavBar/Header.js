import React, { useState, useContext, useEffect } from "react";
import "./Header.css";
import Logo from "../../Pages/artina-logo.jpg";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { UserChangeContext } from "../../App";
import { ConnectWallet } from "@thirdweb-dev/react";

const Header = ({ connectWallet = false }) => {
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);

  const [username, setUsername] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked((e) => !e);
  };

  const NotActiveItems = [
    {
      title: "صفحه اصلی",
      link: "/",
    },
    {
      title: "ارتباط با ما",
      link: "/contact",
    },
    {
      title: "پشتیبانی",
      link: "/support",
    },
    {
      title: "بلاگ",
      link: "/",
    },
  ];

  const ActiveItems = [
    {
      title: "داشبورد",
      link: "/",
    },
    {
      title: "درخواست‌ها",
      link: "/",
    },
    {
      title: "ارتباط با ما",
      link: "/contact",
    },
    {
      title: "پشتیبانی",
      link: "/support",
    },
    {
      title: "بلاگ",
      link: "/",
    },
    {
      title: "کارمزد",
      link: "/Commission",
    },
    {
      title: "ضرب اثر",
      link: "/upload-page",
    },
    {
      title: "مجموعه من",
      link: "/collections",
    },
  ];

  useEffect(() => {
    setUsername((e) => (user ? user.data.username : e));
  }, [user]);

  return (
    <>
      <header>
        <div className="navbar-menu flex justify-center text-[16px] text-white">
          <div className="navbar-link-logo " onClick={handleClick}>
            <i
              className={clicked ? "pi  pi-times" : " pi pi-bars "}
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="flex items-center justify-end lg:justify-between w-[90%] justify-self-center lg:w-[80%]">
            <div className="flex items-center gap-12">
              {user
                ? ActiveItems.map((item) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(item.link);
                      }}
                    >
                      {item.title}
                    </div>
                  ))
                : NotActiveItems.map((item) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(item.link);
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
              <a href="https://metaverse.artina.org" className="cursor-pointer bg-rose-500 hover:text-white hover:bg-rose-600 transition-all px-5 py-2 rounded-md">
                متاورس
              </a>
              {connectWallet === true ? (
                <div>
                  <ConnectWallet
                    btnTitle="کانکت والت"
                    colorMode="dark"
                    accentColor="#ffffff40"
                    className="m-0 p-0 scale-75 border-none text-white hover:bg-indigo-400 transition-all"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex gap-5 items-center">
              {user ? (
                <>
                  <div>{username}</div>
                  <div
                    className="cursor-pointer border-[#ffffff40] bg-[#ffffff30]  px-5 py-2  rounded-md"
                    onClick={(e) => {
                      navigate("/login");
                      setUsername();
                      localStorage.setItem("authTokens", null);
                      userChange(e);
                    }}
                  >
                    خروج
                  </div>
                </>
              ) : (
                <div
                  className="cursor-pointer border-[#ffffff40] bg-[#ffffff30]   px-5 py-2 rounded-md"
                  onClick={() => {
                    setUsername(username);
                    navigate("/login");
                  }}
                >
                  ورود
                </div>
              )}

              <img src={Logo} alt="logo" onClick={userChange}/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

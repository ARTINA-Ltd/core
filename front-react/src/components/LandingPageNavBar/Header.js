import React, { useState, useContext,useEffect } from "react";
import "./Header.css";
import Logo from "../../Pages/artina-logo.jpg";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";

const Header = () => {
  const user = useContext(UserContext);

  const [username, setUsername] = useState();
  const [clicked, setClicked] = useState(false);
  const Token = localStorage.getItem("authTokens");
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked((e) => !e);
  };

  const NotActiveItems = [
    {
      title: "درباره‌ما",
      link: "/",
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
      title: "درباره‌ما",
      link: "/",
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
      link: "/",
    },
    {
      title: "کانکت والت",
      link: "/",
    },
  ];

  useEffect(() => {
    setUsername((e) => user? user.data.username : e)
  }, [user]);
  const ActiveUser = () => {
    return (
      // <>
      //   <header className="home-header flex ">
      //     {/*<h2>Inc. This Morning</h2>*/}
      //     <div className="navbar-menu p-2 w-full justify-content-start ">
      //       <div className="navbar-link-logo " onClick={handleClick}>
      //         <i
      //           className={clicked ? "pi  pi-times" : " pi pi-bars "}
      //           style={{ fontSize: "2rem" }}
      //         ></i>
      //       </div>
      //       <div className=" justify-content-canter">
      //         <ul
      //           className={
      //             clicked
      //               ? "navbar-item active w-full mt-8 p-2"
      //               : "w-full navbar-item justify-content-canter"
      //           }
      //           style={{ fontSize: "2rem" }}
      //         >
      //           <a href="" className="navbar-link">
      //             {" "}
      //           </a>
      //           <a href="" className="navbar-link-exp font">
      //             خانه
      //           </a>
      //           <a href="" className="navbar-link-exp font p-2">
      //             درباره{" "}
      //           </a>
      //           <a href="" className="navbar-link-exp  font">
      //             پشتیبانی
      //           </a>
      //           <a href="" className="navbar-link-exp font">
      //             پشتیبانی
      //           </a>

      //           <a
      //             href=""
      //             className="navbar-link-1 font"
      //             onClick={() => {
      //               navigate("/login");
      //               localStorage.setItem("authTokens", null);
      //             }}
      //           >
      //             {" "}
      //             خروج{" "}
      //           </a>
      //         </ul>
      //       </div>
      //       <div className="navbar-menue  w-full   justify-content-end  ">
      //         <a
      //           href=""
      //           className="navbar-link-2  font"
      //           style={{ color: "#424874" }}
      //           onClick={() => {
      //             navigate("/login");
      //             localStorage.setItem("authTokens", null);
      //           }}
      //         >
      //           {" "}
      //           خروج{" "}
      //         </a>
      //         <div className="navbar-logo        ">
      //           <img src={Logo} alt="logo" />
      //         </div>
      //       </div>
      //     </div>
      //   </header>
      // </>
      <>
        <header>
          {/*<h2>Inc. This Morning</h2>*/}
          <div className="navbar-menu flex justify-center text-[16px] text-white">
            <div className="navbar-link-logo " onClick={handleClick}>
              <i
                className={clicked ? "pi  pi-times" : " pi pi-bars "}
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
            <div className="flex items-center justify-end lg:justify-between w-[90%] justify-self-center lg:w-[80%]">
              <div
                className={
                  clicked
                    ? "navbar-item active w-full mt-8 p-2"
                    : "w-full hidden gap-8 lg:flex"
                }
              >
                {ActiveItems.map((item) => (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>

              <div className="flex gap-5 items-center">
                <div>{username}</div>
                <div
                  className="cursor-pointer border-white border-1 px-4 py-2  rounded-md"
                  onClick={() => {
                    navigate("/login");
                    localStorage.setItem("authTokens", null);
                  }}
                >
                  خروج
                </div>
                <img src={Logo} alt="logo" />
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };

  const NoActiveUser = () => {
    return (
      <>
        <header>
          {/*<h2>Inc. This Morning</h2>*/}
          <div className="navbar-menu flex justify-center text-[16px]">
            <div className="navbar-link-logo " onClick={handleClick}>
              <i
                className={clicked ? "pi  pi-times" : " pi pi-bars "}
                style={{ fontSize: "2rem" }}
              ></i>
            </div>
            <div className="flex items-center justify-end lg:justify-between w-[90%] justify-self-center lg:w-[80%]">
              <div
                className={
                  clicked
                    ? "navbar-item active w-full mt-8 p-2"
                    : "w-full hidden gap-8 lg:flex"
                }
              >
                {NotActiveItems.map((item) => (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>

              <div className="flex gap-5 items-center">
                <div
                  className="cursor-pointer border-black border-1 px-4 py-2 rounded-md"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  ورود
                </div>
                <img src={Logo} alt="logo" />
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };
  return <>{Token === "null" ? <NoActiveUser /> : <ActiveUser />}</>;
};

export default Header;

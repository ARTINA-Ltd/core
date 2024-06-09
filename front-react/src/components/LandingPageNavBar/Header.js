import React, { useState, useContext, useEffect, Fragment } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { UserChangeContext } from "../../App";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import BorderButton from "../Buttons/BorderButton";
import BalanceDialog from "../Dialog/BalanceDialog/BalanceDialog";
import { useRef } from "react";
import axios from "axios";
import { MdOutlineCollections, MdOutlineCollectionsBookmark, MdSupportAgent } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { RiNftFill } from "react-icons/ri";
import { TbActivity } from "react-icons/tb";
import { FaHome, FaPhoneAlt, FaQuestionCircle, FaBlogger } from "react-icons/fa";
import BalanceDialogMatic from "../Dialog/BalanceDialog/BalanceDialogMatic";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./../LanguageSelector/LanguageSelector";
import ThemeSwitcher from "./../ThemeSwitcher/ThemeSwitcher";
const Header = ({ connectWallet = false, rev = false }) => {
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [username, setUsername] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [firstFiveNotifs, setFirstFiveNotifs] = useState([]);
  const [notifsToShow, setNotifsToShow] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuIsVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NotActiveItems = [
    {
      title: t("mainPage"),
      link: "/",
      icon: <FaHome className="w-5 h-5 ml-1 text-primary" />,
    },
    {
      title: t("contactUs"),
      link: "/contact",
      icon: <FaPhoneAlt className="w-5 h-5 ml-1 text-primary" />,
    },
    {
      title: t("aboutUs"),
      link: "/about-us",
      icon: <FaQuestionCircle className="w-6 h-6  ml-1 text-primary" />,
    },
    {
      title: t("support"),
      link: "/support",
      icon: <MdSupportAgent className="w-6 h-6 ml-1 text-primary" />,
    },
    {
      title: t("blog"),
      link: "https://artina-blog.ir/",
      icon: <FaBlogger className="w-6 h-6 ml-1 text-primary" />,
    },
  ];

  const ActiveItems = [
    {
      title: t("mainPage"),
      link: "/",
      icon: <FaHome className="w-5 h-5 ml-1 text-primary" />,
    },

    {
      title: t("contactUs"),
      link: "/contact",
      icon: <FaPhoneAlt className="w-5 h-5 ml-1 text-primary" />,
    },
    {
      title: "",
      link: "",
      icon: (
        <div className="dropdown">
          <div tabIndex={0} role="button" className="flex m-0 font-normal  p-0 shadow-none">
            <MdOutlineCollections className="w-6 h-6 ml-1 text-primary" />
            {t("collections")}
          </div>
          <ul className="p-2 shadow menu dropdown-content hover:text-black z-[20] bg-base-300 rounded-box w-52">
            <li>
              <a className="hover:text-primary" href="/user-collections">
                {t("artists")}
              </a>
            </li>
            <li>
              <a href="/all-collections" className="hover:text-primary">
                {t("nfts")}
              </a>
            </li>
          </ul>
        </div>
      ),
    },

    {
      title: t("addArt"),
      link: user?.data?.role === "user_zero" ? null : "/pre-mint",
      icon: <RiNftFill className="w-6 h-6 ml-1 text-primary" />,
    },
    {
      title: t("activityManagement"),
      link: user?.data?.role === "user_zero" ? null : "/exhibitor",
      icon: <TbActivity className="w-6 h-6 ml-1 text-primary" />,
    },
    {
      title: t("myCollection"),
      link: user ? `/collections/${user.data.username}` : "/",
      icon: <MdOutlineCollectionsBookmark className="w-6 h-6 ml-1 text-primary" />,
    },
  ];

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/account/NotifyUserViewSet/notifList/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((d) => {
        setNotifs(d.data);
        setFirstFiveNotifs(d.data.slice(0, 5));
        setNotifsToShow(d.data.slice(5));
      });
  }, []);

  const handleClickSeen = (notifId) => {
    axios
      .post(
        "https://api.artina.org/api/account/NotifyUserViewSet/seenMsg/",
        {
          notif_id: notifId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((d) => {
        axios
          .get("https://api.artina.org/api/account/NotifyUserViewSet/notifList/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
          })
          .then((d) => {
            setNotifs(d.data);
          });
      });
  };

  useEffect(() => {
    setUsername((e) => (user ? user.data.username : e));
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsHidden(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref2.current && !ref2.current.contains(event.target)) {
        setIsHidden2(true);
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref2]);
  console.log(user);
  return (
    <Fragment>
      <header>
        <div className={`flex bg-base-300 justify-center h-[80px] sm:h-[60px] ${rev ? "" : "bg-base-300"}  font-b3`}>
          <div className="flex items-center justify-between w-[90%] justify-self-center">
            <div className="flex items-center gap-4 text-sm lg:hidden">
              {user
                ? ActiveItems.map((item, index) => (
                    <div
                      key={index}
                      className="cursor-pointer flex items-center gap-1  hover:text-accent transition-all duration-200"
                      onClick={() => {
                        item.link === null ? Notify.failure("ابتدا باید در صفحه ی پروفایل، هویت خود را احزار کنید") : navigate(item.link);
                      }}
                    >
                      {item.icon}
                      {item.title}
                    </div>
                  ))
                : NotActiveItems.map((item, index) => (
                    <a href={item.link} className="cursor-pointer flex items-center gap-1 hover:text-accent transition-all duration-200" key={index}>
                      {item.icon}
                      {item.title}
                    </a>
                  ))}
              <div className="bg-base-100 cursor-pointer text-primary px-3 py-[4px] rounded-full hover:scale-105 transition-all duration-200 border-primary border-[1px]" onClick={() => navigate("/metaverse")}>
                {t("metaverse")}{" "}
              </div>
            </div>
            <div className="lg:flex hidden cursor-pointer " onClick={() => setMenuVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </div>
            <div className="flex gap-2 items-center ">
              {connectWallet === true ? <ConnectWallet btnTitle={t("linkWallet")} colorMode="dark" accentColor="#4e45d0" className=" scale-75 border-none text-white hover:bg-indigo-400 transition-all w-full " /> : ""}
              <LanguageSelector />
              <ThemeSwitcher />

              {user ? (
                <Fragment>
                  <div ref={ref2}>
                    <div className="cursor-pointer p-1 w-8 hover:bg-base-100  rounded-lg transition-all" onClick={() => setIsHidden2((prev) => !prev)}>
                      {notifs.length > 1 && <span className="absolute translate-x-1 -translate-y-[40%] bg-red-400 w-4 h-4 text-sm text-center rounded-full font-bold">{notifs.length}</span>}
                      <GoBell className="text-2xl font-bold" />
                    </div>
                    <div className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-base-300 min-w-[250px] ${isHidden2 ? "opacity-0 pointer-events-none" : ""} absolute  ${i18n.dir() === "rtl" ? "translate-x-1/3" : "-translate-x-1/3"}`}>
                      {notifs &&
                        firstFiveNotifs.map((item, index) => (
                          <span key={index}>
                            <div className="w-full py-2 px-3 hover:bg-base-100 rounded-xl flex gap-6 items-center justify-between cursor-pointer">
                              <div className="flex flex-col">
                                <div>{item.text}</div>
                                <div className="text-sm opacity-50">
                                  <span className="px-1">{t("inDate")}</span>
                                  {Intl.DateTimeFormat("fa", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                  }).format(new Date(item.created_at))}
                                </div>
                              </div>
                              {item.message_seen ? (
                                <div></div>
                              ) : (
                                <div className="px-2 bg-green-200 hover:bg-green-300 text-black text-center rounded-lg py-1 text-sm" onClick={() => handleClickSeen(item.id)}>
                                  {t("seen")}{" "}
                                </div>
                              )}
                            </div>
                            {index == notifs.length - 1 ? <div></div> : <hr />}
                          </span>
                        ))}
                      {notifs.length > 5 && (
                        <button
                          className={`${isExpanded ? "hidden" : "visible"} p-4 w-full text-center block ease-in-out duration-200 hover:bg-base-100`}
                          onClick={() => {
                            setIsExpanded(true);
                          }}
                        >
                          {t("showAll")}{" "}
                        </button>
                      )}
                      <div className={`${isExpanded ? "visible" : "hidden"}`}>
                        {notifsToShow.map((item, index) => (
                          <span key={index}>
                            <div className="w-full py-2 px-3 hover:bg-base-100 flex gap-6 items-center justify-between cursor-pointer">
                              <div className="flex flex-col">
                                <div>{item.text}</div>
                                <div className="text-sm opacity-50">
                                  <span className="px-1">{t("inDate")}</span>
                                  {Intl.DateTimeFormat("fa", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                  }).format(new Date(item.created_at))}
                                </div>
                              </div>
                              {item.message_seen ? (
                                <div></div>
                              ) : (
                                <div className="px-2 bg-green-100 hover:bg-green-200 rounded-lg py-1 text-sm" onClick={() => handleClickSeen(item.id)}>
                                  {t("seen")}{" "}
                                </div>
                              )}
                            </div>
                            {index == notifs.length - 1 ? <div></div> : <hr />}
                          </span>
                        ))}
                        <button
                          className={`${isExpanded ? "visible" : "hidden"} p-4 w-full text-center block ease-in-out duration-200 hover:bg-base-100`}
                          onClick={() => {
                            setIsExpanded(false);
                          }}
                        >
                          مشاهده کمتر
                        </button>
                      </div>
                    </div>
                  </div>

                  <div ref={ref}>
                    <img src={user.data.profile_picture} className="rounded-full w-[46px] h-[46px] object-cover cursor-pointer" onClick={() => setIsHidden((prev) => !prev)} alt="" />
                    <div className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-base-300 min-w-[250px] ${isHidden ? "opacity-0 pointer-events-none" : ""} absolute ${i18n.dir() === "rtl" ? "translate-x-2/3" : "-translate-x-2/3"}`}>
                      <div className="w-full py-2 px-3 hover:bg-base-100 flex gap-2 items-center justify-between cursor-pointer">
                        <img src={user.data.profile_picture} className="rounded-full  w-[55px] h-[55px] object-cover  shrink-0" alt="" />
                        <div>
                          <div className="text-left text-sm font-b5 ">
                            {user.data.first_name} {user.data.last_name}
                          </div>
                          <div className="text-left font-b2 text-sm">{user.data.username}</div>
                        </div>
                      </div>
                      <hr />
                      <div className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-base-100" onClick={() => navigate("/dashboard")}>
                        {t("dashboard")}
                      </div>
                      <BalanceDialog />
                      <BalanceDialogMatic />
                      <div className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-base-100" onClick={() => navigate("/profile")}>
                        {t("profile")}
                      </div>

                      <div
                        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-base-100 rounded-xl"
                        onClick={(e) => {
                          navigate("/login");
                          setUsername();
                          localStorage.removeItem("authTokens");
                          userChange(e);
                        }}
                      >
                        {t("logout")}
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <BorderButton
                  onClick={() => {
                    setUsername(username);
                    navigate("/login");
                  }}
                >
                  {t("login")}
                </BorderButton>
              )}

              <img className="h-16 sm:h-12 rounded-lg cursor-pointer" src={"/Artina-Logo-1.jpeg"} alt="logo" onClick={() => navigate("/")} />
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed w-full h-full z-50 inset-0 bg-base-300 ${menuIsVisible ? "" : "translate-x-full"}  transition-all duration-500 ease-out`}>
        <div className="w-full flex justify-end p-5" onClick={() => setMenuVisible(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bgred">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {user
            ? ActiveItems.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer flex items-center gap-1 hover:text-accent transition-all duration-200 px-5 py-2 bg-base-100 rounded-lg w-[90%]"
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.icon}
                  {item.title}
                </div>
              ))
            : NotActiveItems.map((item, index) => (
                <a href={item.link} className="cursor-pointer flex items-center gap-1 hover:text-accent transition-all duration-200 px-5 py-2 bg-base-100 rounded-lg w-[90%]" key={index}>
                  {item.icon}
                  {item.title}
                </a>
              ))}

          <div className="cursor-pointer flex items-center gap-1 text-white transition-all duration-200 px-5 py-2 bg-[#4e45d0] rounded-lg w-[90%]" onClick={() => navigate("/metaverse")}>
            {t("metaverse")}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;

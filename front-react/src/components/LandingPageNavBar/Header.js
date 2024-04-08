import React, { useState, useContext, useEffect, Fragment } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { UserChangeContext } from "../../App";
import { ConnectWallet } from "@thirdweb-dev/react";
import BorderButton from "../Buttons/BorderButton";
import BalanceDialog from "../Dialog/BalanceDialog/BalanceDialog";
import { useRef } from "react";
import axios from "axios";
import {
  MdOutlineLanguage,
  MdOutlineCollections,
  MdOutlineCollectionsBookmark,
  MdSupportAgent,
} from "react-icons/md";
import { RiNftFill } from "react-icons/ri";
import { TbActivity } from "react-icons/tb";
import {
  FaHome,
  FaPhoneAlt,
  FaQuestionCircle,
  FaBlogger,
} from "react-icons/fa";
import BalanceDialogMatic from "../Dialog/BalanceDialog/BalanceDialogMatic";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
const Header = ({ connectWallet = false, rev = false }) => {
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [username, setUsername] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [menuIsVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NotActiveItems = [
    {
      title: t("mainPage"),
      link: "/",
      icon: <FaHome className="w-5 h-5 ml-1 text-[#6860db]" />,
    },
    {
      title: t("contactUs"),
      link: "/contact",
      icon: <FaPhoneAlt className="w-5 h-5 ml-1 text-[#6860db]" />,
    },
    {
      title: t("aboutUs"),
      link: "/about-us",
      icon: <FaQuestionCircle className="w-6 h-6  ml-1 text-[#6860db]" />,
    },
    {
      title: t("support"),
      link: "/support",
      icon: <MdSupportAgent className="w-6 h-6 ml-1 text-[#6860db]" />,
    },
    {
      title: t("blog"),
      link: "//blog.artina.org",
      icon: <FaBlogger className="w-6 h-6 ml-1 text-[#6860db]" />,
    },
  ];

  const ActiveItems = [
    {
      title: t("mainPage"),
      link: "/",
      icon: <FaHome className="w-5 h-5 ml-1 text-[#6860db]" />,
    },

    {
      title: t("contactUs"),
      link: "/contact",
      icon: <FaPhoneAlt className="w-5 h-5 ml-1 text-[#6860db]" />,
    },
    {
      title: t("collections"),
      link: "/user-collections",
      icon: <MdOutlineCollections className="w-6 h-6 ml-1 text-[#6860db]" />,
    },

    {
      title: t("addArt"),
      link: "/pre-mint",
      icon: <RiNftFill className="w-6 h-6 ml-1 text-[#6860db]" />,
    },
    {
      title: t("activityManagement"),
      link: "/exhibitor",
      icon: <TbActivity className="w-6 h-6 ml-1 text-[#6860db]" />,
    },
    {
      title: t("myCollection"),
      link: user ? `/collections/${user.data.username}` : "/",
      icon: (
        <MdOutlineCollectionsBookmark className="w-6 h-6 ml-1 text-[#6860db]" />
      ),
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
          .get(
            "https://api.artina.org/api/account/NotifyUserViewSet/notifList/",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
              },
            }
          )
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
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref2]);
  return (
    <div>
      <header>
        <div
          className={`flex justify-center h-[80px] sm:h-[60px] ${
            rev ? "" : "from-[#f9f9f9] bg-gradient-to-b"
          }  font-b3`}
        >
          <div className="flex items-center justify-between w-[90%] justify-self-center">
            <div className="flex items-center gap-8 text-sm lg:hidden">
              {user
                ? ActiveItems.map((item, index) => (
                    <div
                      key={index}
                      className="cursor-pointer flex items-center gap-1  hover:text-[#a5a0ee] transition-all duration-200"
                      onClick={() => {
                        navigate(item.link);
                      }}
                    >
                      {item.icon}
                      {item.title}
                    </div>
                  ))
                : NotActiveItems.map((item, index) => (
                    <div
                      className="cursor-pointer flex items-center gap-1 hover:text-[#4e45d0] transition-all duration-200"
                      onClick={() => {
                        navigate(item.link);
                      }}
                      key={index}
                    >
                      {item.icon}
                      {item.title}
                    </div>
                  ))}
              <div
                className="bg-[#eee] cursor-pointer text-[#4e45d0] px-3 py-[4px] rounded-full hover:scale-105 transition-all duration-200 border-[#4e45d0] border-[1px]"
                onClick={() => navigate("/metaverse")}
              >
                {t("metaverse")}{" "}
              </div>
              {connectWallet === true ? (
                <div>
                  <ConnectWallet
                    btnTitle="اتصال کیف پول"
                    colorMode="dark"
                    accentColor="#ffffff40"
                    className="m-0 p-0 scale-75 border-none text-white hover:bg-indigo-400 transition-all"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              className="lg:flex hidden cursor-pointer"
              onClick={() => setMenuVisible(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
              </svg>
            </div>
            <div className="flex gap-5 items-center ">
              <button
                className=""
                onClick={() => {
                  i18n.language === "en"
                    ? i18n.changeLanguage("fa")
                    : i18n.changeLanguage("en");
                  window.location.reload();
                }}
              >
                <MdOutlineLanguage className="w-8 h-8 text-[#6860db] hover:text-[#4e45d0] ease-in-out duration-300 transition-all" />
              </button>
              {user ? (
                <Fragment>
                  <div ref={ref2}>
                    <div
                      className="cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-all"
                      onClick={() => setIsHidden2((prev) => !prev)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-6 h-6 ${
                          notifs ? "bg-none rounded-lg" : "bg-none"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    </div>
                    <div
                      className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-[#f9f9f9] min-w-[250px] ${
                        isHidden2 ? "opacity-0 pointer-events-none" : ""
                      } absolute translate-x-1/3 sm:translate-x-0`}
                    >
                      {notifs &&
                        notifs.map((item, index) => (
                          <span key={index}>
                            <div className="w-full py-2 px-3 hover:bg-[#0000aa07] flex gap-6 items-center justify-between cursor-pointer">
                              <div className="flex flex-col">
                                <div>{item.text}</div>
                                <div className="text-sm opacity-50">
                                  <span className="px-1">در تاریخ</span>
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
                                <div
                                  className="px-2 bg-green-100 hover:bg-green-200 rounded-lg py-1 text-sm"
                                  onClick={() => handleClickSeen(item.id)}
                                >
                                  مشاهده کردم
                                </div>
                              )}
                            </div>
                            {index == notifs.length - 1 ? <div></div> : <hr />}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div ref={ref}>
                    <img
                      src={user.data.profile_picture}
                      className="rounded-full w-[46px] h-[46px] object-cover cursor-pointer"
                      onClick={() => setIsHidden((prev) => !prev)}
                      alt=""
                    />
                    <div
                      className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-[#f9f9f9] min-w-[250px] ${
                        isHidden ? "opacity-0 pointer-events-none" : ""
                      } absolute translate-x-1/3`}
                    >
                      <div className="w-full py-2 px-3 hover:bg-[#0000aa07] flex gap-2 items-center justify-between cursor-pointer">
                        <img
                          src={user.data.profile_picture}
                          className="rounded-full  w-[55px] h-[55px] object-cover  shrink-0"
                          alt=""
                        />
                        <div>
                          <div className="text-left text-sm font-b5 ">
                            {user.data.first_name} {user.data.last_name}
                          </div>
                          <div className="text-left font-b2 text-sm">
                            {user.data.username}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div
                        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
                        onClick={() => navigate("/dashboard")}
                      >
                        {t("dashboard")}
                      </div>
                      <BalanceDialog />
                      <BalanceDialogMatic />
                      <div
                        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
                        onClick={() => navigate("/profile")}
                      >
                        {t("profile")}
                      </div>

                      <div
                        className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
                        onClick={(e) => {
                          navigate("/login");
                          setUsername();
                          localStorage.setItem("authTokens", null);
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

              <img
                className="h-16 sm:h-12 rounded-lg cursor-pointer"
                src={"/Artina-Logo-1.jpeg"}
                alt="logo"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed w-full h-full z-50 inset-0 bg-[#f9f9f9] ${
          menuIsVisible ? "" : "translate-x-full"
        }  transition-all duration-500 ease-out`}
      >
        <div
          className="w-full flex justify-end p-5"
          onClick={() => setMenuVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>

        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {user
            ? ActiveItems.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer flex items-center gap-1 hover:text-[#4e45d0] transition-all duration-200 px-5 py-2 bg-[#f0f0f0] rounded-lg w-[90%]"
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.icon}
                  {item.title}
                </div>
              ))
            : NotActiveItems.map((item, index) => (
                <div
                  className="cursor-pointer flex items-center gap-1 hover:text-[#4e45d0] transition-all duration-200 px-5 py-2 bg-[#f0f0f0] rounded-lg w-[90%]"
                  onClick={() => {
                    navigate(item.link);
                  }}
                  key={index}
                >
                  {item.icon}
                  {item.title}
                </div>
              ))}

          <div
            className="cursor-pointer flex items-center gap-1 text-white transition-all duration-200 px-5 py-2 bg-[#4e45d0] rounded-lg w-[90%]"
            onClick={() => navigate("/metaverse")}
          >
            {t("metaverse")}
          </div>
        </div>
        {connectWallet === true ? (
          <div className="w-full fixed bottom-10">
            <ConnectWallet
              btnTitle="اتصال کیف پول"
              colorMode="dark"
              accentColor="#4e45d0"
              className="m-0 p-0 scale-75 border-none text-white hover:bg-indigo-400 transition-all w-full"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;

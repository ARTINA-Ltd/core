import React, { useState, useContext, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";
import { UserChangeContext } from "../../App";
import BalanceDialog from "../Dialog/BalanceDialog/BalanceDialog";
import BalanceDialogMatic from "../Dialog/BalanceDialog/BalanceDialogMatic";
import { useRef } from "react";
import axios from "axios";
import { GoBell } from "react-icons/go";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./../LanguageSelector/LanguageSelector";
import artinaLogo from "../../assets/images/Artina-Logo-1.jpeg"
import authenticationImage from "../../assets/images/authentication.png"
import chatBubbleImage from "../../assets/images/chat-bubble.png"
import virtualSpace from "../../assets/images/virtual-space.png"

const Header = ({ rev = false }) => {
  const [menuIsVisible, setMenuVisible] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const user = useContext(UserContext);
  const userChange = useContext(UserChangeContext);
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const NotActiveItems = [
    {
      title: " احراز هویت",
      link: "/authentications",
      icon: <img src={authenticationImage} alt="" className="w-8 h-8" />,
    },
    {
      title: "تیکت ها",
      link: "/alltickets",
      icon: <img src={chatBubbleImage} alt="" className="w-8 h-8" />,
    },
    {
      title: "متاورس",
      link: "/metaversetickets",
      icon: <img src={virtualSpace} alt="" className="w-8 h-8" />,
    },
  ];
  return (
    <div>
      <header>
        <div className={`flex justify-center h-[80px] sm:h-[60px] ${rev ? "" : "from-[#f9f9f9] bg-gradient-to-b"}  font-b3`}>
          <div className="flex items-center justify-between w-[90%] justify-self-center">
            <div className="flex items-center gap-8 text-sm lg:hidden">
              {NotActiveItems.map((item, index) => (
                <div
                  className="font-bold cursor-pointer flex items-center gap-1 hover:text-[#4e45d0] transition-all duration-200"
                  onClick={() => {
                    navigate(item.link);
                  }}
                  key={index}
                >
                  {item.icon}
                  {item.title}
                </div>
              ))}
            </div>
            <div className="lg:flex hidden cursor-pointer" onClick={() => setMenuVisible(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
            </div>
            <div className="flex gap-8 items-center">
              <div className="-mx-6">
                <LanguageSelector />
              </div>
              <div ref={ref2}>
                <div className="cursor-pointer p-2 w-8 hover:bg-slate-100 rounded-lg transition-all" onClick={() => setIsHidden2((prev) => !prev)}>
                  {notifs.length > 1 && <span className="absolute translate-x-1 -translate-y-[40%] bg-red-400 w-4 h-4 text-sm text-center rounded-full font-bold">{notifs.length}</span>}
                  <GoBell className="text-2xl font-bold " />
                </div>
                <div className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-[#f9f9f9] min-w-[250px] ${isHidden2 ? "opacity-0 pointer-events-none" : ""} absolute  ${i18n.dir() === "rtl" ? "translate-x-1/3" : "-translate-x-1/3"}`}>
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
                          {item.message_seen ? null : (
                            <div className="px-2 bg-green-100 hover:bg-green-200 rounded-lg py-1 text-sm" onClick={() => handleClickSeen(item.id)}>
                              مشاهده کردم
                            </div>
                          )}
                        </div>
                        {index === notifs.length - 1 ? null : <hr />}
                      </span>
                    ))}
                </div>
              </div>
              {user ? (
                <div ref={ref}>
                  <img src={user.data.profile_picture ? user.data.profile_picture : null} className="rounded-full w-[46px] h-[46px] object-cover cursor-pointer" onClick={() => setIsHidden((prev) => !prev)} alt="" />
                  <div className={`mt-2 z-50 font-b3 rounded-xl border-1 transition-all duration-300 border-[gray-300] bg-[#f9f9f9] min-w-[250px] ${isHidden ? "opacity-0 pointer-events-none" : ""} absolute ${i18n.dir() === "rtl" ? "translate-x-2/3" : "-translate-x-2/3"}`}>
                    <div className="w-full py-2 px-3 hover:bg-[#0000aa07] flex gap-2 items-center justify-between cursor-pointer">
                      <img src={user.data.profile_picture} className="rounded-full  w-[55px] h-[55px] object-cover  shrink-0" alt="" />
                      <div>
                        <div className="text-left text-sm font-b5 ">
                          {user.data.first_name} {user.data.last_name}
                        </div>
                        <div className="text-left font-b2 text-sm">{user.data.username}</div>
                      </div>
                    </div>
                    <hr />
                    <div className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]" onClick={() => navigate("/dashboard")}>
                      {t("dashboard")}
                    </div>
                    <BalanceDialog />
                    <BalanceDialogMatic />
                    <div className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]" onClick={() => navigate("/profile")}>
                      {t("profile")}
                    </div>

                    <div
                      className="w-full cursor-pointer py-2 px-3 text-sm hover:bg-[#0000aa07]"
                      onClick={(e) => {
                        navigate("/login");
                        localStorage.setItem("authTokens", null);
                        userChange(e);
                      }}
                    >
                      {t("logout")}
                    </div>
                  </div>
                </div>
              ) : null}
              <div>
                <img className="h-16 sm:h-12 rounded-lg cursor-pointer" src={artinaLogo} alt="logo" onClick={() => navigate("/admin-panel")} />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed w-full h-full z-50 inset-0 bg-[#f9f9f9] ${menuIsVisible ? "" : "translate-x-full"}  transition-all duration-500 ease-out`}>
        <div className="w-full flex justify-end p-5" onClick={() => setMenuVisible(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {NotActiveItems.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Header;

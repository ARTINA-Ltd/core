import React, { useState } from "react";
import { SiAuthy } from "react-icons/si";
import { FaTicket } from "react-icons/fa6";
import { GiVirtualMarker } from "react-icons/gi";

import "./Header.css";
import { useNavigate } from "react-router";

const Header = ({ rev = false }) => {
  const [menuIsVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const NotActiveItems = [
    {
      title: " احراز هویت",
      link: "/authentications",
      icon: <img src="/authentication.png" alt="" className="w-8 h-8" />,
    },
    {
      title: "تیکت ها",
      link: "/tickets",
      icon: <img src="/chat-bubble.png" alt="" className="w-8 h-8" />,
    },
    {
      title: "متاورس",
      link: "/gallery",
      icon: <img src="/virtual-space.png" alt="" className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <header>
        <div
          className={`flex justify-center h-[80px] sm:h-[60px] ${
            rev ? "" : "from-[#f9f9f9] bg-gradient-to-b"
          }  font-b3`}
        >
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
              <img
                className="h-16 sm:h-12 rounded-lg cursor-pointer"
                src={"/Artina-Logo-1.jpeg"}
                alt="logo"
                onClick={() => navigate("/admin-panel")}
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
    </>
  );
};

export default Header;

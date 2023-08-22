import React, { useEffect, useState, useContext } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../App";
import BuyTicketDialog from "../components/Dialog/BuyTicketDialog/BuyTicketDialog";

const ExhibitionList = () => {
  const [getData, setData] = useState();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  useEffect(() => {}, []);

  useEffect(() => {
    if (user) {
      axios
        .get("https://api.artina.org/api/exhibition/ExTicketViewSet/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        })
        .then((res) => {
          setData(res.data);

          console.log("Extiiiiiiiiiiiiiiiii");
          console.log(res.data);
          console.log("Extiiiiiiiiiiiiiiiii");
        });
    } else {
      axios
        .get("https://api.artina.org/api/exhibition/exhibitions/")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    }
  }, []);

  const handleTicket = (item) => {
    if (item.has_ticket && item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 text-lg">
          <div className="bg-blue-50 text-blue-800 rounded-lg px-4 py-1 opacity-70">
            شما بلیت این نمایشگاه را دارید
          </div>
        </div>
      );
    } else if (item.has_ticket && !item.user_has_ticket) {
      return (
        <div className="flex items-center gap-1 font-b4 text-lg">
          <div className="bg-red-50 text-red-800 rounded-lg px-4 py-1 opacity-70">
            شما بلیت این نمایشگاه را ندارید
          </div>
          <BuyTicketDialog
            onClick={(event) => event.stopPropagation()}
            price={item.commision}
            exhibitionId={item.id}
            exhibitionName={item.marketName}
          />
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 w-1/2 md:w-full  font-b4 text-lg">
          <div className="bg-sky-50 text-sky-700 w-full text-center text-sm rounded-xl py-1 opacity-70">
            نمایشگاه رایگان
          </div>
        </div>
      );
    }
  };
  return (
    <TestLayout className="flex flex-col gap-5">
      {getData
        ? getData.map((item, index) => (
            <div
              onClick={() => navigate(`/exhibition-collections/${item.id}`)}
              key={index}
            >
              <SimpleCard
                className={
                  "bg-white flex w-full gap-10 items-center group relative overflow-hidden cursor-pointer md:flex-col"
                }
              >
                <img
                  src="/mand2.png"
                  className=" opacity-[0%] absolute top-1/2 -translate-y-1/2 pointer-events-none group-hover:opacity-[10%] group-hover:-translate-x-1/3 transition-all duration-200 ease-out"
                />


                <div className="flex flex-col z-10 justify-center items-center w-full gap-3">
                  <div className="flex w-full justify-center font-b7 text-[60px] lg:text-[30px] text-center">
                    {item.marketName}
                  </div>
                  <div className="flex border-[1px] border-[#d0d7e43b] flex-col gap-3 py-3 w-1/2 lg:w-full justify-center items-center bg-[#f9f9f9] rounded-xl">
                    <div className="flex items-center justify-between w-full px-8">
                      <div id="title" className="text-[#d0d7e4] font-b6">
                        مجموعه دار
                      </div>
                      <div
                        id="title"
                        className="text-[#4a556c] font-b4 text-lg"
                      >
                        {item.user}
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full px-8">
                      <div id="title" className="text-[#d0d7e4] font-b6">
                        تاریخ پایان ثبت نام
                      </div>
                      <div
                        id="title"
                        className="text-[#4a556c] font-b4 text-lg"
                      >
                        {Intl.DateTimeFormat("fa", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }).format(new Date(item.application_deadline))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full px-8">
                      <div id="title" className="text-[#d0d7e4] font-b6">
                        ساعت پایان ثبت نام
                      </div>
                      <div
                        id="title"
                        className="text-[#4a556c] font-b4 text-lg"
                      >
                        {Intl.DateTimeFormat("fa", {
                          minute: "numeric",
                          hour: "numeric",
                        }).format(new Date(item.application_deadline))}
                      </div>
                    </div>
                  </div>

                  {handleTicket(item)}
                </div>

                <img
                  src={item.image}
                  alt=""
                  className="w-full h-72 object-cover rounded-xl z-10 
                  mdrev:group-hover:translate-x-24 transition-all duration-100 ease-out"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute inset-y-0 -left-10 my-auto mdrev:group-hover:translate-x-20 transition-all duration-200 ease-out"
                  width={"2em"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </SimpleCard>
            </div>
          ))
        : ""}
    </TestLayout>
  );
};

export default ExhibitionList;

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
        .then(res => {
          setData(res.data);

          console.log("Extiiiiiiiiiiiiiiiii");
          console.log(res.data);
          console.log("Extiiiiiiiiiiiiiiiii");
        });
    } else {
      axios
        .get("https://api.artina.org/api/exhibition/exhibitions/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        })
        .then(res => {
          console.log(res.data);
        });
    }
  }, []);

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
                  "bg-white flex gap-10 items-center group relative overflow-hidden cursor-pointer sm:flex-col sm:w-full"
                }
              >
                <img
                  src="/mand2.png"
                  className=" opacity-[0%] absolute top-1/2 -translate-y-1/2 pointer-events-none group-hover:opacity-[10%] group-hover:-translate-x-1/3 transition-all duration-200 ease-out"
                />
                <div className="flex flex-col w-1/2 z-10 justify-center items-center gap-3 absolute">
                  <div className="flex w-full justify-center font-b9 text-[60px] lg:text-[40px]">
                    {item.marketName}
                  </div>
                  <div className="text-2xl font-b5 flex gap-1 items-center">
                    مجموعه دار:
                    <div className="bg-[#0000aa10] px-4 rounded-lg py-1">
                      {item.user}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-b5 text-2xl lg:flex-col">
                    <div>
                      تاریخ پایان ثبت نام: &nbsp;
                      {Intl.DateTimeFormat("fa", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(item.application_deadline))}
                      &nbsp;
                    </div>
                    <div>
                      &nbsp; ساعت: &nbsp;
                      {Intl.DateTimeFormat("fa", {
                        minute: "numeric",
                        hour: "numeric",
                      }).format(new Date(item.application_deadline))}
                    </div>
                  </div>

                  {item.has_ticket === true ? (
                    <div className="flex items-center gap-1 font-b4 text-lg">
                      <div className="bg-blue-50 text-blue-800 rounded-lg px-4 py-1 opacity-70">
                        این نمایشگاه بلیت دارد
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {item.user_has_ticket  === true? (
                    <div className="flex items-center gap-1 font-b4 text-lg">
                      <div className="bg-blue-50 text-blue-800 rounded-lg px-4 py-1 opacity-70">
                        شما بلیت این نمایشگاه را دارید
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 font-b4 text-lg">
                      <div className="bg-red-50 text-red-800 rounded-lg px-4 py-1 opacity-70">
                        شما بلیت این نمایشگاه را ندارید
                      </div>
                      <BuyTicketDialog
                        onClick={event => event.stopPropagation()}
                        price={item.commision}
                        exhibitionId={item.id}
                        exhibitionName={item.marketName}
                      />
                    </div>
                  )}
                </div>
                <div className="w-full"></div>
                <img
                  src={item.image}
                  alt=""
                  className="w-5/6 h-72 object-cover rounded-xl z-10 group-hover:ml-24 transition-all duration-100 ease-out lg:w-4/5"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute inset-y-0 -left-10 my-auto group-hover:translate-x-20 transition-all duration-200 ease-out"
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

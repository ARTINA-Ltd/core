import React, { useEffect, useState } from "react";
import TestLayout from "../Layouts/TestLayout";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import { useNavigate } from "react-router";
import axios from "axios";

const Exhebitions = () => {
  const [getData, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/exhibition/exhibitions/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`
        },
        mode: "cors"
      })
      .then(res => {
        console.log(res);
        setData(res.data);
      });
  }, []);

  return <TestLayout className="flex flex-col gap-5">
      {getData ? getData.map((item, index) =>
            <SimpleCard
              className={
                "bg-white flex gap-10 items-center group relative overflow-hidden cursor-pointer"
              }
            >
              <img
                src="/mand2.png"
                className=" opacity-[0%] absolute top-1/2 -translate-y-1/2 pointer-events-none group-hover:opacity-[20%] group-hover:-translate-x-1/3 transition-all duration-1000 ease-out"
              />

              <div className="flex w-full justify-center font-b9 text-[90px] z-10 group-hover:scale-110 duration-500 transition-all">
                {item.marketName}
              </div>
              <img
                src={item.image}
                alt=""
                className="w-full h-72 object-cover rounded-xl z-10 group-hover:ml-24 transition-all duration-500 ease-out"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="absolute inset-y-0 -left-10 my-auto group-hover:translate-x-20 transition-all duration-1000 ease-out"
                width={"2em"}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </SimpleCard>
          ) : ""}
    </TestLayout>;
};

export default Exhebitions;

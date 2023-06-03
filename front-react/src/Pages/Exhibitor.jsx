import axios from "axios";
import React, { useEffect, useState } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import AddExhibitionDialog from "../components/Dialog/AddExhibitionDialog/AddExhibitionDialog";
import TestLayout from "../Layouts/TestLayout";

const Exhibitor = () => {
  const [artistOpenExhibitions, setArtistOpenExhibitions] = useState();
  const [artistClosedExhibitions, setArtistClosedExhibitions] = useState();
  const [openRegistrationExhibitions, setOpenRegistrationExhibitions] =
    useState();

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/exhibition/artist-user-past-exhibitions/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        console.log("_____________________");
        console.log("artistClosedExhibitions");
        console.log(res.data);
        console.log("_____________________");

        setArtistClosedExhibitions(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/exhibition/open-for-artist-registration-exhibitions/`
      )
      .then((res) => {
        console.log("_____________________");
        console.log("OpenRegistrationExhibitions");
        console.log(res.data);
        console.log("_____________________");
        setOpenRegistrationExhibitions(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/user-exhibitions/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        console.log("_____________________");
        console.log("user exhibitions");
        console.log(res.data);
        console.log("_____________________");
        setArtistOpenExhibitions(res.data);
      });
  }, []);

  return (
    <div>
      <TestLayout wfull={true}>
        <img src={"/2.jpg"} className="w-full h-[600px] object-cover" alt="" />

        <SimpleCard
          className={"bg-white mx-auto w-[90%] -mt-48 z-10 relative "}
        >
          <div className="grid grid-cols-5 gap-5">
            <AddExhibitionDialog />
            {artistOpenExhibitions
              ? artistOpenExhibitions.map((item, index) => (
                  <>
                    <SimpleCard
                      key={index}
                      className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] p-0 relative group cursor-pointer"
                      noPadding={true}
                    >
                      <img
                        src={item.image}
                        className="h-full w-full object-cover rounded-2xl "
                        alt=""
                      />
                      <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">
                        {item.marketName}
                      </div>
                    </SimpleCard>
                  </>
                ))
              : ""}
          </div>
        </SimpleCard>

        <SimpleCard
          className={
            "bg-white mx-auto w-[90%] mt-5 flex items-center justify-center"
          }
        >
          <div className="h-full shrink-0 rounded-2xl group flex items-center justify-center cursor-pointer  transition-all whitespace-nowrap mx-5">
            <div className="text-[#000022] opacity-20 group-hover:opacity-40 transition-all h-full group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
              <div className="font-b6">لیست همه نمایشگاه ها</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-5">
            {openRegistrationExhibitions
              ? openRegistrationExhibitions.map((item, index) => (
                  <>
                    <SimpleCard
                      key={index}
                      className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] p-0 relative group cursor-pointer"
                      noPadding={true}
                    >
                      <img
                        src={item.image}
                        className="h-full w-full object-cover rounded-2xl "
                        alt=""
                      />
                      <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">
                        {item.marketName}
                      </div>
                    </SimpleCard>
                  </>
                ))
              : ""}
          </div>
        </SimpleCard>

        <SimpleCard
          className={
            "bg-white mx-auto w-[90%] mt-5 relative z-10  gap-4 grid grid-cols-6"
          }
        >
          {artistClosedExhibitions
            ? artistClosedExhibitions.map((item, index) => (
                <>
                  <SimpleCard
                    className="h-[300px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] p-0 relative group cursor-default opacity-70 hover:opacity-100 transition-all duration-300"
                    noPadding={true}
                  >
                    <img
                      src={item.image}
                      className="h-full w-full object-cover rounded-2xl "
                      alt=""
                    />
                    <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">
                      {item.marketName}{" "}
                    </div>
                  </SimpleCard>
                </>
              ))
            : ""}
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default Exhibitor;

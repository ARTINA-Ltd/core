import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import AddExhibitionDialog from "../components/Dialog/AddExhibitionDialog/AddExhibitionDialog";
import TestLayout from "../Layouts/TestLayout";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useTranslation } from "react-i18next";

const Exhibitor = () => {
  const { t } = useTranslation(["exhibitor"]);
  const [artistOpenExhibitions, setArtistOpenExhibitions] = useState();
  const [artistClosedExhibitions, setArtistClosedExhibitions] = useState();
  const [openRegistrationExhibitions, setOpenRegistrationExhibitions] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/artist-user-past-exhibitions/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((res) => {
        setArtistClosedExhibitions(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://api.artina.org/api/exhibition/open-for-artist-registration-exhibitions/`).then((res) => {
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

  const handleButton = (id, has_metaverse) => {
    if (has_metaverse) {
      navigate(`/metaverse/${id}`);
    } else handleMetaverse(id);
  };

  const handleMetaverse = (id) => {
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: "درخواست متاورس",
          text: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        console.log(res);
        Notify.success("درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد.");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <TestLayout wfull={true}>
        <SimpleCard className="bg-[#4e45d0] flex flex-col relative gap-4 items-center justify-center overflow-hidden w-[90%] h-96 mx-auto mb-5 md:h-72 sm:h-52">
          <img alt="" src="/mand1.png" className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
          <div className="text-white text-6xl mb-4 z-10 font-b7 sm:text-3xl">{t("pageTitle")}</div>
        </SimpleCard>

        <SimpleCard className={"bg-white mx-auto w-[90%] z-10 relative text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">{t("firstSection")}</div>

          <div className="grid grid-cols-5 gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            <div className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] rounded-2xl group flex items-center justify-center cursor-pointer  transition-all md:h-[300px] sm:h-[250px]" onClick={() => navigate("/add-exhibition")}>
              <div className="text-[#000022] opacity-20 group-hover:opacity-40 transition-all group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.6" stroke="currentColor" width={"4em"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-b6">افزودن نمایشگاه</div>
              </div>
            </div>{" "}
            {artistOpenExhibitions
              ? artistOpenExhibitions.map((item, index) => (
                  <div>
                    <SimpleCard key={index} className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] transition-all p-0 relative group cursor-pointer md:h-[300px] sm:h-[250px]" noPadding={true}>
                      <img src={item.image} className="h-full w-full object-cover rounded-2xl" alt="" onClick={() => navigate(`/artist-application-form/${item.id}`)} />
                      <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl gap-3 from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">
                        <div className="flex flex-col items-center justify-center w-full">
                          {item.marketName}

                          <div className="bg-white/20  w-full hover:bg-white/30 py-2 text-sm backdrop-blur-md" onClick={() => handleButton(item.id, item.has_metaverse)}>
                            {item.has_metaverse ? "ورود به متاورس" : "درخواست برای متاورس"}
                          </div>
                        </div>
                      </div>
                    </SimpleCard>
                  </div>
                ))
              : ""}
          </div>
        </SimpleCard>

        <div className="w-[90%] bg-[#4e45d0] rounded-xl justify-center gap-5 flex py-12 mb-9 mt-2 text-center text-white text-xl font-b5 cursor-pointer mx-auto hover:text-[22px] transition-all sm:text-lg sm:font-b4 sm:py-4 sm:mt-9" onClick={() => navigate(`/requests-list`)}>
          <div className="animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
          مشاهده لیست درخواست ها
        </div>

        <SimpleCard className={"bg-white mx-auto w-[90%] mt-5 text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">نمایشگاه های قابل ثبت نام</div>

          <div className="h-full shrink-0 rounded-2xl group flex items-center justify-center cursor-pointer  transition-all whitespace-nowrap mx-5">
            <div className="text-[#000022] opacity-20 group-hover:opacity-40 transition-all h-full group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
              <div className="font-b6 md:mb-4" onClick={() => navigate(`/open-exhibitions`)}>
                مشاهده لیست همه نمایشگاه ها
              </div>
            </div>
          </div>
          {openRegistrationExhibitions && openRegistrationExhibitions.length > 0 ? (
            <div>
              <div className="grid grid-cols-5 gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                {openRegistrationExhibitions.map((item, index) => (
                  <div onClick={() => navigate(`/artist-application-form/${item.id}`)}>
                    <SimpleCard key={index} className="h-[320px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] p-0 relative group cursor-pointer" noPadding={true}>
                      <img src={item.image} className="h-full w-full object-cover rounded-2xl " alt="" />
                      <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">{item.marketName}</div>
                    </SimpleCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex w-full justify-center opacity-30">نمایشگاهی موجود نمیباشد</div>
            </div>
          )}
        </SimpleCard>

        <SimpleCard className={"bg-white mx-auto w-[90%] mt-5 text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">نمایشگاه های قبلی شما</div>

          {artistClosedExhibitions && artistClosedExhibitions.length > 0 ? (
            <div>
              <div className="grid grid-cols-5 gap-5">
                {artistClosedExhibitions.map((item, index) => (
                  <div onClick={() => navigate(`/artist-application-form/${item.id}`)}>
                    <SimpleCard key={index} className="h-[280px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] p-0 relative group cursor-pointer opacity-60 hover:opacity-100 transition-all" noPadding={true}>
                      <img src={item.image} className="h-full w-full object-cover rounded-2xl " alt="" />
                      <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">{item.marketName}</div>
                    </SimpleCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex w-full justify-center opacity-30">نمایشگاهی موجود نمیباشد</div>
            </div>
          )}
        </SimpleCard>
      </TestLayout>
    </div>
  );
};

export default Exhibitor;

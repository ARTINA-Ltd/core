import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
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
    localStorage.getItem("authTokens") === null && navigate("/login");
  }, []);
  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .get(`https://api.artina.org/api/exhibition/artist-user-past-exhibitions/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Use the access token
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
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .get(`https://api.artina.org/api/exhibition/user-exhibitions/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Use the access token
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
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: "درخواست متاورس",
          text: id,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          mode: "cors",
        }
      )
      .then((res) => {
        console.log(res);
        Notify.success(t("requestSuccess"));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <TestLayout wfull={true}>
        <SimpleCard className="bg-primary flex flex-col relative gap-4 items-center justify-center overflow-hidden w-[90%] h-60 mx-auto mb-5 md:h-72 sm:h-52">
          <div className="text-primary-content text-6xl mb-4 z-10 font-b7 sm:text-3xl">{t("pageTitle")}</div>
        </SimpleCard>

        <SimpleCard className={"bg-base-100 mx-auto w-[90%] z-10 relative text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">{t("firstSection")}</div>

          <div className="grid grid-cols-5 gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            <div className="h-[420px] w-full bg-neutral text-neutral-content hover:bg-gray-500 hover:bg-opacity-40 rounded-2xl group flex items-center justify-center cursor-pointer  transition-all md:h-[300px] sm:h-[250px]" onClick={() => navigate("/add-exhibition")}>
              <div className="opacity-50 group-hover:opacity-60 transition-all group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.6" stroke="currentColor" width={"4em"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="font-b6">{t("addNew")}</div>
              </div>
            </div>{" "}
            {artistOpenExhibitions
              ? artistOpenExhibitions.map((item, index) => (
                <SimpleCard key={index} className="h-[420px] w-full bg-[#0000aa05] hover:bg-[#0000aa08] transition-all p-0 relative group cursor-pointer md:h-[300px] sm:h-[250px]" noPadding={true}>
                  <img src={item.image} className="h-full w-full object-cover rounded-2xl" alt="" />
                  <div className="absolute h-full w-full top-0 rounded-2xl bg-gradient-to-t text-lg font-b4 group-hover:text-xl gap-3 from-black flex items-end justify-center pb-4 text-white group-hover:pb-6 transition-all">
                    <div className="flex flex-col  items-center justify-center w-full">
                      <h2 className="ease-in-out duration-200 hover:text-primary" onClick={() => navigate(`/exhibition-collections/${item.id}`)}>
                        {item.marketName}
                      </h2>

                      <div className="bg-white/20 ease-in-out duration-200 hover:text-[#afafaf] w-full hover:bg-white/30 py-2 text-sm backdrop-blur-md">
                        <h2 onClick={() => handleButton(item.id, item.has_metaverse)}>{item.has_metaverse ? t("enterMetaverse") : t("requestMetaverse")}</h2>
                      </div>
                    </div>
                  </div>
                </SimpleCard>
              ))
              : ""}
          </div>
        </SimpleCard>

        <div className="w-[90%] bg-primary rounded-xl justify-center gap-5 flex py-12 mb-9 mt-2 text-center text-primary-content text-xl font-b5 cursor-pointer mx-auto hover:text-[22px] transition-all sm:text-lg sm:font-b4 sm:py-4 sm:mt-9" onClick={() => navigate(`/requests-list`)}>
          <div className="animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div>
          {t("showReq")}
        </div>

        <SimpleCard className={"bg-base-100 mx-auto w-[90%] mt-5 text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">{t("exhibitionRegister")}</div>

          <div className="h-full shrink-0 rounded-2xl group flex items-center justify-center cursor-pointer  transition-all whitespace-nowrap mx-5">
            <div className="text-base-content opacity-60 group-hover:opacity-40 transition-all h-full group-hover:scale-105 ease-out duration-150 flex flex-col items-center">
              <div className="font-b6 md:mb-4" onClick={() => navigate(`/open-exhibitions`)}>
                {t("showEx")}
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
              <div className="flex w-full justify-center opacity-30">{t("previousExhibitions")}</div>
            </div>
          )}
        </SimpleCard>

        {/* <SimpleCard className={"bg-primary text-primary-content mx-auto w-[90%] mt-5 text-center"}>
          <div className="font-b6 text-2xl mb-4 mx-auto md:mb-4 sm:text-xl">{t("previousExhibitions")}</div>

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
              <div className="flex w-full justify-center opacity-30">{t("noExhibitions")}</div>
            </div>
          )}
        </SimpleCard> */}
      </TestLayout>
    </div>
  );
};

export default Exhibitor;

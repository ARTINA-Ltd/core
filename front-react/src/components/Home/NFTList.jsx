import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.js";

const NFTList = ({ className }) => {
  const [data, setData] = useState();
  const [dataLiked, setDataLiked] = useState();
  const { t } = useTranslation();
  const [selected, setSelected] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.artina.org/api/transaction/nfts/top_5_expensive/").then((d) => {
      setData(d.data);
    });

    axios.get("https://api.artina.org/api/transaction/nft_ratings/most_liked/").then((d) => {
      setDataLiked(d.data);
    });
  }, []);

  useEffect(() => {}, [selected]);

  return (
    <div className={`${className} flex flex-col w-full justify-center items-center`}>
      <div className="flex gap-6 bg-white rounded-t-xl px-3 pt-1">
        <div className={`cursor-pointer rounded-t-xl py-2 px-6 mt-2 ${selected ? "bg-gradient-to-b from-slate-200" : ""}`} onClick={() => setSelected(true)}>
          {t("sortByPrice")}
        </div>
        <div className={`cursor-pointer rounded-t-xl py-2 px-6 mt-2 ${selected ? "" : "bg-gradient-to-b from-slate-200"}`} onClick={() => setSelected(false)}>
          {t("sortByLike")}
        </div>
      </div>

      {selected ? (
        <table className={`w-2/3 ${i18n.dir() === "rtl" ? "text-right" : "text-left"} font-b3 bg-white rounded-2xl  shadow-lg shadow-[#0000f006] sm:w-full sm:rounded-none overflow-hidden lg:w-4/5`}>
          <thead className="font-b7">
            <tr>
              <th scope="col" className="px-10 py-3 sm:pr-5 sm:pl-3">
                #
              </th>
              <th scope="col" className="text-center py-3 sm:px-1">
                {t("nameTitle")}
              </th>
              <th scope="col" className="text-center py-3 sm:px-1 sm:w-1/5 sm:hidden">
                {t("latestPrice")}
              </th>
              <th scope="col" className="hidden text-center py-3 sm:px-1 sm:w-full sm:block">
                {t("Price")}
              </th>
              <th scope="col" className="text-center py-3 sm:px-1 lg:hidden">
                {t("creator")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((item, index) => (
                  <tr className="border-t group cursor-pointer transition duration-75 ease-out items-center justify-center  hover:bg-[#0000ff08]" key={index} onClick={() => navigate(`/nft-details/${item.token_id}`)}>
                    <td className="whitespace-nowrap pr-6 font-medium sm:pl-2 sm:pr-3">
                      <img src={item.image_url} className="rounded-lg h-[90px] w-[90px] mx-4 object-cover my-1 sm:h-[90px] sm:w-[90px]" alt="" />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 sm:px-1 sm:w-2/5 sm:whitespace-normal">{item.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 sm:px-1">
                      <div className="flex w-full justify-center">
                        {item.last_price}

                        <svg xmlns="http://www.w3.org/2000/svg" aria-label="Ethereum" role="img" viewBox="0 0 512 512" width={"1.5em"}>
                          <rect width="512" height="512" rx="15%" fill="#ffffff" />
                          <path fill="#3C3C3B" d="m256 362v107l131-185z" />
                          <path fill="#343434" d="m256 41l131 218-131 78-132-78" />
                          <path fill="#8C8C8C" d="m256 41v158l-132 60m0 25l132 78v107" />
                          <path fill="#141414" d="m256 199v138l131-78" />
                          <path fill="#393939" d="m124 259l132-60v138" />
                        </svg>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 lg:hidden">{item.creator}</td>
                    <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </td>
                  </tr>
                ))
              : undefined}
          </tbody>
        </table>
      ) : (
        <table className={`w-2/3 ${i18n.dir() === "rtl" ? "textright" : "text-left"} font-b3 bg-white rounded-2xl  shadow-lg shadow-[#0000f006] sm:w-full sm:rounded-none overflow-hidden lg:w-4/5`}>
          <thead className="font-b7">
            <tr>
              <th scope="col" className="px-10 py-3 sm:pr-5 sm:pl-3">
                #
              </th>
              <th scope="col" className="text-center py-3 sm:px-1">
                {t("nameTitle")}
              </th>
              <th scope="col" className="text-center py-3 sm:px-1 sm:w-1/5 sm:hidden">
                {t("likeCount")}
              </th>
              <th scope="col" className="hidden text-center py-3 sm:px-1 sm:w-full sm:block">
                {t("price")}
              </th>
              <th scope="col" className="text-center py-3 sm:px-1 sm:hidden">
                {t("creator")}
              </th>
            </tr>
          </thead>
          <tbody>
            {dataLiked
              ? dataLiked.map((item, index) => (
                  <tr className="border-t group cursor-pointer transition duration-75 ease-out items-center justify-center  hover:bg-[#0000ff08]" key={index} onClick={() => navigate(`/nft-details/${item.token_id}`)}>
                    <td className="whitespace-nowrap pr-6 font-medium sm:pl-2 sm:pr-3">
                      <img src={item.image_url} className="rounded-lg h-[90px] w-[90px] mx-4 object-cover my-1 sm:h-[90px] sm:w-[90px]" alt="" />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 sm:px-1 sm:w-2/5 sm:whitespace-normal">{item.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 sm:px-1">
                      <div className="flex w-full justify-center">{item.like_count}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 sm:hidden">{item.creator}</td>
                    <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor" width={"1em"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </td>
                  </tr>
                ))
              : undefined}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NFTList;

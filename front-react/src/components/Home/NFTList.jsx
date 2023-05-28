import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const NFTList = ({ className }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/transaction/nfts/top_5_expensive/")
      .then((d) => {
        setData(d.data);
      });
  }, []);

  return (
    <div
      className={`${className} flex flex-col w-full justify-center items-center`}
    >
      <table className="w-2/3 text-right font-b3 bg-white rounded-2xl  shadow-lg shadow-[#0000f006] sm:w-full sm:rounded-none lg:w-4/5">
        <thead className="font-b7">
          <tr>
            <th scope="col" className="px-6 py-3 sm:pr-5 sm:pl-3">
              #
            </th>
            <th scope="col" className="px-6 py-3 sm:px-1">
              نام
            </th>
            <th scope="col" className="px-6 py-3 sm:px-1 sm:w-1/5 sm:hidden">
              آخرین قیمت
            </th>
            <th scope="col" className="hidden px-6 py-3 sm:px-1 sm:w-full sm:block">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3 sm:px-1 sm:hidden">
              خالق اثر
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr
                  className="border-t group cursor-pointer transition duration-100  hover:bg-[#0000ff08]"
                  key={index}
                  onClick={() => navigate(`/nft-details/${item.token_id}`)}
                >
                  <td className="whitespace-nowrap px-6 font-medium sm:pl-2 sm:pr-3">
                    <img
                      src={item.image_url}
                      className="rounded-lg h-[60px] w-[60px] object-cover my-1 sm:h-[90px] sm:w-[90px]"
                      alt=""
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 sm:px-1 sm:w-2/5">{item.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 sm:px-1">{item.last_price}</td>
                  <td className="whitespace-nowrap px-6 py-4 sm:hidden">{item.creator}</td>
                  <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.3"
                      stroke="currentColor"
                      width={"1em"}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </td>
                </tr>
              ))
            : undefined}
        </tbody>
      </table>
    </div>
  );
};

export default NFTList;

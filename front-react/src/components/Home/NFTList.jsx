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
      <table class="w-2/3 text-right font-b3 bg-white rounded-2xl  shadow-lg shadow-[#0000f006]">
        <thead class="font-b7">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              نام
            </th>
            <th scope="col" class="px-6 py-3">
              آخرین قیمت
            </th>
            <th scope="col" class="px-6 py-3">
              خالق اثر
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => (
                <tr
                  class="border-t group cursor-pointer transition duration-100  hover:bg-[#0000ff08]"
                  key={index}
                  onClick={() => navigate(`/nft-details/${item.token_id}`)}
                >
                  <td class="whitespace-nowrap px-6 font-medium">
                    <img
                      src={item.image_url}
                      className="rounded-lg h-[60px] w-[60px] object-cover"
                      alt=""
                    />
                  </td>{" "}
                  <td class="whitespace-nowrap px-6 py-4">{item.name}</td>
                  <td class="whitespace-nowrap px-6 py-4">{item.last_price}</td>
                  <td class="whitespace-nowrap px-6 py-4">{item.creator}</td>
                  <td className="pl-4 align-middle group-hover:-translate-x-2 transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.3"
                      stroke="currentColor"
                      width={"1em"}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default NFTList;

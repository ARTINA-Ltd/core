import "tw-elements";
import React from "react";
import { useTranslation } from "react-i18next";

function Properties({ requests, nft }) {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead className="">
                  <tr>
                    <th scope="col" className=" -bold text-base-content px-6 py-4 text-center sm:px-2 sm:text-xs">
                      {t("offerer")}
                    </th>
                    <th scope="col" className=" -bold text-base-content px-6 py-4 text-center sm:px-2 sm:text-xs">
                      {t("price")}
                    </th>
                    <th scope="col" className=" -bold text-base-content px-6 py-4 text-center sm:px-2 sm:text-xs">
                      {t("offerAmount")}
                    </th>
                    <th scope="col" className=" -bold text-base-content px-6 py-4 text-center sm:px-2 sm:text-xs">
                      {t("date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    ? requests.data.map((req) => (
                        <tr className="border-t">
                          <td className=" text-base-content  px-6 py-4 whitespace-nowrap sm:text-xs">{req.bidder}</td>
                          <td className=" text-base-content  px-6 py-4 whitespace-nowrap sm:text-xs">{req.fee} تومان</td>
                          {/* <td className=" text-base-content  px-6 py-4 whitespace-nowrap sm:text-xs">
                          {req.eth} اتریوم
                        </td> */}
                          <td className=" text-base-content  px-6 py-4 whitespace-nowrap sm:text-xs">
                            <div className="flex w-full justify-center">
                              {req.eth}
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
                          <td className=" text-base-content  px-6 py-4 whitespace-nowrap sm:text-xs">
                            {Intl.DateTimeFormat("fa", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }).format(new Date(req.date))}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Properties;

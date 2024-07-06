import "tw-elements";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaEthereum } from "react-icons/fa";

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
                              <FaEthereum className="text-xl mx-2" />
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

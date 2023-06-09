import "tw-elements";
import React from "react";

function Properties({ requests, nft }) {
  const [expanded, setExpanded] = React.useState(false);

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
                    <th
                      scope="col"
                      className=" -bold text-gray-900 px-6 py-4 text-center"
                    >
                      پیشنهاد دهنده
                    </th>
                    <th
                      scope="col"
                      className=" -bold text-gray-900 px-6 py-4 text-center"
                    >
                      قیمت
                    </th>
                    <th
                      scope="col"
                      className=" -bold text-gray-900 px-6 py-4 text-center"
                    >
                      تاریخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    ? requests.data.map((req) => (
                        <tr className="border-t">
                          <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                            {req.bidder}
                          </td>
                          <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
                            {req.fee} ريال
                          </td>
                          <td className=" text-gray-900  px-6 py-4 whitespace-nowrap ">
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

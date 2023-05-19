import "tw-elements";
import React from "react";


function Properties({ requests , nft}) {
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
                  <thead className="border-b ">
                    <tr>
                      <th
                        scope="col"
                        className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center"
                      >
                        نام
                      </th>
                      <th
                        scope="col"
                        className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center"
                      >
                        مبلغ
                      </th>
                      <th
                        scope="col"
                        className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center"
                      >
                        مبلغ به تومان
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests ? requests.data.map((req) =>
                      req.nft == nft ? (
                        <tr className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font">
                          </td>
                          <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                            {req.bidder}
                                                      </td>
                          <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                            {req.fee}
                          </td>
                          <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                            {req.fee * 104759811}
                          </td>
                        </tr>
                      ) : (
                        ''
                      )
                    ) : ''}
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

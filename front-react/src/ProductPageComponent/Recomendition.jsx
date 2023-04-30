import { useContext } from "react";
import { UserContext } from "../App";

function Recomendition({ requests , nft}) {
  const user = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col lg:mr-[40px] sm:mr-[2px] sm:mr-[2px] lg:ml-[40px] w-full">
        <div className="overflow-x-auto  lg:mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b ">
                  <tr>
                    <th
                      scope="col"
                      className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center"
                    >
                      نام
                    </th>
                    <th
                      scope="col"
                      className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center"
                    >
                      تاریخ پایان
                    </th>
                    <th
                      scope="col"
                      className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center"
                    >
                      قیمت
                    </th>
                    <th
                      scope="col"
                      className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center"
                    >
                      شماره NFT
                    </th>
                    <th
                      scope="col"
                      className="lg:text-4xl font sm:text-2xl font-bold text-gray-900 px-6 py-4 text-center"
                    >
                      لغو پیشنهاد
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    ? requests.data.map((req) =>
                        req.nft == nft && req.bidder == user.data.id ? (
                          <tr className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font"></td>
                            <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                              {req.bidder}
                            </td>
                            <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                              {req.fee}
                            </td>
                            <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                              {req.fee * 104759811}
                            </td>
                            <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                            </td>
                          </tr>
                        ) : (
                          ""
                        )
                      )
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
export default Recomendition;

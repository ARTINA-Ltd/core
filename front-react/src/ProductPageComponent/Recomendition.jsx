import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Notify } from "notiflix";
import BorderButton from "../components/Buttons/BorderButton";

function Recomendition({ requests, nft }) {
  const user = useContext(UserContext);

  function removeRequest() {
    console.log("->>>>>>>>>>>>>", nft);
    axios
      .post(
        "https://api.artina.org/api/transaction/orders/disable_order/",
        {
          token_id: nft,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then(response => {
        Notify.success("پیشنهاد شما با موفقیت حذف شد");
        window.location.reload(true);
      })
      .catch(exception => {
        Notify.failure("خطا");
        console.log(exception);
      });
  }

  return (
    <>
      <div className="flex flex-col lg:mr-[40px] sm:m-2 lg:ml-[40px] w-full">
        <div className="overflow-x-auto  lg:mx-8 sm:mx-2">
          <div className="py-2 inline-block min-w-full lg:px-8 sm:px-2 sm:py-0">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="">
                  <tr>
                    <th
                      scope="col"
                      className="text-gray-900 px-6 py-4 text-center sm:px-2 sm:text-xs"
                    >
                      قیمت
                    </th>
                    <th
                      scope="col"
                      className="text-gray-900 px-6 py-4 text-center sm:px-2 sm:text-xs"
                    >
                      تاریخ
                    </th>

                    <th
                      scope="col"
                      className="text-gray-900 px-6 py-4 text-center sm:px-2 sm:text-xs"
                    >
                      لغو پیشنهاد
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    ? requests.data.map((req) =>
                      req.bidder == user.data.id ? (
                        <tr className="border-t">
                          <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap sm:px-2">
                            {req.fee} ريال
                          </td>
                          <td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:px-2">
                            {Intl.DateTimeFormat("fa", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            }).format(new Date(req.date))}
                          </td>

                          <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap sm:px-0">
                            <div className="w-full flex justify-center">
                              <BorderButton
                                className="w-1/4 text-center"
                                onClick={() => removeRequest()}
                              >
                                {/* لغو */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </BorderButton>
                            </div>
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
      </div >
    </>
  );
}
export default Recomendition;

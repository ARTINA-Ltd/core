import { useParams, useNavigate } from "react-router";
import Header from "../components/AdminPageNavbar/Header.js";
import Footer from "../components/Footer/Footer.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import BorderButton from "./../components/Buttons/BorderButton";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import AdminLayout from "../Layouts/AdminLayout.jsx";

const ExhibitionApproval = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nfts, setNfts] = useState(null);
  const [exhibition, setExhibition] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [edndDate, setEndDate] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [temp, setTemp] = useState(null);
  const [option, setOption] = useState(null);

  function updateTimeCounter() {
    const now = new Date();

    const startDate = new Date("2023-07-07T00:39:43+03:30");
    const elapsedTime = now.getTime() - startDate.getTime();

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    setDeadline(`${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه`);
  }
  setInterval(updateTimeCounter, 1000);

  function separateDate(dateTimeString) {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth returns zero-based month, so add 1
    const day = date.getDate();

    return {
      year: year,
      month: month,
      day: day,
    };
  }

  useEffect(() => {
    axios
      .get(
        "https://api.artina.org/api/supervisor/supervisor-tickets/metaverse_tickets/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setTemp(e.data);
        setTicket(
          e.data.filter((e) => {
            return e.ticket.text == id;
          })[0]
        );
      })
      .catch((err) => {
        console.log(`there was an error${err}`);
      });

    axios
      .get("https://api.artina.org/api/supervisor/rejection-messages/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setMessages(e.data);
      })
      .catch((err) => {
        console.log(`there was an error ${err}`);
      });
    axios
      .get(
        `https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/get_nfts/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log(e.data);
        setNfts(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`https://api.artina.org/api/exhibition/nfts-by-exhibition/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        console.log(e.data);
        setExhibition(e.data);
        setStartDate(e.data.start_date);
        setEndDate(e.data.end_date);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleMetaverse = () => {
    console.log(ticket.id);
    axios
      .post(
        `https://api.artina.org/api/supervisor/supervisor-tickets/${ticket.id}/respond/`,
        {
          response_message: "تیکت پاسخ داده شد",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log("message delivered" + e);
        navigate("/admin-panel");
      })
      .catch((e) => {
        console.log(`there was an error : ${e}`);
      });
    axios
      .post(
        "https://api.artina.org/api/account/ticket/",
        {
          subject: "accepted",
          text: String(id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        Notify.success(
          "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
        );
        navigate("/admin-panel");
      })
      .catch((e) => Notify.failure("خطا"));
  };

  const handleReject = (e) => {
    const response = option + "\n" + message;
    console.log(response);
    e.preventDefault();
    axios
      .post(
        `https://api.artina.org/api/supervisor/supervisor-tickets/${ticket.id}/respond/`,
        {
          response_message: "تیکت پاسخ داده شد",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log("message delivered" + e);
      })
      .catch((e) => {
        console.log(`there was an error : ${e}`);
      });
    axios
      .post(
        "https://api.artina.org/api/supervisor/supervisor-tickets/notify_response/",
        {
          username: exhibition.user,
          text: response,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        Notify.success(
          "درخواست شما با موفقیت ثبت شد. پشتیبانی ما در اسرع وقت به تیکت شما پاسخ خواهند داد."
        );
        navigate("/admin-panel");
      })
      .catch(() => Notify.failure("خطا"));
  };

  return (
    <AdminLayout>
      <div>
        {exhibition ? (
          <div
            className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-full overflow-hidden pb-8`}
          >
            <div className="w-[90vw] mx-auto bg-white my-4 py-4 rounded-lg shadow-md">
              <h3 className="mr-8 text-3xl font-bold">
                {exhibition.marketName}
              </h3>
              <div className="my-4 w-full mx-auto">
                <div className="carousel w-full">
                  {nfts
                    ? nfts.map((nft, index) => {
                        return (
                          <div
                            key={index}
                            id={`s${index}`}
                            className="py-4 carousel-item relative w-full"
                          >
                            <div className="container mx-auto w-full h-full ">
                              <img
                                src={nft.image_url}
                                alt={nft.name}
                                className="max-h-[50vh] rounded-md border-4 border-[#4e45d0] border-b-8 block  object-cover mx-auto "
                              />
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                              <a
                                href={
                                  index === nfts.length - 1
                                    ? `#s0`
                                    : `#s${index + 1}`
                                }
                                className="btn btn-circle"
                              >
                                ❮
                              </a>
                              <a
                                href={
                                  index === 0
                                    ? `#s${nfts.length - 1}`
                                    : `#s${index - 1}`
                                }
                                className="btn btn-circle"
                              >
                                ❯
                              </a>
                            </div>
                            <p className="-translate-x-[calc(100%+4rem)]">
                              تصاویر
                              <span>
                                {index + 2}/{nfts.length}
                              </span>
                            </p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className="flex lg:block gap-4 w-[90vw] mx-auto">
              <div className=" bg-white lg:w-[90vw] w-1/2 p-8 shadow-md my-4  rounded-lg">
                <p className="-mr-4 text-gray-600 mb-5 font-bold">توضیحات</p>
                <p className=" text-gray-600">{exhibition.description}</p>
              </div>
              <div className="bg-white lg:w-[90vw] w-1/2 p-8 shadow-md my-4 rounded-lg">
                <h2 className="text-lg font-bold">تاریخ شروع</h2>
                <h2 className="text-lg mr-4">{`${
                  separateDate(startDate).year
                }/${separateDate(startDate).month}/${
                  separateDate(startDate).day
                }`}</h2>
                <h2 className="text-lg font-bold">تاریخ پایان</h2>
                <h2 className="text-lg mr-4">{`${separateDate(edndDate).year}/${
                  separateDate(edndDate).month
                }/${separateDate(edndDate).day}`}</h2>
                <h2 className="text-lg font-bold">فروش بلیط تا</h2>
                <h2 className="text-lg mr-4">{deadline}</h2>
                <div className="flex gap-4 justify-end">
                  <BorderButton
                    onClick={() => {
                      document.getElementById("submit").showModal();
                    }}
                    className={`font-bold w-32`}
                  >
                    تایید
                  </BorderButton>
                  <BorderButton
                    className={`font-bold w-32`}
                    onClick={() => {
                      document.getElementById("reject").showModal();
                    }}
                  >
                    عدم تایید
                  </BorderButton>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <dialog id="submit" className="modal">
          <div className="modal-box">
            <div className="flex justify-center gap-4">
              <form method="dialog">
                <button className="mx-auto block ">
                  <BorderButton
                    className="w-full mx-auto font-bold shadow-md"
                    onClick={handleMetaverse}
                  >
                    ثبت
                  </BorderButton>
                </button>
              </form>
              <form method="dialog">
                <button className="mx-auto block ">
                  <BorderButton className="w-full mx-auto font-bold shadow-md">
                    لفو
                  </BorderButton>
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="reject" className="modal">
          <div className="modal-box">
            <label className="block text-[#4e45d0]  border-r-2  border-[#4e45d0] pr-4 pb-4">
              پاسخ
            </label>
            {messages ? (
              <select
                onChange={(e) => {
                  setOption(e.target.value);
                }}
                className="mx-auto block mb-8 select select-info w-full max-w-xs border-[#4e45d0] shadow-md"
              >
                <option>پیام مورد نظر را انتخاب کنید</option>
                {messages.map((msg) => {
                  return (
                    <option key={msg.id} value={msg.message}>
                      {msg.message}
                    </option>
                  );
                })}
              </select>
            ) : null}

            <textarea
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="textarea textarea-bordered border-[#4e45d0] w-full h-[calc(100%-6rem)]"
              placeholder="اینجا بنویسید..."
            ></textarea>

            <div className="flex justify-center gap-4">
              <form method="dialog">
                <button
                  disabled={!option && !message}
                  className="mx-auto block "
                >
                  <BorderButton
                    className="w-full mx-auto font-bold shadow-md"
                    onClick={handleReject}
                    disabled={!option && !message}
                  >
                    ثبت
                  </BorderButton>
                </button>
              </form>
              <form method="dialog">
                <button className="mx-auto block ">
                  <BorderButton className="w-full mx-auto font-bold shadow-md">
                    لفو
                  </BorderButton>
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </AdminLayout>
  );
};
export default ExhibitionApproval;

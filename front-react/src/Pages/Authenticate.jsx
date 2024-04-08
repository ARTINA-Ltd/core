import Avatar from "../assets/images/man.png";
import Header from "../components/AdminPageNavbar/Header.js";
import Footer from "../components/Footer/Footer.jsx";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard.jsx";
import BorderButton from "./../components/Buttons/BorderButton";
import SimpleInput from "./../components/Inputs/SimpleInput";
import { MdClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout.jsx";

const Authenticate = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [messages, setMessages] = useState(null);
  const [option, setOption] = useState(null);

  const hanleApprove = (e) => {
    setIsApproved(true);
    axios
      .put(
        `https://api.artina.org/api/supervisor/document-approvals/${id}/approve/`,
        { national_code_approved: isApproved },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log("message delivered" + e);
        Navigate("/admin-panel");
      })
      .catch((e) => {
        console.log(`there was an error : ${e}`);
      });
  };
  const handleReject = (e) => {
    console.log(option);
    setIsApproved(true);
    axios
      .put(
        `https://api.artina.org/api/supervisor/document-approvals/${id}/reject/`,
        { rejection_message: option },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log("message delivered" + e);
        Navigate("/admin-panel");
      })
      .catch((e) => {
        console.log(`there was an error : ${e}`);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://api.artina.org/api/supervisor/document-approvals/unseen_approvals/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setUser(
          e.data.filter((e) => {
            // eslint-disable-next-line eqeqeq
            return e.id == id;
          })[0]
        );
      })
      .catch((err) => {
        console.log(`there was an error ${err}`);
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
  }, []);

  return (
    <AdminLayout>
      <div>
        {user ? (
          <div className="shadow-md">
            <div
              className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '}   overflow-hidden pb-8`}
            >
              <div className="w-[90vw] mx-auto">
                <div
                  className="lg:block  flex gap-10"
                  style={{ justifyContent: "space-around" }}
                >
                  <div className=" bg-white rounded-3xl shadow-md p-10 flex gap-8 flex-wrap w-[70%] lg:w-full items-center h-full min-h-[70vh]">
                    <div className="flex sm:block">
                      <img
                        src={
                          user.user_profile.profile_picture
                            ? user.user_profile.profile_picture
                            : Avatar
                        }
                        alt="profilePicture"
                        className="w-72 h-72 self-start ml-8 rounded-full shadow-xl"
                      />
                      <div className="flex flex-wrap gap-4 w-full">
                        <div className=" w-full flex  justify-center items-end gap-5 mb-4">
                          <SimpleInput
                            className="shadow-lg"
                            type="text"
                            title="نام"
                            defaultValue={user.user_profile.first_name}
                            disabled={true}
                          />
                          <SimpleInput
                            className="shadow-lg"
                            type="text"
                            title=" نام خانوادگی"
                            defaultValue={user.user_profile.last_name}
                            disabled={true}
                          />
                        </div>
                        <SimpleInput
                          className="shadow-lg h-10"
                          type="email"
                          title=" ایمیل"
                          defaultValue={user.user_profile.email}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="w-full flex gap-4">
                      <SimpleInput
                        className="shadow-lg"
                        type="number"
                        title="کد ملی"
                        defaultValue={user.user_profile.national_code}
                        disabled={true}
                      />
                      <SimpleInput
                        className="shadow-lg"
                        type="text"
                        title="تاریخ تولد"
                        defaultValue={user.user_profile.birthdate}
                        disabled={true}
                      />
                    </div>
                    <div className="flex gap-8 item ml-16 mr-auto">
                      <BorderButton
                        onClick={() =>
                          document.getElementById("submit").showModal()
                        }
                      >
                        تایید
                      </BorderButton>
                      <BorderButton
                        onClick={() => {
                          document.getElementById("reject").showModal();
                        }}
                      >
                        عدم تایید
                      </BorderButton>
                    </div>
                  </div>
                  <div className="flex flex-col w-[25%] lg:w-full">
                    <div className="lg:mt-4 w-full bg-white rounded-lg p-1 flex items-center justify-center    ">
                      <img
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        src={user.user_profile.national_card_picture}
                        alt=""
                        className="z-20 object-cover block border-4 border-indigo-500 shadow-lg rounded-3xl lg:mt-5  "
                      />
                    </div>

                    <div className=" w-full my-6 mr-auto lg:ml-auto mt-4 ">
                      <SimpleCard className=" aspect-video bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden w-full min-h-[12rem]">
                        <img
                          alt=""
                          src="/mand1.png"
                          className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
                        />
                        <div className="text-white text-[22px] mb-2 z-10 font-b9 :text-[1rem]">
                          اطلاعات کارت بانکی
                        </div>
                        <div className="font-b3 sm">شماره شبا</div>
                        <div
                          className="flex items-center gap-5 w-full py-2 px-2"
                          dir="ltr"
                        >
                          <div className="pt-2 text-sm mx-auto lg:text-4xl md:text-2xl">
                            <p>IR {user.user_profile.shaba_number}</p>
                          </div>
                        </div>
                      </SimpleCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="p-2 mb-2 ease-in-out duration-200 hover:bg-red-500 rounded-full mr-auto block">
                    <MdClose />
                  </button>
                </form>
                <img
                  src={user.user_profile.national_card_picture}
                  alt=""
                  className="shadow-md rounded-md"
                />
                <div className="modal-action"></div>
              </div>
            </dialog>
            <dialog id="submit" className="modal">
              <div className="modal-box">
                <div className="flex justify-center gap-4">
                  <form method="dialog">
                    <button className="mx-auto block ">
                      <BorderButton
                        className="w-full mx-auto font-bold shadow-md"
                        onClick={hanleApprove}
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
                <div className="flex justify-center gap-4">
                  <form method="dialog">
                    <button className="mx-auto block ">
                      <BorderButton
                        className="w-full mx-auto font-bold shadow-md"
                        onClick={handleReject}
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
        ) : null}
      </div>
    </AdminLayout>
  );
};
export default Authenticate;

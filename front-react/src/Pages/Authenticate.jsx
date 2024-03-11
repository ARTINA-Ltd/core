import Avatar from "../assets/images/man.png";
import Header from "../components/AdminPageNavbar/Header.js";
import Form from "../assets/images/Screenshot 2024-03-05 133356.png";
import Footer from "../components/Footer/Footer.jsx";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard.jsx";
import BorderButton from "./../components/Buttons/BorderButton";
import SimpleInput from "./../components/Inputs/SimpleInput";
import { MdClose } from "react-icons/md";

const Authenticate = () => {
  return (
    <div dir="rtl" className="shadow-md">
      <div
        className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '}   overflow-hidden pb-8`}
      >
        <Header />
        <div className="w-[90vw] mx-auto">
          <div
            className="lg:block  flex gap-10"
            style={{ justifyContent: "space-around" }}
          >
            <div className=" bg-white rounded-3xl shadow-md p-10 flex gap-8 flex-wrap w-[70%] lg:w-full items-center h-full min-h-[70vh]">
              <div className="flex sm:block">
                <img
                  src={Avatar}
                  alt="profilePicture"
                  className="w-72 h-72 self-start ml-8"
                />
                <div className="flex flex-wrap gap-4 w-full">
                  <div className=" w-full flex  justify-center items-end gap-5 mb-4">
                    <SimpleInput
                      className="shadow-lg"
                      type="text"
                      title="نام"
                      defaultValue="آرتور"
                      disabled={true}
                    />
                    <SimpleInput
                      className="shadow-lg"
                      type="text"
                      title=" نام خانوادگی"
                      defaultValue="مورگان"
                      disabled={true}
                    />
                  </div>
                  <SimpleInput
                    className="shadow-lg h-10"
                    type="email"
                    title=" ایمیل"
                    defaultValue="example@mail.com"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="w-full flex gap-4">
                <SimpleInput
                  className="shadow-lg"
                  type="number"
                  title="کد ملی"
                  defaultValue="51311165"
                  disabled={true}
                />
                <SimpleInput
                  className="shadow-lg"
                  type="date"
                  title="تاریخ تولد"
                  defaultValue="1375/06/11"
                  disabled={true}
                />
              </div>
              <div className="flex gap-8 item ml-16 mr-auto">
                <BorderButton onClick={() => {}}>تایید</BorderButton>
                <BorderButton onClick={() => {}}>عدم تایید</BorderButton>
              </div>
            </div>
            <div className="flex flex-col w-[25%] lg:w-full">
              <div className="w-full  rounded-lg p-1 flex items-center justify-center    ">
                <img
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  src={Form}
                  alt=""
                  className="z-20 object-cover block border-4 border-indigo-500 shadow-lg rounded-3xl lg:mt-5  "
                />
              </div>

              <div className=" w-full my-6 mr-auto lg:ml-auto mt-4 ">
                <SimpleCard className=" aspect-video bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden w-full ">
                  <img
                    alt=""
                    src="/mand1.png"
                    className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
                  />
                  <div className="text-white text-[27px] mb-2 z-10 font-b9 sm:text-[1rem]">
                    اطلاعات کارت بانکی
                  </div>
                  <div className="font-b3 sm">شماره شبا</div>
                  <div
                    className="flex items-center gap-5 w-full py-2 px-2"
                    dir="ltr"
                  >
                    <div className="pt-2">IR </div>
                  </div>
                </SimpleCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="p-2 mb-2 ease-in-out duration-200 hover:bg-red-500 rounded-full mr-auto block">
              <MdClose />
            </button>
          </form>
          <img src={Form} alt="" className="shadow-md rounded-md" />
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
          </div>
        </div>
      </dialog>
      <Footer className="z-10" />
    </div>
  );
};
export default Authenticate;

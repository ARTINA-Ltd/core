import Header from "./../components/AdminPageNavbar/Header";
import Footer from "./../components/Footer/Footer";
import AuthPageCard from "./../components/Cards/AuthPageCard";
import { Link } from "react-router-dom";
import TicketCard from "../components/Cards/TicketCard.jsx";
import MetaVerseCard from "../components/Cards/MetaVerseCard.jsx";
const AdminPanel = () => {
  return (
    <div dir="rtl">
      <Header />
      <div
        className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}
      >
        <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
          <div className="bg-[#4e45d0] my-4 flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md">
            <img
              alt=""
              src="/mand1.png"
              className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
            />
            <h1 className="text-center font-bold text-3xl my-4  p-4 ">
              احراز هویت
            </h1>
          </div>
          <div className="w-[70vw] flex mx-auto flex-wrap gap-8 justify-center items-center">
            <AuthPageCard />
            <AuthPageCard />
            <AuthPageCard />
            <AuthPageCard />
            <AuthPageCard />
          </div>
          <div className="w-36 mr-auto rounded-lg text-white p-4 hover:bg-[#609AF8] ease-in-out duration-200 text-center my-8 bg-[#4e45d0] shadow-md">
            <Link className="hover:pr-4 ease-in-out duration-200  font-bold">
              مشاهده همه
            </Link>
          </div>
        </div>
        <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
          <div className=" mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
            <img
              alt=""
              src="/mand1.png"
              className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
            />
            <h1 className="text-center font-bold text-3xl my-4 p-4 ">
              تیکت ها
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-1">
            <TicketCard />
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>
          <div className="w-36 mr-auto rounded-lg text-white p-4 text-center my-8 hover:bg-[#609AF8] ease-in-out duration-200 bg-[#4e45d0] shadow-sm ">
            <Link className="hover:pr-4 ease-in-out duration-200 font-bold">
              مشاهده همه
            </Link>
          </div>
        </div>
        <div className="w-[90vw] my-4 mx-auto h-1/2 rounded-lg p-4">
          <div className=" mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
            <img
              alt=""
              src="/mand1.png"
              className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
            />
            <h1 className="text-center font-bold text-3xl my-4 p-4 ">متاورس</h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-1">
            <MetaVerseCard />
            <MetaVerseCard />
            <MetaVerseCard />
          </div>
          <div className="w-36 mr-auto rounded-lg text-white p-4 text-center my-8 hover:bg-[#609AF8] ease-in-out duration-200 bg-[#4e45d0] shadow-sm ">
            <Link className="hover:pr-4 ease-in-out duration-200 font-bold">
              مشاهده همه
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AdminPanel;

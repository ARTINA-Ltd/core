import Header from "./../components/AdminPageNavbar/Header";
import Footer from "./../components/Footer/Footer";
import BorderButton from "./../components/Buttons/BorderButton";
import Avatar from "../assets/images/man.png";
import SimpleInput from "./../components/Inputs/SimpleInput";

const TicketResponse = () => {
  return (
    <div dir="rtl">
      <Header />
      <div
        className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] overflow-hidden w-full'}`}
      >
        <div
          className={`bg-white rounded-lg p-8 w-[90vw] flex flex-wrap justify-between mx-auto my-10`}
        >
          <div className="user-ticket w-1/2 w-[calc(50%-1rem) md:w-full">
            <div className="flex w-full gap-4 shadow-md p-1 rounded-lg items-center">
              <label className="block ml-8 self-center text-primary opacity-70 mr-4">
                کاربر
              </label>
              <img src={Avatar} alt="" className="w-12 h-12" />
              <SimpleInput
                disabled
                placeholder="کاربر رندوم "
                className="w-full"
              ></SimpleInput>
            </div>
            <label className="block">موضوع</label>
            <label className="block">متن پیام</label>
            <textarea
              className="textarea textarea-primary w-full"
              placeholder="Bio"
              disabled
            ></textarea>
            <SimpleInput
              title="ایمیل"
              disabled
              placeholder="example@mail.com "
              className="w-full mt-4 "
            ></SimpleInput>
          </div>
          <div className="admin-response w-[calc(50%-2rem)] md:w-full">
            <form action="" className="h-full">
              <label className="block text-primary opacity-70 m-4">پاسخ</label>
              <textarea
                className="textarea textarea-bordered w-full h-[calc(100%-6rem)]"
                placeholder="اینجا بنویسید..."
              ></textarea>
              <BorderButton className={"w-1/2"}>
                <button className="text-right font-bold ">ثبت پاسخ</button>
              </BorderButton>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default TicketResponse;

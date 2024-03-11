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
            <div className="flex w-1/3 lg:w-2/3 md:w-1/2 sm:w-full gap-4 shadow-md p-1 rounded-l-lg items-center border-r-2  border-[#4e45d0]">
              <label className="block ml-8 self-center text-[#4e45d0] mr-4">
                کاربر
              </label>
              <img src={Avatar} alt="" className="w-12 h-12" />
              <label className="block text-gray-700  p-4 ">کاربر رندوم</label>
            </div>
            <div className="flex shadow-md rounded-lg my-4">
              <label className="block text-[#4e45d0] p-4 w-1/3 border-r-2  border-[#4e45d0]">
                موضوع
              </label>
              <label className="block text-gray-700  container p-4 w-2/3 ">
                موضوع رندوم
              </label>
            </div>
            <label className="block text-[#4e45d0] p-4 border-r-2  border-[#4e45d0] mt-4  w-full rounded-l-lg">
              متن پیام
            </label>
            <p className="block text-gray-700 p-4 border-r-2  border-[#4e45d0] mb-4 shadow-md w-full rounded-l-lg">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
            <SimpleInput
              title="ایمیل"
              disabled
              placeholder
              className="w-full mt-4  opacity-100"
            ></SimpleInput>
            <label className="absolute -translate-y-8 pr-4 ">
              example@mail.com
            </label>
          </div>
          <div className="admin-response w-[calc(50%-2rem)] md:w-full">
            <form action="" className="h-full shadow-lg rounded-lg p-4 py-8">
              <label className="block text-[#4e45d0] my-4 border-r-2  border-[#4e45d0] pr-4">
                پاسخ
              </label>
              <textarea
                className="textarea textarea-bordered border-[#4e45d0] w-full h-[calc(100%-6rem)]"
                placeholder="اینجا بنویسید..."
              ></textarea>
              <BorderButton className={"w-1/3 mr-auto sm:w-full"}>
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

import "./OtherInfo.css";
export default function OtherInfo() {
  return (
    <div className="grid flex align-items-center justify-content-center s2 mb-8 ">
      <div className="col-12 grid flex">
        <div className="lg:col-6 md:col-12 col-12 align-items-center justify-content-center sm:col-12 grid flex">
          <p className="  lg:col-6 md:col-6 sm:col-12  text-4xl font-bold  ">
            رده کاربری
          </p>
          <p className=" lg:col-6 md:col-6 sm:col-12  text-5xl font-bold      ">
            طلایی
          </p>
        </div>
        <div className="lg:col-6 md:col-12 text-center sm:col-12 grid flex">
          <p className="  lg:col-6 md:col-6 sm:col-12  text-4xl font-bold  ">
            امتیاز در سایت  
          </p>
          <p className=" lg:col-6 md:col-6 sm:col-12  text-5xl font-bold      ">
            65121
          </p>
        </div>
      </div>

      

        
        
     

      <div
        className=" col-12 mt-4 grid flex bg-primary"
        dir="rtl"
      >
        <div className=" lg:mr-8 w-5   sm:block   md:flex lg:flex text-4xl font-bold  sm:   align-items-center justify-content-center     lg:col-6 md:col-6 sm:col-12  ">
        <p >
          آدرس
        </p>
        </div>
        <div className="   align-items-end text-center justify-content-end    text-4xl font-bold       lg:col-6 md:col-6 sm:col-12  ">
        <p  >
          قزوین،خیابان امام خمینی،کوچه امام خامنه ای،بن بست شهید سلیمانی،پلاک22
        </p>
        </div>
      
         
      </div>
    </div>
  );
}

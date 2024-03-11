import BorderButton from "./../Buttons/BorderButton";
import { Link } from "react-router-dom";
const TicketCard = () => {
  return (
    <div>
      <div className="bg-white w-full min-h-[12rem] rounded-xl shadow-md hover:shadow-xl ease-in-out duration-200 lg:w-full p-4 overflow-hidden">
        <div className="flex items-center gap-5 text-xl border-r-2 pr-3 border-[#4e45d0] container mt-1 mb-4">
          <p className="text-xl font-bold ">موضوع</p>
          <p className="text-gray-700">عنوان موضوع رندوم</p>
        </div>
        <div className="flex gap-5 text-xl container w-3/4 border-r-2 pr-3 border-[#4e45d0]">
          <p className="text-xl font-bold ">متن</p>
          <p className="text-base text-gray-500">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی...
          </p>
        </div>
        <BorderButton className="text-right w-24 mr-auto my-2">
          <Link className=" font-bold">مشاهده</Link>
        </BorderButton>
      </div>
    </div>
  );
};
export default TicketCard;

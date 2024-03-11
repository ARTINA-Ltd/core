import BorderButton from "./../Buttons/BorderButton";

function MetaVerseCard() {
  return (
    <div className="bg-white w-full min-h-[12rem] rounded-xl shadow-md hover:shadow-xl ease-in-out duration-200 lg:w-full p-4 overflow-hidden">
      <div className="flex gap-4">
        <img
          className="w-36 border-2 p-4 rounded-md border-[#609AF8] sm:w-20 sm:h-20"
          src="/gallery.png"
          alt=""
        />

        <div className="">
          <div className="flex gap-4 mb-4">
            <p className="font-bold text-lg">تعداد آثار</p>
            <p className="text-lg">16</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold text-lg">نمایشگاه</p>
            <p className="text-lg">عنوان نمایشگاه رندوم</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <BorderButton className={"font-bold"}>تایید</BorderButton>
        <BorderButton className="font-bold">عدم تایید</BorderButton>
      </div>
    </div>
  );
}
export default MetaVerseCard;

import { useNavigate } from "react-router";
import BorderButton from "./../Buttons/BorderButton";
import galleryLogo from "../../assets/images/gallery.png"

function MetaVerseCard(props) {
  const { count, title, img, id, exhibition } = props;
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full min-h-[12rem] rounded-xl shadow-md hover:shadow-xl ease-in-out duration-200 lg:w-full p-4 overflow-hidden">
      <div className="flex gap-4">
        <img
          className="w-36  rounded-md shadow-md sm:w-20 sm:h-20"
          src={img ? img : galleryLogo}
          alt=""
        />

        <div className="">
          <div className="flex gap-4 mb-4">
            <p className="font-bold text-lg">تعداد آثار</p>
            <p className="text-lg">{count}</p>
          </div>
          <div className="flex gap-4">
            <p className="font-bold text-lg">نمایشگاه</p>
            <p className="text-lg">{title}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <BorderButton
          onClick={() => {
            navigate(`/exhibitionapproval/${exhibition}`);
          }}
          className="font-bold"
        >
          مشاهده
        </BorderButton>
      </div>
    </div>
  );
}
export default MetaVerseCard;

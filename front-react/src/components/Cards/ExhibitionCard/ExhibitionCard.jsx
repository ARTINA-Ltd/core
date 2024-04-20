import { Fragment } from "react";
import { useNavigate } from "react-router";

const ExhibitionCard = (props) => {
  const navigate = useNavigate();
  const { name, user, image, id, startDate, endDate, description, deadLine, handleTicket } = props;

  return (
    <Fragment>
      <div className=" flex flex-col my-8 w-[16rem] shadow-lg hover:shadow-lg transition-all ease-in-out duration-200 cursor-pointer hover:-translate-y-2 hover:shadow-black  bg-white rounded-xl grow max-h-[35rem] overflow-hidden">
        <div className="h-1/2 w-[100%-2rem] mx-4 mt-4 overflow-hidden rounded-md">
          <img src={image} alt="" className="w-full object-cover " />
        </div>

        <div
          onClick={() => {
            navigate("/exhibition-collections/" + id);
          }}
          className="p-4 mx-4 w-full h-1/2"
        >
          <h4 className="text-xl font-bold text-gray-700">{name}</h4>
          <div className=" mt-auto">
            <div className="mt-4">
              <p className="text-gray-600 my-4 text-center">{description}</p>
              <h4 className="text-gray-600">
                تاریخ شروع:{" "}
                {Intl.DateTimeFormat("fa", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(startDate))}
              </h4>
              <h4 className="text-gray-600">
                تاریخ پایان:{" "}
                {Intl.DateTimeFormat("fa", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(endDate))}
              </h4>
              <h4 className="text-gray-600">
                پایان ثبت نام:{" "}
                {Intl.DateTimeFormat("fa", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }).format(new Date(deadLine))}
                -
                {Intl.DateTimeFormat("fa", {
                  minute: "numeric",
                  hour: "numeric",
                }).format(new Date(deadLine))}
              </h4>
            </div>

            <div className="flex items-center justify-between w-full ">
              <h4 className="text-gray-600">هنرمند: {user}</h4>
            </div>
          </div>
        </div>
        <div className="mb-4 mx-2">{handleTicket}</div>
      </div>
    </Fragment>
  );
};
export default ExhibitionCard;

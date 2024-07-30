import BorderButton from "./../components/Buttons/BorderButton";
import Avatar from "../assets/images/man.png";
import SimpleInput from "./../components/Inputs/SimpleInput";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Layouts/AdminLayout.jsx";

const TicketResponse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState(null);
  const [option, setOption] = useState(null);

  const selectHandler = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/supervisor/supervisor-tickets/unresponded_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setTicket(
          e.data.filter((e) => {
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

  const responsePost = (e) => {
    const response = option + "\n" + message;
    console.log(response);
    e.preventDefault();

    axios
      .post(
        `https://api.artina.org/api/supervisor/supervisor-tickets/${id}/respond/`,
        {
          response_message: String(response),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        console.log("message delivered" + e);
        navigate("/admin-panel");
      })
      .catch((e) => {
        console.log(`there was an error : ${e}`);
      });
  };

  return (
    <AdminLayout>
      <div>
        {ticket ? (
          <div className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] overflow-hidden w-full'}`}>
            <div className={`bg-base-100 gap-4 rounded-lg p-8 w-[90vw] flex flex-wrap justify-between mx-auto my-10`}>
              <div className="user-ticket w-1/2 w-[calc(50%-1rem) md:w-full">
                <div className="flex w-full  gap-4 shadow-md p-1 rounded-l-lg items-center border-r-2  border-[#4e45d0]">
                  <label className="block ml-8 self-center text-[#4e45d0] mr-4">کاربر</label>

                  <img src={ticket.ticket.image_url ? ticket.ticket.image_url : Avatar} alt="" className="w-12 h-12 rounded-full" />

                  <label className="block text-gray-700  p-4 ">{ticket.ticket.name}</label>
                </div>
                <div className="flex shadow-md rounded-lg my-4">
                  <label className="block text-[#4e45d0] p-4 w-1/3 border-r-2  border-[#4e45d0]">موضوع</label>
                  <p className="block text-gray-700 p-4 w-2/3 ">{ticket.ticket.subject}</p>
                </div>
                <label className="block text-[#4e45d0] p-4 border-r-2  border-[#4e45d0] mt-4  w-full rounded-l-lg">متن پیام</label>
                <p className="block text-gray-700 p-4 border-r-2  border-[#4e45d0] mb-4 shadow-md w-full rounded-l-lg">{ticket.ticket.text}</p>
                <SimpleInput title="ایمیل" disabled className="w-full mt-4  opacity-100"></SimpleInput>
                <label className="absolute -translate-y-8 pr-4 shadow-md pb-4 pl-4 rounded-l-lg border-r-2  border-[#4e45d0]">{ticket.ticket.email}</label>
              </div>
              <div className="admin-response w-[calc(50%-2rem)] md:w-full">
                <form className="shadow-lg rounded-lg p-4 py-8">
                  {messages ? (
                    <select onChange={selectHandler} className="select select-info w-full max-w-xs border-[#4e45d0] shadow-md">
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
                  <label className="block text-[#4e45d0] my-4 border-r-2  border-[#4e45d0] pr-4">پاسخ</label>
                  <textarea
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="textarea textarea-bordered border-[#4e45d0] w-full h-[calc(100%-6rem)]"
                    placeholder="اینجا بنویسید..."
                  ></textarea>
                  <BorderButton className={"w-1/3 mr-auto sm:w-full"} disabled={!message && !option}>
                    <button type="submit" onClick={responsePost} className="text-right font-bold " disabled={!message && !option}>
                      ثبت پاسخ
                    </button>
                  </BorderButton>
                </form>
              </div>
              <div className="mt-8 mx-auto"></div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};
export default TicketResponse;

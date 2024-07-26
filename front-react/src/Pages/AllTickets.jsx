import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "./../components/Cards/TicketCard";
import AdminLayout from "../Layouts/AdminLayout.jsx";
import mand1 from "../assets/images/mand1.png"
const AllTickets = () => {
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/supervisor/supervisor-tickets/unresponded_tickets/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
      })
      .then((e) => {
        setTickets(e.data);
      })
      .catch((err) => {
        console.log(`there was an error:/ ${err}`);
      });
  }, []);
  return (
    <AdminLayout>
      <div>
        <div className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}>
          <div className="w-[90vw] mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
            <img alt="" src={mand1} className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden" />
            <h1 className="text-center font-bold text-3xl my-4 p-4 ">تیکت ها</h1>
          </div>
          <div className="grid w-[90vw] py-4 mx-auto grid-cols-2 gap-4 md:grid-cols-1">
            {tickets
              ? tickets.map((ticket) => {
                  const text = ticket.ticket.text.substring(0, 25);
                  return <TicketCard key={ticket.id} id={ticket.id} subject={ticket.ticket.subject} text={text.length < 25 ? text : text + " ..."} />;
                })
              : null}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AllTickets;

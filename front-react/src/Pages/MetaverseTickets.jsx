import { useEffect, useState } from "react";
import Header from "./../components/AdminPageNavbar/Header";
import axios from "axios";
import MetaVerseCard from "../components/Cards/MetaVerseCard.jsx";
import AdminLayout from "../Layouts/AdminLayout.jsx";
import mand1 from "../assets/images/mand1.png"
const MetaverseTickets = () => {
  const [metaTickets, setMetaTickets] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.artina.org/api/supervisor/supervisor-tickets/metaverse_tickets/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setMetaTickets(e.data);
      })
      .catch((err) => {
        console.log(`there was an error${err}`);
      });
  }, []);
  return (
    <AdminLayout>
      <div>
        <div
          className={` ${'bg-[#f9f9f9] bg-[length:300px] bg-[url("https://artina.org/12.png")] '} min-h-screen  overflow-hidden pb-8`}
        >
          <div className="w-[90vw] mx-auto">
            <div className=" mx-auto bg-[#4e45d0] flex flex-col relative text-white gap-4 items-center overflow-hidden rounded-xl shadow-md my-4">
              <img
                alt=""
                src={mand1}
                className=" opacity-[15%] absolute top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
              />
              <h1 className="text-center font-bold text-3xl my-4 p-4 ">
                متاورس
              </h1>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-1">
              {metaTickets
                ? metaTickets.map((ticket) => {
                    return (
                      <MetaVerseCard
                        key={ticket.id}
                        title={ticket.ticket.name}
                        count={ticket.ticket.user}
                        img={ticket.ticket.image_url}
                        id={ticket.id}
                        exhibition={ticket.ticket.text}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default MetaverseTickets;

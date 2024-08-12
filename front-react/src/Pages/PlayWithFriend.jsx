import { useContext, useEffect, useState } from "react";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import { UserContext } from "../App.js";
import axios from "axios";
import PaperRockScissors from "../components/Nts/PaperRockScissors.jsx";
const PlayWithFriend = () => {
  const user = useContext(UserContext);
  const [sessions, setSessions] = useState("");
  useEffect(() => {
    axios
      .post(
        "https://api.artina.org/api/game/games/user_game_sessions/",
        { id: user?.data.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((e) => {
        setSessions(e.data);
        console.log(e.data);
      });
  }, []);

  return (
    <div>
      <NTSNavbar />
      {sessions &&
        sessions.map((session) => {
          return (
            <div className="flex ">
              <PaperRockScissors /> <h1>{session.game_id}</h1>
            </div>
          );
        })}
    </div>
  );
};
export default PlayWithFriend;

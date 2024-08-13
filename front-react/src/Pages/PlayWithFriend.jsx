import { useContext, useEffect, useState } from "react";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import { UserContext } from "../App.js";
import axios from "axios";
import PaperRockScissors from "../components/Nts/PaperRockScissors.jsx";
import PaperRockScissorsFriend from "../components/Nts/PaperRockScissorsFriends.jsx";
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
  }, [user]);

  return (
    <div>
      <NTSNavbar />
      <div className="grid grid-cols-2 gap-8 md:grid-cols-1 m-8">
        {sessions &&
          sessions.map((session) => {
            return (
              <div key={session.game_id}>
                <PaperRockScissorsFriend gameId={session.game_id} opChoice={session.opponent_choice} result={session.result} opUsername={session.opponent_username} opProfile={session.opponent_profile_picture} choice={session.choice} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default PlayWithFriend;

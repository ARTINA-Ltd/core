import { useContext, useEffect, useState } from "react";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import axios from "axios";
import PaperRockScissorsFriend from "../components/Nts/PaperRockScissorsFriends.jsx";
import PaperRockScissors from "../components/Nts/PaperRockScissors.jsx";
import BorderButton from "../components/Buttons/BorderButton.jsx";
import FancyText from "@carefully-coded/react-text-gradient";
import { UserContext } from "../contexts/UserContext.js";

const PlayWithFriend = () => {
  const user = useContext(UserContext);
  const [sessions, setSessions] = useState([]);
  const [selectedMove, setSelectedMove] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [soloDisabled, setSoloDisabled] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleUserChoice = (choice) => {
    setSelectedMove(choice);
  };

  useEffect(() => {
    if (user?.data?.id) {
      axios
        .get("https://api.artina.org/api/game/games/user_game_sessions/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        })
        .then((res) => {
          setSessions(res.data);
        })
        .catch((error) => {
          console.error("Error fetching sessions:", error);
        });
    }
  }, [user, refresh]);

  const playSolo = () => {
    setSoloDisabled(true); // Disable the button right away
    axios
      .put(
        "https://api.artina.org/api/game/games/create_play_solo/",
        { id: user?.data?.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
        }
      )
      .then((res) => {
        const gameId = res.data.id;
        return axios.put(
          `https://api.artina.org/api/game/games/${gameId}/play_solo/`,
          { choice: selectedMove },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
          }
        );
      })
      .then((res) => {
        setStatus(res.data.result);
        setServerResponse(res.data.server_choice);
        setRefresh((prev) => !prev); // Trigger refresh of sessions
      })
      .catch((error) => {
        console.error("Error playing solo:", error);
      })
      .finally(() => {
        setSoloDisabled(false); // Re-enable the button after the game round is complete
      });
  };

  return (
    <div>
      <NTSNavbar />
      {
        // <div className="w-[80%] mx-auto">
        //   <div className="w-fit mx-auto mt-4 mb-8">
        //     <FancyText className={"mx-auto text-5xl"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
        //       Play Solo!
        //     </FancyText>
        //   </div>
        //   <PaperRockScissorsFriend isActive={true} result={""} opChoice={"paper"} />
        //   <PaperRockScissors serverResponse={serverResponse} status={status} onChoice={handleUserChoice} />
        //   <div className="mx-auto mt-4 w-fit">
        //     <BorderButton disabled={soloDisabled} onClick={playSolo}>
        //       Start the game
        //     </BorderButton>
        //   </div>
        // </div>
        // <div className="w-[90%] border-t my-8 mx-auto" />
      }
      <div className="w-fit mx-auto mt-4 mb-20">
        <FancyText className={"mx-auto text-5xl"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
          Play With Others!
        </FancyText>
      </div>
      <div className="grid grid-cols-1 w-[80vw] mx-auto xl:grid-cols-2 gap-8 md:grid-cols-1 m-8">
        {sessions.length > 0 &&
          sessions.map((session, i) => (
            <div key={i} className="h-full">
              <PaperRockScissorsFriend gameId={session.game} opChoice={session.opponent_choice} result={session.result} opUsername={session.opponent_username} opProfile={session.opponent_profile_picture} choice={session.choice} isActive={session.is_active} userTurn={session.user_turn} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayWithFriend;

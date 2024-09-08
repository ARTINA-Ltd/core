import { useContext, useEffect, useState } from "react";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import { UserContext } from "../App.js";
import axios from "axios";
import PaperRockScissorsFriend from "../components/Nts/PaperRockScissorsFriends.jsx";
import PaperRockScissors from "../components/Nts/PaperRockScissors.jsx";
import BorderButton from "../components/Buttons/BorderButton.jsx";
import FancyText from "@carefully-coded/react-text-gradient";

const PlayWithFriend = () => {
  const user = useContext(UserContext);
  const [sessions, setSessions] = useState("");
  const [selectedMove, setSelectedMove] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [soloDisabled, setSoloDisabled] = useState(false);
  const handleUserChoice = (choice) => {
    setSelectedMove(choice);
  };
  const [serverResponse, setServerResponse] = useState("");
  const [status, setStatus] = useState("Pending");

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

  const playSolo = () => {
    axios
      .post(
        "https://api.artina.org/api/game/games/create_play_solo/",
        { id: user?.data.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
          },
          mode: "cors",
        }
      )
      .then((e) => {
        setSoloDisabled(false);
        console.log(e.data.id);
        axios
          .post(
            `https://api.artina.org/api/game/games/${e.data.id}/play_solo/`,
            {
              choice: selectedMove,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
              },
            }
          )
          .then((e) => {
            setRefresh(!refresh);
            setStatus(e.data.result);
            setServerResponse(e.data.server_choice);
            setSoloDisabled(!soloDisabled);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <NTSNavbar refetch={refresh} />
      <div className="w-[80%] mx-auto">
        <div className="w-fit mx-auto mt-4 mb-8">
          <FancyText className={"mx-auto text-5xl"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
            Paly Solo!{" "}
          </FancyText>
        </div>
        <PaperRockScissors serverResponse={serverResponse} status={status} onChoice={handleUserChoice} />
        <div className="mx-auto mt-4 w-fit">
          <BorderButton disabled={soloDisabled} onClick={playSolo}>
            Start the game
          </BorderButton>
        </div>
      </div>
      <div className="w-[90%] border-t my-8 mx-auto" />
      <div className="w-fit mx-auto mt-4 mb-20">
        <FancyText className={"mx-auto text-5xl"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
          Paly With Others!{" "}
        </FancyText>
      </div>
      <div className="grid grid-cols-2 w-[80vw] mx-auto xl:grid-cols-3 gap-8 md:grid-cols-1 m-8">
        {sessions &&
          sessions.map((session) => {
            return (
              <div key={session.game_id} className="h-full">
                <PaperRockScissorsFriend gameId={session.game_id} opChoice={session.opponent_choice} result={session.result} opUsername={session.opponent_username} opProfile={session.opponent_profile_picture} choice={session.choice} isActive={session.is_active} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default PlayWithFriend;

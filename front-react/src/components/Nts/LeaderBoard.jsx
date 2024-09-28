import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerAvatar from "./PlayerAvatar";

const LeaderBoard = () => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/game/leaderboard/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((e) => {
        setTopPlayers(e.data.slice(0, 3));
        setLeaderBoard(e.data.slice(3));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // Function to format the last seen date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = now - date;

    // Calculate time differences
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    if (timeDiff < oneMinute) {
      return "Last seen just now";
    } else if (timeDiff < oneHour) {
      const minutesAgo = Math.floor(timeDiff / oneMinute);
      return `Last seen ${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < oneDay) {
      const hoursAgo = Math.floor(timeDiff / oneHour);
      return `Last seen ${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    } else {
      return `Last seen on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }
  };
  useEffect(() => {
    console.log(topPlayers, leaderBoard);
  }, [topPlayers, leaderBoard]);

  if (!leaderBoard.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-neutral p-8 rounded-3xl mx-auto w-fit cursor-default overflow-auto mb-12">
      <div className="flex mb-8 gap-8 h-56 justify-between">
        <div className={"self-end text-center"}>
          <PlayerAvatar
            className={"mx-auto py-2"}
            size={"w-24"}
            profileImage={topPlayers[1].profile_picture}
            username={topPlayers[1].user}
            rank="2"
          />
          <h2>{topPlayers[1].user}</h2>
          <h3 className="text-primary font-bold">
            Points: {topPlayers[1].points}
          </h3>
          <h3>Remaining Hearts: {topPlayers[1].hearts}</h3>
        </div>
        <div className="text-center">
          <PlayerAvatar
            className={"mx-auto py-2"}
            profileImage={topPlayers[0].profile_picture}
            username={topPlayers[0].user}
            rank="1"
            size={"w-28"}
          />
          <h2>{topPlayers[0].user}</h2>
          <h3 className="text-primary font-bold">
            Points: {topPlayers[0].points}
          </h3>
          <h3>Remaining Hearts: {topPlayers[0].hearts}</h3>
        </div>
        <div className={"self-end text-center"}>
          <PlayerAvatar
            className={"mx-auto py-2"}
            profileImage={topPlayers[2].profile_picture}
            username={topPlayers[2].user}
            rank="3"
            size={"w-24"}
          />
          <h2>{topPlayers[2].user}</h2>
          <h3 className="text-primary font-bold">
            Points: {topPlayers[2].points}
          </h3>
          <h3>Remaining Hearts: {topPlayers[2].hearts}</h3>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden bg-base-200">
        {leaderBoard.map((user, i) => {
          return (
            <div
              className="flex p-4 hover:bg-base-100 transition-colors"
              key={user.id}
            >
              <PlayerAvatar
                profileImage={user.profile_picture}
                rank={i + 4}
                username={user.user}
              />
              <div className="mx-4 ">
                <h2 className="text-lg font-bold">{user.user}</h2>
                <div className="flex gap-4">
                  <h4 className="text-primary">Points:{user.points}</h4>
                  <h4 className="opacity-60">
                    Remaining Hearts: {user.hearts}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;

// <div className="bg-neutral p-4 rounded-lg mx-auto w-fit max-h-[500px] cursor-default overflow-auto mb-12">
//   <PlayerAvatar />
//   <table className="table-auto w-full">
//     <thead>
//       <tr className="text-lg font-bold bg-">
//         {" "}
//         {/* Special style for header row */}
//         <th className="px-6 py-3"># Rank</th>
//         <th className="px-6 py-3">User</th>
//         <th className="px-6 py-3">Points</th>
//         <th className="px-6 py-3">Hearts</th>
//         <th className="px-6 py-3">Last Seen</th>
//       </tr>
//     </thead>
//     <tbody>
//       {leaderBoard.map((user, i) => (
//         <tr
//           key={user.id || i}
//           className={`text-base ${i === 0 ? " font-bold" : ""}`}
//         >
//           <td className="px-6 py-4">{i + 1}</td>
//           <td className="px-6 py-4">
//             <div className="flex gap-2 items-center">
//               <img
//                 src={user.profile_picture}
//                 className="h-10 aspect-square object-cover cursor-pointer rounded-full border "
//                 alt=""
//               />
//               <h1>{user.username}</h1>
//             </div>
//           </td>
//           <td className="px-6 py-4">{user.points}</td>
//           <td className="px-6 py-4">{user.hearts}</td>
//           <td className="px-6 py-4">{formatDate(user.last_played)}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

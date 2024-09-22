import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    axios
      .get("https://api.artina.org/api/game/leaderboard/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        mode: "cors",
      })
      .then((e) => {
        setLeaderBoard(e.data);
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

  if (!leaderBoard.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-neutral p-4 rounded-lg mx-auto w-fit max-h-[500px] cursor-default overflow-auto mb-12">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-lg font-bold bg-">
            {" "}
            {/* Special style for header row */}
            <th className="px-6 py-3"># Rank</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Points</th>
            <th className="px-6 py-3">Hearts</th>
            <th className="px-6 py-3">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.map((user, i) => (
            <tr key={user.id || i} className={`text-base ${i === 0 ? " font-bold" : ""}`}>
              <td className="px-6 py-4">{i + 1}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2 items-center">
                  <img src={user.profile_picture} className="h-10 aspect-square object-cover cursor-pointer rounded-full border " alt="" />
                  <h1>{user.username}</h1>
                </div>
              </td>
              <td className="px-6 py-4">{user.points}</td>
              <td className="px-6 py-4">{user.hearts}</td>
              <td className="px-6 py-4">{formatDate(user.last_played)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;

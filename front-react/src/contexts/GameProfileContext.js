// src/contexts/GameProfileContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext"; // Import the UserContext

export const GameProfileContext = createContext();

export const GameProfileProvider = ({ children }) => {
  const user = useContext(UserContext); // Use UserContext
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user?.data?.id) {
      // Only fetch when user is available
      axios
        .post(
          "https://api.artina.org/api/game/user-profiles/user_profile/",
          { id: user?.data.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
            },
            mode: "cors",
          }
        )
        .then((response) => {
          setUserProfile(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch game profile:", error);
        });
    }
  }, [user]); // Fetch when the user changes

  return <GameProfileContext.Provider value={userProfile}>{children}</GameProfileContext.Provider>;
};

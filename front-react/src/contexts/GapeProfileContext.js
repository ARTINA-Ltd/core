// src/contexts/GameProfileContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.js";

export const GameProfileContext = createContext();

export const GameProfileProvider = ({ children }) => {
  const user = useContext(UserContext);
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    if (user?.data?.id) {
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
  }, [user]);

  return <GameProfileContext.Provider value={userProfile}>{children}</GameProfileContext.Provider>;
};

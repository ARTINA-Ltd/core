// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UserChangeContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.artina.org/api/account/user-info/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
      },
      mode: "cors",
    })
      .then((data) => {
        setUser(data);
      })
      .catch(() => setUser(undefined));
  }, []);

  const userChange = async () => {
    await axios
      .get("https://api.artina.org/api/account/user-info/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => setUser(undefined));
  };

  return (
    <UserContext.Provider value={user}>
      <UserChangeContext.Provider value={userChange}>{children}</UserChangeContext.Provider>
    </UserContext.Provider>
  );
};

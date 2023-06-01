import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

import { getRandomNumber } from "./utils";
import * as API from "./config";

const APIUserContext = createContext();

export function APIUserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUserById(id = getRandomNumber()) {
      try {
        const { data } = await axios.get(API.getUserById(id));
        setUser(data);
      } catch (err) {
        console.error(err.message);
        throw new Error(err);
      }
    }

    fetchUserById();
  }, []);
  return (
    <APIUserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </APIUserContext.Provider>
  );
}

export function useUserAPI() {
  return useContext(APIUserContext);
}

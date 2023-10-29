import React, { createContext, useState } from "react";

export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserIdContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserIdContext.Provider>
  );
};

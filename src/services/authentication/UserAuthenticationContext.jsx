import { createContext, useState } from "react";

export const UserAuthenticationContext = createContext();

const userStorage = JSON.stringify(localStorage.getItem("user"));

const UserAuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    userStorage ? JSON.parse(userStorage) : null
  );

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const data = { user, login, logout };
  return (
    <UserAuthenticationContext.Provider value={data}>
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export default UserAuthenticationContextProvider;

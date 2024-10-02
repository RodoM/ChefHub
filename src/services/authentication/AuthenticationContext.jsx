import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const userStorage = localStorage.getItem("user");

const AuthenticationContextProvider = ({ children }) => {
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
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;

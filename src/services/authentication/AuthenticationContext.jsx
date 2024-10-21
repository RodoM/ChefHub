import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext();

const url = "https://localhost:7021/api/";
const tokenStorage = localStorage.getItem("token");
const userStorage = localStorage.getItem("user");

const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenStorage);
  const [user, setUser] = useState(
    userStorage ? JSON.parse(userStorage) : null
  );

  const login = async (email, password) => {
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url + "Auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.text();
      setToken(data);
      localStorage.setItem("token", data);
      const decoded = jwtDecode(data);
      const user = {
        id: decoded.sub,
        fullName: decoded.fullName,
        photo: decoded.photo,
      };
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const data = { token, login, logout, user };
  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;

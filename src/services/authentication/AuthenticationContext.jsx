import { createContext, useState } from "react";

export const AuthenticationContext = createContext();
const url = "https://localhost:7021/api/";
const tokenStorage = localStorage.getItem("token");

const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenStorage);

  const login = async (email,password) => {
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
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  

  

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const data = { token, login, logout };
  return (
    <AuthenticationContext.Provider value={data}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;

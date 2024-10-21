import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const URL = "https://localhost:7021/api/User/";
  const token = localStorage.getItem("token");

  const register = async (data) => {
    try {
      const response = await fetch(URL + "Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetUserById = async (id) => {
    try {
      const response = await fetch(URL + `${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "text/plain",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const data = { register, GetUserById };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

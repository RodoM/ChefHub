import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const URL = "https://localhost:7021/api/User/";
  const getToken = () => localStorage.getItem("token");
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
  const CreateUserModerator = async (userRequest) => {
    try {
      const response = await fetch(
        "https://localhost:7021/api/AdminUser/CreateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
            accept: "*/*",
          },
          body: JSON.stringify(userRequest),
        }
      );
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

  const GetUserById = async (id) => {
    try {
      const response = await fetch(URL + `${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
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
  const UpdateUser = async (userRequest) => {
    try {
      const response = await fetch(URL + "ModifyUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
        },
        body: JSON.stringify(userRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message };
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocurrió un error inesperado. Inténtalo de nuevo más tarde.",
      };
    }
  };

  const data = { register, GetUserById, UpdateUser, CreateUserModerator };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

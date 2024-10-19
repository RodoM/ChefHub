import { createContext } from "react";

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const URL = "https://localhost:7021/api/"; //cada uno debe reemplazar con su url (no estoy seguro si es la misma para todos, o si cada uno tiene un url diferente en su maquina)
  const token = localStorage.getItem("token");

  const GetAllRecipes = async () => {
    try {
      const response = await fetch(URL + "Recipe/GetAllRecipes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
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
  const GetRecipeById = async (id) => {
    try {
      const response = await fetch(URL + `Recipe/GetRecipeById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
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
  const GetRecipesByUser = async (idUser) => {
    try {
      const response = await fetch(URL + `Recipe/GetRecipesByUser/${idUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
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

  const CreateRecipe = async (recipe) => {
    console.log(recipe);
    try {
      const response = await fetch(URL + "Recipe/CreateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
        body: JSON.stringify(recipe),
      });
      console.log(response);

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

  const data = { GetAllRecipes, GetRecipeById, GetRecipesByUser, CreateRecipe };

  return (
    <RecipeContext.Provider value={data}>{children}</RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

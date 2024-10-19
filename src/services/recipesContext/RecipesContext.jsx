import { createContext } from "react";

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const URL = "https://localhost:7021/api/"; //cada uno debe reemplazar con su url (no estoy seguro si es la misma para todos, o si cada uno tiene un url diferente en su maquina)
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
      const response = await fetch(URL + `Recipe/${id}`, {
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
  const data = { GetAllRecipes, GetRecipeById };
  return (
    <RecipeContext.Provider value={data}>{children}</RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

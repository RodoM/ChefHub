import { createContext } from "react";

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const URL = "https://localhost:7021/api/"; //cada uno debe reemplazar con su url (no estoy seguro si es la misma para todos, o si cada uno tiene un url diferente en su maquina)
  const getToken = () => localStorage.getItem("token");

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
 
    try {
      const response = await fetch(URL + "Recipe/CreateRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
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

  const DeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(URL + `Recipe/${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
        },
      });
      console.log(response);
      if (response.status === 204) {
        return true;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createComment = async (recipeId, comment) => {
    try {
      const response = await fetch(URL + `Comment/CreateComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
        },
        body: JSON.stringify({ text: comment.text, score: Number(comment.score), recipeId: Number(recipeId) }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const deleteComment = async (commentId, recipeId) => {
    try {
      const response = await fetch(URL + `Comment/${commentId}?recipeId=${recipeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const data = {
    GetAllRecipes,
    GetRecipeById,
    GetRecipesByUser,
    CreateRecipe,
    DeleteRecipe,
    createComment,
    deleteComment,
  };

  return (
    <RecipeContext.Provider value={data}>{children}</RecipeContext.Provider>
  );
};

export default RecipeContextProvider;

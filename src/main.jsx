import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthenticationContextProvider from "./services/authentication/AuthenticationContext";
import RecipeContextProvider from "./services/recipesContext/RecipesContext";
import LoadContextProvider from "./services/loadContext/LoadContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticationContextProvider>
      <RecipeContextProvider>
        <LoadContextProvider>
          <App />
        </LoadContextProvider>
      </RecipeContextProvider>
    </AuthenticationContextProvider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import UserAuthenticationContextProvider from "./services/authentication/UserAuthenticationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthenticationContextProvider>
      <App />
    </UserAuthenticationContextProvider>
  </StrictMode>
);

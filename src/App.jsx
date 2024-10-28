import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AnonymousLayout from "./layouts/AnonymousLayout";
import Home from "./pages/Home";
import RecipeDetail from "./pages/recipe/RecipeDetail";
import CreateRecipe from "./pages/recipe/CreateRecipe";
import EditRecipe from "./pages/recipe/EditRecipe";
import UserProfile from "./pages/user/UserProfile";
import EditUser from "./pages/user/EditUser";
import UserList from "./pages/user/UserList";
import CreateModerator from "./pages/moderator/CreateModerator";
import EditModerator from "./pages/moderator/EditModerator";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/error/NotFound";
import UserProtected from "./routes/UserProtected";
import AdminProtected from "./routes/AdminProtected";
import { UserContextProvider } from "./services/userContext/UserContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "recipe-detail/:id",
          element: <RecipeDetail />,
        },
        {
          path: "create-recipe",
          element: (
            <UserProtected>
              <CreateRecipe />
            </UserProtected>
          ),
        },
        {
          path: "edit-recipe",
          element: (
            <UserProtected>
              <EditRecipe />
            </UserProtected>
          ),
        },
        {
          path: "user-profile/:id",
          element: (
            <UserContextProvider>
              <UserProfile />
            </UserContextProvider>
          ),
        },
        {
          path: "edit-user",
          element: (
            <UserProtected>
              <UserContextProvider>
                <EditUser />
              </UserContextProvider>
            </UserProtected>
          ),
        },
        {
          path: "user-list",
          element: <UserList />,
        },
        {
          path: "create-moderator",
          element: (
            <AdminProtected>
              <UserContextProvider>
                <CreateModerator />
              </UserContextProvider>
            </AdminProtected>
          ),
        },
        {
          path: "edit-moderator/:id",
          element: <EditModerator />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/login",
      element: <AnonymousLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/register",
      element: <AnonymousLayout />,
      children: [
        {
          path: "/register",
          element: (
            <UserContextProvider>
              <Register />
            </UserContextProvider>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import RecipeDetail from '@/pages/recipe/RecipeDetail';
import CreateRecipe from '@/pages/recipe/CreateRecipe';
import EditRecipe from '@/pages/recipe/EditRecipe';
import UserProfile from '@/pages/user/UserProfile';
import EditUser from '@/pages/user/EditUser';
import UserList from '@/pages/user/UserList';
import CreateModerator from '@/pages/moderator/CreateModerator';
import EditModerator from '@/pages/moderator/EditModerator';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de auth, solo se pueden acceder si no se esta logueado */}
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* Rutas públicas, se pueden acceder tanto logueado como no */}
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/recipe-detail/:id" element={<RecipeDetail />} />
          </Route>

          {/* Rutas protegidas, solo se pueden acceder logueado */}
          <Route>
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Route>

          {/* Rutas admin, solo se pueden acceder siendo un admin logueado */}
          <Route>
            <Route path="/user-list" element={<UserList />} />
            <Route path="/create-moderator" element={<CreateModerator />} />
            <Route path="/edit-moderator/:id" element={<EditModerator />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

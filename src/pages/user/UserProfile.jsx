import { RecipeCard } from "@/components/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import { UserContext } from "@/services/userContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { isValidURL } from "@/helper/ValidateUrl";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
const UserProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthenticationContext);
  const { GetUserById } = useContext(UserContext);
  const { GetRecipesByUser } = useContext(RecipeContext);
  const [userProfile, setUserProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const getUserById = async () => {
      const user = await GetUserById(id);

      if (user) {
        setUserProfile(user.data);
      }
    };
    getUserById();
  }, [id, GetUserById]);
  useEffect(() => {
    const getRecipesByUser = async () => {
      const recipes = await GetRecipesByUser(id);
      if (recipes) {
        setRecipes(recipes.data);
      }
    };
    getRecipesByUser();
  }, [id, GetRecipesByUser]);

  if (!userProfile) return <div>Loading...</div>;
  return (
    <div className="flex justify-center w-full my-10">
      <div className="w-full max-w-7xl p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{userProfile?.fullName}</h2>
          {user && userProfile.id === Number(user.id) && (
            <Button className="ml-4 flex items-center justify-center">
              <span className="hidden md:block">Editar Perfil</span>
              <Pencil className="md:ml-2 block md:hidden" />
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8 items-center">
          <img
            src={
              isValidURL(userProfile.urlPhoto)
                ? userProfile.urlPhoto
                : "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
            }
            alt={userProfile?.fullName}
            className="rounded-md object-cover h-[220px] w-[220px] md:h-[260px] md:w-[260px]"
          />
          <p className="text-gray-500 mt-2 md:mt-0 md:ml-4">
            {userProfile?.description}
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button>Mis Recetas (2)</Button>
          <Button variant="outline">Favoritas (10)</Button>
        </div>

        {recipes.length > 0 ? (
          <div className="grid gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard {...recipe} key={index} />
            ))}
          </div>
        ) : (
          <p>No tienes Recetas</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

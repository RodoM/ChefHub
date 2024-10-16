import { LoaderCircle } from "lucide-react";
import { RecipeList } from "@/components/recipe/RecipeList";
import { RecipeFilter } from "@/components/recipe/RecipeFilter";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Link } from "react-router-dom";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { useState } from "react";
const Home = () => {
  const { user } = useContext(AuthenticationContext);
  const { GetAllRecipes } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    const getAllRecipes = async () => {
      const recipes = await GetAllRecipes();

      if (recipes) {
        setRecipes(recipes.data);
      }
    };
    getAllRecipes();
  }, [GetAllRecipes]);

  if (!recipes) {
    return <div className="h-screen flex justify-center items-center">
      <LoaderCircle size={64} className="animate-spin" />
    </div>;
  }
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold my-4">Recetas</h1>
        {user && (
          <Button>
            {" "}
            <Link to={"/create-recipe"}>Crear receta</Link>
          </Button>
        )}
      </div>
      <section className="grid md:grid-cols-[75%_auto] gap-6">
        <RecipeList recipes={recipes} />
        <RecipeFilter />
      </section>
    </div>
  );
};

export default Home;

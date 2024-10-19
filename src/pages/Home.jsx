import { LoaderCircle, Plus } from "lucide-react";
import { RecipeList } from "@/components/recipe/RecipeList";
import { RecipeFilter } from "@/components/recipe/RecipeFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Link } from "react-router-dom";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { useState } from "react";

const Home = () => {
  const { token, user } = useContext(AuthenticationContext);
  const { GetAllRecipes } = useContext(RecipeContext);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllRecipes = async () => {
      const recipes = await GetAllRecipes();

      if (recipes) {
        setRecipes(recipes.data);
      }
    };
    getAllRecipes();
  }, [GetAllRecipes]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    search === ""
      ? true
      : recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!recipes) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircle size={64} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold my-4">Recetas</h1>

        <Input
          placeholder="Buscar receta..."
          value={search}
          onChange={handleSearchChange}
        />

        {token && (
          <Button>
            {" "}
            <Link to={"/create-recipe"}>
              <span className="hidden md:block">Crear receta</span>
              <Plus size={16} className="block md:hidden" />
            </Link>
          </Button>
        )}
      </div>
      <section className="grid md:grid-cols-[75%_auto] gap-6">
        <RecipeList recipes={filteredRecipes} />
        <RecipeFilter />
      </section>
    </div>
  );
};

export default Home;

import { RecipeList } from "@/components/recipe/RecipeList";
import { RecipeFilter } from "@/components/recipe/RecipeFilter";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold my-4">Recetas</h1>
        <Button>Crear receta</Button>
      </div>
      <section className="grid md:grid-cols-[75%_auto] gap-6">
        <RecipeList />
        <RecipeFilter />
      </section>
    </div>
  );
}

export default Home;

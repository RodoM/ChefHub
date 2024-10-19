import PropTypes from "prop-types";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }) => {
  if (recipes.count === 0)
    return (
      <div className="h-screen flex justify-center items-center">
        <p>No hay recetas disponibles</p>
      </div>
    );
  return (
    <div className="grid gap-4">
      {recipes.map((recipe, index) => {
        return <RecipeCard {...recipe} key={index} />;
      })}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array,
};

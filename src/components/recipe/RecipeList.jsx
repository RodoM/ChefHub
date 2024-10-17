import PropTypes from "prop-types";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }) => {
  return (
    <div className="grid gap-4 h-fit">
      {recipes.map((recipe, index) => {
        return <RecipeCard {...recipe} key={index} />;
      })}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array,
};
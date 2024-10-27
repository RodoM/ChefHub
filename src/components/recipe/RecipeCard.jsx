import PropTypes from "prop-types";
import { Heart, Clock, Flame, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { useToast } from "@/hooks/use-toast";
import { FaHeart } from "react-icons/fa";
import { LoadContext } from "@/services/loadContext/LoadContext";
export const RecipeCard = ({
  id,
  title,
  urlImage,
  description,
  preparationTime,
  difficulty,
  comments,
}) => {
  const { user } = useContext(AuthenticationContext);
  const { GetUserFavorites, AddRecipeToFavorites, DeleteRecipeFromFavorites } =
    useContext(RecipeContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const { handleLoad } = useContext(LoadContext);
  const recipeScore = (comments) => {
    if (comments?.length === 0) return "SC";
    const totalScore = comments?.reduce(
      (acc, comment) => acc + comment.score,
      0
    );
    const averageScore = totalScore / comments?.length;
    return averageScore.toFixed(2);
  };
  const handleAddToFavorites = async () => {
    const result = await AddRecipeToFavorites({
      recipeId: id,
      favoriteType: 0, //dijimos de agregar los favoritos a una sola lista de favoritos asi no nos complicamos
    });
    if (result) {
      toast({
        title: "Favorito agregado exitosamente",
        variant: "success",
      });
      handleLoad();
    } else {
      toast({
        title: "Error al agregar el favorito",
        variant: "destructive",
      });
    }
  };
  const handleDeleteFavorite = async () => {
    const response = await DeleteRecipeFromFavorites(id);
    if (response) {
      toast({
        title: "Favorito eliminado exitosamente",
        variant: "success",
      });
      handleLoad();
    } else {
      toast({
        title: "Error al eliminar el favorito",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (!user) return;
    const getFavorites = async () => {
      const favorites = await GetUserFavorites(user.id);
      if (favorites) {
        setIsFavorite(
          favorites.data.some((favorite) => favorite.recipeResponse.id === id)
        );
      }
    };
    getFavorites();
  }, [GetUserFavorites, id, user, handleAddToFavorites, handleDeleteFavorite]);

  return (
    <Card className="grid sm:grid-cols-[20%_auto]">
      <img
        src={urlImage}
        alt="spaghetti"
        className="h-full object-cover rounded-l-lg"
      />
      <div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            {user ? (
              !isFavorite ? (
                <Heart
                  className="text-muted-foreground cursor-pointer"
                  onClick={handleAddToFavorites}
                />
              ) : (
                <FaHeart
                  className="w-[24px] h-[24px] cursor-pointer"
                  onClick={handleDeleteFavorite}
                />
              )
            ) : null}
          </div>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock /> {preparationTime} {"Min"}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame /> {difficulty}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star /> {recipeScore(comments)}
          </div>
        </CardContent>
        <CardFooter>
          <Link to={`/recipe-detail/${id}`}>
            <Button>Ver receta</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  urlImage: PropTypes.string,
  description: PropTypes.string,
  preparationTime: PropTypes.number,
  difficulty: PropTypes.string,
  comments: PropTypes.array,
};

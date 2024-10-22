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

export const RecipeCard = ({
  id,
  title,
  urlImage,
  description,
  preparationpreparationTime,
  difficulty,
  comments,
}) => {
  const recipeScore = (comments) => {
    if (comments.length === 0) return "SC";
    const totalScore = comments.reduce((acc, comment) => acc + comment.score, 0);
    const averageScore = totalScore / comments.length;
    return averageScore.toFixed(2);
  };  

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
            <Heart className="text-muted-foreground cursor-pointer" />
          </div>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock /> {preparationpreparationTime} m
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame /> {difficulty}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star /> {recipeScore(comments)}
          </div>
        </CardContent>
        <CardFooter>
          <Link to={`recipe-detail/${id}`}>
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
  preparationpreparationTime: PropTypes.number,
  difficulty: PropTypes.string,
  comments: PropTypes.array,
};

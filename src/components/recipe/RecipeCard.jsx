import PropTypes from "prop-types";
import { Heart, Clock, Flame, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

export const RecipeCard = ({title, image, description, preparation_time, difficulty, score}) => {
  return (
    <Card className="grid sm:grid-cols-[20%_auto]">
      <img
        src={image}
        alt="spaghetti"
        className="h-full object-cover rounded-l-lg"
      />
      <div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Heart className="text-muted-foreground cursor-pointer" />
          </div>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex items-center gap-2 text-muted-foreground"><Clock /> {preparation_time} m</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Flame /> {difficulty}</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Star /> {score}</div>
        </CardContent>
        <CardFooter>
          <Link to="/recipe-detail/1">
            <Button>Ver receta</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  )
}

RecipeCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  preparation_time: PropTypes.number,
  difficulty: PropTypes.string,
  score: PropTypes.number,
}
import { LoaderCircle, Star, Heart, Clock, Flame } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CommentList } from "@/components/comment/CommentList";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { useEffect } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlertDialogDelete from "@/components/alertDialogDelete/AlertDialogDelete";

const RecipeDetail = () => {
  const { user } = useContext(AuthenticationContext);
  const { id } = useParams();
  const { GetRecipeById, DeleteRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const getRecipeById = async () => {
      const recipe = await GetRecipeById(id);

      if (recipe) {
        setRecipe(recipe.data);
      }
    };
    getRecipeById();
  }, [id, GetRecipeById]);

  const handleDelete = async () => {
    const result = await DeleteRecipe(id);
    if (result) {
      navigate("/", { replace: true });
    }
  };

  const recipeScore = (comments) => {
    if (comments.length === 0) return "SC";
    const totalScore = comments.reduce(
      (acc, comment) => acc + comment.score,
      0
    );
    const averageScore = totalScore / comments.length;
    return averageScore.toFixed(2);
  };

  if (!recipe) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircle size={64} className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h1 className="text-2xl font-semibold">{recipe.title}</h1>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Star />
              {recipeScore(recipe.comments)}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock />
              {recipe.preparationpreparationTime} minutos
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Flame />
              {recipe.difficulty}
            </span>
          </div>
        </div>
        <Heart className="text-muted-foreground cursor-pointer ml-auto" />
        {recipe.userId === Number(user.id) && (
          <div className="flex  gap-2">
            <Button
              className="ml-4 flex items-center justify-center"
              size="icon"
            >
              <Pencil />
            </Button>
            <Button
              className="ml-4 flex items-center justify-center"
              size="icon"
              onClick={openDialog}
            >
              <Trash2 />
            </Button>
            <AlertDialogDelete
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onConfirm={() => {
                handleDelete();
                closeDialog();
              }}
            />
          </div>
        )}
      </div>

      <p>
        <Link to="/user-profile/:id" className="font-medium underline">
          {/* Autor de la receta:{" "}  hay que modificar el metodo en el back si queremos obtener el autor de la receta */}
        </Link>
        <span className="text-muted-foreground italic">
          &ldquo;{recipe.description}&rdquo;
        </span>
      </p>

      <div className="flex gap-2">
        {recipe.categories.map((categorie, index) => (
          <Badge key={index}>{categorie}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={recipe.urlImage} className="h-full object-cover rounded-lg" />
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Ingredientes</h3>
          <ul className="list-disc ml-5">
            {recipe.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>

          <h3 className="font-semibold">Instrucciones</h3>
          <p>{recipe.instructions}</p>
          {/* <ul className="list-disc ml-5">
            <li>
              Cocina los 400g de spaghetti en abundante agua con sal hasta que
              estén al dente. Guarda un poco del agua de cocción.
            </li>
            <li>
              En una sartén grande, cocina la panceta o el guanciale a fuego
              medio hasta que estén dorados y crujientes.
            </li>
            <li>
              En un bol aparte, bate los 4 huevos y añade los 100g de queso
              pecorino y los 100g de queso parmesano rallados.
            </li>
            <li>
              Una vez que la pasta esté lista y escurrida, añádela directamente
              a la sartén con la panceta/guanciale.
            </li>
            <li>
              Retira la sartén del fuego y añade la mezcla de huevo y queso a la
              pasta caliente.
            </li>
          </ul> */}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Comentarios</h2>

        <Textarea
          placeholder="Escribe tu comentario aquí..."
          className="resize-none"
        />

        <div className="flex justify-end gap-2">
          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Puntaje" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
          <Button>Publicar comentario</Button>
        </div>

        <CommentList comments={recipe.comments} />
      </div>
    </div>
  );
};

export default RecipeDetail;

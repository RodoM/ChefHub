import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import {
  LoaderCircle,
  Star,
  Heart,
  Clock,
  Flame,
  Pencil,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommentForm } from "@/components/comment/CommentForm";
import { CommentList } from "@/components/comment/CommentList";
import ConfirmDialog from "@/components/confirmDialog/ConfirmDialog";
import { isValidURL } from "@/helper/ValidateUrl";
import { FaHeart } from "react-icons/fa";
import { useScoreFormatter } from "@/hooks/UseScoreFormatter";

const RecipeDetail = () => {
  const { user } = useContext(AuthenticationContext);

  const { id } = useParams();
  const {
    GetRecipeById,
    DeleteRecipe,
    createComment,
    GetUserFavorites,
    AddRecipeToFavorites,
    DeleteRecipeFromFavorites,
  } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [refetch, setRefetch] = useState(false);

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
    const getRecipeById = async () => {
      const recipe = await GetRecipeById(id);

      if (recipe) {
        setRecipe(recipe.data);
      }
    };
    getRecipeById();
  }, [id, GetRecipeById, refetch]);

  const score =
    recipe?.comments.length > 0 ? useScoreFormatter(recipe.comments) : "SC";
  const handleDelete = async () => {
    const result = await DeleteRecipe(id);
    if (result) {
      navigate("/", { replace: true });
    }
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
          favorites.data.some(
            (favorite) => favorite.recipeResponse.id === Number(id)
          )
        );
      }
    };
    getFavorites();
  }, [GetUserFavorites, id, user, handleAddToFavorites, handleDeleteFavorite]);

  const { toast } = useToast();

  const submitComment = async (comment) => {
    const response = await createComment(id, comment);
    if (response.success) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        comments: [...prevRecipe.comments, response.data],
      }));
      toast({
        title: "Comentario creado exitosamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error al crear comentario",
        variant: "destructive",
      });
    }
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
              {score}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock />
              {recipe.preparationTime} minutos
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Flame />
              {recipe.difficulty}
            </span>
          </div>
        </div>
        {user ? (
          !isFavorite ? (
            <Heart
              className="text-muted-foreground cursor-pointer ml-auto"
              onClick={handleAddToFavorites}
            />
          ) : (
            <FaHeart
              className="w-[24px] h-[24px] cursor-pointer ml-auto"
              onClick={handleDeleteFavorite}
            />
          )
        ) : null}

        {user && (
          <div className="flex gap-2">
            {/* Si es usuario común y es el propietario, muestra Editar y Eliminar */}
            {user.role === "Common" &&
              recipe.userResponse.id === Number(user.id) && (
                <>
                  <Link
                    to="/edit-recipe"
                    state={{
                      id: recipe.id,
                      title: recipe.title,
                      urlImage: recipe.urlImage,
                      description: recipe.description,
                      ingredients: recipe.ingredients,
                      instructions: recipe.instructions,
                      categories: recipe.categories,
                      difficulty: recipe.difficulty,
                      preparationTime: recipe.preparationTime,
                    }}
                  >
                    <Button
                      className="ml-4 flex items-center justify-center"
                      size="icon"
                    >
                      <Pencil />
                    </Button>
                  </Link>
                  <Button
                    className="ml-4 flex items-center justify-center"
                    size="icon"
                    onClick={openDialog}
                  >
                    <Trash2 /> {/* Botón de Eliminar */}
                  </Button>
                </>
              )}
            {/* Si es Admin o Moderador, muestra solo Eliminar */}
            {["Admin", "Moderator"].includes(user.role) &&
            recipe.userResponse.id === Number(user.id) ? (
              <div className="flex gap-2">
                <Link
                  to="/edit-recipe"
                  state={{
                    id: recipe.id,
                    title: recipe.title,
                    urlImage: recipe.urlImage,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    categories: recipe.categories,
                    difficulty: recipe.difficulty,
                    preparationTime: recipe.preparationTime,
                  }}
                >
                  <Button
                    className="ml-4 flex items-center justify-center"
                    size="icon"
                  >
                    <Pencil />
                  </Button>
                </Link>
                <Button
                  className="ml-4 flex items-center justify-center"
                  size="icon"
                  onClick={openDialog}
                >
                  <Trash2 /> {/* Botón de Eliminar */}
                </Button>
              </div>
            ) : (
              ["Admin", "Moderator"].includes(user.role) && (
                <Button
                  className="ml-4 flex items-center justify-center"
                  size="icon"
                  onClick={openDialog}
                >
                  <Trash2 /> {/* Botón de Eliminar */}
                </Button>
              )
            )}
          </div>
        )}
        <ConfirmDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConfirm={() => {
            handleDelete();
            closeDialog();
          }}
          description={"¿Estás seguro de que deseas eliminar esta receta?"}
        />
      </div>
      <Link
        to={`/user-profile/${recipe.userResponse.id}`}
        className="font-medium max-w-max"
      >
        <div className="flex items-center gap-2">
          <img
            src={
              isValidURL(recipe.userResponse.urlPhoto)
                ? recipe.userResponse.urlPhoto
                : "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
            }
            alt="foto de perfil"
            className="w-12 h-12 bg-muted-foreground rounded-full"
          />
          <p className="font-semibold">{recipe.userResponse.fullName}</p>
        </div>
      </Link>
      <span className="text-muted-foreground italic">
        &ldquo;{recipe.description}&rdquo;
      </span>

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
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Comentarios</h2>
        {user && <CommentForm submitComment={submitComment} />}

        <CommentList
          recipeId={id}
          comments={recipe.comments}
          handleRefetch={handleRefetch}
        />
      </div>
    </div>
  );
};

export default RecipeDetail;

import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { Star, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AlertDialogDelete from "@/components/alertDialogDelete/AlertDialogDelete";

export const CommentCard = ({ recipeId, comment, handleRefetch }) => {
  const { user } = useContext(AuthenticationContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const canDelete = () => {
    if (["Admin", "Moderator"].includes(user.role)) {
      return true;
    }
    if (Number(user.id) === comment.userResponse.id) {
      return true;
    }
    return false;
  };

  const { deleteComment } = useContext(RecipeContext);

  const { toast } = useToast();

  const handleDelete = async () => {
    const result = await deleteComment(comment.id, recipeId);
    if (result) {
      closeDialog();
      handleRefetch();
      toast({
        title: "Comentario eliminado exitosamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error al eliminar el comentario",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0">
          <div className="flex items-center gap-2">
            <img
              src={
                comment.userResponse.urlPhoto
                  ? comment.userResponse.urlPhoto
                  : "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
              }
              alt="foto de perfil"
              className="w-9 h-9 bg-muted-foreground rounded-full"
            />
            <p className="font-semibold">{comment.userResponse.fullName}</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star size={16} />
            <span>{comment.score}</span>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between text-muted-foreground">
          <p>{comment.text}</p>
          {canDelete() && (
            <button onClick={openDialog}>
              <Trash2 size={16} />
            </button>
          )}
        </CardContent>
      </Card>

      <AlertDialogDelete
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={() => {
          handleDelete();
          closeDialog();
        }}
      />
    </>
  );
};

CommentCard.propTypes = {
  recipeId: PropTypes.string,
  comment: PropTypes.object,
  handleRefetch: PropTypes.func,
};

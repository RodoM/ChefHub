import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { Star, Trash2, Pencil, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ConfirmDialog from "@/components/confirmDialog/ConfirmDialog";
import { isValidURL } from "@/helper/ValidateUrl";
import { ADMIN, MODERATOR, USERPLACEHOLDER } from "@/constants/constants";
import { Link } from "react-router-dom";

export const CommentCard = ({ recipeId, comment, handleRefetch }) => {
  const { user } = useContext(AuthenticationContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const canDelete = () => {
    if ([ADMIN, MODERATOR].includes(user.role)) {
      return true;
    }
    if (Number(user.id) === comment.userResponse.id) {
      return true;
    }
    return false;
  };

  const { deleteComment, modifyComment } = useContext(RecipeContext);

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

  const canModify = () => {
    return Number(user.id) === comment.userResponse.id;
  };

  const [edit, setEdit] = useState(false);

  const [text, setText] = useState(comment.text);
  const [score, setScore] = useState(comment.score);

  const handleModify = async () => {
    const result = await modifyComment(comment.id, text, score, recipeId);
    if (result) {
      closeDialog();
      handleRefetch();
      setEdit(false);
      toast({
        title: "Comentario modificado exitosamente",
        variant: "success",
      });
    } else {
      toast({
        title: "Error al modificar el comentario",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0">
          <Link to={`/user-profile/${comment.userResponse.id}`}>
            <div className="flex items-center gap-2">
              <img
                src={
                  isValidURL(comment.userResponse.urlPhoto)
                    ? comment.userResponse.urlPhoto
                    : USERPLACEHOLDER
                }
                alt="foto de perfil"
                className="w-9 h-9 bg-muted-foreground rounded-full"
              />
              <p className="font-semibold">{comment.userResponse.fullName}</p>
            </div>
          </Link>

          <>
            {edit ? (
              <Select onValueChange={(value) => setScore(Number(value))}>
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
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star size={16} />
                <span>{comment.score}</span>
              </div>
            )}
          </>
        </CardHeader>
        {user && (
          <CardContent className="flex justify-between gap-2 text-muted-foreground">
            {edit ? (
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="resize-none"
              />
            ) : (
              <p>{comment.text}</p>
            )}
            {!edit ? (
              <div className="flex items-center gap-2">
                {canModify() && (
                  <button onClick={() => setEdit(true)}>
                    <Pencil size={16} />
                  </button>
                )}
                {canDelete() && (
                  <button onClick={openDialog}>
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => openDialog()}>
                  <Check size={16} />
                </button>

                <button onClick={() => setEdit(false)}>
                  <X size={16} />
                </button>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={() => {
          edit ? handleModify() : handleDelete();
          closeDialog();
        }}
        description={
          edit
            ? "¿Estás seguro de que deseas modificar este comentario?"
            : "¿Estás seguro de que deseas eliminar este comentario?"
        }
      />
    </>
  );
};

CommentCard.propTypes = {
  recipeId: PropTypes.string,
  comment: PropTypes.object,
  handleRefetch: PropTypes.func,
};

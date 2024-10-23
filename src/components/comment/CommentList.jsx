import PropTypes from "prop-types";
import { CommentCard } from "./CommentCard"

export const CommentList = ({recipeId, comments, handleRefetch}) => {
  return (
    <div className="flex flex-col gap-4">
      {[...comments].reverse().map((comment) => (
        <CommentCard key={comment.id} recipeId={recipeId} comment={comment} handleRefetch={handleRefetch} />
      ))}
    </div>
  )
}

CommentList.propTypes = {
  recipeId: PropTypes.string,
  comments: PropTypes.array,
  handleRefetch: PropTypes.func,
};
import { CommentCard } from "./CommentCard"


export const CommentList = ({comments}) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  )
}

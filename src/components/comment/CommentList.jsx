import { CommentCard } from "./CommentCard"


export const CommentList = ({comments}) => {
  return (
    <div className="flex flex-col gap-4">
      {[...comments].reverse().map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

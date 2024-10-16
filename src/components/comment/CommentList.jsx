import { CommentCard } from "./CommentCard"

// const comments = [
//   { photo: "https://randomuser.me/api/portraits/men/82.jpg", name: "Rodolfo", comment: "Gran receta, muy fácil de seguir", score: 5, date: "22/09/2024" },
//   { photo: "https://randomuser.me/api/portraits/men/62.jpg", name: "Jenson", comment: "Muy buena receta, pero falta algo", score: 3, date: "22/09/2024" },
//   { photo: "https://randomuser.me/api/portraits/men/23.jpg", name: "Mateo", comment: "Delicioso", score: 4, date: "20/09/2024" },
//   { photo: "https://randomuser.me/api/portraits/men/10.jpg", name: "Bruno", comment: "Muy buena receta", score: 4, date: "20/09/2024" },
// ]

export const CommentList = ({comments}) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
    </div>
  )
}

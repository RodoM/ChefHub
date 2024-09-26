import PropTypes from "prop-types";
import { Star, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const CommentCard = ({ photo, name, comment, score, date }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <div className="flex items-center gap-2">
          <img src={photo} alt="foto de perfil" className="w-9 h-9 bg-muted-foreground rounded-full" />
          <p className="font-semibold">{name}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star size={16} />
          <span>{score}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col text-muted-foreground">
        <p>{comment}</p>
        <div className="flex items-center gap-1 ml-auto">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

CommentCard.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  comment: PropTypes.string,
  score: PropTypes.number,
  date: PropTypes.string,
}
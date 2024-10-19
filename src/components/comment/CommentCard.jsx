import PropTypes from "prop-types";
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const CommentCard = ({comment}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <div className="flex items-center gap-2">
          <img src={comment.userResponse.urlphoto} alt="foto de perfil" className="w-9 h-9 bg-muted-foreground rounded-full" />
          <p className="font-semibold">{comment.userResponse.fullName}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star size={16} />
          <span>{comment.score}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col text-muted-foreground">
        <p>{comment.text}</p>
      </CardContent>
    </Card>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.object,
}
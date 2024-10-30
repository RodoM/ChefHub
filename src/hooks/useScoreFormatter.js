import { useMemo } from "react";

export const useScoreFormatter = (comments) => {
  const score = useMemo(() => {
    const totalScore = comments.reduce(
      (acc, comment) => acc + comment.score,
      0
    );
    const averageScore = totalScore / comments.length;
    return averageScore.toFixed(2); // Calcula y formatea la puntuación media.
  }, [comments]); // Recalcular solo cuando 'comments' cambia.

  return score;
};

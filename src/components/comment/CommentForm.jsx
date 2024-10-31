import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const CommentForm = ({ submitComment }) => {
  const [formData, setFormData] = useState({
    text: "",
    score: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.text.trim() === "") {
      newErrors.text = "El comentario es requerido";
      setErrors(newErrors);
      return;
    }
    if (formData.score === null) {
      newErrors.score = "El puntaje es requerido";
      setErrors(newErrors);
      return;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    submitComment(formData);
    setFormData({
      text: "",
      score: null,
    });
    setErrors({});
  };

  return (
    <>
      <Textarea
        placeholder="Escribe tu comentario aquí..."
        className="resize-none"
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        {(errors.text || errors.score) && (
          <p className="text-red-500 text-sm mr-auto">
            {errors.text && errors.text}
            {errors.score && errors.score}
          </p>
        )}
        <Select
          onValueChange={(value) => setFormData({ ...formData, score: value })}
        >
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
        <Button onClick={() => handleSubmit()}>Enviar</Button>
      </div>
    </>
  );
};

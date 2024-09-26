import { Star, Heart, Clock, Flame } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { CommentList } from "@/components/comment/CommentList";

const RecipeDetail = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <h1 className="text-2xl font-semibold">Nombre de la receta</h1>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Star />
              4.5
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock />
              30m
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <Flame />
              Fácil
            </span>
          </div>
        </div>
        <Heart className="text-muted-foreground cursor-pointer ml-auto" />
      </div>

      <p className="text-muted-foreground">
        El spaghetti carbonara es un plato clásico de la cocina italiana, originario de Roma.
        Consiste en espaguetis mezclados con una salsa hecha de huevos, queso (tradicionalmente pecorino romano),
        panceta o guanciale, y pimienta negra.
      </p>

      <div className="flex gap-2">
        <Badge>Almuerzo</Badge>
        <Badge>Cena</Badge>
        <Badge>Pasta</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src="https://www.allrecipes.com/thmb/a_0W8yk_LLCtH-VPqg2uLD9I5Pk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg" alt="spaghetti" className="h-full object-cover rounded-lg" />
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Ingredientes</h3>
          <ul className="list-disc ml-5">
            <li>400g de spaghetti</li>
            <li>200g panceta o guancciale</li>
            <li>4 huevos</li>
            <li>100g queso pecorino</li>
            <li>100g queso parmesano</li>
            <li>Pimienta negra</li>
            <li>Sal</li>
          </ul>

          <h3 className="font-semibold">Instrucciones</h3>
          <ul className="list-disc ml-5">
            <li>Cocina los 400g de spaghetti en abundante agua con sal hasta que estén al dente. Guarda un poco del agua de cocción.</li>
            <li>En una sartén grande, cocina la panceta o el guanciale a fuego medio hasta que estén dorados y crujientes.</li>
            <li>En un bol aparte, bate los 4 huevos y añade los 100g de queso pecorino y los 100g de queso parmesano rallados.</li>
            <li>Una vez que la pasta esté lista y escurrida, añádela directamente a la sartén con la panceta/guanciale.</li>
            <li>Retira la sartén del fuego y añade la mezcla de huevo y queso a la pasta caliente.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Comentarios</h2>

        <Textarea placeholder="Escribe tu comentario aquí..." className="resize-none" />

        <div className="flex justify-end gap-2">
          <Select>
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
          <Button>Publicar comentario</Button>
        </div>

        <CommentList />
      </div>
    </div>
  );
}

export default RecipeDetail;

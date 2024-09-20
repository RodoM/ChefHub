import { RecipeCard } from "@/components/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const UserProfile = () => {
  const recipes = [
    {
      title: "Spaghetti Carbonara",
      image:
        "https://www.allrecipes.com/thmb/a_0W8yk_LLCtH-VPqg2uLD9I5Pk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
      description:
        "Una receta clásica italiana con pasta, huevo, queso, y panceta.",
      preparation_time: 20,
      difficulty: "fácil",
      score: 4,
    },
    {
      title: "Tacos al Pastor",
      image:
        "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg",
      description:
        "Tacos con carne de cerdo marinada y especias, acompañados de piña y salsa.",
      preparation_time: 60,
      difficulty: "intermedio",
      score: 5,
    },
  ];

  return (
    <div className="flex justify-center w-full my-10">
      <div className="w-full max-w-7xl p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Rodolfo Meroi</h2>
          <Button className="ml-4 flex items-center justify-center">
            <span className="hidden md:block">Editar Perfil</span>
            <Pencil className="md:ml-2 block md:hidden" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8 items-center">
          <img
            src="https://avatars.githubusercontent.com/u/87952837?v=4"
            alt="Foto del Usuario"
            className="rounded-md object-cover h-[220px] w-[220px] md:h-[260px] md:w-[260px]"
          />
          <p className="text-gray-500 mt-2 md:mt-0 md:ml-4">
            Hola! me llamo Rodolfo Meroi, tengo 23 años y soy un apacionado de
            la cocina, me uní a esta plataforma para encontrar recetas fáciles
            que pueda realizar cuando salga de cursar de la facultad.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Button>Mis Recetas (2)</Button>
          <Button variant="outline">Favoritas (10)</Button>
        </div>

        <div className="grid gap-4">
          {recipes.map((recipe, index) => (
            <RecipeCard {...recipe} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

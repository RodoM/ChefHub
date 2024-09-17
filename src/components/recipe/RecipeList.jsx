import { RecipeCard } from "./RecipeCard"

const recipes = [
  {
    title: "Spaghetti Carbonara",
    image: "https://www.allrecipes.com/thmb/a_0W8yk_LLCtH-VPqg2uLD9I5Pk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
    description: "Una receta clásica italiana con pasta, huevo, queso, y panceta.",
    preparation_time: 20,
    difficulty: "fácil",
    score: 4
  },
  {
    title: "Tacos al Pastor",
    image: "https://www.seriouseats.com/thmb/4kbwN13BlZnZ3EywrtG2AzCKuYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210712-tacos-al-pastor-melissa-hom-seriouseats-37-f72cdd02c9574bceb1eef1c8a23b76ed.jpg",
    description: "Tacos con carne de cerdo marinada y especias, acompañados de piña y salsa.",
    preparation_time: 60,
    difficulty: "intermedio",
    score: 5
  },
  {
    title: "Sushi Roll",
    image: "https://www.allrecipes.com/thmb/PujANugNXQW7ugnivQt8b4_-13k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/RM-169856-CreamCheeseandCrabSushiRolls-ddmfs-3x4-6421-8d233e210db3458f8574bafad1c69e70.jpg",
    description: "Rollos de sushi con pescado fresco, arroz y vegetales.",
    preparation_time: 45,
    difficulty: "díficil",
    score: 4
  },
  {
    title: "Ensalada Caesar",
    image: "https://www.gourmet.cl/wp-content/uploads/2016/09/Ensalada_C%C3%A9sar-web-553x458.jpg",
    description: "Una ensalada clásica con lechuga, crutones, queso parmesano y aderezo Caesar.",
    preparation_time: 15,
    difficulty: "fácil",
    score: 3
  },
  {
    title: "Ratatouille",
    image: "https://comedelahuerta.com/wp-content/uploads/2021/03/receta-ratatouille-vetariano-come-de-la-huerta.jpg",
    description: "Un guiso de verduras francés lleno de sabor.",
    preparation_time: 90,
    difficulty: "intermedio",
    score: 5
  }
];


export const RecipeList = () => {
  return (
    <div className="grid gap-4">
      {recipes.map((recipe, index) => {
        return <RecipeCard {...recipe} key={index} />
      })}
    </div>
  )
}

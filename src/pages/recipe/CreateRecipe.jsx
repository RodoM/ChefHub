import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RecipeContext } from "@/services/recipesContext/RecipesContext";
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { isValidURL } from "@/helper/ValidateUrl";
import { RECIPEPLACEHOLDER } from "@/constants/constants";

const CreateRecipe = () => {
  // estas son las definiciones de las referencias
  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const ingredientsRef = useRef();
  const instructionsRef = useRef();
  const categoriesRef = useRef();
  const difficultyRef = useRef();
  const preparationTimeRef = useRef();

  const { CreateRecipe } = useContext(RecipeContext);

  //  estas son las vriables de estado
  const [title, setTitle] = useState("");
  const [urlImage, seturlImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const { toast } = useToast();

  // este es el estado  que va a guardar los errores
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newRecipe = {
      title: title,
      urlImage: isValidURL(urlImage) ? urlImage : RECIPEPLACEHOLDER,
      description: description,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions: instructions,
      categories: categories.split(",").map((category) => category.trim()),
      difficulty: parseInt(difficulty),
      preparationTime: parseInt(preparationTime),
    };

    //  crear receta
    const success = await CreateRecipe(newRecipe);
    if (!success) {
      showToast("Error al crear la receta");
      return;
    } else {
      showToast("Receta creada exitosamente");
    }

    setErrors({});
    setTitle("");
    seturlImage("");
    setDescription("");
    setIngredients("");
    setInstructions("");
    setCategories("");
    setDifficulty("");
    setPreparationTime("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "El nombre es requerido";
      titleRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (urlImage.trim() === "") {
      newErrors.urlImage = "La imagen es requerida";
      imageRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (!isValidURL(urlImage)) {
      newErrors.urlImage = "La URL de la imagen no es válida";
      imageRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (description.trim() === "") {
      newErrors.description = "La descripcion es requerida";
      descriptionRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (ingredients.trim() === "") {
      newErrors.ingredients = "El primer ingrediente es requerido";
      ingredientsRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (instructions.trim() === "") {
      newErrors.instructions = "Las instrucciones son requeridas";
      instructionsRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (categories.trim() === "") {
      newErrors.categories = "Las categorías son requeridas";
      categoriesRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (difficulty.trim() === "") {
      newErrors.difficulty = "La dificultad es requerida";
      difficultyRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (preparationTime.trim() === "") {
      newErrors.preparationTime = "El tiempo de preparación es requerido";
      preparationTimeRef.current.focus();
      setErrors(newErrors);
      return;
    }
    return true;
  };

  const showToast = (msg) => {
    toast({
      description: msg,
    });
  };
  return (
    <div className="flex justify-center w-full mt-10 p-8 ">
      <form className="w-full max-w-7xl  " onSubmit={handleSubmit}>
        <h1 className="text-left font-bold text-2xl mb-8">Nueva Receta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="">
            <Label className="block mb-2">Nombre</Label>
            <Input
              className="w-full"
              placeholder="Ingrese el nombre de la receta"
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
              value={title}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div className="">
            <Label className="block mb-2">Imagen</Label>
            <Input
              className="w-full"
              placeholder="Ingrese la URL de la imagen"
              onChange={(e) => seturlImage(e.target.value)}
              ref={imageRef}
              value={urlImage}
            />
            {errors.urlImage && (
              <p className="text-red-500">{errors.urlImage}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Descripción</Label>
          <Textarea
            className="resize-none w-full"
            placeholder="Ingrese una descripción para la receta"
            onChange={(e) => setDescription(e.target.value)}
            ref={descriptionRef}
            value={description}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex-grow mr-4">
            <Label className="block mb-2">Ingredientes</Label>
            <Input
              className="w-full"
              placeholder="Ingrese los ingredientes separados con coma"
              onChange={(e) => setIngredients(e.target.value)}
              ref={ingredientsRef}
              value={ingredients}
            />
            {errors.ingredients && (
              <p className="text-red-500">{errors.ingredients}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Instrucciones</Label>
          <Textarea
            className="resize-none w-full"
            placeholder="Ingrese las instrucciones de la receta"
            onChange={(e) => setInstructions(e.target.value)}
            ref={instructionsRef}
            value={instructions}
          />
          {errors.instructions && (
            <p className="text-red-500">{errors.instructions}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="">
            <Label className="block mb-2">Categorías</Label>
            <Input
              className="w-full"
              placeholder="Seleccione las categorías de la receta"
              onChange={(e) => setCategories(e.target.value)}
              ref={categoriesRef}
              value={categories}
            />
            {errors.categories && (
              <p className="text-red-500">{errors.categories}</p>
            )}
          </div>
          {/* <div className="">
            <Label className="block mb-2">Dificultad</Label>
            <Input
              className="w-full"
              placeholder="Seleccione la dificultad de la receta"
              onChange={(e) => setDifficulty(e.target.value)}
              ref={difficultyRef}
              value={difficulty}
            />
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty}</p>
            )}
          </div> */}
          <div className="">
            <Label className="block mb-2">Dificultad</Label>
            <select
              className="w-full border-gray-300 rounded-md"
              onChange={(e) => setDifficulty(e.target.value)}
              ref={difficultyRef}
              value={difficulty}
            >
              <option value="" disabled>
                Seleccione la dificultad de la receta
              </option>
              <option value="0">Fácil</option>
              <option value="1">Intermedio</option>
              <option value="2">Difícil</option>
            </select>
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Tiempo De Preparación</Label>
          <Input
            className="w-full"
            placeholder="Ingrese el tiempo de preparación de la receta"
            onChange={(e) => setPreparationTime(e.target.value)}
            ref={preparationTimeRef}
            value={preparationTime}
          />
          {errors.preparationTime && (
            <p className="text-red-500">{errors.preparationTime}</p>
          )}
        </div>

        <div className="flex justify-end space-x-8">
          <Button variant="outline">Volver</Button>
          <Button>Publicar Receta</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;

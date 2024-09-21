import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateRecipe = () => {
  // estas son las definiciones de las referencias
  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const firstIngredientRef = useRef();
  const instructionsRef = useRef();
  const categoriesRef = useRef();
  const difficultyRef = useRef();
  const timeRef = useRef();

  //  estas son las vriables de estado
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [firstIngredient, setFirstIngredient] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categories, setCategories] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [time, setTime] = useState("");

  // este es el estado  que va a guardar los errores
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newRecipe = {
      name,
      image,
      description,
      firstIngredient,
      instructions,
      categories,
      difficulty,
      time,
    };

    console.log(newRecipe);

    alert("Recipe created successfully");

    setErrors({});
    setName("");
    setImage("");
    setDescription("");
    setFirstIngredient("");
    setInstructions("");
    setCategories("");
    setDifficulty("");
    setTime("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "El nombre es requerido";
      nameRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (image.trim() === "") {
      newErrors.image = "La imagen es requerida";
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
    if (firstIngredient.trim() === "") {
      newErrors.firstIngredient = "El primer ingrediente es requerido";
      firstIngredientRef.current.focus();
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
    if (time.trim() === "") {
      newErrors.time = "El tiempo de preparación es requerido";
      timeRef.current.focus();
      setErrors(newErrors);
      return;
    }
    return true;
  };

  const [ingredients, setIngredients] = useState([{ value: "" }]);

  const handleAddIngredient = (event) => {
    event.preventDefault();
    setIngredients([...ingredients, { value: "" }]);
  };

  const handleRemoveIngredient = (event, index) => {
    event.preventDefault();
    setIngredients(ingredients.filter((_, idx) => idx !== index));
  };

  const handleChangeIngredient = (value, index) => {
    const newIngredients = ingredients.map((item, idx) =>
      idx === index ? { value } : item
    );
    setIngredients(newIngredients);
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
              full
              placeholder="Ingrese el nombre de la receta"
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
              value={name}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="">
            <Label className="block mb-2">Imagen</Label>
            <Input
              className="w-full"
              full
              placeholder="Ingrese la URL de la imagen"
              onChange={(e) => setImage(e.target.value)}
              ref={imageRef}
              value={image}
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Descripción</Label>
          <Textarea
            className="resize-none w-full"
            full
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
            <Label className="block mb-2">Primer ingrediente</Label>
            <Input
              className="w-full"
              full
              placeholder="Ingrese el ingrediente junto con su cantidad"
              onChange={(e) => setFirstIngredient(e.target.value)}
              ref={firstIngredientRef}
              value={firstIngredient}
            />
            {errors.firstIngredient && (
              <p className="text-red-500">{errors.firstIngredient}</p>
            )}
          </div>
          <div className="flex-shrink">
            <Button
              onClick={handleAddIngredient}
              color="primary"
              className="mt-6"
            >
              Agregar
            </Button>
          </div>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex justify-between items-center mb-8 ">
            <div className="flex-grow mr-4">
              <Label className="block mb-2">Ingresar Ingrediente</Label>
              <Input
                className="w-full"
                value={ingredient.value}
                onChange={(e) => handleChangeIngredient(e.target.value, index)}
                placeholder="Ingrese el ingrediente junto con su cantidad"
              />
            </div>
            <div className="flex-shrink">
              <Button
                onClick={(e) => handleRemoveIngredient(e, index)}
                color="primary"
                className="mt-6"
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}

        <div className="mb-8">
          <Label className="block mb-2">Instrucciones</Label>
          <Textarea
            className="resize-none w-full"
            full
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
              full
              placeholder="Seleccione las categorías de la receta"
              onChange={(e) => setCategories(e.target.value)}
              ref={categoriesRef}
              value={categories}
            />
            {errors.categories && (
              <p className="text-red-500">{errors.categories}</p>
            )}
          </div>
          <div className="">
            <Label className="block mb-2">Dificultad</Label>
            <Input
              className="w-full"
              full
              placeholder="Seleccione la dificultad de la receta"
              onChange={(e) => setDifficulty(e.target.value)}
              ref={difficultyRef}
              value={difficulty}
            />
            {errors.difficulty && (
              <p className="text-red-500">{errors.difficulty}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Tiempo De Preparación</Label>
          <Input
            className="w-full"
            full
            placeholder="Ingrese el tiempo de preparación de la receta"
            onChange={(e) => setTime(e.target.value)}
            ref={timeRef}
            value={time}
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
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

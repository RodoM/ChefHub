import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateRecipe = () => {
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
      <form className="w-full max-w-7xl  " onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-left font-bold text-2xl mb-8">Nueva Receta</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="">
            <Label className="block mb-2">Nombre</Label>
            <Input
              className="w-full"
              full
              placeholder="Ingrese el nombre de la receta"
            />
          </div>
          <div className="">
            <Label className="block mb-2">Imagen</Label>
            <Input
              className="w-full"
              full
              placeholder="Ingrese la URL de la imagen"
            />
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Descripción</Label>
          <Textarea
            className="resize-none w-full"
            full
            placeholder="Ingrese una descripción para la receta"
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex-grow mr-4">
            <Label className="block mb-2">Primer ingrediente</Label>
            <Input
              className="w-full"
              full
              placeholder="Ingrese el ingrediente junto con su cantidad"
            />
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
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="">
            <Label className="block mb-2">Categorías</Label>
            <Input
              className="w-full"
              full
              placeholder="Seleccione las categorías de la receta"
            />
          </div>
          <div className="">
            <Label className="block mb-2">Dificultad</Label>
            <Input
              className="w-full"
              full
              placeholder="Seleccione la dificultad de la receta"
            />
          </div>
        </div>

        <div className="mb-8">
          <Label className="block mb-2">Tiempo De Preparación</Label>
          <Input
            className="w-full"
            full
            placeholder="Ingrese el tiempo de preparación de la receta"
          />
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

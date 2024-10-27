"use client";

import { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "react-router-dom";
import { isValidURL } from "@/helper/ValidateUrl";
import { UserContext } from "@/services/userContext/UserContext";
import { useToast } from "@/hooks/use-toast";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
const EditUser = () => {
  let { state } = useLocation();
  const [urlPhoto, setUrlPhoto] = useState(state.urlPhoto);
  const [fullName, setFullName] = useState(state.fullName);
  const [email, setEmail] = useState(state.email);
  const [description, setDescription] = useState(state.description);
  const [error, setError] = useState(null);
  const { UpdateUser } = useContext(UserContext);
  const { user, setUser } = useContext(AuthenticationContext);
  const { toast } = useToast();
  const handleChangeInput = (e) => {
    setError(null);
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "urlPhoto":
        setUrlPhoto(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      description.trim() === "" ||
      urlPhoto.trim() === ""
    ) {
      setError("Debes completar todos los campos.");
      return;
    }
    const userRequest = {
      fullName: fullName,
      email: email != state.email ? email : null,
      urlPhoto: isValidURL(urlPhoto)
        ? urlPhoto
        : "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png",
      description: description,
    };

    const isSuccess = await UpdateUser(userRequest);
    if (!isSuccess) {
      toast({
        title: "Error al editar el perfil",
        variant: "destructive",
      });
    }
    toast({
      title: "perfil actualizado exitosamente",
      variant: "success",
    });
    setUser({ ...user, photo: userRequest.urlPhoto });
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  };
  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen mt-[-57px] flex justify-center items-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Editar Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={urlPhoto} alt="Avatar" />
                  <AvatarFallback>{fullName.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  name="fullName"
                  value={fullName}
                  onChange={handleChangeInput}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Foto</Label>
                <Input
                  name="urlPhoto"
                  value={urlPhoto}
                  placeholder="Tu foto"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChangeInput}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  name="description"
                  value={description}
                  onChange={handleChangeInput}
                  placeholder="Cuéntanos sobre ti"
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          {error && <p className="text-red-500 text-sm mr-auto">{error}</p>}

          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>

          <Button type="submit" onClick={handleSubmit}>
            Actualizar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditUser;

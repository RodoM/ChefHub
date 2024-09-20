import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

const CreateModerator = () => {
  //Inicio definicion de variables de formulario para validacion de campos requeridos

  //refs
  const fullNameRef = useRef();
  const emailRef = useRef();
  const urlPhotoRef = useRef();
  const rolRef = useRef();
  const descriptionRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //estados formulario
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [urlPhoto, setUrlPhoto] = useState("");
  const [rol, setRol] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //estados error
  const [errors, setErrors] = useState({});

  //fin definicion de variables de formulario para validacion de campos requeridos

  //funcion para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    //este es el nuevo usuario
    const newUser = {
      fullName,
      email,
      urlPhoto,
      rol,
      description,
      password,
    };

    console.log(newUser);
    alert("Usuario creado correctamente");

    //resetear formulario
    setFullName("");
    setEmail("");
    setUrlPhoto("");
    setRol("");
    setDescription("");
    setPassword("");
    setConfirmPassword("");

    //resetar estados error
    setErrors({});
  };

  //funcion para validar los campos del formulario
  const validateForm = () => {
    const newErrors = {};
    if (fullName.trim() === "") {
      newErrors.fullName = "Por favor, rellena el nombre y apellido";
      fullNameRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (email.trim() === "") {
      newErrors.email = "Por favor, rellena el email";
      emailRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (urlPhoto.trim() === "") {
      newErrors.urlPhoto = "Por favor, rellena la URL de la foto";
      urlPhotoRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (rol.trim() === "") {
      newErrors.rol = "Por favor, selecciona un rol";
      rolRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (description.trim() === "") {
      newErrors.description = "Por favor, rellena la descripción";
      descriptionRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (password.trim() === "") {
      newErrors.password = "Por favor, rellena la contraseña";
      passwordRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Por favor, confirma la contraseña";
      confirmPasswordRef.current.focus();
      setErrors(newErrors);
      return;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      confirmPasswordRef.current.focus();
      setErrors(newErrors);
      return;
    }

    return true;
  };

  return (
    <div className="flex justify-center w-full my-10">
      <form className="w-full max-w-7xl" onSubmit={handleSubmit}>
        <h2 className="text-left text-2xl font-bold mb-8">Nuevo Usuario</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="fullName">Nombre y apellido</Label>
            <Input
              id="fullName"
              type="text"
              className="w-full"
              placeholder="Ingrese el nombre del usuario"
              ref={fullNameRef}
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              placeholder="Ingrese el email del usuario"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="urlPhoto">Foto de perfil</Label>
            <Input
              id="urlPhoto"
              type="text"
              className="w-full"
              placeholder="Ingrese la URL de la foto del usuario"
              ref={urlPhotoRef}
              onChange={(e) => setUrlPhoto(e.target.value)}
              value={urlPhoto}
            />
            {errors.urlPhoto && (
              <p className="text-red-500">{errors.urlPhoto}</p>
            )}
          </div>
          <div>
            <Label htmlFor="rol">Rol</Label>
            <Select
              id="rol"
              onValueChange={(value) => setRol(value)}
              value={rol}
            >
              <SelectTrigger className="w-full" ref={rolRef}>
                <SelectValue placeholder="Elija un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="moderator">Moderador</SelectItem>
                  <SelectItem value="common">Usuario común</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.rol && <p className="text-red-500">{errors.rol}</p>}
          </div>
        </div>

        <div className="mb-8">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Ingrese una breve descripción para el usuario"
            className=" w-full resize-none"
            ref={descriptionRef}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              className="w-full"
              placeholder="Ingrese la contraseña del usuario"
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="w-full"
              placeholder="Confirme la contraseña del usuario"
              ref={confirmPasswordRef}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-8">
          <Button variant="secondary">Volver</Button>
          <Button>Crear usuario</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateModerator;

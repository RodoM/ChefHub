import { Croissant } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContext, useRef, useState } from "react";
import { UserAuthenticationContext } from "@/services/authentication/UserAuthenticationContext";
import { Navigate } from "react-router-dom";
const Register = () => {
  const { user } = useContext(UserAuthenticationContext);
  if (user) {
    return <Navigate to={"/"} replace />;
  }
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const fullnameRef = useRef();
  const emailRef = useRef();
  const photoRef = useRef();
  const descriptionRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const validateForm = () => {
    const errors = {};
    if (fullname.trim() === "") {
      errors.fullname = "Por favor ingrese su nombre y apellido";
      fullnameRef.current.focus();
      setErrors(errors);
      return;
    }
    if (email.trim() === "") {
      errors.email = "Por favor ingrese su email";
      emailRef.current.focus();
      setErrors(errors);
      return;
    }
    if (photo.trim() === "") {
      errors.photo = "Por favor ingrese una url para su foto";
      photoRef.current.focus();
      setErrors(errors);
      return;
    }
    if (description.trim() === "") {
      errors.description = "Por favor ingrese una descripción";
      descriptionRef.current.focus();
      setErrors(errors);
      return;
    }
    if (password.trim() === "") {
      errors.password = "Por favor ingrese su contraseña";
      passwordRef.current.focus();
      setErrors(errors);
      return;
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Por favor confirma su contraseña";
      confirmPasswordRef.current.focus();
      setErrors(errors);
      return;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
      confirmPasswordRef.current.focus();
      setErrors(errors);
      return;
    }
    return true;
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setErrors({});
    alert("Formulario enviado");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="shadow-md rounded-lg p-10 max-w-2xl w-full border-2 overflow-y-auto h-full">
        <form onSubmit={handleForm} className="flex flex-col h-full">
          {/* Título con icono */}
          <div className="flex justify-center items-center mb-4 gap-2">
            <Croissant className="w-8 h-8" />
            <h1 className="text-3xl font-bold">ChefHub</h1>
          </div>

          {/* Texto de Instrucción */}
          <p className="text-gray-500 text-center mb-4">
            Complete los campos para registrarse
          </p>

          <div className="mb-4">
            <Label
              htmlFor="fullname"
              className="block text-gray-700 font-semibold mb-2"
            >
              Nombre y Apellido
            </Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Ingrese su Nombre y Apellido"
              className="w-full h-12 border-gray-300 shadow-lg"
              ref={fullnameRef}
              onChange={(e) => setFullname(e.target.value)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs">{errors.fullname}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Ingrese su email"
              className="w-full h-12 border-gray-300 shadow-lg"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="photo"
              className="block text-gray-700 font-semibold mb-2"
            >
              Foto
            </Label>
            <Input
              id="photo"
              type="text"
              placeholder="Ingrese una Url para su foto"
              className="w-full h-12 border-gray-300 shadow-lg"
              ref={photoRef}
              onChange={(e) => setPhoto(e.target.value)}
            />
            {errors.photo && (
              <p className="text-red-500 text-xs">{errors.photo}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Descripción
            </Label>
            <Textarea
              className="w-full h-24 border-gray-300 shadow-lg resize-none"
              placeholder="Ingrese una breve descripción sobre usted"
              ref={descriptionRef}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full border-gray-300 h-12 shadow-lg"
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="mb-8">
            <Label
              htmlFor="confirmpassword"
              className="block text-gray-700 font-semibold mb-2"
            >
              Confirme su Contraseña
            </Label>
            <Input
              id="confirmpassword"
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full border-gray-300 h-12 shadow-lg"
              ref={confirmPasswordRef}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Botón de registrarse */}
          <Button className="w-full">Registrarse</Button>
          {/* Texto de Registro */}
          <p className="text-gray-500 text-center mt-8">
            ¿Ya tiene una cuenta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicie Sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

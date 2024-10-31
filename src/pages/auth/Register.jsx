import { useContext, useRef, useState } from "react";
import { Navigate, useNavigate, replace } from "react-router-dom";
import { Croissant } from "lucide-react";
import { UserContext } from "@/services/userContext/UserContext";
import { AuthenticationContext } from "@/services/authentication/AuthenticationContext";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { isValidURL } from "@/helper/ValidateUrl";
import { USERPLACEHOLDER } from "@/constants/constants";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    urlPhoto: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const fullNameRef = useRef();
  const emailRef = useRef();
  const photoRef = useRef();
  const descriptionRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const validateForm = () => {
    const errors = {};
    if (formData.fullName.trim() === "") {
      errors.fullname = "Por favor ingrese su nombre y apellido";
      fullNameRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.email.trim() === "") {
      errors.email = "Por favor ingrese su email";
      emailRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.urlPhoto.trim() === "") {
      errors.photo = "Por favor ingrese una url para su foto";
      photoRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.description.trim() === "") {
      errors.description = "Por favor ingrese una descripción";
      descriptionRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.password.trim() === "") {
      errors.password = "Por favor ingrese su contraseña";
      passwordRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.confirmPassword.trim() === "") {
      errors.confirmPassword = "Por favor confirma su contraseña";
      confirmPasswordRef.current.focus();
      setErrors(errors);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
      confirmPasswordRef.current.focus();
      setErrors(errors);
      return;
    }
    return true;
  };

  const { register } = useContext(UserContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userRequest = formData;
      if (!isValidURL(userRequest.urlPhoto)) {
        userRequest.urlPhoto = USERPLACEHOLDER;
      }
      await register(userRequest);
      setErrors({});
      toast({
        title: "Registro exitoso",
        variant: "success",
      });
      navigate("/login", replace);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al registrarse",
        variant: "destructive",
      });
    }
  };

  const { user } = useContext(AuthenticationContext);

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="shadow-md rounded-lg p-10 max-w-2xl w-full border-2 overflow-y-auto h-full">
        <form onSubmit={handleForm} className="flex flex-col h-full">
          <div className="flex justify-center items-center mb-4 gap-2">
            <Croissant className="w-8 h-8" />
            <h1 className="text-3xl font-bold">ChefHub</h1>
          </div>

          <p className="text-muted-foreground text-center mb-4">
            Complete los campos para registrarse
          </p>

          <div className="mb-4">
            <Label htmlFor="fullname">Nombre y Apellido</Label>
            <Input
              id="fullname"
              name="fullName"
              type="text"
              placeholder="Ingrese su Nombre y Apellido"
              ref={fullNameRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Ingrese su email"
              ref={emailRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="photo">Foto</Label>
            <Input
              id="photo"
              name="urlPhoto"
              type="text"
              placeholder="Ingrese una Url para su foto"
              ref={photoRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Descripción</Label>
            <Textarea
              name="description"
              className="resize-none"
              placeholder="Ingrese una breve descripción sobre usted"
              ref={descriptionRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              ref={passwordRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mb-8">
            <Label htmlFor="confirmpassword">Confirme su Contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Ingrese su contraseña"
              ref={confirmPasswordRef}
              onChange={(e) => handleChange(e)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <Button className="w-full">Registrarse</Button>
          <p className="text-muted-foreground text-center mt-8">
            ¿Ya tiene una cuenta?
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

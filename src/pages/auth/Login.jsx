import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Croissant } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useContext, useRef, useState } from "react";
import { UserAuthenticationContext } from "@/services/authentication/UserAuthenticationContext";
import { Navigate } from "react-router-dom";

function Login() {
  const { user } = useContext(UserAuthenticationContext);
  if (user) {
    return <Navigate to="/" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});

  const { login } = useContext(UserAuthenticationContext);

  const validateForm = () => {
    const errors = {};
    if (email.trim() === "") {
      errors.email = "Por favor ingrese su email";
      emailRef.current.focus();
      setErrors(errors);
      return;
    }
    if (password.trim() === "") {
      errors.password = "Por favor ingrese su contraseña";
      passwordRef.current.focus();
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
    if (email === "admin@gmail.com" && password === "123") {
      login(email);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen p-2">
      {/* Contenedor Principal */}
      <div className="shadow-md rounded-lg p-10 max-w-md w-full border-2">
        <form onSubmit={handleForm}>
          {/* Título con icono */}
          <div className="flex justify-center items-center mb-2 gap-2">
            <Croissant className="w-8 h-8" />
            <h1 className="text-3xl font-bold">ChefHub</h1>
          </div>

          {/* Texto de Instrucción */}
          <p className="text-gray-500 text-center mb-4">
            Ingrese su mail y contraseña para continuar
          </p>

          {/* Campos de Email y Password */}
          <div className="mb-6">
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

          <div className="mb-8">
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

          {/* Botón de Iniciar Sesión */}
          <Button className="w-full">Iniciar Sesión</Button>

          {/* Texto de Registro */}
          <p className="text-gray-500 text-center mt-8">
            ¿No tiene cuenta? {/*Cambiar por un Link de react router*/}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrese
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

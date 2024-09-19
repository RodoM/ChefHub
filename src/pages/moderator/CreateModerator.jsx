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
const CreateModerator = () => {
  return (
    <div className="flex justify-center w-full mt-10 p-8">
      <form className="w-full max-w-7xl">
        <h2 className="text-left text-2xl font-bold mb-8">Nuevo Usuario</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="fullName">Nombre y apellido</Label>
            <Input
              id="fullName"
              type="text"
              className="w-full"
              placeholder="Ingrese el nombre del usuario"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              placeholder="Ingrese el email del usuario"
            />
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
            />
          </div>
          <div>
            <Label htmlFor="rol">Rol</Label>
            <Select id="rol">
              <SelectTrigger className="w-full">
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
          </div>
        </div>

        <div className="mb-8">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Ingrese una breve descripción para el usuario"
            className=" w-full resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              className="w-full"
              placeholder="Ingrese la contraseña del usuario"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              className="w-full"
              placeholder="Confirme la contraseña del usuario"
            />
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
